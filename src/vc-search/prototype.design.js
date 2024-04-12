
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter, I18nSetter, ChoiceSetter, BoolSetter, JsonSetter, SelectSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import { searchDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '搜索',
  componentName: 'Search',
  category: '高级',
  icon: Icon,
  docUrl: searchDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1PSqJuYr1gK0jSZFDXXb9yVXa-112-64.png',
      label: '普通型',
      schema: {
        componentName: 'Search',
        props: {},
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1rRaLu5_1gK0jSZFqXXcpaXXa-112-64.png',
      label: '带分类',
      schema: {
        componentName: 'Search',
        props: {
          isFilter: true,
          filter: {
            data: [
              {
                label: 'one',
                value: 'one',
              },
              {
                label: 'two',
                value: 'two',
              },
              {
                label: 'three',
                value: 'three',
              },
            ],
          },
          defaultFilterValue: 'one',
        },
      },
    },
  ],
  configure: [{
    name: 'placeholder',
    title: '提示文字',
    display: 'inline',
    initialValue: {
      zh_CN: '请输入',
      en_US: '',
      type: 'i18n',
    },
    setter: <I18nSetter placeholder="请输入" />,
    supportVariable: false,
  },
  {
    name: 'defaultValue',
    title: '默认值',
    display: 'inline',
    initialValue: '',
    setter: <TextSetter placeholder="请输入" />,
    supportVariable: false,
  },
  {
    name: 'searchText',
    title: '按钮名称',
    display: 'inline',
    initialValue: {
      zh_CN: '搜索',
      en_US: 'search',
      type: 'i18n',
    },
    setter: <I18nSetter placeholder="请输入" />,
    supportVariable: false,
  },
  {
    name: 'size',
    title: '尺寸',
    display: 'inline',
    initialValue: 'medium',
    supportVariable: false,
    setter: <ChoiceSetter options={[
      { value: 'medium', title: '中', tip: '正常尺寸' },
      { value: 'large', title: '大', tip: '大号尺寸' },
    ]}
    />,
  },
  {
    name: 'type',
    title: '类型',
    display: 'inline',
    initialValue: 'normal',
    supportVariable: false,
    setter: <SelectSetter options={[
      { title: 'normal', value: 'normal' },
      { title: 'primary', value: 'primary' },
      { title: 'secondary', value: 'secondary' },
      { title: 'dark', value: 'dark' },
    ]}
    />,
  },
  {
    name: 'shape',
    title: '形状',
    display: 'inline',
    initialValue: 'normal',
    supportVariable: false,
    setter: <ChoiceSetter options={[
      { title: 'normal', value: 'normal' },
      { title: 'simple', value: 'simple' },
    ]}
    />,
  },
  {
    name: 'autoFocus',
    title: '自动聚焦',
    display: 'inline',
    initialValue: false,
    supportVariable: false,
    setter: <BoolSetter />,
  },
  {
    name: 'disabled',
    title: '是否禁用',
    display: 'inline',
    initialValue: false,
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
    name: 'dataSource',
    title: '搜索框下拉联想列表',
    display: 'block',
    supportVariable: false,
    initialValue: {
      data: [
        { label: '天猫', value: 'value1' },
        { label: '淘宝', value: 'value2' },
        { label: '阿里巴巴', value: 'value3' },
      ],
    },
    required: false,
    setter: <JsonSetter />,
  },
  {
    name: 'isFilter',
    title: '开启选择器',
    display: 'block',
    initialValue: false,
    setter: <BoolSetter />,
  },
  {
    name: 'filter',
    title: '选择器数据',
    display: 'accordion',
    supportVariable: false,
    initialValue: {
      data: [
        { label: 'one', value: 'one' },
        { label: 'two', value: 'two' },
        { label: 'three', value: 'three' },
      ],
    },
    required: false,
    hidden() {
      return !this.getProps().getPropValue('isFilter');
    },
    setter: <JsonSetter />,
  },
  {
    name: 'defaultFilterValue',
    title: '选择器默认值',
    display: 'block',
    initialValue: 'one',
    supportVariable: false,
    hidden() {
      return !this.getProps().getPropValue('isFilter');
    },
    setter: <TextSetter />,
  },
  style({ advanced: true }),
  {
    type: 'group',
    title: '高级',
    display: 'accordion',
    collapsed: true,
    items: [
      uuid('search'),
      ...events([
        {
          name: 'onChange', title: 'onChange 值发生变化', initialValue: `/**
* Search
* onChange 输入关键字时的回调
*/
function onChange(value) {
  console.log(value);
}`,
        },
        {
          name: 'onSearch', title: 'onSearch 点击搜索按钮', initialValue: `/**
* Search
* onSearchChange 点击搜索按钮触发的回调
*/
function onSearchChange(value) {
  console.log(value);
}`,
        },
        {
          name: 'onFilterChange', title: 'onFilterChange 选择器发生变化', initialValue: `/**
* Search
* onFilterChange 选择器发生变化时回调
*/
function onFilterChange(filterValue) {
  console.log(filterValue);
}`,
        },
      ], { display: 'none' }),
    ],
  }],
});
