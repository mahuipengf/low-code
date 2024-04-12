
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  BoolSetter,
  NumberSetter,
  ChoiceSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import { paginationDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '翻页器',
  componentName: 'Pagination',
  category: '高级',
  icon: Icon,
  docUrl: paginationDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1c_KLu7P2gK0jSZPxXXacQpXa-112-8.png',
      label: '完整版',
      schema: {
        componentName: 'Pagination',
        props: {},
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1iYUur7L0gK0jSZFAXXcA9pXa-582-124.png',
      label: '简洁版',
      schema: {
        componentName: 'Pagination',
        props: {
          type: 'simple',
        },
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1UxWMu1L2gK0jSZFmXXc7iXXa-112-64.png',
      label: 'mini版',
      schema: {
        componentName: 'Pagination',
        props: {
          type: 'mini',
          shape: 'arrow-only',
        },
      },
    },
  ],
  configure: [{
    name: 'total',
    title: '总记录数',
    display: 'inline',
    initialValue: 100,
    supportVariable: false,
    setter: (
      <NumberSetter />
    ),
  }, {
    name: 'current',
    title: '当前页码',
    display: 'inline',
    initialValue: 1,
    supportVariable: false,
    setter: (
      <NumberSetter />
    ),
  },
  {
    name: 'size',
    title: '分页尺寸',
    display: 'inline',
    initialValue: 'medium',
    setter: (
      <ChoiceSetter
        options={[
          { value: 'small', title: '小' },
          { value: 'medium', title: '中' },
          { value: 'large', title: '大' },
        ]}
      />
    ),
  },
  {
    name: 'type',
    title: '分页类型',
    display: 'inline',
    initialValue: 'normal',
    setter: (
      <ChoiceSetter
        options={[
          { value: 'normal', title: 'normal' },
          { value: 'simple', title: 'simple' },
          { value: 'mini', title: 'mini' },
        ]}
      />
    ),
  },
  {
    name: 'shape',
    title: '前进后退按钮样式',
    display: 'block',
    initialValue: 'normal',
    setter: (
      <ChoiceSetter
        options={[
          { value: 'normal', title: 'normal' },
          { value: 'arrow-only', title: 'arrow-only' },
          { value: 'arrow-prev-only', title: 'arrow-prev-only' },
          { value: 'no-border', title: 'no-border' },
        ]}
      />
    ),
  },
  {
    name: 'pageSizeSelector',
    title: '每页显示选择器类型',
    display: 'block',
    supportVariable: false,
    initialValue: false,
    setter: (
      <ChoiceSetter
        options={[
          { value: false, title: '不显示' },
          { value: 'filter', title: 'filter' },
          { value: 'dropdown', title: 'dropdown' },
        ]}
      />
    ),
  },
  {
    name: 'pageSizeList',
    supportVariable: false,
    title: '每页显示选择器可选值',
    display: 'block',
    initialValue: '5,10,20',
    hidden() {
      return ((this.getProps().getPropValue('pageSizeSelector') === false));
    },
    setter: (
      <TextSetter />
    ),
  },
  {
    name: 'pageSize',
    title: 'pageSize',
    display: 'block',
    initialValue: 10,
    supportVariable: false,
    setter: (
      <NumberSetter />
    ),
  },
  {
    name: 'pageSizePosition',
    title: '每页显示选择器在组件中的位置',
    display: 'block',
    initialValue: 'end',
    hidden() {
      return ((this.getProps().getPropValue('pageSizeSelector') === false));
    },
    setter: (
      <ChoiceSetter
        options={[
          { value: 'start', title: 'start' },
          { value: 'end', title: 'end' },
        ]}
      />
    ),
  },
  {
    name: 'hideOnlyOnePage',
    title: '当分页数为1时，是否隐藏分页器',
    display: 'block',
    initialValue: false,
    setter: <BoolSetter />,
  },
  {
    name: 'showJump',
    title: '显示跳转输入框与按钮',
    tip: '分页类型为normal时,且在页码数超过5页后 起作用',
    hidden() {
      return ((this.getProps().getPropValue('type') !== 'normal'));
    },
    initialValue: true,
    display: 'block',
    setter: <BoolSetter />,
  },
  style({ advanced: true }),
  {
    type: 'group',
    title: '高级',
    display: 'accordion',
    collapsed: true,
    items: [
      uuid('pagination'),
      ...events([
        {
          name: 'onChange',
          title: 'onChange 页码改变',
          initialValue: `/**
* Pagination onChange 
* @param currentPagination 当前页码值
*/
function onChange(currentPagination){
  console.log('onChange', currentPagination);
}`,
        },
        {
          name: 'onPageSizeChange',
          title: 'onPageSizeChange 每页显示数改变',
          initialValue: `/**
* Pagination onPageSizeChange 
* @param pageSize 改变后的每页显示记录数
*/
function onPageSizeChange(pageSize){
  console.log('onPageSizeChange', pageSize);
}`,
        },
      ], { display: 'none' }),
    ],
  }],
});
