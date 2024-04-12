import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, Balloon, Icon } from '@ali/deep';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import cloneDeep from 'lodash/cloneDeep';
import lodashGet from 'lodash/get';
import classnames from 'classnames';
import {
  transValidationRules,
  checkIsRequired,
} from '../formFieldUtils';
import Preview from './preview';

import './style.less';

// 引入 Moment 的语言包
const locale = lodashGet(window, 'pageConfig.locale', 'zh_CN');
if (locale === 'zh_CN') {
  require('moment/locale/zh-cn');
}

function renderTips(tips) {
  if (!tips) {
    return null;
  }
  return <p className="vc-field-tip" dangerouslySetInnerHTML={{ __html: tips }} />;
}

// 空内容时的占位符
export const EMPTY_TEXT = '—';

export default class Base extends React.Component {
  static propsTypes = {
    autoValidate: PropTypes.bool,
    __isFormField: PropTypes.bool, // Form 容器用来识别 children 是否为 FormField
    __isInsideForm: PropTypes.bool, // 当前 FormField 是否包含在 Form 容器中
  };

  static defaultProps = {
    autoValidate: true,
    __isFormField: true,
    __isInsideForm: false,
  };

  static getDerivedStateFromProps(props, state) {
    let ret = {};
    const { formBehavior, behavior, validation } = props;
    if (formBehavior !== state.formBehavior) {
      ret = Object.assign(ret, {
        behavior: formBehavior,
        formBehavior,
      });
    }
    if (!isEqual(validation, state.validation) && !state.useUpdatedValidation) {
      ret = Object.assign({}, {
        validation,
        required: checkIsRequired(validation),
      });
    }

    return Object.keys(ret).length > 0 ? ret : null;
  }

  constructor(props) {
    super(props);

    const {
      autoValidate,
      behavior,
      formBehavior,
      fieldId,
      fieldName,
      value,
      validation,
      __field,
      __isInsideForm,
    } = props;

    this.state = {
      behavior,
      formBehavior,
      useFieldBehavior: false,
      validationBackup: null,
      validation: null,
      useUpdatedValidation: false,
      required: false,
      validateRules: [],
      validateState: null,
      validateMsg: '',
    };

    this.name = fieldName || fieldId;
    if (__isInsideForm) {
      this.field = __field;
    } else {
      this.field = new Field(this, {
        autoValidate,
      });
    }

    this.controlComp = null;
    this.saveControlRef = this.saveControlRef.bind(this);

    this.renderView.bind(this);
    this.renderDefaultView.bind(this);
    this.renderControl.bind(this);
  }

  saveControlRef(c) {
    if (c && c.getInstance) {
      this.controlComp = c.getInstance();
    } else {
      this.controlComp = c;
    }
  }

  getProps() {
    return this.props;
  }

  getBehavior() {
    return this.state.behavior || 'NORMAL';
  }

  setBehavior(behavior) {
    this.setState({
      behavior,
    });
  }

  // 用于保障日期相关控件输入到 Fusion 底层组件的默认值格式符合预期
  formatValueIn(value) {
    return value;
  }

  getValue() {
    const ret = this.field.getValue(this.name);
    return cloneDeep(ret);
  }

  setValue(value, doNotValidate = false, reRender = true) {
    this.field.setValue(this.name, value, reRender);
    if (this.props.autoValidate && !doNotValidate) {
      this.validate();
    }
  }

  validate(callback) {
    return this.field.validate(this.name, (errors, values) => {
      if (errors && errors[this.name]) {
        this.setState({
          validateState: 'error',
          validateMsg: errors[this.name].errors,
        });
      } else {
        this.setState({
          validateState: null,
          validateMsg: '',
        });
      }

      if (isFunction(callback)) {
        callback(errors, values);
      }
    });
  }

  // 副作用：通过 API 修改校验规则之后，后续将无法通过 Props 更新校验规则
  setValidation(rules) {
    const required = checkIsRequired(rules);

    this.setState({
      required,
      validation: rules,
      useUpdatedValidation: true,
    }, () => {
      // 如果将规则置空的话，清空一下 field 内部的错误信息
      if (!rules || (Array.isArray(rules) && rules.length === 0)) {
        this.field.setError(this.name, null);
      }
    });
  }

  resetValidation() {
    this.setState({
      useUpdatedValidation: false,
    });
  }

  disableValid() {
    const validationBackup = this.state.validation;
    this.setState({
      validation: null,
      validationBackup,
      useUpdatedValidation: true,
      validateState: null,
      validateMsg: '',
    }, () => {
      // 清空一下 field 内部的错误信息
      this.field.setError(this.name, null);
    });
  }

  enableValid() {
    const validationBackup = this.state.validationBackup;
    this.setState({
      validation: validationBackup,
      validationBackup: null,
      useUpdatedValidation: false,
    });
  }

  reset(toDefault = true) {
    if (toDefault) {
      this.field.resetToDefault(this.name);
    } else {
      this.field.reset(this.name);
    }

    // 把接管的校验状态也重置掉
    this.setState({
      validateState: null,
      validateMsg: '',
    });
  }

  getValidationRules(){
    const label = this.props.label ? this.props.label : '当前项';
    return transValidationRules(this.state.validation, { requiredMessage: `${label}是必填字段` });
  }

  getFormItemProps() {
    const props = this.getProps();
    const behavior = this.getBehavior();
    const tips = renderTips(props.tips);

    let {
      required,
      validateState,
      validateMsg,
    } = this.state;

    if (isFunction(this.getValidateInfo)) {
      const validateInfo = this.getValidateInfo();
      validateState = validateInfo.state;
      validateMsg = validateInfo.error;
    }

    // 根据 Fusion 内部的实现，当没有错误信息时 help 的值一定要等于 undefined
    let help = undefined;
    if (validateState === 'error') {
      help = validateMsg;
    }

    const ret = {
      className: classnames(
        'vc-form-item',
        props.fieldClassName,
        props.className,
        {
          'vc-form-item-hidden': behavior === 'HIDDEN',
        },
      ),
      size: props.size,
      labelTextAlign: props.labelTextAlign,
      labelAlign: props.labelAlign,
      label: props.label,
      labelCol: { span: props.labelColSpan, offset: props.labelColOffset },
      wrapperCol: { span: props.wrapperColSpan, offset: props.wrapperColOffset },
      hasFeedback: props.hasFeedback || false,
      validateState,
      help,
      extra: tips,
      required,
    };

    // 给 Label 叠加 tooltip 提示
    if (props.labelTips) {
      const tipsIcon = <Icon type={props.labelTipsIcon || 'prompt'} size="small" />;
      const tipsContent = isFunction(props.labelTips) ? props.labelTips(this.props) : props.labelTips;
      ret.label = (<span>
        {props.label}
        <Balloon
          trigger={tipsIcon}
          align="t"
          delay={100}
          closable={false}
        >
          {tipsContent}
        </Balloon>
      </span>);
    }

    return ret;
  }

  getControlProps({ valueName = 'value', trigger = 'onChange' } = {}) {
    const {
      placeholder,
      onBlur,
      onFocus,
      autoFocus,
      value,
      autoValidate,
      __isInsideForm,
    } = this.props;

    const fieldProps = this.field.init(this.name, {
      valueName,
      trigger,
      autoValidate,
      rules: this.getValidationRules(),
      initValue: this.formatValueIn(value),
    }, {
      ref: this.saveControlRef,
    });

    const behavior = this.getBehavior();
    return {
      disabled: behavior === 'DISABLED',
      readOnly: behavior === 'READONLY',
      placeholder,
      onBlur,
      onFocus,
      autoFocus,
      ...fieldProps,
    };
  }

  renderView(controlProps) {
    const props = this.getProps();
    const value = this.getValue();
    if (props.renderView) {
      return <Preview {...controlProps}>{props.renderView(value, props)}</Preview>;
    }

    return <Preview {...controlProps}>{this.renderDefaultView(value, props)}</Preview>;
  }

  renderDefaultView(value) {
    return value || EMPTY_TEXT;
  }

  renderControl() {
    return (
      <div>
        表单组件占位，请重载 renderControl 方法
      </div>
    );
  }

  render() {
    const behavior = this.getBehavior();
    const controlProps = this.getControlProps();

    return (
      <Form.Item {...this.getFormItemProps()}>
        {behavior === 'READONLY'
        ? this.renderView(controlProps)
        : this.renderControl(controlProps)}
      </Form.Item>
    );
  }
}
