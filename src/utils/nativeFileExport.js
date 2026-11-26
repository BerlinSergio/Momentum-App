import { Capacitor, registerPlugin } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { MAX_ATTACHMENT_SIZE_BYTES } from '../storage/attachmentStorage.js';

export const MomentumDevice = registerPlugin('MomentumDevice');

function safeName(name) {
  return String(name || 'attachment').replace(/[\\/:*?"<>|\x00-\x1f]/g, '_').trim().slice(0, 160) || 'attachment';
}

async function blobBase64(blob) {
  return new Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error || new Error('Unable to read file'));
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.readAsDataURL(blob);
  });
}

export async function exportFileBlob(blob, name, {share = false} = {}) {
  if (!(blob instanceof Blob) || !blob.size || blob.size > MAX_ATTACHMENT_SIZE_BYTES) {
    throw new Error('File missing or exceeds the 50 MB attachment limit');
  }
  const filename = safeName(name);
  if (!Capacitor.isNativePlatform()) {
    if (share && navigator.share && typeof File !== 'undefined') {
      const file = new File([blob], filename, {type:blob.type});
      if (navigator.canShare?.({files:[file]})) {
        await navigator.share({files:[file],title:filename});
        return {shared:true};
      }
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = filename;
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    return {downloadStarted:true};
  }
  const id = 'momentum-export-' + crypto.randomUUID();
  const path = share ? id + '/' + filename : id;
  try {
    // Keep each bridge message bounded. Each Base64 block is independently decoded.
    const chunkSize = 512 * 1024;
    for (let offset=0; offset<blob.size; offset+=chunkSize) {
      const data = await blobBase64(blob.slice(offset, offset+chunkSize));
      if (offset === 0) await Filesystem.writeFile({path,directory:Directory.Cache,data,recursive:true});
      else await Filesystem.appendFile({path,directory:Directory.Cache,data});
    }
    const stat = await Filesystem.stat({path,directory:Directory.Cache});
    if (stat.size !== blob.size) throw new Error('Staged file size mismatch');
    if (!share && Capacitor.getPlatform() === 'android') {
      return await MomentumDevice.saveExport({staged:path,filename,mime:blob.type || 'application/octet-stream'});
    }
    if (!(await Share.canShare()).value) throw new Error('File sharing unavailable');
    const {uri} = await Filesystem.getUri({path,directory:Directory.Cache});
    await Share.share({files:[uri],title:filename});
    // The chooser does not prove the recipient saved anything.
    return {shareOpened:true};
  } finally {
    // Android document copy has finished before resolution. Shared files need
    // to remain available to the receiver; Android may clean cache later.
    if (!share && Capacitor.getPlatform() === 'android') {
      await Filesystem.deleteFile({path,directory:Directory.Cache}).catch(()=>{});
    }
  }
}

export async function fetchExportBlob(url) {
  if (!url || !/^(https?:|blob:|data:)/i.test(url)) throw new Error('Attachment unavailable');
  const response = await fetch(url);
  if (!response.ok) throw new Error('Unable to read attachment');
  const declared = Number(response.headers.get('content-length'));
  if (declared > MAX_ATTACHMENT_SIZE_BYTES) throw new Error('Attachment too large');
  const blob = await response.blob();
  if (!blob.size || blob.size > MAX_ATTACHMENT_SIZE_BYTES) throw new Error('Attachment unavailable or too large');
  return blob;
}
