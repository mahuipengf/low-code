

import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  ChoiceSetter,
  BoolSetter,
  NumberSetter,
  ActionSetter,
  I18nSetter
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
  title: '数字输入框',
  componentName: 'NumberField',
  category: '表单',
  icon: Icon,
  docUrl: numberDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB154t6u1L2gK0jSZFmXXc7iXXa-112-64.png",
      label: "数字输入框",
      schema: {
        componentName: "NumberField",
        props: {},
      },
    },
  ],
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: false,
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
          options={[{
            title: '左',
            value: 'left',
          }, {
            title: '上',
            value: 'top',
          }]}
          compact={false}
        />
      ),
      supportVariable: false,
    }),
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
      initialValue: {
        zh_CN: '请输入数字',
        en_US: 'Please enter a number',
        type: 'i18n',
      },
      supportVariable: false,
    }),
    tips({
      supportVariable: false,
    }),
    size({
      supportVariable: false,
    }),
    behavior({
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
      name: 'type',
      title: '类型',
      display: 'inline',
      initialValue: 'normal',
      setter: (
        <ChoiceSetter
          options={[{
            title: '普通',
            value: 'normal',
          }, {
            title: '内联',
            value: 'inline',
          }]}
          compact={false}
        />
      ),
    },
    {
      name: 'innerBefore',
      title: '前缀文案',
      display: 'inline',
      supportVariable: false,
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },
      setter: <I18nSetter placeholder={'请输入'}/>
    },
    {
      name: 'innerAfter',
      title: '单位',
      display: 'inline',
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },
      supportVariable: false,
      setter: <I18nSetter placeholder={'请输入'}/>
    },
    {
      name: 'step',
      title: '步数',
      display: 'inline',
      initialValue: 1,
      setter: <NumberSetter />,
    },
    {
      name: 'precision',
      title: '小数位数',
      display: 'inline',
      initialValue: 0,
      setter: <NumberSetter />,
    },
    {
      name: 'editable',
      title: '可以输入',
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'format',
      title: '格式化',
      display: 'block',
      tip: {
        content: '格式化当前值',
      },
      setter: <ActionSetter
        defaultActionName="format"
        defaultCode={`function format(value) {
  return value;
}`}
      />,
    },
    validation({
      setter: <ValidationSetter supports={['required', 'minValue', 'maxValue', 'minLength', 'maxLength']}  enableCustomValidate={false} />,
      supportVariable: false,
    }),
    style({
      advanced: true,
    }),
    advanced('numberField', [
      {
        name: 'onChange', title: 'onChange 值发生变化', initialValue: `/**
* numberField onChange
* @param value 当前值
*/
function onChange({ value }) {
  console.log('onChange', value);
}`,
      },
      {
        name: 'onKeyDown', title: 'onKeyDown 键盘按下', initialValue: `/**
* numberField onKeyDown
*/
function onKeyDown() {
  console.log('onKeyDown');
}`,
      },
      {
        name: 'onFocus', title: 'onFocus 焦点获得', initialValue: `/**
* numberField onFocus
*/
function onFocus() {
  console.log('onFocus');
}`,
      },
      {
        name: 'onBlur', title: 'onBlur 焦点失去', initialValue: `/**
* numberField onBlur
*/
function onBlur() {
  console.log('onBlur');
}`,
      },
      {
        name: 'onCorrect', title: 'onCorrect 数据订正后', initialValue: `/**
* numberField onCorrect
*/
function onCorrect({ currentValue, oldValue }) {
  console.log('onCorrect', currentValue, oldValue);
}`,
      },
    ], { collapsed: true }),
  ],
});
