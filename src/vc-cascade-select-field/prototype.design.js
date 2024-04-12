import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  JsonSetter,
  NumberSetter,
  CodeSetter
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
  defaultValue,
  advanced,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import { cascadeSelectDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '级联选择',
  componentName: 'CascadeSelectField',
  category: '表单',
  icon: Icon,
  docUrl: cascadeSelectDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1tAeOuYj1gK0jSZFuXXcrHpXa-112-64.png",
      label: "单选",
      schema: {
        componentName: "CascadeSelectField",
        props: {},
      },
    },
    {
      screenshot: "https://img.alicdn.com/tfs/TB14MZcuebviK0jSZFNXXaApXXa-112-64.png",
      label: "多选",
      schema: {
        componentName: "CascadeSelectField",
        props: {
          multiple: true,
          hasClear: true,
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
        zh_CN: '级联选择',
        en_US: 'CascadeSelect',
        type: 'i18n',
      },
    }),
    {
      name: 'columnsNum',
      title: '级联层级',
      display: 'inline',
      initialValue: 0,
      supportVariable: false,
      setter: <NumberSetter />
    },
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
      supportVariable: false,
      setter: <ChoiceSetter options={[
        { title: 'click', value: 'click' },
        { title: 'hover', value: 'hover' },
      ]}
      />,
    },
    {
      name: 'hasArrow',
      title: '下拉箭头',
      display: 'inline',
      initialValue: true,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    {
      name: 'hasBorder',
      title: '边框',
      display: 'inline',
      initialValue: true,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    {
      name: 'showSearch',
      title: '搜索框',
      display: 'inline',
      initialValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    {
      name: 'multiple',
      title: '多选',
      display: 'inline',
      initlalValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    {
      name: 'changeOnSelect',
      title: '选任意级',
      tip: '是否选中即发生改变, 该属性仅在单选模式下有效',
      display: 'inline',
      initlalValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    {
      name: 'hasClear',
      title: '清除按钮',
      display: 'inline',
      initialValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    {
      name: 'checkStrictly',
      title: '父子选中不关联',
      display: 'block',
      initialValue: false,
      supportVariable: false,
      hidden() {
        return !this.getProps().getPropValue('multiple');
      },
      setter: <BoolSetter />,
    },
    {
      title: 'loadData 函数',
      name: 'loadData',
      display: 'accordion',
      required: false,
      initialValue: `function loadData(node){
  return new Promise((resolve) => {
    resolve();
  })
}`,
      hidden() {
        return !this.getProps().getPropValue('isLoadData');
      },
      setter: <CodeSetter />,
    },
    {
      name: 'canOnlyCheckLeaf',
      title: '只能勾选叶子节点',
      display: 'block',
      initlalValue: false,
      supportVariable: false,
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
    advanced('cascadeSelectField', [
      {
        name: 'onChange', title: 'onChange 值发生变化', initialValue: `/**
* CascadeSelectField onChange
* @param value 选中的值，单选时返回单个值，多选时返回数组
* @param data 选中的数据，包括 value 和 label，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点
* @param extra 额外参数
*/
function onChange({ value, data, extra }){
  console.log('onChange', value, data, extra);
}`,
      },
      {
        name: 'onVisibleChange', title: 'onVisibleChange 弹层显示隐藏变化', initialValue: `/**
* CascadeSelectField onVisibleChange
* @param visible 是否显示
* @param type 触发显示关闭的操作类型
*/
function onVisibleChange(visible){
  console.log('onVisibleChange', visible);
}`,
      },
    ], { collapsed: true }),
  ],
});
