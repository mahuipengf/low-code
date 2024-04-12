/* eslint-disable no-new-func, no-console */
import { warn } from '@ali/re-utils';
import Formatter from '../common/vu-formatter';

const ALI_EMPLOYEE_URI_PREFIX = 'https://work.alibaba-inc.com/nwpipe/u/';

const defaultRender = (text, className = '') => {
  if (text === undefined || text === null) {
    return '';
  }
  if (typeof text !== 'string') {
    text = JSON.stringify(text);
  }
  return (
    <span title={text} className={className}>
      {text}
    </span>
  );
};

const errorRender = () => defaultRender('数据格式不合法', 'error-cell');

// 时间
const timestampRender = (cellData, item) => {
  if (!cellData) {
    return '';
  }
  if (isNaN(cellData)) {
    return errorRender();
  }
  const { timeFormatter } = item;
  const result = Formatter.date(cellData, timeFormatter);
  return defaultRender(result);
};

// 时间区间
const cascadeTimestampRender = (cellData, item) => {
  if (!cellData) {
    return '';
  }

  const { timeFormatter } = item;
  if (Object.prototype.toString.call(cellData) === '[object Object]') {
    if (!cellData.hasOwnProperty('start') && !cellData.hasOwnProperty('end')) {
      return errorRender();
    }
    const start = Formatter.date(cellData.start, timeFormatter);
    const end = Formatter.date(cellData.end, timeFormatter);
    return defaultRender(`${start} ~ ${end}`);
  }
  return errorRender();
};

// 员工
const employeeRender = (cellData) => {
  if (!cellData) {
    return '';
  }

  const _render = (employee, isLastOne = false) => {
    const { workNo, name, nickName } = employee;
    if (!workNo) {
      return errorRender();
    }
    const text = nickName ? `${name}(${nickName})` : name;
    return (
      <span key={workNo}>
        <a href={`${ALI_EMPLOYEE_URI_PREFIX}${workNo}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
        {!isLastOne && ', '}
      </span>
    );
  };

  if (Array.isArray(cellData)) {
    return (
      <div className="overflow-hidden-cell">
        {
          cellData.map((item, index) => {
            if (index === cellData.length - 1) {
              return _render(item, true);
            }
            return _render(item);
          })
        }
      </div>
    );
  }

  if (cellData) {
    return (
      <div className="overflow-hidden-cell">
        {_render(cellData, true)}
      </div>
    );
  }

  return errorRender();
};

// 金额
const moneyRender = (cellData) => {
  if (!cellData) {
    return '';
  }

  let money;
  if (Object.prototype.toString.call(cellData) === '[object Object]') {
    if (!cellData.hasOwnProperty('amount') || !cellData.hasOwnProperty('currency')) {
      return errorRender();
    }
    try {
      money = Formatter.money(cellData.amount || '0', ',', 2);
    } catch (e) {
      return errorRender();
    }
    return defaultRender(`${money} ${cellData.currency}`);
  }

  try {
    money = Formatter.money(cellData || '0', ',', 2);
  } catch (e) {
    return errorRender();
  }
  return defaultRender(money);
};

// 金额范围
const moneyRangeRender = (cellData) => {
  if (!cellData) {
    return '';
  }

  if (Object.prototype.toString.call(cellData) === '[object Object]') {
    if (!cellData.hasOwnProperty('lower') || !cellData.hasOwnProperty('upper')) {
      return errorRender();
    }

    let lower;
    let upper;
    try {
      lower = Formatter.money(cellData.lower || '0', ',', 2);
      upper = Formatter.money(cellData.upper || '0', ',', 2);
    } catch (e) {
      return errorRender();
    }

    return defaultRender(`${lower} ${cellData.currency || ''} ~ ${upper} ${cellData.currency || ''}`);
  }
  return errorRender();
};

export const cellRender = (tableInstance, item) => (value, index, rowData) => {
  if ((item.dataType === 'custom' && !item.render)
    || item.dataType === 'text') {
    return defaultRender(value);
  }
  if (item.dataType === 'timestamp') {
    return timestampRender(value, item);
  }
  if (item.dataType === 'cascadeTimestamp') {
    return cascadeTimestampRender(value, item);
  }
  if (item.dataType === 'employee') {
    return employeeRender(value);
  }
  if (item.dataType === 'money') {
    return moneyRender(value);
  }
  if (item.dataType === 'moneyRange') {
    return moneyRangeRender(value);
  }

  let rendered = value;
  try {
    rendered = item.render(value, index, rowData, tableInstance.props.context);
  } catch (e) {
    warn(e.stack);
  }
  return rendered;
};

/**
 * 创建 Action 回调函数
 */
export const createActionFunc = (tableInstance, item, rowData, position = 'column') => {
  if (!item.callback) {
    return () => {};
  }

  const func = item.callback;
  if (position === 'column') {
    return () => {
      func(rowData, tableInstance.props.context, tableInstance.props.$state);
    };
  }
  return () => {
    func(tableInstance.props.context, tableInstance.props.$state);
  };
};
