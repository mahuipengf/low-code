import React from 'react';
import { Bundle } from '@ali/visualengine';
import { BoolSetter, TextSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import Icon from './logo.svg';
import $i18n from '../i18n/index';
import { cardDoc } from '../common/tipUrls';

const generateChildProto = ({ componentName }) =>
  Bundle.createPrototype({
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
    title: $i18n.get({ id: 'deepCardNotRecommended', dm: '卡片(不推荐)' }),
    componentName: 'Card',
    category: $i18n.get({ id: 'deepOther', dm: '其他' }),
    icon: Icon,
    docUrl: cardDoc,
    isContainer: true,
    canDropIn: false,
    initialChildren: [{ componentName: 'CardContent' }],

    snippets: [
      {
        screenshot: 'https://img.alicdn.com/tfs/TB1CHN3u4z1gK0jSZSgXXavwpXa-112-64.png',
        label: $i18n.get({ id: 'deepNormalType', dm: '普通型' }),
        schema: {
          componentName: 'Card',
          props: {},
        },
      },

      {
        screenshot: 'https://img.alicdn.com/tfs/TB1.Ut6u4D1gK0jSZFKXXcJrVXa-112-64.png',
        label: $i18n.get({ id: 'deepCustomize', dm: '自定义' }),
        schema: {
          componentName: 'Card',
          props: {
            __slot__extra: true,
            extra: {
              type: 'JSBlock',
              value: {
                componentName: 'Slot',
                props: {
                  slotName: 'extra',
                  slotTitle: $i18n.get({ id: 'deepCustomize.2', dm: '自定义内容' }),
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
        slotTitle: $i18n.get({ id: 'deepTitle', dm: '标题' }),
        supportVariable: true,
        allowTextInput: true,
        initialValue: {
          type: 'i18n',
          zh_CN: '标题',
          en_US: 'Title',
        },
      }),

      ...createSlot({
        slotName: 'subTitle',
        slotTitle: $i18n.get({ id: 'deepSubtitle', dm: '副标题' }),
        supportVariable: true,
        allowTextInput: true,
        initialValue: {
          type: 'i18n',
          zh_CN: '',
          en_US: '',
        },
      }),

      ...createSlot({
        slotName: 'extra',
        slotTitle: $i18n.get({ id: 'deepCustomize.2', dm: '自定义内容' }),
        allowTextInput: true,
        display: 'block',
        initialValue: '',
      }),

      {
        name: 'showTitleBullet',
        title: $i18n.get({ id: 'deepTitleOfItemSymbol', dm: '标题的项目符号' }),
        display: 'block',
        initialValue: true,
        setter: <BoolSetter />,
      },

      {
        name: 'showHeadDivider',
        title: $i18n.get({ id: 'deepHeadDivisionLine', dm: '头部分割线' }),
        display: 'block',
        initialValue: true,
        setter: <BoolSetter />,
      },

      {
        name: 'dividerNoInset',
        title: $i18n.get({ id: 'deepSplitLineNoIndent', dm: '分割线无缩进' }),
        display: 'block',
        initialValue: false,
        setter: <BoolSetter />,
        disabled() {
          return !this.getProps().getPropValue('showHeadDivider');
        },
      },

      {
        name: 'contentHeight',
        title: $i18n.get({ id: 'deepFixedHeightInContent', dm: '内容区域的固定高度' }),
        display: 'block',
        tip: $i18n.get({ id: 'deepDoNotFillIn', dm: '不填代表自适应' }),
        initialValue: '',
        setter: <TextSetter />,
      },

      style({ advanced: true }),
      {
        type: 'group',
        title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
        display: 'accordion',
        collapsed: false,
        items: [
          uuid('card'),
          ...events([
            {
              name: 'onCollapseChange',
              title: $i18n.get({
                id: 'deepONCOLLLAPSECHANGEFoldingStatusChange',
                dm: 'onCollapseChange 折叠状态变化',
              }),
              initialValue: `/**
* collapse onCollapseChange
*/
function onCollapseChange(status) {
  console.log(status);
}
`,
            },
          ]),
        ],
      },
    ],
  }),

  ...[{ componentName: 'CardContent' }].map((options) => generateChildProto(options)),
];
