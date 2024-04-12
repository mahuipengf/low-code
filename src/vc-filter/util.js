import {
  isComponentFormField,
} from '../common/formFieldUtils';

const FIELD_ID_NAME = 'fieldId';
const FIELD_NAME = 'fieldName';
const ID_NAME = 'id';

/**
 * 抹平 VE 和 RE 里获取 prop 的方式
 */
const getNodeProp = (node, key) => {
  if (key === 'id') {
    return node[key];
  }
  // For VE
  if (node.getPropValue) {
    if (key === FIELD_ID_NAME) {
      return node.getPropValue(FIELD_NAME) || node.getPropValue(FIELD_ID_NAME);
    }

    return node.getPropValue(key);
  }

  // For RE
  if (key === FIELD_ID_NAME) {
    return node.props[FIELD_NAME] || node.props[FIELD_ID_NAME];
  }

  return node.props[key];
};

/**
 * 所有获取 id 的地方都应该通过 getId
 * @param {object} field
 */
const getId = (field) => {
  if (field.getPropValue || field.props) {
    return getNodeProp(field, ID_NAME);
  }
  return field[ID_NAME];
};

const setChildrenFieldProps = (node, prop, value) => {
  const children = node.getChildren();
  if (children) {
    children.forEach((child) => {
      const childName = child.getComponentName();
      if (isComponentFormField(child) || childName === 'FilterAction') {
        child.setPropValue(prop, value);
      }
      setChildrenFieldProps(child, prop, value);
    });
  }
};

const getParentsName = (container) => {
  const names = [container.getComponentName()];
  const parent = container.getParent();
  if (parent) {
    return names.concat(getParentsName(parent));
  }
  return names;
};

const getFieldsFromChildren = (children = []) => {
  const fields = [];
  let action = null;
  const rows = [];
  children.forEach((row) => {
    if (row.children) {
      if (row.componentName === 'FilterRow') {
        rows.push(row);
      }
      row.children.forEach((col) => {
        if (isComponentFormField(col)) {
          fields.push(col);
        } else if (col.componentName === 'FilterAction') {
          action = col;
        }
      });
    } else if (isComponentFormField(row)) {
      fields.push(row);
    }
  });
  return { fields, action, rows };
};

const getMapFromFields = (fields = []) => {
  const map = {};
  fields.forEach((field) => {
    map[getId(field)] = field;
  });
  return map;
};


const getTotalFromColsArray = (arr, key = 'columnCount') => arr.map(item => item[key]).reduce((total = 0, current) => total + current, 0);

/**
 * 通过 fields，action，rows 和 config 配置产出新的 schema。
 * @param {object} options
 */
const getSchemaFromFields = ({
  fields = [], action, rows = [], config = [], fromView = false, form,
}) => {
  const colsArray = rows.map((row) => {
    const columnCount = getNodeProp(row, 'columnCount');
    const columnMax = getNodeProp(row, 'columnMax');
    return {
      columnCount,
      columnMax: columnMax > columnCount ? columnCount : columnMax,
    };
  });
  const offset = colsArray.reduce(
    (total, current) => total + current.columnCount - current.columnMax,
    0,
  );
  const componentNameMap = {};
  const filterMap = {};
  const idFilterMap = {};
  config.forEach((item) => {
    if (item[FIELD_ID_NAME]) {
      idFilterMap[item[FIELD_ID_NAME]] = item.isFilter;
    }

    filterMap[getId(item)] = item.isFilter;
    componentNameMap[getId(item)] = item.prevComponentName;
  });
  const filterFields = [];
  const queryFields = [];
  fields.forEach((field) => {
    if (filterMap[getId(field)] || idFilterMap[getNodeProp(field, FIELD_ID_NAME)]) {
      filterFields.push(field);
    } else {
      queryFields.push(field);
    }
  });
  const colsCount = queryFields.length + 1 + offset;
  let arrayNeedPop = colsCount <= getTotalFromColsArray(colsArray.slice(0, colsArray.length - 1));
  let arrayNeedPush = colsCount > getTotalFromColsArray(colsArray);
  // 总个数（cosCount）应该既要大于减少一行后的总坑位，由于小于当前的总坑位，以应对增加和减少的情况。
  while (arrayNeedPop || arrayNeedPush) {
    if (arrayNeedPop) {
      colsArray.pop();
      arrayNeedPop = colsCount <= getTotalFromColsArray(colsArray.slice(0, colsArray.length - 1));
    } else if (arrayNeedPush) {
      colsArray.push({ columnCount: 4, columnMax: 4 });
      arrayNeedPush = colsCount > getTotalFromColsArray(colsArray);
    }
  }
  const schema = colsArray.map((colsInRow, index) => {
    const start = getTotalFromColsArray(colsArray.slice(0, index), 'columnMax');
    const end = start + colsInRow.columnMax;
    let labelAlign = 'top';
    if (form) {
      labelAlign = getNodeProp(form, 'labelAlign');
    }
    return {
      componentName: 'FilterRow',
      props: colsInRow,
      children: queryFields.concat(action).slice(start, end)
        .map((field) => {
          const data = field.toData ? field.toData() : field;

          if (fromView) {
            return React.cloneElement(field);
          }

          const prevComponentName = componentNameMap[getId(field)];
          return {
            ...data,
            componentName: prevComponentName || data.componentName,
            props: {
              ...data.props
            },
          };
        }),
    };
  });
  const lastRowChildren = schema[schema.length - 1].children;
  // 处理动作区的位置，动作区在超过一行时必须处于最后一个坑位
  if (schema.length > 1) {
    const lastRowColumnMax = colsArray[schema.length - 1].columnMax;
    const emptyCount = lastRowColumnMax - lastRowChildren.length;
    if (emptyCount > 0) {
      const newChildren = [...lastRowChildren];
      const newAction = newChildren.pop();
      for (let i = 0; i < emptyCount; i += 1) {
        newChildren.push({
          id: `node_filter_${i}_${new Date().getTime()}`,
          componentName: 'FilterEmpty',
        });
      }

      let labelAlign = lastRowChildren.length > 1 ? newAction.props.labelAlign : 'left';

      if (fromView) {
        newChildren.push(React.cloneElement(newAction, {
          ...newAction.props,
          labelAlign: labelAlign,
          textVAlign: 'right'
        }));
      } else {
        newChildren.push(newAction);
        newAction.props.textVAlign = 'right';
        newAction.props.labelAlign = labelAlign;
      }

      schema[schema.length - 1].children = newChildren;
    }
  } else if (schema.length === 1) {
    const newChildren = [...lastRowChildren];
    const newAction = newChildren.pop();

    if (fromView) {
      newChildren.push(React.cloneElement(newAction, {
        ...newAction.props,
        textVAlign: 'left'
      }));
    } else {
      newChildren.push(newAction);
      newAction.props.textVAlign = 'left';
    }

    schema[schema.length - 1].children = newChildren;
  }

  if (filterFields.length) {
    schema.push({
      componentName: 'FilterPicker',
      children: filterFields.map((field) => {
        const data = field.toData ? field.toData() : field;
        return {
          ...data,
          componentName: 'FilterPickableField',
          props: {
            ...data.props,
            simpleValueInSingleMode: true,
          },
        };
      }),
    });
  }

  return schema;
};

export {
  setChildrenFieldProps,
  getParentsName,
  getFieldsFromChildren,
  getMapFromFields,
  getSchemaFromFields,
  getId,
  getNodeProp,
  ID_NAME,
  FIELD_ID_NAME,
};
