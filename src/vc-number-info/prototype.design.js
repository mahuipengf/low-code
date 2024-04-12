
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ChoiceSetter, I18nSetter, JsonSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import IconSetter from '../common/vs-fusion-icon/index';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '数据文本',
  componentName: 'NumberInfo',
  category: '高级',
  icon: Icon,
  docUrl: '',
  isContainer: false,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1lSKJu.Y1gK0jSZFMXXaWcVXa-112-64.png',
      label: '数据文本',
      schema: {
        componentName: 'NumberInfo',
        props: {
          trend: 'up',
          trendLabel: {
            type: 'i18n',
            use: 'zh_CN',
            en_US: null,
            zh_CN: '环比增长',
          },
          trendNumber: {
            type: 'i18n',
            use: 'zh_CN',
            en_US: null,
            zh_CN: '+8%',
          },
        },
      },
    },
  ],
  configure: [
    ...createSlot({
      slotName: 'title',
      slotTitle: '标题',
      display: 'inline',
      allowTextInput: true,
      supportVariable: false,
      initialValue: {
        type: 'i18n',
        zh_CN: '数据标题',
        en_US: 'Data Title',
      },
    }),
    {
      name: 'align',
      title: '对齐方式',
      display: 'inline',
      initialValue: 'left',
      supportVariable: false,
      setter: (
        <ChoiceSetter
          options={[{
            title: '左对齐',
            value: 'left',
          }, {
            title: '右对齐',
            value: 'right',
          }]}
          compact={false}
        />
      ),
    },
    {
      title: '数据',
      name: 'number',
      display: 'inline',
      supportVariable: false,
      initialValue: {
        type: 'i18n',
        zh_CN: '1024',
        en_US: '1024',
      },
      setter: <I18nSetter />,
    },
    {
      title: '数据单位',
      name: 'unit',
      display: 'inline',
      supportVariable: false,
      initialValue: {
        type: 'i18n',
        zh_CN: '个',
        en_US: '',
      },
      setter: <I18nSetter />,
    },
    {
      name: 'trend',
      title: '变化趋势',
      display: 'inline',
      initialValue: '',
      supportVariable: false,
      setter: (
        <ChoiceSetter
          options={[{
            title: '无',
            value: '',
          }, {
            title: '增长',
            value: 'up',
          }, {
            title: '下降',
            value: 'down',
          }]}
          compact={false}
        />
      ),
    },
    {
      name: 'trendLabel',
      title: '趋势文本',
      display: 'inline',
      supportVariable: false,
      initialValue: {
        type: 'i18n',
        zh_CN: '环比增长',
        en_US: 'Chain Growth',
      },
      setter: <I18nSetter />,
    },
    {
      title: '趋势数据',
      name: 'trendNumber',
      display: 'inline',
      supportVariable: false,
      initialValue: {
        type: 'i18n',
        zh_CN: '+8%',
        en_US: '+8%',
      },
      setter: <I18nSetter />,
    },
    {
      name: 'trendPosition',
      title: '趋势位置',
      display: 'inline',
      initialValue: '',
      supportVariable: false,
      setter: (
        <ChoiceSetter
          options={[{
            title: '自动',
            value: '',
          }, {
            title: '右侧',
            value: 'right',
          }, {
            title: '底部',
            value: 'bottom',
          }]}
          compact={false}
        />
      ),
    },
    {
      name: 'tips',
      title: '说明文案',
      display: 'inline',
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },
      setter: <I18nSetter />,
      supportVariable: false,
    },
    {
      name: 'tipsTrigger',
      title: '提示图标',
      display: 'inline',
      initialValue: 'prompt',
      setter: <IconSetter />,
      supportVariable: false,
    },
    style({ advanced: true }),
  ],
});
