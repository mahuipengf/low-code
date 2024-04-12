
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  NumberSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  label,
  labelTextAlign,
  tips,
  size,
  labelColSpan,
  labelColOffset,
  wrapperColSpan,
  wrapperColOffset,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  validation,
  formCategory,
  advanced,
  defaultValue,
  placeholder,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import { textFieldDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '输入框',
  componentName: 'TextField',
  category: '表单',
  icon: Icon,
  docUrl: textFieldDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1ysp3u8v0gK0jSZKbXXbK2FXa-112-64.png",
      label: "文本框",
      schema: {
        componentName: "TextField",
        props: {},
      },
    },
    {
      screenshot: "https://img.alicdn.com/tfs/TB1ikF3u7P2gK0jSZPxXXacQpXa-112-64.png",
      label: "密码框",
      schema: {
        componentName: "TextField",
        props: {
          htmlType: 'password'
        },
      },
    },
  ],
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: false,
      initialValue: {
        zh_CN: '输入框',
        en_US: 'TextField',
        type: 'i18n',
      },
    }),
    defaultValue({ 
      supportVariable: false,
    }),
    {
      name: 'labelAlign',
      title: '标题位置',
      display: 'inline',
      initialValue: 'top',
      supportVariable: false,
      setter() {
        if (this.getProps().getPropValue('htmlType') === 'textarea') {
          return (
            <ChoiceSetter
              options={[{
                title: '左',
                value: 'left',
                tip: '左侧',
              }, {
                title: '上',
                value: 'top',
                tip: '上',
              }]}
              compact={false}
            />
          );
        }
        return (
          <ChoiceSetter
            options={[{
              title: '左',
              value: 'left',
              tip: '左侧',
            }, {
              title: '上',
              value: 'top',
              tip: '上',
            }, {
              title: '内',
              value: 'inset',
              tip: '内',
            }]}
            compact={false}
          />
        );
      },
    },
    labelColSpan({ 
      supportVariable: false,
    }),
    labelColOffset({ 
      supportVariable: false,
    }),
    wrapperColSpan({ 
      supportVariable: false,
    }),
    wrapperColOffset({ 
      supportVariable: false,
    }),
    labelTextAlign({ 
      supportVariable: false,
    }),
    placeholder({
      supportVariable: false,
    }),
    tips({
      supportVariable: false,
    }),
    size({
      supportVariable: false,
    }),
    behavior({ 
      hasReadOnly: true,
      supportVariable: false,
    }),
    labelTipsType({
      supportVariable: false,
    }, false),
    labelTipsIcon({ 
      supportVariable: false,
    }),
    labelTips({ 
      supportVariable: false,
    }),
    labelTipsText({ 
      supportVariable: false,
    }),
    labelTipsRender({ 
      supportVariable: false,
    }),
    {
      name: 'htmlType',
      title: '类型',
      display: 'inline',
      supportVariable: false,
      initialValue: 'input',
      setter: (
        <ChoiceSetter
          options={[{
            title: '单行',
            value: 'input',
            tip: 'input',
          }, {
            title: '多行',
            value: 'textarea',
            tip: 'textarea',
          }, {
            title: '密码',
            value: 'password',
            tip: 'password',
          }]}
          compact={false}
        />
      ),
    },
    {
      name: 'state',
      title: '状态',
      display: 'inline',
      supportVariable: false,
      initialValue: '',
      setter: (
        <ChoiceSetter
          options={[{
            title: '正常',
            value: '',
          }, {
            title: '失败',
            value: 'error',
          }, {
            title: '加载中',
            value: 'loading',
          }, {
            title: '成功',
            value: 'success',
          }]}
          compact={false}
        />
      ),
    },
    {
      name: 'rows',
      title: '多行输入框高度',
      display: 'block',
      initialValue: 4,
      hidden() {
        return this.getProps().getPropValue('htmlType') !== 'textarea';
      },
      setter: (
        <NumberSetter />
      ),
    },
    {
      name: 'hasLimitHint',
      title: '计数器',
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />
    },
    {
      name: 'maxLength',
      title: '字数上限',
      display: 'block',
      initialValue: 200,
      hidden() {
        return !this.getProps().getPropValue('hasLimitHint');
      },
      setter: (
        <NumberSetter />
      ),
    },
    {
      name: 'autoHeight',
      title: '多行输入框自动高度',
      display: 'block',
      initialValue: false,
      supportVariable: false,
      tip: 'true / false / {"minRows": 2, "maxRows": 4}',
      hidden() {
        return this.getProps().getPropValue('htmlType') !== 'textarea';
      },
      setter: (
        <BoolSetter />
      ),
    },
    {
      name: 'hasClear',
      title: '是否显示清除按钮',
      display: 'block',
      initialValue: false,
      hidden() {
        return this.getProps().getPropValue('htmlType') === 'textarea';
      },
      setter: <BoolSetter />,
    },
    {
      name: 'trim',
      title: '自动去除头尾空字符',
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'useI18nInput',
      title: '是否开启国际化输入框',
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'autoFocus',
      title: '自动聚焦',
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'addonBefore',
      title: '输入框前附加内容',
      display: 'block',
      hidden() {
        return this.getProps().getPropValue('htmlType') === 'textarea';
      },
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },
      setter: <I18nSetter placeholder="请输入" />,
      supportVariable: false,
    },
    {
      name: 'addonAfter',
      title: '输入框后附加内容',
      display: 'block',
      hidden() {
        return this.getProps().getPropValue('htmlType') === 'textarea';
      },
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },
      setter: <I18nSetter placeholder="请输入" />,
      supportVariable: false,
    },
    validation({
      setter: <ValidationSetter supports={['required', 'minLength', 'maxLength', 'email', 'mobile', 'url']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    {
      name: 'hasLimitHint',
      title: '是否展现最大长度样式',
      display: 'block',
      initialValue: false,
      hidden() {
        return !this.getProps().getPropValue('validation').some(rule => rule.type === 'maxLength');
      },
      setter: <BoolSetter />,
    },
    {
      name: 'cutString',
      title: '超出maxlength截断超出字符串',
      display: 'block',
      initialValue: false,
      hidden() {
        return !this.getProps().getPropValue('validation').some(rule => rule.type === 'maxLength');
      },
      setter: <BoolSetter />,
    },
    style({ advanced: true }),
    advanced('textField', [
      {
        name: 'onChange', title: 'onChange 值发生变化', initialValue: `/**
* textField onChange
* @param value 当前值
*/
function onChange({ value }) {
  console.log('onChange', value);
}`,
      },
      {
        name: 'onKeyDown', title: 'onKeyDown 键盘按下', initialValue: `/**
* textField onKeyDown
*/
function onKeyDown() {
  console.log('onKeyDown');
}`,
      },
      {
        name: 'onFocus', title: 'onFocus 获取焦点', initialValue: `/**
* textField onFocus
*/
function onFocus() {
  console.log('onFocus');
}`,
      },
      {
        name: 'onBlur', title: 'onBlur 失去焦点', initialValue: `/**
* textField onBlur
*/
function onBlur() {
  console.log('onBlur');
}`,
      },
      {
        name: 'onPressEnter', title: 'onPressEnter 按下回车', initialValue: `/**
* textField onPressEnter
*/
function onPressEnter() {
  console.log('onPressEnter');
}`,
      },
    ], { collapsed: true }),
  ],
});
