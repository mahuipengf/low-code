import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ChoiceSetter, I18nSetter, BoolSetter, NumberSetter, SelectSetter, SkinSetter
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import Icon from './logo.svg';
import { drawerDoc } from '../common/tipUrls';

function maxWidthUnit(type, presetValue, options = {}) {
  return {
    type,
    cast(v, validNumber) {
      if (v === 'auto' || !validNumber) {
        v = presetValue;
      }
      return `${v}${type}`;
    },
    list: true,
    ...options,
  };
}


export default Bundle.createPrototype({
  title: '抽屉',
  componentName: 'Drawer',
  category: '基础',
  isContainer: true,
  icon: Icon,
  docUrl: drawerDoc,
  isModal: true,
  rectSelector: '.vc-drawer',
  canDropIn(placement) {
    const componentName = placement.getComponentName();
    if (componentName === 'Drawer') {
      return false;
    }
    return true;
  },
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1o0t4u9f2gK0jSZFPXXXsopXa-112-64.png",
      label: "侧抽屉",
      schema: {
        componentName: "Drawer",
        props: {}
      }
    },
    {
      screenshot: "https://img.alicdn.com/tfs/TB1YOd2u2b2gK0jSZK9XXaEgFXa-112-64.png",
      label: "底部抽屉",
      schema: {
        componentName: "Drawer",
        props: {
          placement: "bottom"
        }
      }
    }
  ],
  configure: [
    {
      title: '标题',
      name: 'title',
      display: 'inline',
      supportVariable: false,
      initialValue: {
        type: 'i18n',
        zh_CN: '标题',
        en_US: 'Title',
      },
      setter: <I18nSetter />,
    },
    {
      name: 'width',
      title: '宽度',
      display: 'inline',
      supportVariable: false,
      setter: <NumberSetter
        min={0}
        units={[
          maxWidthUnit('px', '520'),
        ]}
        placeholder="请输入宽度"
      />,
    },
    {
      name: 'height',
      title: '高度',
      display: 'inline',
      supportVariable: false,
      setter: <NumberSetter
        min={0}
        units={[
          maxWidthUnit('px', '446'),
        ]}
        placeholder="请输入高度"
      />,
    },
    {
      name: 'visible',
      title: '默认显示',
      display: 'inline',
      initialValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    {
      name: 'hasMask',
      title: '显示遮罩',
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
      supportVariable: false,
    },
    {
      name: 'closeable',
      title: '关闭方式',
      display: 'inline',
      initialValue: 'esc',
      setter: <ChoiceSetter
        multiple
        options={[
          { title: '点击遮罩', value: 'mask', tip: '点击遮罩区域可以关闭对话框' },
          { title: 'ESC', value: 'esc', tip: '按下 esc 键可以关闭对话框' },
        ]}
      />,
    },
    {
      name: 'placement',
      title: '弹出位置',
      display: 'inline',
      initialValue: 'right',
      setter: <ChoiceSetter
        options={[
          { title: '顶部', value: 'top' },
          { title: '右侧', value: 'right' },
          { title: '底部', value: 'bottom' },
          { title: '左侧', value: 'left' },
        ]}
      />,
    },
    {
      title: '底部按钮配置',
      type: 'group',
      display: 'block',
      items: [
        {
          title: '是否显示',
          name: 'footer',
          display: 'inline',
          initialValue: true,
          setter: <BoolSetter />,
          supportVariable: false,
        },
        {
          name: 'footerAlign',
          title: '对齐方式',
          display: 'inline',
          initialValue: 'right',
          hidden() {
            return !this.getProps().getPropValue('footer');
          },
          setter: <ChoiceSetter
            options={[
              { title: '左', value: 'left' },
              { title: '中', value: 'center' },
              { title: '右', value: 'right' },
            ]}
          />,
          supportVariable: false,
        },
        {
          name: 'footerActions',
          title: '排列方式',
          display: 'inline',
          initialValue: 'cancel,ok',
          hidden() {
            return !this.getProps().getPropValue('footer');
          },
          supportVariable: false,
          setter: <SelectSetter options={[
            {
              title: '确定，取消',
              value: 'ok,cancel',
              tip: '确认取消按钮同时存在，确认按钮在左',
            },
            {
              title: '取消，确定',
              value: 'cancel,ok',
              tip: '确认取消按钮同时存在，确认按钮在右',
            },
            {
              title: '确定',
              value: 'ok',
              tip: '只存在确认按钮',
            },
            {
              title: '取消',
              value: 'cancel',
              tip: '只存在取消按钮',
            },
          ]}
          />,
        },
        {
          title: '确认按钮',
          name: 'confirmText',
          display: 'inline',
          initialValue: {
            type: 'i18n',
            zh_CN: '确定',
            en_US: 'Confirm',
          },
          setter: <I18nSetter />,
          supportVariable: false,
        },
        {
          title: '取消按钮',
          name: 'cancelText',
          display: 'inline',
          initialValue: {
            type: 'i18n',
            zh_CN: '取消',
            en_US: 'Cancel',
          },
          setter: <I18nSetter />,
          supportVariable: false,
        },
        {
          name: 'confirmStyle',
          title: '确认风格',
          display: 'inline',
          initialValue: 'primary',
          supportVariable: false,
          setter: (
            <SkinSetter
              options={[{
                value: 'primary',
                imageUrl: 'https://img.alicdn.com/tps/TB1Pd0yOpXXXXagXpXXXXXXXXXX-412-72.png',
              }, {
                value: 'warning',
                imageUrl: 'https://img.alicdn.com/tfs/TB1M8OLppmWBuNjSspdXXbugXXa-409-58.png',
              }, {
                value: 'ghostLight',
                imageUrl: 'https://img.alicdn.com/tfs/TB1Rq6JSpXXXXc_aXXXXXXXXXXX-412-72.png',
              }, {
                value: 'ghostDark',
                imageUrl: 'https://img.alicdn.com/tfs/TB14Z_vSpXXXXb1aFXXXXXXXXXX-412-72.png',
              },
              ]}
              compact={false}
            />
          ),
        },
        {
          title: '确认状态',
          name: 'confirmState',
          display: 'inline',
          initialValue: '确定',
          setter: <ChoiceSetter
            options={[
              { title: '普通', value: 'NORMAL' },
              { title: '禁用', value: 'DISABLED' },
              { title: '加载中', value: 'LOADING' },
            ]}
          />,
          supportVariable: false,
        },
      ],
    },
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('drawer'),
        ...events([
          {
            name: 'onOk', title: 'onOk 点击确定', initialValue: `/**
* drawer onOk
*/
function onOk() {
  console.log('onOk');
}`,
          },
          {
            name: 'onCancel', title: 'onCancel 点击取消', initialValue: `/**
* drawer onCancel
*/
function onCancel() {
  console.log('onCancel');
}`,
          },
          {
            name: 'onClose', title: 'onClose 对话框关闭时', initialValue: `/**
* drawer onClose
*/
function onClose() {
  console.log('onClose');
}`,
          },
          {
            name: 'afterClose', title: 'afterClose 对话框关闭后', initialValue: `/**
* drawer afterClose
*/
function afterClose() {
  console.log('afterClose');
}`,
          },
          {
            name: 'afterOpen', title: 'afterOpen 对话框打开后', initialValue: `/**
* drawer afterOpen
*/
function afterOpen() {
  console.log('afterOpen')
}`
          },
        ], { display: 'none' }),
      ],
    },
  ],
});
