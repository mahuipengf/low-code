import React from 'react';
import { Bundle } from '@ali/visualengine';
import { ChoiceSetter, I18nSetter, JsonSetter } from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import IconSetter from '../common/vs-fusion-icon/index';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepDataText', dm: '数据文本' }),
  componentName: 'NumberInfo',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: '',
  isContainer: false,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1lSKJu.Y1gK0jSZFMXXaWcVXa-112-64.png',
      label: $i18n.get({ id: 'deepDataText', dm: '数据文本' }),
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
      slotTitle: $i18n.get({ id: 'deepTitle', dm: '标题' }),
      display: 'inline',
      allowTextInput: true,
      supportVariable: true,
      initialValue: {
        type: 'i18n',
        zh_CN: '数据标题',
        en_US: 'Data Title',
      },
    }),

    {
      name: 'align',
      title: $i18n.get({ id: 'deepAlignment', dm: '对齐方式' }),
      display: 'inline',
      initialValue: 'left',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepLeftAlignment', dm: '左对齐' }),
              value: 'left',
            },
            {
              title: $i18n.get({ id: 'deepRightAlignment', dm: '右对齐' }),
              value: 'right',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      title: $i18n.get({ id: 'deepData', dm: '数据' }),
      name: 'number',
      display: 'inline',
      supportVariable: true,
      initialValue: {
        type: 'i18n',
        zh_CN: '1024',
        en_US: '1024',
      },

      setter: <I18nSetter />,
    },

    {
      title: $i18n.get({ id: 'deepDataUnit', dm: '数据单位' }),
      name: 'unit',
      display: 'inline',
      supportVariable: true,
      initialValue: {
        type: 'i18n',
        zh_CN: '个',
        en_US: '',
      },

      setter: <I18nSetter />,
    },

    {
      name: 'trend',
      title: $i18n.get({ id: 'deepTrend', dm: '变化趋势' }),
      display: 'inline',
      initialValue: '',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepNo', dm: '无' }),
              value: '',
            },
            {
              title: $i18n.get({ id: 'deepIncrease', dm: '增长' }),
              value: 'up',
            },
            {
              title: $i18n.get({ id: 'deepDecline', dm: '下降' }),
              value: 'down',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'trendLabel',
      title: $i18n.get({ id: 'deepTrendText', dm: '趋势文本' }),
      display: 'inline',
      supportVariable: true,
      initialValue: {
        type: 'i18n',
        zh_CN: '环比增长',
        en_US: 'Chain Growth',
      },

      setter: <I18nSetter />,
    },

    {
      title: $i18n.get({ id: 'deepTrendData', dm: '趋势数据' }),
      name: 'trendNumber',
      display: 'inline',
      supportVariable: true,
      initialValue: {
        type: 'i18n',
        zh_CN: '+8%',
        en_US: '+8%',
      },

      setter: <I18nSetter />,
    },

    {
      name: 'trendPosition',
      title: $i18n.get({ id: 'deepTrendPosition', dm: '趋势位置' }),
      display: 'inline',
      initialValue: '',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepAutomatic', dm: '自动' }),
              value: '',
            },
            {
              title: $i18n.get({ id: 'deepRight', dm: '右侧' }),
              value: 'right',
            },
            {
              title: $i18n.get({ id: 'deepBottom', dm: '底部' }),
              value: 'bottom',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'tips',
      title: $i18n.get({ id: 'deepCopywriter', dm: '说明文案' }),
      display: 'inline',
      initialValue: {
        type: 'i18n',
        zh_CN: '',
        en_US: '',
      },

      setter: <I18nSetter />,
      supportVariable: true,
    },

    {
      name: 'tipsTrigger',
      title: $i18n.get({ id: 'deepTipsIcon', dm: '提示图标' }),
      display: 'inline',
      initialValue: 'prompt',
      setter: <IconSetter />,
      supportVariable: true,
    },

    {
      name: 'tipsProps',
      title: $i18n.get({ id: 'deepPromptAttribute', dm: '提示属性' }),
      tip: $i18n.get({
        id: 'deepTransferThePropertiesOf',
        dm: '透传给 Balloon 组件的属性，可用属性请参考 Balloon 文档',
      }),
      display: 'inline',
      initialValue: {},
      setter: <JsonSetter />,
      supportVariable: true,
    },

    style({ advanced: true }),
  ],
});
