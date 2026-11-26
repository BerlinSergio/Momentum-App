// The note editor supports a small subset of HTML, not arbitrary web pages.
// Parse in an inert template and construct fresh HTML-only nodes. Never copy
// raw attributes, scriptable URLs, SVG/MathML, CSS or custom elements.
const HTML_NS = 'http://www.w3.org/1999/xhtml';
const FORMATTING = new Set(['p','div','br','b','strong','i','em','u','s','strike','del','h1','h2','h3','h4','h5','h6','ul','ol','li','blockquote','pre','code','span','sub','sup','hr']);
const DISCARD = new Set(['script','style','template','iframe','frame','object','embed','applet','noscript','link','meta','base','form','input','button','textarea','select','option','video','audio','source','picture','canvas']);
const RASTER_DATA = /^data:image\/(?:png|jpeg|gif|webp|bmp);base64,[A-Za-z0-9+/]+={0,2}$/i;

export function sanitizeNoteHtml(value) {
  const input = document.createElement('template');
  input.innerHTML = String(value ?? '');
  const output = document.createElement('template');
  function copy(node, parent, depth) {
    if (node.nodeType === 3) {
      parent.append(document.createTextNode(node.nodeValue || ''));
      return;
    }
    if (node.nodeType !== 1 || node.namespaceURI !== HTML_NS || depth > 100) return;
    const tag = node.localName;
    if (DISCARD.has(tag)) return;
    if (tag === 'img') {
      const src = node.getAttribute('src') || '';
      if (!RASTER_DATA.test(src)) {
        const alt = node.getAttribute('alt');
        if (alt) parent.append(document.createTextNode(alt));
        return;
      }
      const img = document.createElement('img');
      img.setAttribute('src', src);
      img.setAttribute('alt', node.getAttribute('alt') || '');
      parent.append(img);
      return;
    }
    const target = FORMATTING.has(tag) ? document.createElement(tag) : parent;
    if (target !== parent) parent.append(target);
    for (const child of node.childNodes) copy(child, target, depth + 1);
  }
  for (const node of input.content.childNodes) copy(node, output.content, 0);
  return output.innerHTML;
}

export function pasteSafeNoteContent(event) {
  event.preventDefault();
  const html = event.clipboardData?.getData('text/html');
  if (html) {
    document.execCommand('insertHTML', false, sanitizeNoteHtml(html));
  } else {
    document.execCommand('insertText', false, event.clipboardData?.getData('text/plain') || '');
  }
}
