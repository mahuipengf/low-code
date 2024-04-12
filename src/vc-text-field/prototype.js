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

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { textFieldDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepInputBox', dm: '输入框' }),
  componentName: 'TextField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: textFieldDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ysp3u8v0gK0jSZKbXXbK2FXa-112-64.png',
      label: $i18n.get({ id: 'deepTextBox', dm: '文本框' }),
      schema: {
        componentName: 'TextField',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ikF3u7P2gK0jSZPxXXacQpXa-112-64.png',
      label: $i18n.get({ id: 'deepPasswordBox', dm: '密码框' }),
      schema: {
        componentName: 'TextField',
        props: {
          htmlType: 'password',
        },
      },
    },
  ],

  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记

    label({
      supportVariable: true,
      initialValue: {
        zh_CN: '输入框',
        en_US: 'TextField',
        type: 'i18n',
      },
    }),

    defaultValue(),
    {
      name: 'labelAlign',
      title: $i18n.get({ id: 'deepTitlePosition', dm: '标题位置' }),
      display: 'inline',
      initialValue: 'top',
      supportVariable: true,
      setter() {
        if (this.getProps().getPropValue('htmlType') === 'textarea') {
          return (
            <ChoiceSetter
              options={[
                {
                  title: $i18n.get({ id: 'deepLeft', dm: '左' }),
                  value: 'left',
                  tip: $i18n.get({ id: 'deepLeftSide', dm: '左侧' }),
                },
                {
                  title: $i18n.get({ id: 'deepOn', dm: '上' }),
                  value: 'top',
                  tip: $i18n.get({ id: 'deepOn', dm: '上' }),
                },
              ]}
              compact={false}
            />
          );
        }
        return (
          <ChoiceSetter
            options={[
              {
                title: $i18n.get({ id: 'deepLeft', dm: '左' }),
                value: 'left',
                tip: $i18n.get({ id: 'deepLeftSide', dm: '左侧' }),
              },
              {
                title: $i18n.get({ id: 'deepOn', dm: '上' }),
                value: 'top',
                tip: $i18n.get({ id: 'deepOn', dm: '上' }),
              },
              {
                title: $i18n.get({ id: 'deepInside', dm: '内' }),
                value: 'inset',
                tip: $i18n.get({ id: 'deepInside', dm: '内' }),
              },
            ]}
            compact={false}
          />
        );
      },
      disabled() {
        return this.getProps().getPropValue('pureControl') || this.getProps().getPropValue('dataEntryMode');
      },
    },

    labelColSpan(),
    labelColOffset(),
    wrapperColSpan(),
    wrapperColOffset(),
    labelTextAlign(),
    placeholder(),
    tips(),
    size(),
    behavior({ hasReadOnly: true }),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    {
      name: 'htmlType',
      title: $i18n.get({ id: 'deepTypesOf', dm: '类型' }),
      display: 'inline',
      supportVariable: true,
      initialValue: 'input',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepSingleLine', dm: '单行' }),
              value: 'input',
              tip: 'input',
            },
            {
              title: $i18n.get({ id: 'deepMultiLine', dm: '多行' }),
              value: 'textarea',
              tip: 'textarea',
            },
            {
              title: $i18n.get({ id: 'deepPassword', dm: '密码' }),
              value: 'password',
              tip: 'password',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'state',
      title: $i18n.get({ id: 'deepStatus', dm: '状态' }),
      display: 'inline',
      supportVariable: true,
      initialValue: '',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepNormal', dm: '正常' }),
              value: '',
            },
            {
              title: $i18n.get({ id: 'deepFailure', dm: '失败' }),
              value: 'error',
            },
            {
              title: $i18n.get({ id: 'deepLoading', dm: '加载中' }),
              value: 'loading',
            },
            {
              title: $i18n.get({ id: 'deepSuccess', dm: '成功' }),
              value: 'success',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'rows',
      title: $i18n.get({ id: 'deepMultiLineInputBox', dm: '多行输入框高度' }),
      display: 'block',
      initialValue: 4,
      hidden() {
        return this.getProps().getPropValue('htmlType') !== 'textarea';
      },
      setter: <NumberSetter />,
    },

    {
      name: 'hasLimitHint',
      title: $i18n.get({ id: 'deepCounter', dm: '计数器' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'maxLength',
      title: $i18n.get({ id: 'deepLimitLimit', dm: '字数上限' }),
      display: 'block',
      initialValue: 200,
      hidden() {
        return !this.getProps().getPropValue('hasLimitHint');
      },
      setter: <NumberSetter />,
    },

    {
      name: 'autoHeight',
      title: $i18n.get({ id: 'deepMultiLineInputBox.1', dm: '多行输入框自动高度' }),
      display: 'block',
      initialValue: false,
      supportVariable: true,
      tip: 'true / false / {"minRows": 2, "maxRows": 4}',
      hidden() {
        return this.getProps().getPropValue('htmlType') !== 'textarea';
      },
      setter: <BoolSetter />,
    },

    {
      name: 'hasClear',
      title: $i18n.get({ id: 'deepWhetherToDisplayThe', dm: '是否显示清除按钮' }),
      display: 'block',
      initialValue: false,
      hidden() {
        return this.getProps().getPropValue('htmlType') === 'textarea';
      },
      setter: <BoolSetter />,
    },

    {
      name: 'trim',
      title: $i18n.get({ id: 'deepAutomaticallyRemoveHeadTail', dm: '自动去除头尾空字符' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'useI18nInput',
      title: $i18n.get({ id: 'deepWhetherToOpenAn', dm: '是否开启国际化输入框' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'autoFocus',
      title: $i18n.get({ id: 'deepAutomaticFocus', dm: '自动聚焦' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'addonBefore',
      title: $i18n.get({ id: 'deepAdditionalContentBeforeEntering', dm: '输入框前附加内容' }),
      display: 'block',
      hidden() {
        return this.getProps().getPropValue('htmlType') === 'textarea';
      },
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },

      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
    },

    {
      name: 'addonAfter',
      title: $i18n.get({ id: 'deepAdditionalContentAfterEntering', dm: '输入框后附加内容' }),
      display: 'block',
      hidden() {
        return this.getProps().getPropValue('htmlType') === 'textarea';
      },
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },

      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
    },
    {
      name: 'addonTextBefore',
      title: $i18n.get({ id: 'deepTextFieldAddonTextBefore', dm: '输入框前附加文字' }),
      display: 'block',
      hidden() {
        return this.getProps().getPropValue('htmlType') === 'textarea';
      },
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },

      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
    },
    {
      name: 'addonTextAfter',
      title: $i18n.get({ id: 'deepTextFieldAddonTextAfter', dm: '输入框后附加文字' }),
      display: 'block',
      hidden() {
        return this.getProps().getPropValue('htmlType') === 'textarea';
      },
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },

      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
    },
    validation({
      setter: (
        <ValidationSetter
          supports={['required', 'minLength', 'maxLength', 'email', 'mobile', 'url']}
        />
      ),
    }),

    {
      name: 'hasLimitHint',
      title: $i18n.get({ id: 'deepDoYouShowYour', dm: '是否展现最大长度样式' }),
      display: 'block',
      initialValue: false,
      hidden() {
        return !this.getProps()
          .getPropValue('validation')
          .some((rule) => rule.type === 'maxLength');
      },
      setter: <BoolSetter />,
    },

    {
      name: 'cutString',
      title: $i18n.get({
        id: 'deepExceedingMaxLengthTruncatedSuper',
        dm: '超出maxlength截断超出字符串',
      }),
      display: 'block',
      initialValue: false,
      hidden() {
        return !this.getProps()
          .getPropValue('validation')
          .some((rule) => rule.type === 'maxLength');
      },
      setter: <BoolSetter />,
    },

    style({ advanced: true }),
    // {
    //   name: 'getValueLength',
    //   title: '自定义字符串计算长度方式',
    //   display: 'block',
    //   initialValue: 'function getValueLength(value) {}',
    //   setter: <CodeSetter mode="javascript" />,
    // },
    advanced('textField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* textField onChange
* @param value 当前值
*/
function onChange({ value }) {
  console.log('onChange', value);
}`,
      },

      {
        name: 'onKeyDown',
        title: $i18n.get({ id: 'deepONKEYDOWNKeyboardPress', dm: 'onKeyDown 键盘按下' }),
        initialValue: `/**
* textField onKeyDown
*/
function onKeyDown() {
  console.log('onKeyDown');
}`,
      },

      {
        name: 'onFocus',
        title: $i18n.get({ id: 'deepONFOCUSGetFocus', dm: 'onFocus 获取焦点' }),
        initialValue: `/**
* textField onFocus
*/
function onFocus() {
  console.log('onFocus');
}`,
      },

      {
        name: 'onBlur',
        title: $i18n.get({ id: 'deepOnblurLostFocus', dm: 'onBlur 失去焦点' }),
        initialValue: `/**
* textField onBlur
*/
function onBlur() {
  console.log('onBlur');
}`,
      },

      {
        name: 'onPressEnter',
        title: $i18n.get({ id: 'deepOnpressenterPressEnter', dm: 'onPressEnter 按下回车' }),
        initialValue: `/**
* textField onPressEnter
*/
function onPressEnter() {
  console.log('onPressEnter');
}`,
      },
    ]),
  ],
});
