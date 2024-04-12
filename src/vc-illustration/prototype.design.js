
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  SelectSetter,
  ChoiceSetter,
  BoolSetter,
  ActionSetter
} from '@ali/visualengine-utils';

import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';

import Icon from './logo.svg';
import { illustrationDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: '缺省提示',
  componentName: 'Illustration',
  category: '高级',
  icon: Icon,
  docUrl: illustrationDoc,
  isContainer: true,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1kDJQAy_1gK0jSZFqXXcpaXXa-112-64.png',
      label: '缺省提示',
      schema: {
        componentName: 'Illustration',
        props: {},
      },
    },
  ],
  configure: [
    {
      name: 'title',
      title: '标题',
      display: 'inline',
      setter: <TextSetter placeholder={'请输入'}/>,
      supportVariable: false
    },
    {
      name: 'content',
      title: '内容',
      display: 'inline',
      setter: <TextSetter placeholder="请输入" />,
      supportVariable: false,
    },
    {
      name: 'type',
      title: '类型',
      display: 'inline',
      initialValue: 'empty',
      supportVariable: false,
      setter: (
        <SelectSetter
          options={[{
            title: '空',
            value: 'empty',
          }, {
            title: '完成',
            value: 'completed',
          }, {
            title: '未找到',
            value: 'notFound',
          }, {
            title: '未知异常',
            value: 'unkownError',
          }, {
            title: '服务器异常',
            value: 'serverError',
          }, {
            title: '服务器拒绝',
            value: 'permissionDenied',
          }, {
            title: '已转移',
            value: 'transferred'
          }]}
          compact={false}
        />
      ),
    },
    {
      name: 'size',
      title: '尺寸',
      display: 'inline',
      initialValue: 'large',
      setter: (
        <ChoiceSetter
          options={[{
            title: '单行',
            value: 'small',
            tip: '适用于区块内',
          }, {
            title: '整页',
            value: 'large',
            tip: '适用于整页',
          }]}
          compact={false}
        />
      ),
      supportVariable: false,
    },
    {
      name: 'link',
      title: '链接',
      display: 'inline',
      setter: <TextSetter placeholder={'请输入地址'}/>,
      supportVariable: false,
    },
    {
      name: 'linkText',
      title: '链接文案',
      display: 'inline',
      setter: <TextSetter placeholder={'请输入文案'}/>,
      supportVariable: false,
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
