import Big from 'big.js';

const Formatter = {};

Formatter.date = (str, pattern) => {
  // new Date(null,false) 会返回最初日期。
  if (str === null || str === false || str === undefined || str === '') {
    console.warn('Formatter: invalid date');
    return '';
  }
  const date = new Date(str);
  if (Object.prototype.toString.call(date) === '[object Date]') {
    if (isNaN(date.getTime())) {
      // invalid
      console.warn('Formatter: invalid date');
      return '';
    }
    let actualPattern = pattern || 'YYYY-MM-DD';
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'D+': date.getDate(), // 日
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'Q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/i.test(actualPattern)) {
      actualPattern = actualPattern.replace(
        RegExp.$1,
        (`${date.getFullYear()}`).substr(4 - RegExp.$1.length),
      );
    }
    Object.keys(o).forEach((k) => {
      if (new RegExp(`(${k})`).test(actualPattern)) {
        actualPattern = actualPattern.replace(RegExp.$1,
          (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)) );
      }
    });
    return actualPattern;
  }
  return '';
};

Formatter.money = (str, delimiter = ' ', fixedNum) => {
  // const actualStr = fixedNum ? parseFloat(str).toFixed(fixedNum).toString() : str;
  const actualStr = fixedNum ? new Big(str).toFixed(parseInt(fixedNum, 10)).toString() : str;
  if (actualStr.indexOf('.') !== -1) {
    return actualStr.replace(/(\d)(?=(?:\d{3})+(\.))/g, (match, $1) => $1 + delimiter)
      .replace(/(\d{3})(?![$|\.|\(|\s])/g, (match, $1) => $1);
  }
  return actualStr.replace(/(\d)(?=(?:\d{3})+$)/g, (match, $1) => $1 + delimiter);
};

export default Formatter;
