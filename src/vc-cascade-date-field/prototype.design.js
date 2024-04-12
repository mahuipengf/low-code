import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  SelectSetter,
  BoolSetter,
  ActionSetter,
  DateSetter,
  ChoiceSetter,
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
  placeholder,
  defaultValue,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import { cascadeDateDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '日期区间',
  componentName: 'CascadeDateField',
  category: '表单',
  icon: Icon,
  docUrl: cascadeDateDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1vr02u2b2gK0jSZK9XXaEgFXa-112-64.png",
      label: "日期区间",
      schema: {
        componentName: "CascadeDateField",
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
        zh_CN: '日期区间',
        en_US: 'CascadeDateField',
        type: 'i18n',
      },
    }),
    labelAlign({ 
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
        zh_CN: '请选择',
        en_US: 'please select',
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
      hasReadOnly: false,
      supportVariable: false,
    }),
    {
      name: 'format',
      title: '显示格式',
      display: 'inline',
      initialValue: 'YYYY-MM-DD',
      supportVariable: false,
      setter: <SelectSetter options={[
        { text: 'YYYY', value: 'YYYY' },
        { text: 'YYYY-MM', value: 'YYYY-MM' },
        { title: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
        { title: 'YYYY-MM-DD HH:mm', value: 'YYYY-MM-DD HH:mm' },
        { title: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
      ]}
      />,
    },
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
      name: 'hasClear',
      title: '清除按钮',
      initialValue: true,
      display: 'inline',
      setter: <BoolSetter />,
    },
    {
      name: 'resetTime',
      title: '每次选择日期时是否重置时间',
      initialValue: false,
      display: 'block',
      hidden() {
        const format = this.getProps().getPropValue('format');
        return format !== 'YYYY-MM-DD HH:mm' && format !== 'YYYY-MM-DD HH:mm:ss';
      },
      setter: <BoolSetter />,
    },
    defaultValue({
      type: 'group',
      display: 'block',
      items: [
        {
          type: 'composite',
          name: 'value',
          title: '默认值',
          display: 'plain',
          items: [
            {
              name: 'start',
              title: '开始日期',
              display: 'inline',
              setter: <DateSetter />,
              supportVariable: false,
            },
            {
              name: 'end',
              title: '结束日期',
              display: 'inline',
              setter: <DateSetter />,
              supportVariable: false,
            },
          ],
        },
      ],
    }),
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    style({ advanced: true }),
    advanced('cascadeDateField', [
      {
        name: 'onChange', title: 'onChange 值发生变化', initialValue: `/**
* dateField onChange
* @param value 选中的值
*/
function onChange({ value }) {
  console.log('onChange', value);
}`,
      },
      {
        name: 'onOk', title: 'onOk 点击确认按钮', initialValue: `/**
* dateField onOk
* @param value 选中的值
*/
function onOk({ value }) {
  console.log('onOk', value);
}`,
      },
      {
        name: 'onVisibleChange', title: 'onVisibleChange 弹层显示隐藏变化', initialValue: `/**
* dateField onVisibleChange
* @param visible 弹层是否显示
* @param reason 触发弹层显示和隐藏的来源
*/
function onVisibleChange(visible, reason) {
  console.log('onVisibleChange', visible, reason);
}`,
      },
    ], { collapsed: true }),
  ],
});
