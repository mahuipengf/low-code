
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  ChoiceSetter,
  BoolSetter,
  JsonSetter,
  CodeSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import {
  defaultValue,
} from '@ali/vu-field-property';
import Icon from './logo.svg';
import { cascaderDataSource, cascaderDoc, cascaderValue, cascadeSelectIsLoadData } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '级联',
  componentName: 'Cascader',
  category: null, // 暂时不显示该组件
  icon: Icon,
  docUrl: cascaderDoc,
  configure: [{
    title: '数据源',
    type: 'group',
    display: 'entry',
    items: [
      {
        name: 'dataType',
        title: '数据源模式',
        display: 'block',
        initialValue: 'remote',
        setter: (
          <ChoiceSetter
            options={[
              { value: 'local', title: '本地' },
              { value: 'remote', title: '远程' },
            ]}
          />
        ),
      },
      {
        name: 'dataSource',
        title: '数据源（本地）',
        display: 'accordion',
        hidden() {
          return (this.getProps().getPropValue('dataType') !== 'local');
        },
        tip: {
          content: '点击查看数据格式',
          url: cascaderDataSource,
        },
        supportVariable: false,
        initialValue: [{
          value: '2974',
          label: '西安',
          children: [
            { value: '2975', label: '西安市', disabled: true },
            { value: '2976', label: '高陵县', checkboxDisabled: true },
            { value: '2977', label: '蓝田县' },
            { value: '2978', label: '户县' },
            { value: '2979', label: '周至县' },
            { value: '4208', label: '灞桥区' },
            { value: '4209', label: '长安区' },
            { value: '4210', label: '莲湖区' },
            { value: '4211', label: '临潼区' },
            { value: '4212', label: '未央区' },
            { value: '4213', label: '新城区' },
            { value: '4214', label: '阎良区' },
            { value: '4215', label: '雁塔区' },
            { value: '4388', label: '碑林区' },
            { value: '610127', label: '其它区' },
          ],
        }],
        required: false,
        setter: <JsonSetter />,
      },
      {
        name: 'fetchUrl',
        title: '数据源（url）',
        hidden() {
          return (this.getProps().getPropValue('dataType') !== 'remote');
        },
        initialValue: 'https://mocks.alibaba-inc.com/mock/HymIpfMfQ/cascaderSelect.json',
        required: false,
        display: 'block',
        setter: <TextSetter multiline rows={2} />,
        supportVariable: false,
      },
      {
        name: 'fetchParams',
        title: '请求携带的参数',
        initialValue: { },
        required: false,
        display: 'accordion',
        collapsed: true,
        hidden() {
          return (this.getProps().getPropValue('dataType') !== 'remote');
        },
        setter: <JsonSetter />,
        supportVariable: false,
      },
      {
        name: 'processData',
        title: '返回数据处理',
        initialValue: 'function processData(data, ctx, vcState) { return data; }',
        tip: '如果在这里使用了 ctx，设计器中看到的，可能与预想不符，请以预览效果为准',
        required: false,
        display: 'accordion',
        collapsed: true,
        hidden() {
          return (this.getProps().getPropValue('dataType') !== 'remote');
        },
        setter: <CodeSetter mode="javascript" wrapEnabled />,
      },
      {
        name: 'fetchError',
        title: '请求出错处理',
        initialValue:
          'function onFetchError(err, ctx, vcState) {\n  if (err) {\n   ctx.fn.toast({type: "error", title: err}) \n  }\n}',
        display: 'accordion',
        collapsed: true,
        hidden() {
          return (this.getProps().getPropValue('dataType') !== 'remote');
        },
        setter: <CodeSetter mode="javascript" wrapEnabled />,
      },
      {
        name: 'fetchMethod',
        title: '请求方式',
        display: 'block',
        initialValue: 'GET',
        hidden() {
          return (this.getProps().getPropValue('dataType') !== 'remote');
        },
        setter: (
          <ChoiceSetter
            options={[{ value: 'GET', title: 'GET' }, { value: 'POST', title: 'POST' }]}
          />
        ),
      },
    ],
  },
  defaultValue({
    items: [{
      name: 'value',
      title: '默认值',
      display: 'block',
      supportVariable: false,
      initialValue: [],
      setter: <JsonSetter label="编辑默认值" />,
      tip: {
        url: cascaderValue,
        content: '点击 ? 查看对应的数据结构',
      },
    }],
  }),
  {
    name: 'expandTriggerType',
    title: '触发行为',
    display: 'inline',
    initialValue: 'click',
    setter: <ChoiceSetter options={[
      { title: 'click', value: 'click' },
      { title: 'hover', value: 'hover' },
    ]}
    />,
  },
  {
    name: 'multiple',
    title: '多选',
    display: 'inline',
    initlalValue: false,
    setter: <BoolSetter />,
  },
  {
    name: 'canOnlySelectLeaf',
    title: '只能选中叶子节点',
    display: 'block',
    initlalValue: false,
    hidden() {
      return this.getProps().getPropValue('multiple');
    },
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
    name: 'checkStrictly',
    title: '父子选中不关联',
    display: 'block',
    initialValue: false,
    hidden() {
      return !this.getProps().getPropValue('multiple');
    },
    setter: <BoolSetter />,
  },
  {
    title: '开启异步加载',
    name: 'isLoadData',
    display: 'block',
    initialValue: false,
    required: false,
    tip: {
      content: '点击 ? 查看用法',
      url: cascadeSelectIsLoadData,
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
  style({ advanced: true }),
  {
    type: 'group',
    title: '高级',
    display: 'accordion',
    collapsed: true,
    items: [
      uuid('Cascader'),
      ...events([
        { name: 'onChange', title: '选中值改变时触发的回调函数' },
        { name: 'onExpand', title: '展开时触发的回调函数' },
      ], { display: 'none' }),
    ],
  }],
});
