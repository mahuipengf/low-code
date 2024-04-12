
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ChoiceSetter,
  BoolSetter,
  NumberSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import {
  size,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import { progressDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '进度指示器',
  componentName: 'Progress',
  category: '高级',
  icon: Icon,
  docUrl: progressDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1aCmJuVY7gK0jSZKzXXaikpXa-112-64.png',
      label: '线形',
      schema: {
        componentName: 'Progress',
        props: {
          shape: 'line',
          percent: 30,
        },
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1wkeOuYj1gK0jSZFuXXcrHpXa-112-64.png',
      label: '圆形',
      schema: {
        componentName: 'Progress',
        props: {
          shape: 'circle',
          percent: 30,
        },
      },
    },
  ],
  configure: [
    size({supportVariable: false}),
    {
      name: 'shape',
      title: '形态',
      display: 'inline',
      initialValue: 'line',
      setter: <ChoiceSetter options={[
        { title: '圆型', value: 'circle' },
        { title: '线型', value: 'line' },
      ]}
      />,
      supportVariable: false,
    },
    {
      name: 'percent',
      title: '百分比',
      display: 'inline',
      supportVariable: false,
      initialValue: 0,
      setter: <NumberSetter />,
    },
    {
      name: 'state',
      title: '状态',
      display: 'inline',
      initialValue: 'normal',
      supportVariable: false,
      hidden() {
        return this.getProps().getPropValue('progressive');
      },
      setter: <ChoiceSetter options={[
        { title: 'normal', value: 'normal' },
        { title: 'success', value: 'success' },
        { title: 'error', value: 'error' },
      ]}
      />,
    },
    {
      name: 'hasBorder',
      title: '边框',
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
      supportVariable: false,
    },
    {
      name: 'progressive',
      title: '色彩阶段变化模式',
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },
    style({ advanced: true }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('progress'),
      ],
    },
  ],
});
