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

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { rangeFixedWidth, rangeMarks } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepSectionSelector', dm: '区段选择器' }),
  componentName: 'RangeField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: '',
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: true,
      initialValue: {
        zh_CN: '区段选择器',
        en_US: 'Range',
        type: 'i18n',
      },
    }),

    {
      name: 'value',
      title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
      display: 'inline',
      initialValue: 0,
      supportVariable: true,
      tip: $i18n.get({
        id: 'deepTheNumberOfSlides',
        dm: '滑块个数为单个-number，滑块个数为两个-[number, number]',
      }),
      setter: <JsonSetter />,
    },

    {
      name: 'labelAlign',
      title: $i18n.get({ id: 'deepTitlePosition', dm: '标题位置' }),
      display: 'inline',
      initialValue: 'top',
      supportVariable: true,
      setter: (
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
      ),
    },

    labelColSpan(),
    labelColOffset(),
    wrapperColSpan(),
    wrapperColOffset(),
    labelTextAlign(),
    tips(),
    behavior(),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    {
      name: 'slider',
      title: $i18n.get({ id: 'deepSlider', dm: '滑块个数' }),
      display: 'inline',
      initialValue: 'single',
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepSingle', dm: '单个' }), value: 'single', tip: 'single' },
            { title: $i18n.get({ id: 'deepTwo', dm: '两个' }), value: 'double', tip: 'double' },
          ]}
        />
      ),
    },

    {
      name: 'min',
      title: $i18n.get({ id: 'deepMinimum', dm: '最小值' }),
      display: 'inline',
      initialValue: 0,
      setter: <NumberSetter />,
    },

    {
      name: 'max',
      title: $i18n.get({ id: 'deepMaximum', dm: '最大值' }),
      display: 'inline',
      initialValue: 100,
      setter: <NumberSetter />,
    },

    {
      name: 'step',
      title: $i18n.get({ id: 'deepStepman', dm: '步长' }),
      display: 'inline',
      initialValue: 1,
      tip: $i18n.get({ id: 'deepTheValueMustBe', dm: '取值必须大于 0，并且可被 (max - min) 整除' }),
      setter: <NumberSetter />,
    },

    // {
    //   name: 'default',
    //   title: '默认值',
    //   initialValue: 0,
    //   tip: '滑块个数为单个-number，滑块个数为两个-[number, number]',
    //   setter: <JsonSetter />
    // },
    {
      name: 'marks',
      title: $i18n.get({ id: 'deepScaleValue', dm: '刻度值' }),
      display: 'inline',
      tip: {
        content: $i18n.get({ id: 'deepClickToViewSpecific', dm: '点击查看具体用法' }),
        url: rangeMarks,
      },

      initialValue: false,
      setter: <JsonSetter />,
    },

    {
      name: 'marksPosition',
      title: $i18n.get({ id: 'deepScalePosition', dm: '刻度位置' }),
      display: 'inline',
      initialValue: 'above',
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepAbove', dm: '上方' }), value: 'above' },
            { title: $i18n.get({ id: 'deepBelow', dm: '下方' }), value: 'below' },
          ]}
        />
      ),
    },

    {
      name: 'fixedWidth',
      title: $i18n.get({ id: 'deepLinearDrag', dm: '线性拖动' }),
      display: 'inline',
      initialValue: false,
      tip: {
        content: $i18n.get({ id: 'deepClickForDetails', dm: '点击查看详情' }),
        url: rangeFixedWidth,
      },

      hidden() {
        return this.getProps().getPropValue('slider') !== 'double';
      },
      setter: <BoolSetter />,
    },

    {
      name: 'hasTip',
      title: $i18n.get({ id: 'deepShowTIP', dm: '显示tip' }),
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'tooltipVisible',
      title: $i18n.get({ id: 'deepWhetherTIPDefaultsTo', dm: 'tip是否默认展示' }),
      display: 'block',
      initialValue: false,
      hidden() {
        return !this.getProps().getPropValue('hasTip');
      },
      setter: <BoolSetter />,
    },

    {
      name: 'tipRender',
      title: $i18n.get({ id: 'deepCustomTIP', dm: '自定义tip' }),
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
      title: $i18n.get({ id: 'deepSelectStateReversal', dm: '选中态反转' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    style({ advanced: true }),
    advanced('rangeField', [{ name: 'onChange', title: 'onChange' }]),
  ],
});
