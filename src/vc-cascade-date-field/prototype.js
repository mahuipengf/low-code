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

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { cascadeDateDisabledDate, cascadeDateDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepDateInterval', dm: '日期区间' }),
  componentName: 'CascadeDateField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: cascadeDateDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1vr02u2b2gK0jSZK9XXaEgFXa-112-64.png',
      label: $i18n.get({ id: 'deepDateInterval', dm: '日期区间' }),
      schema: {
        componentName: 'CascadeDateField',
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
        zh_CN: '日期区间',
        en_US: 'CascadeDateField',
        type: 'i18n',
      },
    }),

    labelAlign(),
    labelColSpan(),
    labelColOffset(),
    wrapperColSpan(),
    wrapperColOffset(),
    labelTextAlign(),
    placeholder({
      initialValue: {
        zh_CN: '请选择',
        en_US: 'please select',
        type: 'i18n',
      },
    }),

    tips(),
    size(),
    behavior({ hasReadOnly: false }),
    {
      name: 'format',
      title: $i18n.get({ id: 'deepDisplayFormat', dm: '显示格式' }),
      display: 'inline',
      initialValue: 'YYYY-MM-DD',
      supportVariable: true,
      setter: (
        <SelectSetter
          options={[
            { text: 'YYYY', value: 'YYYY' },
            { text: 'YYYY-MM', value: 'YYYY-MM' },
            { title: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
            { title: 'YYYY-MM-DD HH:mm', value: 'YYYY-MM-DD HH:mm' },
            { title: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
          ]}
        />
      ),
    },

    {
      name: 'returnType',
      title: $i18n.get({ id: 'deepReturnType', dm: '返回类型' }),
      display: 'inline',
      initialValue: 'timestamp',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              text: $i18n.get({ id: 'deepTimestamp', dm: '时间戳' }),
              value: 'timestamp',
              tip: $i18n.get({ id: 'deepDigitalTimestamp', dm: '数字型时间戳' }),
            },
            {
              text: $i18n.get({ id: 'deepString', dm: '字符串' }),
              value: 'string',
              tip: $i18n.get({ id: 'deepStringInAccordanceWith', dm: '符合上述格式的字符串' }),
            },
            {
              text: 'Moment',
              value: 'moment',
              tip: $i18n.get({ id: 'deepMomentObject', dm: 'Moment 对象' }),
            },
          ]}
        />
      ),
    },

    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    {
      name: 'hasClear',
      title: $i18n.get({ id: 'deepClearButton', dm: '清除按钮' }),
      initialValue: true,
      display: 'inline',
      setter: <BoolSetter />,
    },

    {
      name: 'resetTime',
      title: $i18n.get({ id: 'deepWhetherToResetThe', dm: '每次选择日期时是否重置时间' }),
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
          title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
          display: 'plain',
          items: [
            {
              name: 'start',
              title: $i18n.get({ id: 'deepStartDate', dm: '开始日期' }),
              display: 'inline',
              setter: <DateSetter />,
              supportVariable: true,
            },

            {
              name: 'end',
              title: $i18n.get({ id: 'deepEndDate', dm: '结束日期' }),
              display: 'inline',
              setter: <DateSetter />,
              supportVariable: true,
            },
          ],
        },
      ],
    }),

    {
      name: 'ranges',
      title: $i18n.get({ id: 'deepFastIntervalSelection', dm: '快速区间选择' }),
      display: 'block',
      setter: (
        <ActionSetter
          defaultActionName="quickRanges"
          defaultCode={$i18n.get({
            id: 'deepFunctionQuickRangesReturnThe',
            dm:
              "function quickRanges() {\n  return {\n    '本月前七天': [new Date().setDate(1), new Date().setDate(7)]\n  }\n}",
          })}
        />
      ),
    },

    {
      name: 'disabledDate',
      title: $i18n.get({ id: 'deepDisableDateFunction', dm: '禁用日期函数' }),
      display: 'block',
      initialValue: false,
      tip: {
        content: $i18n.get({ id: 'deepClickToViewAPI', dm: '点击查看api:disabledDate' }),
        url: cascadeDateDisabledDate,
      },

      setter: (
        <ActionSetter
          defaultActionName="disabledDate"
          defaultCode={`function disabledDate(value){
  console.log('disabledDate', value);
  return false;
}`}
        />
      ),
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    style({ advanced: true }),
    advanced('cascadeDateField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* dateField onChange
* @param value 选中的值
*/
function onChange({ value }) {
  console.log('onChange', value);
}`,
      },

      {
        name: 'onOk',
        title: $i18n.get({ id: 'deepONOKClickTheConfirm', dm: 'onOk 点击确认按钮' }),
        initialValue: `/**
* dateField onOk
* @param value 选中的值
*/
function onOk({ value }) {
  console.log('onOk', value);
}`,
      },

      {
        name: 'onVisibleChange',
        title: $i18n.get({
          id: 'deepONVISibleChangeHomewhereShowHidden',
          dm: 'onVisibleChange 弹层显示隐藏变化',
        }),
        initialValue: `/**
* dateField onVisibleChange
* @param visible 弹层是否显示
* @param reason 触发弹层显示和隐藏的来源
*/
function onVisibleChange(visible, reason) {
  console.log('onVisibleChange', visible, reason);
}`,
      },
    ]),
  ],
});
