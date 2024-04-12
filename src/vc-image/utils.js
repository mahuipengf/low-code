// 目前的逻辑不严谨，后续要好好整理下，可以参考 http://gitlab.alibaba-inc.com/mui/crossimage
import isWebp from './webp-detect';
/**
 * 判断是否是 CDN 地址
 * 如果是 CDN 地址的 URL，再判断是否支持 webp
 * @param {string} CDN url
 */
export function isCDNImage(url) {
  if (/^((http:|https:)?\/\/)?((img|gw)\.alicdn|(gw\.alipayobjects))\.com\//i.test(url)) {
    return true;
  }
  return false;
}

export function notSvg(url) {
  if (/(.*)\.svg/i.test(url)) {
    return false;
  }
  return true;
}

export function isNotWebp(url) {
  if (!url) {
    return false;
  }
  return url.indexOf('_.webp') < 0;
}

export function getCompatibleUrl(url) {
  // 存在问题，暂时禁用
  // if (url && isNotWebp(url) && notSvg(url) && isCDNImage(url) && isWebp) {
  //   url += '_.webp';
  // }

  return url;
}
