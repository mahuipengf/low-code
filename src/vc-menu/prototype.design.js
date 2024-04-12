
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ChoiceSetter, JsonSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import Icon from './logo.svg';
import { menuDataSource, menuDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '菜单',
  componentName: 'Menu',
  category: '高级',
  icon: Icon,
  docUrl: menuDoc,
  hasSlot: true,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1QAaIu1L2gK0jSZPhXXahvXXa-112-64.png',
      label: '菜单',
      schema: {
        componentName: 'Menu',
        props: {},
      },
    },
  ],
  configure: [
    {
      name: 'dataSource',
      title: '数据源',
      display: 'block',
      // disabled() {
      //   return (this.getProps().getPropValue('dataType') !== 'local');
      // },
      tip: {
        content: '点击查看数据格式',
        url: menuDataSource,
      },
      supportVariable: false,
      initialValue: {
        defaultOpenKeys: ['key1'],
        defaultSelectedKeys: ['key1-1'],
        menu: [
          {
            label: '菜单项一',
            key: 'key1',
            children: [
              {
                label: '选项一',
                key: 'key1-1',
                tag: {
                  text: '初始化',
                  color: 'blue'
                }
              },
              {
                label: '选项二',
                key: 'key1-2',
              },
            ],
          },
          {
            isDivider: true,
          },
          {
            label: '菜单项二',
            key: 'key2',
            children: [
              {
                label: '选项一',
                key: 'key2-1',
              },
              {
                label: '选项二',
                key: 'key2-2',
              },
            ],
          },
          {
            label: '菜单项三',
            key: 'key3',
            disabled: true,
          },
        ],
      },
      required: false,
      setter: <JsonSetter />,
    },
    {
      name: 'selectMode',
      title: '选择模式',
      display: 'block',
      initialValue: false,
      setter: <ChoiceSetter options={[
        { title: '不启动', value: false },
        { title: '单选', value: 'single' },
        { title: '多选', value: 'multiple' },
      ]}
      />,
    },
    {
      name: 'triggerType',
      title: '触发行为',
      display: 'block',
      initialValue: 'click',
      setter: <ChoiceSetter options={[
        { title: '点击', value: 'click' },
        { title: '悬浮', value: 'hover' },
      ]}
      />,
    },
    {
      name: 'mode',
      title: '子菜单打开模式',
      display: 'block',
      initialValue: 'inline',
      setter: <ChoiceSetter options={[
        { title: '下拉', value: 'inline' },
        { title: '弹层', value: 'popup' },
      ]}
      />,
    },
    {
      name: 'popupAlign',
      title: '弹层对齐方式',
      display: 'block',
      initialValue: 'follow',
      hidden() {
        return (this.getProps().getPropValue('mode') !== 'popup');
      },
      setter: <ChoiceSetter options={[
        { title: 'follow', value: 'follow' },
        { title: 'outside', value: 'outside' },
      ]}
      />,
    },
    {
      name: 'direction',
      title: '展示方向',
      display: 'block',
      tip: '菜单第一层展示方向',
      setter: <ChoiceSetter options={[
        { title: '水平', value: 'ver' },
        { title: '垂直', value: 'hoz' },
      ]}
      />,
    },
    ...createSlot({
      slotName: 'footer',
      slotTitle: 'Footer',
      display: 'block',
      initialChildren: [{
        componentName: 'Text',
        content: 'Hello, Footer',
      }],
      allowTextInput: false,
      initialValue: false,
    }),
    ...createSlot({
      slotName: 'header',
      slotTitle: 'Header',
      display: 'block',
      initialChildren: [{
        componentName: 'Text',
        content: 'Hello, Header',
      }],
      allowTextInput: false,
      initialValue: false,
    }),
    style({ advanced: true }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('menu'),
        ...events([
          {
            name: 'onItemClick', title: 'onItemClick 点击菜单项', initialValue: `/**
 * menu onItemClick
 * 参数配置参考这里：https://fusion.alibaba-inc.com/component/menu
 */
function onMenuItemClick(key, item, event) {
  console.log(key, item, event);
}
`,
          },
          {
            name: 'onSelect', title: 'onSelect 选中或取消选中菜单项', initialValue: `/**
 * menu onSelect
 * 参数配置参考这里：https://fusion.alibaba-inc.com/component/menu
 */
function onSelectItem(selectedKeys, extraObj) {
  console.log(selectedKeys, extraObj);
}
`,
          },
        ], { display: 'none' }),
      ],
    },
  ],
});
