import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  JsonSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { overlayAlign } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepDropDownMenu', dm: '下拉菜单' }),
  componentName: 'Dropdown',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
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
      label: $i18n.get({ id: 'deepDropDownMenu', dm: '下拉菜单' }),
      schema: {
        componentName: 'Dropdown',
        props: {
          dataSource: [
            {
              label: $i18n.get({ id: 'deepOperation', dm: '操作1' }),
              key: 'option1',
            },

            {
              label: $i18n.get({ id: 'deepOperation.3', dm: '操作2' }),
              key: 'option2',
            },

            {
              label: $i18n.get({ id: 'deepOperation.4', dm: '操作3' }),
              key: 'option3',
            },
          ],

          triggerType: 'hover',
          disabled: false,
          align: 'tl, bl',
          offset: [0, 0],

          autoFocus: false,
          hasMask: false,
          cache: false,
        },

        children: [
          {
            componentName: 'Button',
            props: {
              content: $i18n.get({ id: 'deepDropDownMenu', dm: '下拉菜单' }),
              type: 'secondary',
              size: 'medium',
              behavior: 'NORMAL',
              baseIcon: '',
              otherIcon: '',
              loading: false,
              triggerEventsWhenLoading: false,
            },
          },
        ],
      },
    },
  ],

  configure: [
    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepData', dm: '数据' }),
      display: 'block',
      supportVariable: true,
      initialValue: [
        {
          label: $i18n.get({ id: 'deepOperation', dm: '操作1' }),
          key: 'option1',
        },
        {
          label: $i18n.get({ id: 'deepOperation.3', dm: '操作2' }),
          key: 'option2',
        },
        {
          label: $i18n.get({ id: 'deepOperation.4', dm: '操作3' }),
          key: 'option3',
        },
      ],

      setter: <JsonSetter />,
    },

    {
      name: 'triggerType',
      title: $i18n.get({ id: 'deepOperatingType', dm: '操作类型' }),
      display: 'inline',
      initialValue: 'hover',
      setter: (
        <ChoiceSetter
          options={[
            { title: 'hover', value: 'hover' },
            { title: 'click', value: 'click' },
            { title: 'focus', value: 'focus' },
          ]}
        />
      ),
    },

    {
      name: 'disabled',
      title: $i18n.get({ id: 'deepProhibit', dm: '禁止' }),
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'align',
      title: $i18n.get({ id: 'deepLayoutRelativeToTrigger', dm: '弹层相对于触发元素的定位' }),
      display: 'block',
      initialValue: 'tl, bl',
      tip: {
        content: $i18n.get({ id: 'deepClickToViewPositioning', dm: '点击查看-定位' }),
        url: overlayAlign,
      },

      setter: <TextSetter />,
    },

    {
      name: 'offset',
      title: $i18n.get({ id: 'deepTheLayersOfThe', dm: '弹层相对于触发元素的微调' }),
      display: 'block',
      initialValue: [0, 0],
      setter: <JsonSetter />,
    },

    {
      name: 'autoFocus',
      title: $i18n.get({ id: 'deepAutomaticAcquisitionFocus', dm: '自动获取焦点' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'hasMask',
      title: $i18n.get({ id: 'deepMask', dm: '遮罩' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'cache',
      title: $i18n.get({ id: 'deepWhetherToKeepThe', dm: '隐藏时是否保留子节点' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('dropdown'),
        ...events([
          {
            name: 'onItemClick',
            title: $i18n.get({ id: 'deepOnItemClickClickOnThe', dm: 'onItemClick 点击菜单项' }),
            initialValue: `/**
* onItemClick
* @param key {String} 点击的项目 key
* @param item {Object} 点击的菜单项完整数据
* @param evt {Event} 触发事件
*/
function onItemClick(key, item, evt){
  console.log(key);
}`,
          },
          {
            name: 'onVisibleChange',
            title: $i18n.get({
              id: 'deepONVISIBLECHANGELayoutDisplayOr',
              dm: 'onVisibleChange 弹层显示或隐藏事件',
            }),
            initialValue: `/**
* onVisibleChange
* @param visible {Boolean} 弹层是否可见
* @param type {String} 触发来源
*/
function onVisibleChange(visible, type){
  console.log(visible, type);
}`,
          },
        ]),
      ],
    },
  ],
});
