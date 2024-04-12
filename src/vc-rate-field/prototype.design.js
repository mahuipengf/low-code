
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  ChoiceSetter,
  BoolSetter,
  NumberSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  validation,
  formCategory,
  label,
  labelTextAlign,
  tips,
  size,
  labelColSpan,
  labelColOffset,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  wrapperColOffset,
  advanced,
  defaultValue,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import { rateDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '评分',
  componentName: 'RateField',
  category: '表单',
  icon: Icon,
  docUrl: rateDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1L8mJu7P2gK0jSZPxXXacQpXa-112-64.png",
      label: "评分",
      schema: {
        componentName: "RateField",
        props: {}
      }
    }
  ],
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: false,
      initialValue: {
        zh_CN: '评分',
        en_US: 'RateField',
        type: 'i18n',
      },
    }),
    defaultValue({
      name: 'value',
      title: '默认值',
      display: 'inline',
      supportVariable: false,
      initialValue: 2.5,
      setter: <NumberSetter min={0} />,
    }),
    {
      name: 'labelAlign',
      title: '标题位置',
      display: 'inline',
      supportVariable: false,
      initialValue: 'top',
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
    },
    labelColSpan({
      supportVariable: false,
    }),
    labelColOffset({
      supportVariable: false,
    }),
    wrapperColOffset({
      supportVariable: false,
    }),
    labelTextAlign({
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
      name: 'count',
      title: '评分总数',
      display: 'inline',
      supportVariable: false,
      initialValue: 5,
      setter: <NumberSetter min={0} />,
    },
    {
      name: 'allowHalf',
      title: '半星评分',
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'showGrade',
      title: '显示分数',
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    style({ advanced: true }),
    advanced('rateField', [
      {
        name: 'onChange',
        title: 'onChange 用户点击评分时',
        initialValue: `/**
* rateField onChange
* @param value number 评分的值
*/
function onChange({ value }) {
  console.log(value);
}`,
      },
      {
        name: 'onHoverChange',
        title: 'onHoverChange 用户hover评分时',
        initialValue: `/**
* rateField onHoverChange
* @param value number 评分的值
*/
function onHoverChange(value) {
  console.log(value);
}`,
      },
    ], { collapsed: true }),
  ],
});
