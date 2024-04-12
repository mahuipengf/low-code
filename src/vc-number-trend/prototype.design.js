
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ChoiceSetter, I18nSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '数据趋势',
  componentName: 'NumberTrend',
  category: '高级',
  icon: Icon,
  docUrl: '',
  isContainer: false,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1.rOIu2b2gK0jSZK9XXaEgFXa-112-64.png',
      label: '数据趋势',
      schema: {
        componentName: 'NumberTrend',
        props: {},
      },
    },
  ],
  configure: [
    {
      title: '趋势标题',
      name: 'trendLabel',
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
      name: 'trend',
      title: '变化趋势',
      display: 'inline',
      initialValue: 'up',
      supportVariable: false,
      setter: (
        <ChoiceSetter
          options={[{
            title: '上升',
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
      title: '变化数据',
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
    style({ advanced: true }),
  ],
});
