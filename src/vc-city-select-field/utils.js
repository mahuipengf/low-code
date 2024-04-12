import i18nTransform from '@ali/i18n-transform';

export function removeChildren(data) {
  const ds = [...data];
  ds.forEach((item) => {
    if (item.children) delete item.children;
  });
  return ds;
}

export function removeChildrenL2(data) {
  const ds = [...data];
  ds.forEach((item) => {
    if (item.children) {
      item.children.forEach((subItem) => {
        if (subItem.children) {
          delete subItem.children;
        }
      });
    }
  });
  return ds;
}

let cache = null;
export function getDistrictData(lang, root) {
  if (cache) return cache;
  cache = i18nTransform(root, lang);
  return cache;
}

export function isArray(arr) {
  return arr instanceof Array;
}
