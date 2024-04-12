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
  defaultValue,
  placeholder,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { cascadeDateDisabledDate, dateDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepDate', dm: '日期' }),
  componentName: 'DateField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: dateDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1tNl7u4D1gK0jSZFyXXciOVXa-112-64.png',
      label: $i18n.get({ id: 'deepDate', dm: '日期' }),
      schema: {
        componentName: 'DateField',
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
        zh_CN: '日期',
        en_US: 'DateField',
        type: 'i18n',
      },
    }),

    defaultValue({
      initialValue: '',
      setter: <DateSetter />,
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
    behavior(),
    {
      name: 'format',
      title: $i18n.get({ id: 'deepFormat', dm: '格式' }),
      display: 'inline',
      initialValue: 'YYYY-MM-DD',
      supportVariable: true,
      setter: (
        <SelectSetter
          options={[
            { text: 'YYYY', value: 'YYYY' },
            { text: 'YYYY-MM', value: 'YYYY-MM' },
            { title: 'GGGG-W', value: 'GGGG-W' },
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

    {
      name: 'footerRender',
      title: '自定义面板页脚',
      display: 'block',
      setter: <ActionSetter 
        defaultActionName="footerRender"
        defaultCode={`function footerRender() {
  return <div>自定义页脚</div>
}`}
      />
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    style({ advanced: true }),
    advanced('dateField', [
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
          id: 'deepOnVisibleChangeMatrixStateChange',
          dm: 'onVisibleChange 弹层展示状态变化',
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
