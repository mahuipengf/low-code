
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  SelectSetter,
  ChoiceSetter,
  BoolSetter,
} from '@ali/visualengine-utils';

import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import FusionIconSetter from '../common/vs-fusion-icon/index';

import Icon from './logo.svg';
import { messageDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: '信息提示',
  componentName: 'Message',
  category: '高级',
  icon: Icon,
  docUrl: messageDoc,
  isContainer: false,
  hasSlot: true,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1zZyJu4z1gK0jSZSgXXavwpXa-112-64.png',
      label: '信息提示',
      schema: {
        componentName: 'Message',
        props: {},
      },
    },
  ],
  configure: [
    {
      name: 'title',
      title: '标题',
      display: 'inline',
      initialValue: '标题',
      setter: <TextSetter placeholder="请输入" />,
      supportVariable: false,
    },
    {
      name: 'type',
      title: '类型',
      display: 'inline',
      initialValue: 'success',
      supportVariable: false,
      setter: (
        <SelectSetter
          options={[{
            title: 'success',
            value: 'success',
          }, {
            title: 'warning',
            value: 'warning',
          }, {
            title: 'error',
            value: 'error',
          }, {
            title: 'notice',
            value: 'notice',
          }, {
            title: 'help',
            value: 'help',
          }, {
            title: 'loading',
            value: 'loading',
          }]}
          compact={false}
        />
      ),
    },
    {
      name: 'size',
      title: '尺寸',
      display: 'inline',
      initialValue: 'medium',
      setter: (
        <ChoiceSetter
          options={[{
            title: '中',
            value: 'medium',
            tip: '正常尺寸',
          }, {
            title: '大',
            value: 'large',
            tip: '大尺寸',
          }]}
          compact={false}
        />
      ),
      supportVariable: false,
    },
    {
      name: 'shape',
      title: '外观',
      display: 'inline',
      initialValue: 'inline',
      setter: (
        <ChoiceSetter
          options={[{
            title: 'inline',
            value: 'inline',
          }, {
            title: 'addon',
            value: 'addon',
          }, {
            title: 'toast',
            value: 'toast',
          }]}
          compact={false}
        />
      ),
      supportVariable: false,
    },
    ...createSlot({
      slotName: 'content',
      slotTitle: '内容',
      allowTextInput: true,
      supportVariable: false,
      initialValue: {
        type: 'i18n',
        zh_CN: '内容文案',
        en_US: 'Message content',
      },
    }),
    {
      type: 'composite',
      name: 'iconType',
      title: '提示图标',
      display: 'block',
      items: [
        {
          name: 'useType',
          title: ' ',
          display: 'plain',
          initialValue: true,
          setter: <ChoiceSetter options={[{
            title: '使用基础图标',
            value: true,
            tip: '使用基础图标',
          }, {
            title: '使用自定义图标',
            value: false,
            tip: '使用自定义图标',
          }]}
          />,
        },
        {
          name: 'baseType',
          title: '基础图标',
          display: 'inline',
          initialValue: '',
          hidden() {
            return !this.getProps().getPropValue('iconType.useType');
          },
          setter: <FusionIconSetter />,
        }, {
          name: 'otherType',
          title: '自定义图标',
          display: 'inline',
          initialValue: '',
          tip: '请输入图标的name',
          hidden() {
            return this.getProps().getPropValue('iconType.useType');
          },
          setter: <TextSetter />,
        }],
    },
    {
      name: 'closeable',
      title: '显示"关闭"按钮',
      display: 'block',
      initialValue: false,
      supportVariable: false,
      setter: <BoolSetter placeholder="请输入" />,
    },
    {
      name: 'visible',
      title: '显示状态',
      display: 'block',
      initialValue: true,
      supportVariable: false,
      setter: <BoolSetter placeholder="请输入" />,
      hidden() {
        return this.getProps().getPropValue('closeable') === true;
      },
    },
    {
      name: 'defaultVisible',
      title: '默认显示状态',
      display: 'block',
      initialValue: true,
      supportVariable: false,
      setter: <BoolSetter placeholder="请输入" />,
      hidden() {
        return this.getProps().getPropValue('closeable') === false;
      },
    },
    {
      name: 'animation',
      title: '开启展开收起动画',
      display: 'block',
      initialValue: true,
      supportVariable: false,
      setter: <BoolSetter placeholder="请输入" />,
      hidden() {
        return this.getProps().getPropValue('closeable') === false;
      },
    },
    style({
      advanced: true,
    }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('message'),
        ...events([
          {
            name: 'onClose', title: 'onClose 点击关闭', initialValue: `/**
* Message onClose 
*/
function onClose(){
  console.log('onClose');
}`,
          },
        ], { display: 'none' }),
      ],
    },
  ],
});
