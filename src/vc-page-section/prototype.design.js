import React from 'react';
import { Bundle, Env } from '@ali/visualengine';
import uuid from '@ali/vu-uuid-property';
// import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import {
  I18nSetter, BoolSetter, ChoiceSetter
} from '@ali/visualengine-utils';
import FusionIconSetter from '../common/vs-fusion-icon/index';

import Icon from './logo.svg';

function isHeaderHidden() {
  const props = this.getProps();
  return !props.getPropValue('showHeader');
}

function getUIConfig() {
  return [
    {
      type: 'group',
      title: '卡片头部',
      display: 'block',
      items: [
        {
          name: 'showHeader',
          title: '显示头部',
          initialValue: true,
          display: 'inline',
          setter: <BoolSetter />,
        },
        {
          name: 'title',
          title: '卡片标题',
          initialValue: {
            type: 'i18n',
            zh_CN: '卡片标题',
            en_US: 'Title',
          },
          display: 'inline',
          setter: <I18nSetter placeholder="请输入" />,
          hidden: isHeaderHidden,
        },
        {
          name: 'icon',
          title: '图标',
          display: 'inline',
          setter: <FusionIconSetter placeholder="请输入" />,
          hidden: isHeaderHidden,
        },
        {
          name: 'tooltip',
          title: '用户提示',
          initialValue: {
            type: 'i18n',
            zh_CN: '',
            en_US: '',
          },
          display: 'inline',
          setter: <I18nSetter placeholder="请输入" />,
          hidden: isHeaderHidden,
        },
        {
          name: 'behavior',
          title: '默认状态',
          display: 'inline',
          initialValue: 'NORMAL',
          supportVariable: true,
          setter: <ChoiceSetter
            options={[{
              title: '普通',
              value: 'NORMAL',
            }, {
              title: '隐藏',
              value: 'HIDDEN',
            }]}
          />,
        },
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
          hidden: isHeaderHidden,
        }),
        ...createSlot({
          slotName: 'extra',
          slotTitle: '扩展区',
          supportVariable: false,
          allowTextInput: true,
          initialValue: {
            type: 'i18n',
            zh_CN: '',
            en_US: '',
          },
          hidden: isHeaderHidden,
        }),
        {
          title: '头部分割线',
          type: 'group',
          display: 'block',
          items: [
            {
              name: 'showHeadDivider',
              title: '开启',
              initialValue: true,
              display: 'inline',
              setter: <BoolSetter />,
            }
          ],
          hidden: isHeaderHidden,
        },
      ]
    },
    {
      name: 'withPadding',
      title: '预留边距',
      initialValue: true,
      display: 'inline',
      setter: <BoolSetter />,
    },
  ]
}

const PageSectionPrototype = Bundle.createPrototype({
  title: '页面卡片',
  componentName: 'PageSection',
  category: '布局',
  icon: Icon,
  isContainer: true,
  initialChildren: null,
  docUrl: '',
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1P.5TKq61gK0jSZFlXXXDKFXa-112-64.png',
      label: '带标题',
      schema: {
        componentName: 'PageSection',
        props: {},
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ArmUKrj1gK0jSZFuXXcrHpXa-112-64.png',
      label: '无标题',
      schema: {
        componentName: 'PageSection',
        props: {
          showHeader: false,
        },
      },
    },
  ],
  configure: [
    ...getUIConfig(),
    style({ advanced: true }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('PageSection'),
      ],
    },
  ],
});

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default PageSectionPrototype;
