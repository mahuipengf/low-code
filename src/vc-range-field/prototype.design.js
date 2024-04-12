import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  ChoiceSetter,
  BoolSetter,
  NumberSetter,
  JsonSetter,
  CodeSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  label,
  labelTextAlign,
  tips,
  labelColSpan,
  labelColOffset,
  wrapperColSpan,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  wrapperColOffset,
  validation,
  advanced,
  formCategory,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import { rangeFixedWidth, rangeMarks } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '区段选择器',
  componentName: 'RangeField',
  category: '表单',
  icon: Icon,
  docUrl: '',
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: false,
      initialValue: {
        zh_CN: '区段选择器',
        en_US: 'Range',
        type: 'i18n',
      },
    }),
    {
      name: 'value',
      title: '默认值',
      display: 'inline',
      initialValue: 0,
      supportVariable: false,
      tip: '滑块个数为单个-number，滑块个数为两个-[number, number]',
      setter: <JsonSetter />
    },
    {
      name: 'labelAlign',
      title: '标题位置',
      display: 'inline',
      initialValue: 'top',
      supportVariable: false,
      setter: (
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
      ),
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
    tips({ 
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
      name: 'slider',
      title: '滑块个数',
      display: 'inline',
      initialValue: 'single',
      setter: <ChoiceSetter options={[
        { title: '单个', value: 'single', tip: 'single' },
        { title: '两个', value: 'double', tip: 'double' },
      ]}
      />,
    },
    {
      name: 'min',
      title: '最小值',
      display: 'inline',
      initialValue: 0,
      setter: <NumberSetter />,
    },
    {
      name: 'max',
      title: '最大值',
      display: 'inline',
      initialValue: 100,
      setter: <NumberSetter />,
    },
    {
      name: 'step',
      title: '步长',
      display: 'inline',
      initialValue: 1,
      tip: '取值必须大于 0，并且可被 (max - min) 整除',
      setter: <NumberSetter />,
    },
    {
      name: 'marks',
      title: '刻度值',
      display: 'inline',
      tip: {
        content: '点击查看具体用法',
        url: rangeMarks,
      },
      initialValue: false,
      setter: <JsonSetter />,
    },
    {
      name: 'marksPosition',
      title: '刻度位置',
      display: 'inline',
      initialValue: 'above',
      setter: <ChoiceSetter options={[
        { title: '上方', value: 'above' },
        { title: '下方', value: 'below' },
      ]}
      />,
    },
    {
      name: 'fixedWidth',
      title: '线性拖动',
      display: 'inline',
      initialValue: false,
      tip: {
        content: '点击查看详情',
        url: rangeFixedWidth,
      },
      hidden() {
        return (this.getProps().getPropValue('slider') !== 'double');
      },
      setter: <BoolSetter />,
    },
    {
      name: 'hasTip',
      title: '显示tip',
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'tooltipVisible',
      title: 'tip是否默认展示',
      display: 'block',
      initialValue: false,
      hidden() {
        return !this.getProps().getPropValue('hasTip');
      },
      setter: <BoolSetter />,
    },
    {
      name: 'tipRender',
      title: '自定义tip',
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('hasTip');
      },
      initialValue: `function tipRender(value) {
        return value;
      }`,
      setter: <CodeSetter />,
    },
    {
      name: 'reverse',
      title: '选中态反转',
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),

    style({ advanced: true }),
    advanced('rangeField', [
      { name: 'onChange', title: 'onChange' },
    ], { collapsed: true }),
  ],
});
