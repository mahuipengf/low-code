import React from 'react';
import { Bundle } from '@ali/visualengine';
import { ChoiceSetter, I18nSetter } from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepDataTrend', dm: '数据趋势' }),
  componentName: 'NumberTrend',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: '',
  isContainer: false,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1.rOIu2b2gK0jSZK9XXaEgFXa-112-64.png',
      label: $i18n.get({ id: 'deepDataTrend', dm: '数据趋势' }),
      schema: {
        componentName: 'NumberTrend',
        props: {},
      },
    },
  ],

  configure: [
    {
      title: $i18n.get({ id: 'deepTrendTitle', dm: '趋势标题' }),
      name: 'trendLabel',
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
      name: 'trend',
      title: $i18n.get({ id: 'deepTrend', dm: '变化趋势' }),
      display: 'inline',
      initialValue: 'up',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepRise', dm: '上升' }),
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
      title: $i18n.get({ id: 'deepChangeData', dm: '变化数据' }),
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

    style({ advanced: true }),
  ],
});
