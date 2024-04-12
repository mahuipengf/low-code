import React from 'react';
import { Bundle } from '@ali/visualengine';
import { JsonSetter, NumberSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepFloatingNavigation', dm: '浮动导航' }),
  componentName: 'FloatNav',
  category: $i18n.get({ id: 'deepOther', dm: '其他' }),
  icon: Icon,
  canDropTo: 'RootContent',
  docUrl:
    'http://gitlab.alibaba-inc.com/vision-components/vc-fusion-float-nav/blob/master/README.md',
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1N0KLu1L2gK0jSZPhXXahvXXa-112-64.png',
      label: $i18n.get({ id: 'deepFloatingNavigation', dm: '浮动导航' }),
      schema: {
        componentName: 'FloatNav',
        props: {},
      },
    },
  ],

  configure: [
    {
      title: $i18n.get({ id: 'deepUpperShift', dm: '上位移' }),
      name: 'offsetTop',
      display: 'inline',
      initialValue: 20,
      supportVariable: true,
      setter: NumberSetter,
    },

    {
      title: $i18n.get({ id: 'deepRightShift', dm: '右位移' }),
      name: 'offsetRight',
      display: 'inline',
      initialValue: 20,
      supportVariable: true,
      setter: NumberSetter,
    },

    {
      title: $i18n.get({ id: 'deepWidth', dm: '宽度' }),
      name: 'width',
      display: 'inline',
      initialValue: 260,
      supportVariable: true,
      setter: <NumberSetter />,
    },

    {
      title: $i18n.get({ id: 'deepHeight', dm: '高度' }),
      name: 'height',
      display: 'inline',
      initialValue: 370,
      supportVariable: true,
      setter: <NumberSetter />,
    },

    {
      name: 'categoryConfig',
      title: $i18n.get({ id: 'deepNavigationConfiguration', dm: '导航配置' }),
      display: 'inline',
      supportVariable: true,
      initialValue: [
        {
          title: $i18n.get({ id: 'deepNavigation', dm: '导航1' }),
          anchor: 'anchor1',
          children: [
            {
              title: $i18n.get({ id: 'deepNavigation.1', dm: '导航1-1' }),
              anchor: 'anchor1-1',
            },

            {
              title: $i18n.get({ id: 'deepNavigation.2', dm: '导航1-2' }),
              anchor: 'anchor1-2',
            },
          ],
        },

        {
          title: $i18n.get({ id: 'deepNavigation.3', dm: '导航2' }),
          anchor: 'anchor2',
          children: [
            {
              title: $i18n.get({ id: 'deepNavigation.4', dm: '导航2-1' }),
              anchor: 'anchor2-1',
            },

            {
              title: $i18n.get({ id: 'deepNavigation.5', dm: '导航2-2' }),
              anchor: 'anchor2-2',
            },
          ],
        },
      ],

      setter: <JsonSetter />,
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      items: [uuid('FusionFloatNav')],
    },
  ],
});
