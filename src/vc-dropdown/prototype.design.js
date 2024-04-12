
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter, JsonSetter, I18nSetter, ChoiceSetter, BoolSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '下拉菜单',
  componentName: 'Dropdown',
  category: '高级',
  icon: Icon,
  docUrl: '',
  isContainer: true,
  initialChildren: [
    {
      componentName: 'Button',
      props: {
        type: 'secondary',
        content: {
          type: 'i18n',
          en_US: 'Dropdown',
          zh_CN: '下拉菜单',
        },
      },
    },
  ],
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1YNWMu1L2gK0jSZFmXXc7iXXa-112-64.png',
      label: '下拉菜单',
      schema: {
        "componentName": "Dropdown",
        "props": {
          "dataSource": [
            {
              "label": "操作1",
              "key": "option1"
            },
            {
              "label": "操作2",
              "key": "option2"
            },
            {
              "label": "操作3",
              "key": "option3"
            }
          ],
          "triggerType": "hover",
          "disabled": false,
          "align": "tl, bl",
          "offset": [
            0,
            0
          ],
          "autoFocus": false,
          "hasMask": false,
          "cache": false
        },
        "children": [
          {
            "componentName": "Button",
            "props": {
              "content": "下拉菜单",
              "type": "secondary",
              "size": "medium",
              "behavior": "NORMAL",
              "baseIcon": "",
              "otherIcon": "",
              "loading": false,
              "triggerEventsWhenLoading": false
            }
          }
        ]
      }
    }
  ],
  configure: [
    {
      name: 'dataSource',
      title: '数据',
      display: 'block',
      supportVariable: false,
      initialValue: [{
        label: '操作1',
        key: 'option1',
      }, {
        label: '操作2',
        key: 'option2',
      }, {
        label: '操作3',
        key: 'option3',
      }],
      setter: <JsonSetter />,
    },
    {
      name: 'triggerType',
      title: '操作类型',
      display: 'inline',
      initialValue: 'hover',
      setter: <ChoiceSetter options={[
        { title: 'hover', value: 'hover' },
        { title: 'click', value: 'click' },
        { title: 'focus', value: 'focus' },
      ]}
      />,
    },
    style({ advanced: true }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('dropdown'),
        ...events([{
          name: 'onItemClick', title: 'onItemClick 点击菜单项', initialValue: `/**
* onItemClick
* @param key {String} 点击的项目 key
* @param item {Object} 点击的菜单项完整数据
* @param evt {Event} 触发事件
*/
function onItemClick(key, item, evt){
  console.log(key);
}`,
        }, {
          name: 'onVisibleChange', title: 'onVisibleChange 弹层显示或隐藏事件', initialValue: `/**
* onVisibleChange
* @param visible {Boolean} 弹层是否可见
* @param type {String} 触发来源
*/
function onVisibleChange(visible, type){
  console.log(visible, type);
}`,
        }], { display: 'none' }),
      ],
    },
  ],
});
