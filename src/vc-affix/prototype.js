import React from 'react';
import { Bundle } from '@ali/visualengine';
import { NumberSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepNail', dm: '固钉' }),
  componentName: 'Affix',
  category: null, // 暂时不显示该组件
  icon: Icon,
  isContainer: true,
  configure: [
    {
      name: 'offsetTop',
      title: $i18n.get({ id: 'deepDistanceToTheTop', dm: '距离窗口顶部达到指定偏移量后触发' }),
      display: 'block',
      setter: <NumberSetter />,
    },

    {
      name: 'offsetBottom',
      title: $i18n.get({ id: 'deepDistanceToTheTop', dm: '距离窗口顶部达到指定偏移量后触发' }),
      display: 'block',
      setter: <NumberSetter />,
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('Affix'),
        ...events([
          {
            name: 'onAffix',
            title: $i18n.get({ id: 'deepWhenThePatternOf', dm: '当元素的样式发生固钉样式变化时' }),
          },
        ]),
      ],
    },
  ],
});
