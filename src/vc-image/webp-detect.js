let isWebp = false; /* eslint-disable-line */

function webpDetect() {
  try {
    const webpStr = window.localStorage && window.localStorage.getItem('isWebpSupport');
    isWebp = isWebp || webpStr === 'true';
  } catch (e) {
    /* eslint-disable-line */
  }
  if (!isWebp) {
    const canvas = typeof document === 'object' ? document.createElement('canvas') : {};
    canvas.width = canvas.height = 1; /* eslint-disable-line */
    isWebp = canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false;
    if (isWebp) {
      try {
        window.localStorage && window.localStorage.setItem('isWebpSupport', true); /* eslint-disable-line */
      } catch (e) {
        /* eslint-disable-line */
      }
    }
  }
  return isWebp;
}

webpDetect();

export default isWebp;
