import React from 'react';
import { Bundle, Env } from '@ali/visualengine';
import uuid from '@ali/vu-uuid-property';
// import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import { I18nSetter, BoolSetter, ChoiceSetter } from '@ali/visualengine-utils';
import FusionIconSetter from '../common/vs-fusion-icon/index';

import Icon from './logo.svg';
import $i18n from '../i18n/index';

function isHeaderHidden() {
  const props = this.getProps();
  return !props.getPropValue('showHeader');
}

function getUIConfig() {
  return [
    {
      name: 'showHeader',
      title: $i18n.get({ id: 'deepShowHead', dm: '显示头部' }),
      initialValue: true,
      display: 'inline',
      setter: <BoolSetter />,
      supportVariable: true,
    },
    {
      name: 'title',
      title: $i18n.get({ id: 'deepCardTitle', dm: '卡片标题' }),
      initialValue: {
        type: 'i18n',
        zh_CN: '卡片标题',
        en_US: 'Title',
      },
      display: 'inline',
      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      hidden: isHeaderHidden,
      supportVariable: true,
    },
    {
      name: 'icon',
      title: $i18n.get({ id: 'deepIcon', dm: '图标' }),
      display: 'inline',
      setter: (
        <FusionIconSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />
      ),
      hidden: isHeaderHidden,
    },
    {
      name: 'tooltip',
      title: $i18n.get({ id: 'deepUserPrompt', dm: '用户提示' }),
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },
      display: 'inline',
      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      hidden: isHeaderHidden,
      supportVariable: true,
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
      slotTitle: $i18n.get({ id: 'deepSubtitle', dm: '副标题' }),
      supportVariable: true,
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
      slotTitle: $i18n.get({ id: 'deepExtensionArea', dm: '扩展区' }),
      supportVariable: true,
      allowTextInput: true,
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },
      hidden: isHeaderHidden,
    }),
    {
      name: 'showHeadDivider',
      title: $i18n.get({ id: 'deepHeadDivisionLine', dm: '头部分割线' }),
      initialValue: true,
      display: 'inline',
      setter: <BoolSetter />,
      hidden: isHeaderHidden,
      supportVariable: true,
    },
    {
      name: 'showCollapseIcon',
      title: $i18n.get({ id: 'deepPageSectionShowCollapse', dm: '显示折叠按钮' }),
      initialValue: false,
      display: 'inline',
      setter: <BoolSetter />,
      supportVariable: true,
    },
    {
      name: 'collapsed',
      title: $i18n.get({ id: 'deepPageSectionCollapsed', dm: '是否折叠' }),
      initialValue: false,
      display: 'inline',
      setter: <BoolSetter />,
      supportVariable: true,
      disabled() {
        return !this.getProps().getProp('showCollapseIcon').getValue();
      },
    },
    {
      name: 'unmountOnCollapse',
      title: $i18n.get({ id: 'deepUnmountOnCollapse', dm: '折叠时卸载' }),
      initialValue: true,
      display: 'inline',
      setter: <BoolSetter />,
      supportVariable: true,
      disabled() {
        return !this.getProps().getProp('showCollapseIcon').getValue();
      },
    },
    {
      name: 'withPadding',
      title: $i18n.get({ id: 'deepReservedMargin', dm: '预留边距' }),
      initialValue: true,
      display: 'inline',
      setter: <BoolSetter />,
      supportVariable: true,
    },
  ];
}

const PageSectionPrototype = Bundle.createPrototype({
  title: $i18n.get({ id: 'deepPageCard', dm: '页面卡片' }),
  componentName: 'PageSection',
  category: $i18n.get({ id: 'deepLayout', dm: '布局' }),
  icon: Icon,
  isContainer: true,
  initialChildren: null,
  docUrl: '',
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1P.5TKq61gK0jSZFlXXXDKFXa-112-64.png',
      label: $i18n.get({ id: 'deepTitled', dm: '带标题' }),
      schema: {
        componentName: 'PageSection',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ArmUKrj1gK0jSZFuXXcrHpXa-112-64.png',
      label: $i18n.get({ id: 'deepUntitled', dm: '无标题' }),
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
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      items: [uuid('PageSection')],
    },
  ],
});

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default PageSectionPrototype;
