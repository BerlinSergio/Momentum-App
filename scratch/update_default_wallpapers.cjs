const fs = require('fs');

const path = 'src/data/defaultWallpapers.js';
let content = fs.readFileSync(path, 'utf8');

const oldBenchmark = `const BENCHMARK_AIDA_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB5uWpBFhLtJE_CzLc_rXDSzmK-rCsEuKskS2uxZxnHCMDNP_uDUq472xsEWbbU4H0fiSoXwXWAIOrvuqWUBFaHP0fHVckaQ-zA7E3NIrjexIXqpj5Tp91DfMysvz6cEMGAtN27M7enEq8FUs9DUDcF8cJt8EzbYoDACXYxWQF9hQmWRz4XnNyplhjecryCuFGaif4b-909zydTdjzH6eJxH2tmHglJb0h7daR2wgcfXPu3pXqg8Zw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBR36Q5ekCwBTAgQLo1hD3sFG_nWzh8M6DfnIrM9nLlKTkMdVNuOlIHIdj3ezECvlylkESROmXPRheO_kBUoM-7Zy9Y4ZGYHqFeK3X7_Jxx9aCQaVCQ6fcKOmIDo0Jy-aG5HN2l1R4wdkzbDdHVlEYXN_jS40mfGFYh8LKG37uWH3dT-bQyiqR1OMuWfh1vcffWSMQkS7da372FIn3ABnlBsIqnXlUG2IngK4UtdFrYnsAS4gxGv4k",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB3SEuILWtH31ONeTC67HJeg-_bcuA_E4rdgIVbSgqbt5Hi32lNLr_M4i9RPE_oE36VreO-5sTGFy9HpAf8eN3k9iCPVoaQtquE0cPJBQtKBCVeuKVkaheE8Wa-kT8f1tsxDYLFqHCh2aZuFx82odqtm_ZIfqebg3dS3GGNDbXgOC7QuRpjhwWfhgrj9kNRE57KsImmnCCCYxsaOGtpTrhXaQ-A3Q78rimGwyYoC1NQ0s5RYOpMxns",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDSIeDNP5E9rhEHW88x8487AsrAZFYz3_ZpBAGZg4eny-WrozvXPerDq3BCO_HqGAhm3lOB2z6yjLMb2sMRwvjG68M2S8D-Nz5C9cYcbUSyxj4KFolDg3ZxBRLbb9D324iE4sLC7v3v3fHbZ10KmtPXdlxqk_ZWBqNB74QXghvqUVixmgVDjQp_gTy0i4ZmL1yxxX04u5WxuYELraI74RH0D57tAbDPJ42qLCeN98Le3CCMMpxNZK8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC8aqO9jh6ZJDbnN9PUNWUQFEBMCBAVbklsueoQcBfMYO_Ef38AUXVyZRNnh8685mlJKyasRyKCSgMUx8NyZTo63w7y0dK02-CZ3tig5ah5QZie_XisecQ9C0HWFvCdaneU8e6al8xYFbMjt9hUtN7o7qwM59CsytUdQvlv9GjlnW-MkP7RUo8uPaCWz8uTk4ZqbOVZazwKYvHbJBZJWmzN5BPTFP0l5JdBUNvtZkpoXFYkFiE5QUU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjCj_-xHxA20QDSYA7zT_ltMiTfPvj8ymbX8fiib9vCdMw2bys8AAwF9GE5H29dRfAXnrPX_Vs68T5b7slJAFJ4OYo_NTbvpizsGUNVNEftjRTbKUQhzQJ6nzZaQY5Ta1Do-fxulYzDfm0pe9pvjMPjJqiT_fVCA4OOApPpt-SW93hT7PREct5d_cbsRmJL-JCU1fDKlTZrI3dk7xOPen0hS3ega6UwQ_tajUwAGpDjPkLNq1DyXQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAZbEL5rwDoqcr4TX7uTEF2VR9y5p6gs6Yjqied-IMhkW4Z0-cpzIFVTvhyZQbFXEqcQB6IfNNSbW8itN8nTTru7xZP_ob2v6vpVcm8VA4cZnmViXw-tyMXPT2jkbeiLgl4ut2sPVEjmgIy2Tcmv6j8FpZgVBtCQS7ZQiOKJNJs51PRPhjXOdqanj2hv451NmJ3IRV3Q0kQ9WY_u7G8JnD3wj2DS7FvBvpHhn6fp1JA7AicK79bhpo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBG7tatWBHPK8mrtUFS5MYZx9TF2QQM5AzjB8TSwk_qWRQ6BGvlUbravdzjbhoQtlkOtrnSBOP7KiGZpeDRtygmAHAQ6TKK9gdmtoNvMJQu21HNInoiDMIh4yDQ5kDDoOjsxMJsO3vZz9p_WNItktetaOKMvqU7r9iuQNgwBq2SNcZtVuZdGAqx4xfEYko3Mu3An13dNY7r8c_YF5M7FkYAOPRVVVrSnyuDbm8gINiNqj98TkJlS0E",
];

export function buildBackgroundLibrary() {
  return CURATED_THEMES.map((theme, index) => {
    const num = String(index + 1).padStart(2, '0');
    const slug = theme.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = \`bg-\${num}-\${slug}\`;
    const benchmarkImage = BENCHMARK_AIDA_IMAGES[index];
    // Exact 1:1 image URL for this wallpaper.
    // Thumbnails, grid cards, hero previews, and applied background canvas are 100% identical.
    const image = benchmarkImage || \`https://picsum.photos/seed/momentum-wallpaper-\${theme.seed}/720/1280\`;
    const fallback = \`https://picsum.photos/id/\${(index * 7 + 10) % 100}/720/1280\`;

    return {
      id,
      day: index + 1,
      num,
      name: theme.title,
      title: \`\${num} • \${theme.title}\`,
      rawTitle: theme.title,
      category: theme.category,
      mood: theme.mood,
      badge: 'Adaptive',
      description: theme.desc,
      seed: theme.seed,
      // Fully unified image references so any consumer gets the exact same picture
      thumbnail: image,
      thumbnailUrl: image,
      thumb: image,
      lightImage: image,
      darkImage: image,
      lightThumb: image,
      darkThumb: image,
      lightUrl: image,
      darkUrl: image,
      url: image,
      fallback,
    };
  });
}`;

const newBenchmark = `export const BENCHMARK_AIDA_LIGHT_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB5uWpBFhLtJE_CzLc_rXDSzmK-rCsEuKskS2uxZxnHCMDNP_uDUq472xsEWbbU4H0fiSoXwXWAIOrvuqWUBFaHP0fHVckaQ-zA7E3NIrjexIXqpj5Tp91DfMysvz6cEMGAtN27M7enEq8FUs9DUDcF8cJt8EzbYoDACXYxWQF9hQmWRz4XnNyplhjecryCuFGaif4b-909zydTdjzH6eJxH2tmHglJb0h7daR2wgcfXPu3pXqg8Zw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBR36Q5ekCwBTAgQLo1hD3sFG_nWzh8M6DfnIrM9nLlKTkMdVNuOlIHIdj3ezECvlylkESROmXPRheO_kBUoM-7Zy9Y4ZGYHqFeK3X7_Jxx9aCQaVCQ6fcKOmIDo0Jy-aG5HN2l1R4wdkzbDdHVlEYXN_jS40mfGFYh8LKG37uWH3dT-bQyiqR1OMuWfh1vcffWSMQkS7da372FIn3ABnlBsIqnXlUG2IngK4UtdFrYnsAS4gxGv4k",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB3SEuILWtH31ONeTC67HJeg-_bcuA_E4rdgIVbSgqbt5Hi32lNLr_M4i9RPE_oE36VreO-5sTGFy9HpAf8eN3k9iCPVoaQtquE0cPJBQtKBCVeuKVkaheE8Wa-kT8f1tsxDYLFqHCh2aZuFx82odqtm_ZIfqebg3dS3GGNDbXgOC7QuRpjhwWfhgrj9kNRE57KsImmnCCCYxsaOGtpTrhXaQ-A3Q78rimGwyYoC1NQ0s5RYOpMxns",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDSIeDNP5E9rhEHW88x8487AsrAZFYz3_ZpBAGZg4eny-WrozvXPerDq3BCO_HqGAhm3lOB2z6yjLMb2sMRwvjG68M2S8D-Nz5C9cYcbUSyxj4KFolDg3ZxBRLbb9D324iE4sLC7v3v3fHbZ10KmtPXdlxqk_ZWBqNB74QXghvqUVixmgVDjQp_gTy0i4ZmL1yxxX04u5WxuYELraI74RH0D57tAbDPJ42qLCeN98Le3CCMMpxNZK8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC8aqO9jh6ZJDbnN9PUNWUQFEBMCBAVbklsueoQcBfMYO_Ef38AUXVyZRNnh8685mlJKyasRyKCSgMUx8NyZTo63w7y0dK02-CZ3tig5ah5QZie_XisecQ9C0HWFvCdaneU8e6al8xYFbMjt9hUtN7o7qwM59CsytUdQvlv9GjlnW-MkP7RUo8uPaCWz8uTk4ZqbOVZazwKYvHbJBZJWmzN5BPTFP0l5JdBUNvtZkpoXFYkFiE5QUU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjCj_-xHxA20QDSYA7zT_ltMiTfPvj8ymbX8fiib9vCdMw2bys8AAwF9GE5H29dRfAXnrPX_Vs68T5b7slJAFJ4OYo_NTbvpizsGUNVNEftjRTbKUQhzQJ6nzZaQY5Ta1Do-fxulYzDfm0pe9pvjMPjJqiT_fVCA4OOApPpt-SW93hT7PREct5d_cbsRmJL-JCU1fDKlTZrI3dk7xOPen0hS3ega6UwQ_tajUwAGpDjPkLNq1DyXQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAZbEL5rwDoqcr4TX7uTEF2VR9y5p6gs6Yjqied-IMhkW4Z0-cpzIFVTvhyZQbFXEqcQB6IfNNSbW8itN8nTTru7xZP_ob2v6vpVcm8VA4cZnmViXw-tyMXPT2jkbeiLgl4ut2sPVEjmgIy2Tcmv6j8FpZgVBtCQS7ZQiOKJNJs51PRPhjXOdqanj2hv451NmJ3IRV3Q0kQ9WY_u7G8JnD3wj2DS7FvBvpHhn6fp1JA7AicK79bhpo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBG7tatWBHPK8mrtUFS5MYZx9TF2QQM5AzjB8TSwk_qWRQ6BGvlUbravdzjbhoQtlkOtrnSBOP7KiGZpeDRtygmAHAQ6TKK9gdmtoNvMJQu21HNInoiDMIh4yDQ5kDDoOjsxMJsO3vZz9p_WNItktetaOKMvqU7r9iuQNgwBq2SNcZtVuZdGAqx4xfEYko3Mu3An13dNY7r8c_YF5M7FkYAOPRVVVrSnyuDbm8gINiNqj98TkJlS0E",
];

export const BENCHMARK_AIDA_DARK_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDOsImCLjplHAwNm_c0Hnr8aORujd66E_c7qu4RBeIwI94C2H1jiHbIXHjD7amCfMDR6kav5eSPZ2xs1XQPd5hlIoc0DFgeQ3nXGiJg8rZiIEApqqpGQ7mVnjJpPreouRYpsUZrujgQrm5a1BJ-4SyYtadbVTfIuBvRzIDcLagpvKPeSJS_CcNOUxjP4CNrEKZ_Hzc__Aex_uyT0vFLodFCyCH_3E0VuT6sj1QtvbvfoLtDEQLu2H4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDAlN4f2EGR1K4bMOTOmkA4yvyLuFWampxkfVeuid_8dppS1hmc_S_dFhz5vxIjW3D7V-VJEVtM32KPM1RzW_Mnrk8j3yz1Dl_8TzrKU7-1ayNFiQ2sXrOTV0Yzt02ssMmsuUnTZqoSRmiXb8ThzziSULN0OM214-gZXblRKhveughmvIMpuxUd_BxXKugEO9kLryjWxMEaFHuAvN7zAFwSzw9Sw9ExEpax2rnYBpEGk3rDKqN7hQg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuASlQE5CWlO4y2dUD3ckRNCafmPfsl-95ycwtaHXfmF4UcpPySKBk9y3u2B6Nb79tZnIcHZe_AgUU2nlfD_Qh1FNTJeoboSRpdRhJI60jng_C31zIndk9XR8GdHeW9UR2OuEHvQkwNK0dIFfU4ZJ3-k6P0yE8mc6PLMDWlZpa19p4VhNnYGo18S851_9CKBwA8EP5JhBPmWO6Arswddq0qgdz21dKcQVYX_i0glCiCKoFaZ3g_w5EQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD-FsBUs6dDPSfATyDnSK_DVdo0xSKTqVVgHL_X_0rrTE1mqpUtGWRnvhVz79cmkI2bPuA4dhHFmqzE71sbz-ZRJVg1IIy8ZvjwSUTxwUBJzFO3xbTKoh9nD3n1tP_fpG1PCiK9n1WWriWUhDzXiKc66rnYsFgb3OlZ7McJ1H6EnwwDdOtK_Ix9RALcja9MdxLDZcMulBiFT14UHab6cPkMZNEudK74QEs2GuMAaASu8H_6zUnGMvY",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAqWps_QvYBMtKthotOkjbnQyKX4IhWiTiuXmSDtXEbuhUAyzgs6xy--IrQ6ap1NjhwvIE7GN_KSmvQ_PZUyiteU8Xk1KdXShIjCE9CPfVRLjLtHNC1D1PcqTmm2neolj1bRMbVDkq6qvUULs4NNtPY4XwEaT478U69qUCXYU6shpZRSwAB9jSQCxwM4_JOeJOXM5slPhZ7RCJ1JCKpKRBApo5N-O-Cp8MD5hU5hmBg2myI8Crn5m8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCpphgaA33Em1kJ60X2iKk_YpBhqpWL4wQs5HZPck9lne0SBCOQzJ0Ck1HIvZooiv1bK1HLAEB7TNvVP2AljwOjPDFZosKMfDuk6U8e47pPefF0Ix7-7eD0rNDvKi7XDHrAhS81h7rrBtkpPzU9twKk_1z0hqmoCJrRJAGz-4V8eZT4W9Ml1Lun-gM3ByZ-UXHOW3znFy8ZWhkyIhfxI3qsCcB-iidmPT7xEVRhQcMAVB4F1j5FL14",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB8Jk_HLGg9vMKKMp3INCbNKXEC_OIqC1QlEIXBWZFqSalb3XNayNq1jVzZyeEtuR_Le5tInx3iH8iowlJPCz049LPZ1_GlIop74wm1P2rsKsMF0AV1DzV6x3Lup6hVcJqGUGf3RSt1KhnHnYY8g_RSV00EzwOC8DBb5Zr6Y9U7uHp3CTsCLkgNE57MzTCp1QqIYO52Tl8t-uGU0tUy0X1LI-ciGwDJiKverNcERBiGI83jMm35_YM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCe_RBkRfz9NcC_Cogxr4QikaMJmEm8PnDrbq1dQTqiFzUOr1xWkhzm4tEpwGd9OgkZNiQBgo8u-y9Thja_42WHIYa0Yf6HTmMXz9Bj_83nXfz0cQmNxGO-PytY-5dWf_CWGTtuUdqASo5CzunFOxsXbI6uBQZJBSUstVju55GFaCIp-Sqqr0yS389pVshIEPMQKZvGmkUMCuTEfD4fqOnx5-vECpOxGGNkCmW7Fzf4-RwzL4y72S0",
];

export function buildBackgroundLibrary() {
  return CURATED_THEMES.map((theme, index) => {
    const num = String(index + 1).padStart(2, '0');
    const slug = theme.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = \`bg-\${num}-\${slug}\`;
    
    // Distinct Light and Dark mode assets
    const lightImage = BENCHMARK_AIDA_LIGHT_IMAGES[index] || \`https://picsum.photos/seed/momentum-light-\${theme.seed}/720/1280\`;
    const darkImage = BENCHMARK_AIDA_DARK_IMAGES[index] || \`https://picsum.photos/seed/momentum-dark-\${theme.seed}/720/1280\`;
    const fallback = \`https://picsum.photos/id/\${(index * 7 + 10) % 100}/720/1280\`;

    return {
      id,
      day: index + 1,
      num,
      name: theme.title,
      title: \`\${num} • \${theme.title}\`,
      rawTitle: theme.title,
      category: theme.category,
      mood: theme.mood,
      badge: 'Adaptive',
      description: theme.desc,
      seed: theme.seed,
      // Unified image properties with distinct day/night assets
      thumbnail: lightImage,
      thumbnailUrl: lightImage,
      thumb: lightImage,
      lightImage,
      darkImage,
      lightThumb: lightImage,
      darkThumb: darkImage,
      lightUrl: lightImage,
      darkUrl: darkImage,
      url: lightImage,
      fallback,
    };
  });
}`;

// Normalize line endings for replacement
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedOld = oldBenchmark.replace(/\r\n/g, '\n');

if (!normalizedContent.includes(normalizedOld)) {
  console.error("Could not find oldBenchmark in defaultWallpapers.js");
  process.exit(1);
}

const updated = normalizedContent.replace(normalizedOld, newBenchmark);
fs.writeFileSync(path, updated, 'utf8');
console.log("Successfully updated defaultWallpapers.js with distinct light and dark image assets!");

