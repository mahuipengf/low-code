import moment from 'moment';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';

export function isComponentFormField(comp) {
  // 渲染校验
  if (comp.getPropValue) {
    return comp.getPropValue('__category__') === 'form';
  }
  // 拖入检验
  if (comp.getConfigure) {
    const configure = comp.getConfigure();
    const categoryItem = (configure || []).filter(conf => conf.name === '__category__');
    if (categoryItem && categoryItem.length && (typeof categoryItem[0] === 'object')) {
      return categoryItem[0].initialValue === 'form';
    }

    return categoryItem[0] === 'form';
  }
  // filter 检验
  if (comp && comp.props) {
    return comp.props.__category__ === 'form';
  }
  return false;
}

// 将乐高的表单校验数据转换为 Fusion 表单域需要的格式
export function transValidationRules(rules, options) {
  const validationRules = [];
  if (rules && Array.isArray(rules)){
    rules.every((rule) => {
      let item;
      if (rule.type === 'required') {
        if (options && options.requiredValidator) {
          item = {
            validator: options.requiredValidator,
            message: options.requiredMessage,
          };
        } else {
          item = {
            required: true,
            message: options.requiredMessage,
          };
        }
      }
      if (rule.type === 'minLength' || rule.type === 'maxLength') {
        item = {
          [rule.type]: rule.param,
        };
      }
      if (rule.type === 'email' || rule.type === 'url' || rule.type === 'mobile') {
        item = {
          format: rule.type === 'mobile' ? 'tel' : rule.type,
        };
      }
      if (rule.type === 'customValidate' && isFunction(rule.param)) {
        item = {
          validator: (currentRule, value, callback) => {
            const ret = rule.param(value, currentRule);
            if (typeof ret === 'object' && isFunction(ret.then)){
              ret.then((response) => {
                if (response === true) {
                  callback();
                } else {
                  callback(response);
                }
              });
            } else if (ret === true) {
              callback();
            } else {
              callback(ret);
            }
          },
        };
      }
      if (item) {
        if (rule.message) {
          item.message = rule.message;
        }
        validationRules.push(item);
      }
      return true;
    });
  }

  return validationRules;
}

export function checkIsRequired(rules) {
  let required = false;
  if (rules && Array.isArray(rules)) {
    required = rules.some(rule => rule.type === 'required' );
  }

  return required;
}

// 给时间日期相关 Field 增加格式化能力
export function formatDateTime(meta, value) {
  const format = (value, type, format) => {
    if (type === 'string' && format) {
      return value.format(format);
    } else if (type === 'timestamp') {
      return value.valueOf();
    } else {
      return value;
    }
  }

  if (meta.type === 'DateField' || meta.type === 'TimeField') {
    if (moment.isMoment(value)) {
      return format(value, meta.returnType, meta.format);
    }
  }

  if (meta.type === 'CascadeDateField' && Array.isArray(value)) {
    let [v1, v2] = value;
    if (moment.isMoment(v1)) {
      v1 = format(v1, meta.returnType, meta.format);
    }
    if (moment.isMoment(v2)) {
      v2 = format(v2, meta.returnType, meta.format);
    }
    return { start: v1, end: v2 };
  }

  return value;
}

// 解决默认值在设计视图中实时更新的问题
export function wrapperFieldProtoView(Parent) {
  return class ProtoView extends Parent {
    getSnapshotBeforeUpdate(prevProps) {
      if (!isEqual(this.props.value, prevProps.value)) {
        return {
          type: 'value',
          data: this.props.value,
        };
      }
      if (this.props.behavior !== prevProps.behavior) {
        return {
          type: 'behavior',
          data: this.props.behavior,
        };
      }

      return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (snapshot !== undefined && snapshot !== null) {
        if (snapshot.type === 'value') {
          this.setValue(snapshot.data, true);
        } else if (snapshot.type === 'behavior') {
          this.setBehavior(snapshot.data);
        }
      }
    }

    // 因为在设计器里面有一层 wrapper 导致 Form 容器传过来的自定义 Props 丢失
    // field 实例为空，设计器里面的值只能从 props 里面去拿，不能从 field 去拿
    getValue() {
      return this.props.value;
    }
  }
}
