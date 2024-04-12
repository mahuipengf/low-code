
import React from 'react';
import { Bundle, Env } from '@ali/visualengine';
import {
  TextSetter, ChoiceSetter, NumberSetter, BoolSetter, I18nSetter, SelectSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import { balloonDoc } from '../common/tipUrls';

export default [
  Bundle.createPrototype({
    title: '气泡提示',
    componentName: 'Balloon',
    category: '高级',
    icon: Icon,
    docUrl: balloonDoc,
    isInline: true,
    isContainer: true,
    canDropIn: false,
    initialChildren: [{
      componentName: 'BalloonTrigger',
    }, {
      componentName: 'BalloonOverlay',
    }],
    snippets: [
      {
        screenshot: 'https://img.alicdn.com/tfs/TB1YdSIu.z1gK0jSZLeXXb9kVXa-112-64.png',
        label: '气泡提示',
        schema: {
          componentName: 'Balloon',
          props: {
            align: 'r',
          },
        },
      },
    ],
    configure: [
      {
        name: 'TYPE',
        title: '气泡类型',
        display: 'inline',
        initialValue: 'balloon',
        supportVariable: false,
        tip: '气泡类型为 Tooltip 时，用于直接展示文字',
        setter: <ChoiceSetter options={[{
          title: 'Balloon',
          value: 'balloon',
        }, {
          title: 'Tooltip',
          value: 'tooltip',
        }]}
        />,
      },
      {
        name: 'type',
        title: '样式类型',
        display: 'inline',
        supportVariable: false,
        initialValue: 'normal',
        hidden() {
          return (this.getProps().getPropValue('TYPE') !== 'balloon');
        },
        setter: <ChoiceSetter options={[{
          title: 'Normal',
          value: 'normal',
        }, {
          title: 'Primary',
          value: 'primary',
        }]}
        />,
      },
      {
        name: 'content',
        title: '弹窗内容',
        display: 'inline',
        hidden() {
          return (this.getProps().getPropValue('TYPE') === 'balloon');
        },
        initialValue: {
          zh_CN: '提示内容',
          en_US: 'content',
          type: 'i18n',
        },
        setter: <I18nSetter placeholder="请输入" />,
      },
      {
        name: 'triggerType',
        title: '触发行为',
        display: 'inline',
        supportVariable: false,
        initialValue: 'click',
        setter: <ChoiceSetter options={[{
          title: 'Hover',
          value: 'hover',
        }, {
          title: 'Click',
          value: 'click',
        }, {
          title: 'Focus',
          value: 'focus',
        }]}
        />,
      },
      {
        name: 'closable',
        title: '关闭按钮',
        tip: '是否显示关闭按钮',
        display: 'inline',
        supportVariable: false,
        initialValue: true,
        hidden() {
          return (this.getProps().getPropValue('TYPE') !== 'balloon');
        },
        setter: <BoolSetter />,
      },
      {
        name: 'defaultVisible',
        title: '默认显示',
        tip: '初始化时是否为显示状态',
        display: 'inline',
        supportVariable: false,
        initialValue: false,
        setter: <BoolSetter />,
      },
      {
        name: 'needAdjust',
        display: 'none',
        initialValue: true
      },
      {
        name: 'delay',
        title: '延时显示',
        display: 'inline',
        initialValue: 0,
        hidden() {
          return ((this.getProps().getPropValue('TYPE') !== 'balloon') || (this.getProps().getPropValue('triggerType') !== 'hover'));
        },
        setter: <NumberSetter min={0} max={null} step={0.1} placeholder="毫秒" />,
      },
      {
        name: 'align',
        title: '弹出方向',
        display: 'inline',
        initialValue: 'b',
        supportVariable: false,
        setter: <SelectSetter options={[{
          title: '上',
          value: 't',
        }, {
          title: '下',
          value: 'b',
        }, {
          title: '左',
          value: 'l',
        }, {
          title: '右',
          value: 'r',
        }, {
          title: '上左',
          value: 'tl',
        }, {
          title: '上右',
          value: 'tr',
        }, {
          title: '下左',
          value: 'bl',
        }, {
          title: '下右',
          value: 'br',
        }, {
          title: '左上',
          value: 'lt',
        }, {
          title: '左下',
          value: 'lb',
        }, {
          title: '右上',
          value: 'rt',
        }, {
          title: '右下',
          value: 'rb',
        }]}
          compact={false}
        />,
      },
      {
        name: 'display',
        title: '占据空间',
        tip: '触发元素占据空间',
        display: 'inline',
        initialValue: 'inline-block',
        supportVariable: false,
        setter: <ChoiceSetter options={[{
          title: '实际大小',
          value: 'inline-block',
        }, {
          title: '整行',
          value: 'block',
        }]}
          compact={false}
        />,
      },
      {
        name: 'overlayMaxWidth',
        title: '最大宽度',
        tip: '浮层最大宽度，initial 表示不限制宽度',
        display: 'inline',
        initialValue: '300px',
        supportVariable: false,
        setter: <TextSetter placeholder="initial 表示不限制宽度" />,
        hidden() {
          return this.getProps().getPropValue('TYPE') !== 'balloon';
        },
      },
      {
        name: 'balloonOverlayVisible',
        title: '显示弹层',
        tip: '该配置项只在设计器中有效',
        display: 'inline',
        initialValue: true,
        setter: <BoolSetter />,
        hidden() {
          return !Env.supports('subview') || this.getProps().getPropValue('TYPE') !== 'balloon';
        },
      },
      {
        type: 'group',
        title: '高级',
        display: 'accordion',
        collapsed: true,
        items: [
          uuid('Balloon'),
          {
            name: 'CONTROL',
            title: '受限组件',
            tip: '开启受限组件',
            display: 'inline',
            supportVariable: false,
            initialValue: false,
            setter: <BoolSetter />,
          },
          {
            name: 'visible',
            title: '弹层显示',
            tip: '弹层当前显示的状态',
            display: 'inline',
            supportVariable: false,
            initialValue: false,
            hidden() {
              return !this.getProps().getPropValue('CONTROL');
            },
            setter: <BoolSetter />,
          },
          ...events([
            {
              name: 'onVisibleChange', title: 'onVisibleChange 弹层显示隐藏变化', initialValue: `/**
 * Balloon 弹层显示隐藏变化 
 * @param visible 弹层是否隐藏和显示
 */
function onVisibleChange(visible) {
  console.log('onVisibleChange', visible);
}`,
            },
            {
              name: 'onClose', title: 'onClose 弹层关闭', initialValue: `/**
 * Balloon 当弹层关闭时
 */
function onClose() {
  console.log('onClose');
}`,
            },
            {
              name: 'afterClose', title: 'afterClose 弹层关闭后', initialValue: `/**
 * Balloon 浮层关闭后触发的事件, 如果有动画，则在动画结束后触发
 */
function afterClose() {
  console.log('afterClose');
}`,
            },
          ], { display: 'none' }),
        ],
      },
    ],
  }),
  Bundle.createPrototype({
    title: '触发元素',
    icon: Icon,
    componentName: 'BalloonTrigger',
    category: null,
    isInline: true,
    isContainer: true,
    canHovering: false,
    canSelecting: true,
    canDragging: false,
    canOperating: false,
    canDropIn: true,
    canDropTo: 'Balloon',
    configure: [
      style({
        advanced: true,
      }),
    ],
  }),
  Bundle.createPrototype({
    title: '弹层',
    icon: Icon,
    componentName: 'BalloonOverlay',
    category: null,
    isInline: true,
    isContainer: true,
    isFloating: true, // 是否悬浮元素
    canHovering: false,
    canSelecting: true,
    canDragging: false,
    canOperating: false,
    canDropIn: true,
    canDropTo: 'Balloon',
    configure: [
      style({
        advanced: true,
      }),
    ],
  }),

];
