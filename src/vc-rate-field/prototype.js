import React from 'react';
import { Bundle } from '@ali/visualengine';
import { ValidationSetter, ChoiceSetter, BoolSetter, NumberSetter } from '@ali/visualengine-utils';
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

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { rateDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepScore', dm: '评分' }),
  componentName: 'RateField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: rateDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1L8mJu7P2gK0jSZPxXXacQpXa-112-64.png',
      label: $i18n.get({ id: 'deepScore', dm: '评分' }),
      schema: {
        componentName: 'RateField',
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
        zh_CN: '评分',
        en_US: 'RateField',
        type: 'i18n',
      },
    }),

    defaultValue({
      initialValue: 2.5,
      setter: <NumberSetter min={0} />,
    }),

    {
      name: 'labelAlign',
      title: $i18n.get({ id: 'deepTitlePosition', dm: '标题位置' }),
      display: 'inline',
      supportVariable: true,
      initialValue: 'top',
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
    },

    labelColSpan(),
    labelColOffset(),
    wrapperColOffset(),
    labelTextAlign(),
    tips(),
    size(),
    behavior(),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    {
      name: 'count',
      title: $i18n.get({ id: 'deepTotalNumberOfScores', dm: '评分总数' }),
      display: 'inline',
      supportVariable: true,
      initialValue: 5,
      setter: <NumberSetter min={0} />,
    },

    {
      name: 'allowHalf',
      title: $i18n.get({ id: 'deepSemiScore', dm: '半星评分' }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'showGrade',
      title: $i18n.get({ id: 'deepDisplayScore', dm: '显示分数' }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    style({ advanced: true }),
    advanced('rateField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEUserClickTo', dm: 'onChange 用户点击评分时' }),
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
        title: $i18n.get({ id: 'deepOnhoverchangeUserHOVER', dm: 'onHoverChange 用户hover评分时' }),
        initialValue: `/**
* rateField onHoverChange
* @param value number 评分的值
*/
function onHoverChange(value) {
  console.log(value);
}`,
      },
    ]),
  ],
});
