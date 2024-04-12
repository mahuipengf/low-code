
import React from 'react';
import { Bundle } from '@ali/visualengine';
import { NumberSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '固钉',
  componentName: 'Affix',
  category: null, // 暂时不显示该组件
  icon: Icon,
  isContainer: true,
  configure: [
    {
      name: 'offsetTop',
      title: '距离窗口顶部达到指定偏移量后触发',
      display: 'block',
      setter: <NumberSetter />,
    },
    {
      name: 'offsetBottom',
      title: '距离窗口顶部达到指定偏移量后触发',
      display: 'block',
      setter: <NumberSetter />,
    },
    style({ advanced: true }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('Affix'),
        ...events([
          { name: 'onAffix', title: '当元素的样式发生固钉样式变化时' },
        ], { display: 'none' }),
      ],
    },
  ],
});
