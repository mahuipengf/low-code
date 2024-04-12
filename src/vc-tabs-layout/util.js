export function isIndex(index) {
  if (index) {
    return !isNaN(+index); // eslint-disable-line
  }
  return false;
}

/**
 * 处理tab的title,主要是生成数字小红点
 * 根据title中的参数,去window对象中取数字(数字是挂在window上的)
 * @param title
 * @returns {XML}
 */
const { encodeURIComponent } = window;

export function renderTabTitle(title, badge) {
  if (parseInt(badge, 10) > 99) {
    badge = '99+';
  }
  return (
    <span className="tab-title">
      <span className="title-text-wrapper">
        <span className="title-text">{title}</span>
      </span>
      {
        !badge ? ''
          : (
            <span className="red-num-wrapper">
              <span className="red-num">
                <span className="red-num-inner">{badge}</span>
              </span>
            </span>
          )
      }
    </span>
  );
}

export function parseQuery(str) {
  const ret = {};

  if (typeof str !== 'string') {
    return ret;
  }

  const s = str.trim().replace(/^(\?|#|&)/, '');

  if (!s) {
    return ret;
  }

  s.split('&').forEach((param) => {
    const parts = param.replace(/\+/g, ' ').split('=');
    let key = parts.shift();
    let val = parts.length > 0 ? parts.join('=') : undefined;

    key = decodeURIComponent(key);

    val = val === undefined ? null : decodeURIComponent(val);

    if (ret[key] === undefined) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
  });

  return ret;
}

export function stringifyQuery(obj) {
  const param = [];
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (value && typeof value === 'object') {
      value = JSON.stringify(value);
    }
    param.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  });
  return param.join('&');
}

const isSupportHistoryAPI = !!(window.history && window.history.replaceState);

export function getQuery() {
  if (isSupportHistoryAPI) {
    return parseQuery(location.search);
  }
  const hash = window.location.hash;
  const index = hash.indexOf('?');
  return parseQuery(index === -1 ? '' : hash.substring(index));
}

export function getAllQuery() {
  const hash = window.location.hash;
  const index = hash.indexOf('?');
  const query = parseQuery(location.search);
  return parseQuery(index === -1 ? '' : hash.substring(index), query);
}

export function getQueryValue(fieldId, traceCode) {
  const l = window.location;
  const port = `:${l.port}`;
  const origin = `${l.protocol}//${l.hostname}${l.port ? port : ''}`;
  const key = traceCode || `__tab_index_${fieldId}`;
  const hash = l.hash;
  const index = hash.indexOf('?');
  const query = parseQuery(location.search);
  const hashQuery = parseQuery(index === -1 ? '' : hash.substring(index));
  const sq = stringifyQuery;

  if (isSupportHistoryAPI) {
    if (hashQuery[key]) {
      query[key] = query[key] || hashQuery[key];
      delete hashQuery[key];
      const hashSub = hash.substring(1, index);
      const url = `${origin}${l.pathname}?${sq(query)}#${hashSub}?${sq(hashQuery)}`;
      window.history.replaceState(null, document.title, url);
    }
  } else if (query[key]) {
    hashQuery[key] = hashQuery[key] || query[key];
    delete query[key];
    const hashSub = hash.substring(1, index);
    const url = `${origin}${l.pathname}?${sq(query)}#${hashSub}?${sq(hashQuery)}`;
    l.href = url;
  }
  return query[key] || hashQuery[key];
}

export function saveIndexToState(fieldId, activeIndex, traceCode) {
  const paramKey = traceCode || `__tab_index_${fieldId}`;
  const query = getQuery();
  query[paramKey] = activeIndex;
  const l = window.location;
  const port = `:${l.port}`;
  const origin = `${l.protocol}//${l.hostname}${l.port ? port : ''}`;

  if (isSupportHistoryAPI) {
    const url = `${origin}${l.pathname}?${stringifyQuery(query)}${l.hash}`;
    window.history.replaceState(null, document.title, url);
  } else {
    const hash = l.hash;
    const hashQuery = stringifyQuery(query);
    const index = hash.indexOf('?');
    l.hash = `${index === -1 ? hash : hash.substring(0, index)}?${hashQuery}`;
  }
}

// 用于获取 TabItem 的 hidden 和 disabled 值
// 有可能是 bool 型，也有可能是 func str
function getTabItemBoolValue(val, ctx, funcName) {
  if (typeof val === 'boolean') {
    return val;
  }
  let func = () => {};
  try {
    func = val;
  } catch (e) {
    console.error(`${funcName}: 函数处理有误，请检查`);
    console.error(e.stack);
  }
  let result = false;
  try {
    result = func(ctx);
  } catch (e) {
    console.error(e.stack);
  }
  return result;
}

export function isHidden(val, ctx) {
  return getTabItemBoolValue(val, ctx, 'isHidden');
}

export function isDisabled(val, ctx) {
  return getTabItemBoolValue(val, ctx, 'isDisabled');
}
