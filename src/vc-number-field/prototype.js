import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  ChoiceSetter,
  BoolSetter,
  NumberSetter,
  ActionSetter,
  I18nSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  label,
  labelAlign,
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
import $i18n from '../i18n/index';
import { numberDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepDigitalInputBox', dm: '数字输入框' }),
  componentName: 'NumberField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: numberDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB154t6u1L2gK0jSZFmXXc7iXXa-112-64.png',
      label: $i18n.get({ id: 'deepDigitalInputBox', dm: '数字输入框' }),
      schema: {
        componentName: 'NumberField',
        props: {},
      },
    },
  ],

  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: true,
      initialValue: {
        zh_CN: '数字输入框',
        en_US: 'NumberField',
        type: 'i18n',
      },
    }),

    defaultValue({
      name: 'value',
      title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
      display: 'inline',
      supportVariable: true,
      initialValue(value) {
        if (typeof value === 'undefined') return '';
        if (typeof value === 'object' && value.type === 'i18n') return value.zh_CN || value.en_US;
        return value;
      },
      setter: (
        <NumberSetter
          placeholder={$i18n.get({ id: 'deepPleaseEnterTheDefault', dm: '请输入默认值' })}
        />
      ),
    }),

    labelAlign({
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepLeft', dm: '左' }),
              value: 'left',
            },
            {
              title: $i18n.get({ id: 'deepOn', dm: '上' }),
              value: 'top',
            },
          ]}
          compact={false}
        />
      ),
    }),

    labelColSpan(),
    labelColOffset(),
    wrapperColSpan(),
    wrapperColOffset(),
    labelTextAlign(),
    placeholder({
      initialValue: {
        zh_CN: '请输入数字',
        en_US: 'Please enter a number',
        type: 'i18n',
      },
    }),

    tips(),
    size(),
    behavior(),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    {
      name: 'type',
      title: $i18n.get({ id: 'deepTypesOf', dm: '类型' }),
      display: 'inline',
      initialValue: 'normal',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepOrdinary', dm: '普通' }),
              value: 'normal',
            },
            {
              title: $i18n.get({ id: 'deepInline', dm: '内联' }),
              value: 'inline',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'innerBefore',
      title: $i18n.get({ id: 'deepPrefixCopy', dm: '前缀文案' }),
      display: 'inline',
      supportVariable: true,
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },

      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
    },

    {
      name: 'innerAfter',
      title: $i18n.get({ id: 'deepUnit', dm: '单位' }),
      display: 'inline',
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },

      supportVariable: true,
      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
    },

    {
      name: 'step',
      title: $i18n.get({ id: 'deepStepCount', dm: '步数' }),
      display: 'inline',
      initialValue: 1,
      setter: <NumberSetter />,
    },

    {
      name: 'precision',
      title: $i18n.get({ id: 'deepDecimalNumber', dm: '小数位数' }),
      display: 'inline',
      initialValue: 0,
      setter: <NumberSetter />,
    },

    {
      name: 'editable',
      title: $i18n.get({ id: 'deepCanEnter', dm: '可以输入' }),
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'stringMode',
      title: $i18n.get({ id: 'deepNumberPickerStringModeTitle', dm: '字符串模式' }),
      display: 'inline',
      tip: {
        content: $i18n.get({ id: 'deepNumberPickerStringModeTip', dm: '开启大数或高精度小数支持，输入输出都变为 String 类型，用以支持大数和高精度小数，高精度小数注意配合步数和小数位数使用' }),
      },
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'format',
      title: $i18n.get({ id: 'deepFormat', dm: '格式化' }),
      display: 'block',
      tip: {
        content: $i18n.get({ id: 'deepFormatTheCurrentValue', dm: '格式化当前值' }),
      },

      setter: (
        <ActionSetter
          defaultActionName="format"
          defaultCode={`function format(value) {
  return value;
}`}
        />
      ),
    },

    validation({
      setter: (
        <ValidationSetter
          supports={['required', 'minValue', 'maxValue', 'minLength', 'maxLength']}
        />
      ),
    }),

    style({
      advanced: true,
    }),

    advanced('numberField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* numberField onChange
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
* numberField onKeyDown
*/
function onKeyDown() {
  console.log('onKeyDown');
}`,
      },

      {
        name: 'onFocus',
        title: $i18n.get({ id: 'deepONFOCUSFocus', dm: 'onFocus 焦点获得' }),
        initialValue: `/**
* numberField onFocus
*/
function onFocus() {
  console.log('onFocus');
}`,
      },

      {
        name: 'onBlur',
        title: $i18n.get({ id: 'deepOnblurFocusLost', dm: 'onBlur 焦点失去' }),
        initialValue: `/**
* numberField onBlur
*/
function onBlur() {
  console.log('onBlur');
}`,
      },

      {
        name: 'onCorrect',
        title: $i18n.get({ id: 'deepAfterTheOncorRectData', dm: 'onCorrect 数据订正后' }),
        initialValue: `/**
* numberField onCorrect
*/
function onCorrect({ currentValue, oldValue }) {
  console.log('onCorrect', currentValue, oldValue);
}`,
      },
    ]),
  ],
});
