import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  BoolSetter, TextSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import Icon from './logo.svg';
import { cardDoc } from '../common/tipUrls';

const generateChildProto = ({ componentName }) => Bundle.createPrototype({
  componentName,
  category: null,
  isContainer: true,
  canDragging: false,
  canSelecting: false,
  // canHovering: false,
  canOperating: false,
});

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default [
  Bundle.createPrototype({
    title: '卡片(不推荐)',
    componentName: 'Card',
    category: '其他',
    icon: Icon,
    docUrl: cardDoc,
    isContainer: true,
    canDropIn: false,
    initialChildren: [
      { componentName: 'CardContent' },
    ],
    snippets: [
      {
        screenshot: "https://img.alicdn.com/tfs/TB1CHN3u4z1gK0jSZSgXXavwpXa-112-64.png",
        label: "普通型",
        schema: {
          componentName: "Card",
          props: {},
        },
      },
      {
        screenshot: "https://img.alicdn.com/tfs/TB1.Ut6u4D1gK0jSZFKXXcJrVXa-112-64.png",
        label: "自定义",
        schema: {
          componentName: "Card",
          props: {
            __slot__extra: true,
            extra: {
              type: "JSBlock",
              value: {
                componentName: "Slot",
                props: {
                  slotName: "extra",
                  slotTitle: "自定义内容",
                },
                condition: true,
                children: [],
              },
            },
          },
        },
      },
    ],
    configure: [
      ...createSlot({
        slotName: 'title',
        slotTitle: '标题',
        supportVariable: false,
        allowTextInput: true,
        initialValue: {
          type: 'i18n',
          zh_CN: '标题',
          en_US: 'Title',
        },
      }),
      ...createSlot({
        slotName: 'subTitle',
        slotTitle: '副标题',
        supportVariable: false,
        allowTextInput: true,
        initialValue: {
          type: 'i18n',
          zh_CN: '',
          en_US: '',
        },
      }),
      ...createSlot({
        slotName: 'extra',
        slotTitle: '自定义内容',
        allowTextInput: true,
        display: 'block',
        initialValue: '',
      }),
      {
        name: 'showTitleBullet',
        title: '标题的项目符号',
        display: 'block',
        initialValue: true,
        setter: <BoolSetter />,
      },
      {
        name: 'showHeadDivider',
        title: '头部分割线',
        display: 'block',
        initialValue: true,
        setter: <BoolSetter />,
      },
      {
        name: 'dividerNoInset',
        title: '分割线无缩进',
        display: 'block',
        initialValue: false,
        setter: <BoolSetter />,
        disabled() {
          return !this.getProps().getPropValue('showHeadDivider')
        },
      },
      {
        name: 'contentHeight',
        title: '内容区域的固定高度',
        display: 'block',
        tip: '不填代表自适应',
        initialValue: '',
        setter: <TextSetter />,
      },
      style({ advanced: true }),
      {
        type: 'group',
        title: '高级',
        display: 'accordion',
        collapsed: true,
        items: [
          uuid('card'),
          ...events([
            {
              name: 'onCollapseChange', title: 'onCollapseChange 折叠状态变化', initialValue: `/**
* collapse onCollapseChange
*/
function onCollapseChange(status) {
  console.log(status);
}
`,
            },
          ], { display: 'none' }),
        ],
      },
    ],
  }),
  ...[
    { componentName: 'CardContent' },
  ].map(options => generateChildProto(options)),
];
