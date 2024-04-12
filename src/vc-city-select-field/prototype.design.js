import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  JsonSetter,
  SelectSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  label,
  labelTextAlign,
  placeholder,
  tips,
  size,
  labelAlign,
  labelColSpan,
  wrapperColSpan,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  wrapperColOffset,
  validation,
  defaultValue,
  formCategory,
  advanced,
  labelColOffset,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import { citySelectValue } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '地区选择',
  componentName: 'CitySelectField',
  category: '表单',
  icon: Icon,
  docUrl: '',
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1_0OKu9f2gK0jSZFPXXXsopXa-112-64.png',
      label: '单选',
      schema: {
        componentName: 'CitySelectField',
        props: {},
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB15PWIu4D1gK0jSZFsXXbldVXa-112-64.png',
      label: '多选',
      schema: {
        componentName: 'CitySelectField',
        props: {
          multiple: true,
        },
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1RGuKuYr1gK0jSZR0XXbP8XXa-112-64.png',
      label: '带搜索',
      schema: {
        componentName: 'CitySelectField',
        props: {
          showSearch: true,
        },
      },
    },
  ],
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: false,
      initialValue: {
        zh_CN: '地区选择',
        en_US: 'City',
        type: 'i18n',
      },
    }),
    defaultValue({
      name: 'value',
      title: '默认值',
      display: 'inline',
      supportVariable: false,
      initialValue: [],
      setter: <JsonSetter label="编辑默认值" />,
      tip: {
        url: citySelectValue,
        content: '点击 ? 查看对应的数据结构',
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
      hasReadOnly: true,
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
      name: 'expandTriggerType',
      title: '触发行为',
      display: 'inline',
      initialValue: 'click',
      setter: (
        <ChoiceSetter
          options={[
            { title: 'click', value: 'click' },
            { title: 'hover', value: 'hover' },
          ]}
        />
      ),
    },
    {
      name: 'addressType',
      title: '类型',
      display: 'inline',
      // DEFAULT | PROVINCE | CITY
      initialValue: 'DEFAULT',
      setter: (
        <SelectSetter
          options={[
            {
              title: '省 / 市 / 区',
              value: 'DEFAULT',
            },
            {
              title: '省 / 市',
              value: 'CITY',
            },
            {
              title: '省',
              value: 'PROVINCE',
            },
          ]}
        />
      ),
      mutator(type) {
        const dsProp = this.props.getProp('columns');
        if (type === 'CITY') {
          dsProp.setValue(['1', '2']);
        } else if (type === 'PROVINCE') {
          dsProp.setValue(['1']);
        } else {
          dsProp.setValue(['1', '2', '3']);
        }
      },
    },
    {
      name: 'hasArrow',
      title: '下拉箭头',
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'changeOnSelect',
      title: '选任意级',
      tip: '是否选中即发生改变, 该属性仅在单选模式下有效',
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'hasBorder',
      title: '边框',
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'hasClear',
      title: '清除按钮',
      display: 'inline',
      initialValue: false,
      hidden() {
        return this.getProps().getPropValue('mode') !== 'single';
      },
      setter: <BoolSetter />,
    },
    {
      name: 'showSearch',
      title: '搜索框',
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'multiple',
      title: '多选',
      display: 'inline',
      initlalValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'canOnlyCheckLeaf',
      title: '只能勾选叶子节点',
      display: 'block',
      initlalValue: false,
      hidden() {
        return !this.getProps().getPropValue('multiple');
      },
      setter: <BoolSetter />,
    },
    {
      name: 'notFoundContent',
      title: '无数据时显示内容',
      display: 'block',
      initialValue: {
        zh_CN: '无数据',
        en_US: 'Not Found',
        type: 'i18n',
      },
      setter: <I18nSetter />,
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    style({ advanced: true }),
    advanced('citySelectField', [
      {
        name: 'onChange',
        title: 'onChange 值发生变化',
        initialValue: `
/**
* citySelectField onChange
* @param value 选中的地区的值
*/
function onChange({ value }) {
  console.log(value);
}`,
      },
    ], { collapsed: true }),
  ],
});
