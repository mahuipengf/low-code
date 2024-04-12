import React from 'react';
import { Bundle } from '@ali/visualengine';
import { TextSetter, SelectSetter, ChoiceSetter, BoolSetter } from '@ali/visualengine-utils';

import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import FusionIconSetter from '../common/vs-fusion-icon/index';

import Icon from './logo.svg';
import $i18n from '../i18n/index';
import { messageDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepMessageNotification', dm: '信息提示' }),
  componentName: 'Message',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: messageDoc,
  isContainer: false,
  hasSlot: true,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1zZyJu4z1gK0jSZSgXXavwpXa-112-64.png',
      label: $i18n.get({ id: 'deepMessageNotification', dm: '信息提示' }),
      schema: {
        componentName: 'Message',
        props: {},
      },
    },
  ],

  configure: [
    {
      name: 'title',
      title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
      display: 'inline',
      initialValue: '标题',
      setter: <TextSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
    },

    {
      name: 'type',
      title: $i18n.get({ id: 'deepTypesOf', dm: '类型' }),
      display: 'inline',
      initialValue: 'success',
      supportVariable: true,
      setter: (
        <SelectSetter
          options={[
            {
              title: 'success',
              value: 'success',
            },
            {
              title: 'warning',
              value: 'warning',
            },
            {
              title: 'error',
              value: 'error',
            },
            {
              title: 'notice',
              value: 'notice',
            },
            {
              title: 'help',
              value: 'help',
            },
            {
              title: 'loading',
              value: 'loading',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'size',
      title: $i18n.get({ id: 'deepSize', dm: '尺寸' }),
      display: 'inline',
      initialValue: 'medium',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepIn', dm: '中' }),
              value: 'medium',
              tip: $i18n.get({ id: 'deepNormalSize', dm: '正常尺寸' }),
            },
            {
              title: $i18n.get({ id: 'deepBig', dm: '大' }),
              value: 'large',
              tip: $i18n.get({ id: 'deepLargeSize', dm: '大尺寸' }),
            },
          ]}
          compact={false}
        />
      ),

      supportVariable: true,
    },

    {
      name: 'shape',
      title: $i18n.get({ id: 'deepExterior', dm: '外观' }),
      display: 'inline',
      initialValue: 'inline',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: 'inline',
              value: 'inline',
            },
            {
              title: 'addon',
              value: 'addon',
            },
            {
              title: 'toast',
              value: 'toast',
            },
          ]}
          compact={false}
        />
      ),

      supportVariable: true,
    },

    ...createSlot({
      slotName: 'content',
      slotTitle: $i18n.get({ id: 'deepContent', dm: '内容' }),
      allowTextInput: true,
      supportVariable: true,
      initialValue: {
        type: 'i18n',
        zh_CN: '内容文案',
        en_US: 'Message content',
      },
    }),

    {
      type: 'composite',
      name: 'iconType',
      title: $i18n.get({ id: 'deepTipsIcon', dm: '提示图标' }),
      display: 'block',
      items: [
        {
          name: 'useType',
          title: ' ',
          display: 'plain',
          initialValue: true,
          setter: (
            <ChoiceSetter
              options={[
                {
                  title: $i18n.get({ id: 'deepUseTheBaseIcon', dm: '使用基础图标' }),
                  value: true,
                  tip: $i18n.get({ id: 'deepUseTheBaseIcon', dm: '使用基础图标' }),
                },
                {
                  title: $i18n.get({ id: 'deepUseCustomIcons', dm: '使用自定义图标' }),
                  value: false,
                  tip: $i18n.get({ id: 'deepUseCustomIcons', dm: '使用自定义图标' }),
                },
              ]}
            />
          ),
        },

        {
          name: 'baseType',
          title: $i18n.get({ id: 'deepBasicIcon', dm: '基础图标' }),
          display: 'inline',
          initialValue: '',
          hidden() {
            return !this.getProps().getPropValue('iconType.useType');
          },
          setter: <FusionIconSetter />,
        },
        {
          name: 'otherType',
          title: $i18n.get({ id: 'deepCustomIcon', dm: '自定义图标' }),
          display: 'inline',
          initialValue: '',
          tip: $i18n.get({ id: 'deepPleaseEnterTheIcon', dm: '请输入图标的name' }),
          hidden() {
            return this.getProps().getPropValue('iconType.useType');
          },
          setter: <TextSetter />,
        },
      ],
    },

    {
      name: 'closeable',
      title: $i18n.get({ id: 'deepShowCloseButton', dm: '显示"关闭"按钮' }),
      display: 'block',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
    },

    {
      name: 'visible',
      title: $i18n.get({ id: 'deepDisplayState', dm: '显示状态' }),
      display: 'block',
      initialValue: true,
      supportVariable: true,
      setter: <BoolSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      hidden() {
        return this.getProps().getPropValue('closeable') === true;
      },
    },

    {
      name: 'defaultVisible',
      title: $i18n.get({ id: 'deepDefaultDisplayStatus', dm: '默认显示状态' }),
      display: 'block',
      initialValue: true,
      supportVariable: true,
      setter: <BoolSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      hidden() {
        return this.getProps().getPropValue('closeable') === false;
      },
    },

    {
      name: 'animation',
      title: $i18n.get({ id: 'deepOpenTheExhibition', dm: '开启展开收起动画' }),
      display: 'block',
      initialValue: true,
      supportVariable: true,
      setter: <BoolSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      hidden() {
        return this.getProps().getPropValue('closeable') === false;
      },
    },

    style({
      advanced: true,
    }),

    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('message'),
        ...events([
          {
            name: 'onClose',
            title: $i18n.get({ id: 'deepOncloseClickToClose', dm: 'onClose 点击关闭' }),
            initialValue: `/**
* Message onClose 
*/
function onClose(){
  console.log('onClose');
}`,
          },
        ]),
      ],
    },
  ],
});
