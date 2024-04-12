import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ChoiceSetter, I18nSetter, BoolSetter, NumberSetter, SelectSetter, SkinSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import { dialogDoc } from '../common/tipUrls';

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
  title: '对话框',
  componentName: 'Dialog',
  category: '基础',
  isContainer: true,
  icon: Icon,
  isModal: true,
  rectSelector: '.vc-dialog',
  canDropIn(placement) {
    const componentName = placement.getComponentName();
    if (componentName === 'Dialog') {
      return false;
    }
    return true;
  },
  docUrl: dialogDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1YvX4uYr1gK0jSZR0XXbP8XXa-112-64.png",
      label: "普通型",
      schema: {
        componentName: "Dialog",
        props: {},
      },
    },
    {
      screenshot: "https://img.alicdn.com/tfs/TB1ySp7uYj1gK0jSZFOXXc7GpXa-112-64.png",
      label: "隐藏底部",
      schema: {
        componentName: "Dialog",
        props: {
          footer: false,
        },
      },
    },
  ],
  configure: [
    {
      title: '标题',
      name: 'title',
      display: 'inline',
      initialValue: {
        type: 'i18n',
        zh_CN: '标题',
        en_US: 'Title',
      },
      setter: <I18nSetter />,
      supportVariable: false,
    },
    {
      name: 'width',
      title: '宽度',
      display: 'inline',
      setter: <NumberSetter
        min={0}
        units={[
          maxWidthUnit('px', '520'),
          // maxWidthUnit('%', '100'),
          // {
          //   type: 'auto',
          //   preset: true,
          //   list: true,
          // },
          // maxWidthUnit('rem', '28'), // 因为16px=1rem, 所以446px约等于28rem
          // maxWidthUnit('em', '37'), // 因为label为72px，按设计展示6个字，所以446px约等于37em
        ]}
        placeholder="请输入宽度"
      />,
      supportVariable: false,
    },
    {
      name: 'height',
      title: '高度',
      display: 'inline',
      setter: <NumberSetter
        min={0}
        units={[
          maxWidthUnit('px', '446'),
          // maxWidthUnit('%', '100'),
          // maxWidthUnit('vh', '100'),
          // {
          //   type: 'auto',
          //   preset: true,
          //   list: true,
          // },
          // maxWidthUnit('rem', '28'), // 因为16px=1rem, 所以446px约等于28rem
          // maxWidthUnit('em', '37'), // 因为label为72px，按设计展示6个字，所以446px约等于37em
        ]}
        placeholder="请输入高度"
      />,
      supportVariable: false,
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
    style({ advanced: true }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('dialog'),
        {
          title: '内部浮层定位',
          name: 'popupOutDialog',
          display: 'block',
          tip: '如果Dialog本身高度小于内部浮层高度，建议选择弹框外',
          initialValue: true,
          setter: <ChoiceSetter
            options={[
              { title: '弹框内', value: false },
              { title: '弹框外', value: true },
            ]}
          />,
          supportVariable: false,
        },
        ...events([
          {
            name: 'onOk', title: 'onOk 点击确定', initialValue: `/**
* dialog onOk
*/
function onOk() {
  console.log('onOk');
}`,
          },
          {
            name: 'onCancel', title: 'onCancel 点击取消', initialValue: `/**
* dialog onCancel
*/
function onCancel() {
  console.log('onCancel');
}`,
          },
          {
            name: 'onClose', title: 'onClose 对话框关闭时', initialValue: `/**
* dialog onClose
*/
function onClose() {
  console.log('onClose');
}`,
          },
          {
            name: 'afterClose', title: 'afterClose 对话框关闭后', initialValue: `/**
* dialog afterClose
*/
function afterClose() {
  console.log('afterClose');
}`,
          },
          {
            name: 'afterOpen', title: 'afterOpen 对话框打开后', initialValue: `/**
* dialog afterOpen
*/
function afterOpen() {
  console.log('afterOpen')
}`
          },
          {
            name: 'onOpen', title: 'onOpen 对话框打开时', initialValue: `/**
* dialog onOpen
*/
function onOpen() {
  console.log('onOpen')
}`
          }
        ], { display: 'none' }),
      ],
    },
  ],
});
