import React from 'react';
import { Bundle, Env } from '@ali/visualengine';
import {
  TextSetter,
  ChoiceSetter,
  NumberSetter,
  BoolSetter,
  I18nSetter,
  SelectSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import $i18n from '../i18n/index';
import { balloonDoc } from '../common/tipUrls';

export default [
  Bundle.createPrototype({
    title: $i18n.get({ id: 'deepBubbleTips', dm: '气泡提示' }),
    componentName: 'Balloon',
    category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
    icon: Icon,
    docUrl: balloonDoc,
    isInline: true,
    isContainer: true,
    canDropIn: false,
    initialChildren: [
      {
        componentName: 'BalloonTrigger',
      },
      {
        componentName: 'BalloonOverlay',
      },
    ],

    snippets: [
      {
        screenshot: 'https://img.alicdn.com/tfs/TB1YdSIu.z1gK0jSZLeXXb9kVXa-112-64.png',
        label: $i18n.get({ id: 'deepBubbleTips', dm: '气泡提示' }),
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
        title: $i18n.get({ id: 'deepBubbleType', dm: '气泡类型' }),
        display: 'inline',
        initialValue: 'balloon',
        supportVariable: true,
        tip: $i18n.get({
          id: 'deepWhenTheBubbleType',
          dm: '气泡类型为 Tooltip 时，用于直接展示文字',
        }),
        setter: (
          <ChoiceSetter
            options={[
              {
                title: 'Balloon',
                value: 'balloon',
              },
              {
                title: 'Tooltip',
                value: 'tooltip',
              },
            ]}
          />
        ),
      },

      {
        name: 'type',
        title: $i18n.get({ id: 'deepStyleType', dm: '样式类型' }),
        display: 'inline',
        supportVariable: true,
        initialValue: 'normal',
        hidden() {
          return this.getProps().getPropValue('TYPE') !== 'balloon';
        },
        setter: (
          <ChoiceSetter
            options={[
              {
                title: 'Normal',
                value: 'normal',
              },
              {
                title: 'Primary',
                value: 'primary',
              },
            ]}
          />
        ),
      },

      {
        name: 'content',
        title: $i18n.get({ id: 'deepPopUpContent', dm: '弹窗内容' }),
        display: 'inline',
        hidden() {
          return this.getProps().getPropValue('TYPE') === 'balloon';
        },
        initialValue: {
          zh_CN: '提示内容',
          en_US: 'content',
          type: 'i18n',
        },
        supportVariable: true,
        setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      },

      {
        name: 'triggerType',
        title: $i18n.get({ id: 'deepTriggerBehavior', dm: '触发行为' }),
        display: 'inline',
        supportVariable: true,
        initialValue: 'click',
        setter: (
          <ChoiceSetter
            options={[
              {
                title: 'Hover',
                value: 'hover',
              },
              {
                title: 'Click',
                value: 'click',
              },
              {
                title: 'Focus',
                value: 'focus',
              },
            ]}
          />
        ),
      },

      {
        name: 'closable',
        title: $i18n.get({ id: 'deepCloseButton', dm: '关闭按钮' }),
        tip: $i18n.get({ id: 'deepWhetherToDisplayClose', dm: '是否显示关闭按钮' }),
        display: 'inline',
        supportVariable: true,
        initialValue: true,
        hidden() {
          return this.getProps().getPropValue('TYPE') !== 'balloon';
        },
        setter: <BoolSetter />,
      },

      {
        name: 'defaultVisible',
        title: $i18n.get({ id: 'deepDefaultDisplay', dm: '默认显示' }),
        tip: $i18n.get({ id: 'deepWhetherItIsDisplayed', dm: '初始化时是否为显示状态' }),
        display: 'inline',
        supportVariable: true,
        initialValue: false,
        setter: <BoolSetter />,
      },

      {
        name: 'needAdjust',
        display: 'none',
        initialValue: true,
      },

      {
        name: 'delay',
        title: $i18n.get({ id: 'deepDelayDisplay', dm: '延时显示' }),
        display: 'inline',
        initialValue: 0,
        hidden() {
          return (
            this.getProps().getPropValue('TYPE') !== 'balloon' ||
            this.getProps().getPropValue('triggerType') !== 'hover'
          );
        },
        setter: (
          <NumberSetter
            min={0}
            max={null}
            step={0.1}
            placeholder={$i18n.get({ id: 'deepMillisecond', dm: '毫秒' })}
          />
        ),
      },

      {
        name: 'align',
        title: $i18n.get({ id: 'deepPopUpDirection', dm: '弹出方向' }),
        display: 'inline',
        initialValue: 'b',
        supportVariable: true,
        setter: (
          <SelectSetter
            options={[
              {
                title: $i18n.get({ id: 'deepOn', dm: '上' }),
                value: 't',
              },
              {
                title: $i18n.get({ id: 'deepUnder', dm: '下' }),
                value: 'b',
              },
              {
                title: $i18n.get({ id: 'deepLeft', dm: '左' }),
                value: 'l',
              },
              {
                title: $i18n.get({ id: 'deepRight', dm: '右' }),
                value: 'r',
              },
              {
                title: $i18n.get({ id: 'deepUpperLeft', dm: '上左' }),
                value: 'tl',
              },
              {
                title: $i18n.get({ id: 'deepUpperRight', dm: '上右' }),
                value: 'tr',
              },
              {
                title: $i18n.get({ id: 'deepLowerLeft', dm: '下左' }),
                value: 'bl',
              },
              {
                title: $i18n.get({ id: 'deepLowerRight', dm: '下右' }),
                value: 'br',
              },
              {
                title: $i18n.get({ id: 'deepUpperLeft.1', dm: '左上' }),
                value: 'lt',
              },
              {
                title: $i18n.get({ id: 'deepLowerLeft.1', dm: '左下' }),
                value: 'lb',
              },
              {
                title: $i18n.get({ id: 'deepUpperRight.1', dm: '右上' }),
                value: 'rt',
              },
              {
                title: $i18n.get({ id: 'deepLowerRight.1', dm: '右下' }),
                value: 'rb',
              },
            ]}
            compact={false}
          />
        ),
      },

      {
        name: 'display',
        title: $i18n.get({ id: 'deepOccupySpace', dm: '占据空间' }),
        tip: $i18n.get({ id: 'deepTriggerElementOccupiedSpace', dm: '触发元素占据空间' }),
        display: 'inline',
        initialValue: 'inline-block',
        supportVariable: true,
        setter: (
          <ChoiceSetter
            options={[
              {
                title: $i18n.get({ id: 'deepActualSize', dm: '实际大小' }),
                value: 'inline-block',
              },
              {
                title: $i18n.get({ id: 'deepWholeLine', dm: '整行' }),
                value: 'block',
              },
            ]}
            compact={false}
          />
        ),
      },

      {
        name: 'overlayMaxWidth',
        title: $i18n.get({ id: 'deepMaximumWidth', dm: '最大宽度' }),
        tip: $i18n.get({
          id: 'deepFloatingLayerMaximumWidth',
          dm: '浮层最大宽度，initial 表示不限制宽度',
        }),
        display: 'inline',
        initialValue: '300px',
        supportVariable: true,
        setter: (
          <TextSetter
            placeholder={$i18n.get({ id: 'deepInitialMeansNoLimit', dm: 'initial 表示不限制宽度' })}
          />
        ),
        hidden() {
          return this.getProps().getPropValue('TYPE') !== 'balloon';
        },
      },

      {
        name: 'balloonOverlayVisible',
        title: $i18n.get({ id: 'deepShowTheLayers', dm: '显示弹层' }),
        tip: $i18n.get({ id: 'deepThisConfigurationItemIs', dm: '该配置项只在设计器中有效' }),
        display: 'inline',
        initialValue: true,
        setter: <BoolSetter />,
        hidden() {
          return !Env.supports('subview') || this.getProps().getPropValue('TYPE') !== 'balloon';
        },
      },

      {
        type: 'group',
        title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
        display: 'accordion',
        items: [
          uuid('Balloon'),
          {
            name: 'CONTROL',
            title: $i18n.get({ id: 'deepRestrictedComponents', dm: '受限组件' }),
            tip: $i18n.get({ id: 'deepTurnOnRestrictedComponents', dm: '开启受限组件' }),
            display: 'inline',
            supportVariable: true,
            initialValue: false,
            setter: <BoolSetter />,
          },

          {
            name: 'visible',
            title: $i18n.get({ id: 'deepHomericDisplay', dm: '弹层显示' }),
            tip: $i18n.get({ id: 'deepTheStatusOfThe', dm: '弹层当前显示的状态' }),
            display: 'inline',
            supportVariable: true,
            initialValue: false,
            hidden() {
              return !this.getProps().getPropValue('CONTROL');
            },
            setter: <BoolSetter />,
          },

          ...events([
            {
              name: 'onVisibleChange',
              title: $i18n.get({
                id: 'deepONVISibleChangeHomewhereShowHidden',
                dm: 'onVisibleChange 弹层显示隐藏变化',
              }),
              initialValue: `/**
 * Balloon 弹层显示隐藏变化
 * @param visible 弹层是否隐藏和显示
 */
function onVisibleChange(visible) {
  console.log('onVisibleChange', visible);
}`,
            },

            {
              name: 'onClose',
              title: $i18n.get({ id: 'deepOnCloseHomanderClose', dm: 'onClose 弹层关闭' }),
              initialValue: `/**
 * Balloon 当弹层关闭时
 */
function onClose() {
  console.log('onClose');
}`,
            },

            {
              name: 'afterClose',
              title: $i18n.get({ id: 'deepAfterCloseIsClosed', dm: 'afterClose 弹层关闭后' }),
              initialValue: `/**
 * Balloon 浮层关闭后触发的事件, 如果有动画，则在动画结束后触发
 */
function afterClose() {
  console.log('afterClose');
}`,
            },
          ]),
        ],
      },
    ],
  }),

  Bundle.createPrototype({
    title: $i18n.get({ id: 'deepTriggerElement', dm: '触发元素' }),
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
    title: $i18n.get({ id: 'deepMatrix', dm: '弹层' }),
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
