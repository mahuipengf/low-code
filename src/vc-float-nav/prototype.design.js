import React from 'react';
import { Bundle } from '@ali/visualengine';
import { JsonSetter, NumberSetter} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import { floatNavDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '浮动导航',
  componentName: 'FloatNav',
  category: '其他',
  icon: Icon,
  canDropTo: 'RootContent',
  docUrl: floatNavDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1N0KLu1L2gK0jSZPhXXahvXXa-112-64.png",
      label: "浮动导航",
      schema: {
        componentName: "FloatNav",
        props: {},
      },
    },
  ],
  configure: [
    {
      title: '上位移',
      name: 'offsetTop',
      display: 'inline',
      initialValue: 20,
      supportVariable: false,
      setter: NumberSetter,
    },
    {
      title: '右位移',
      name: 'offsetRight',
      display: 'inline',
      initialValue: 20,
      supportVariable: false,
      setter: NumberSetter,
    },
    {
      title: '宽度',
      name: 'width',
      display: 'inline',
      initialValue: 260,
      supportVariable: false,
      setter: <NumberSetter />,
    },
    {
      title: '高度',
      name: 'height',
      display: 'inline',
      initialValue: 370,
      supportVariable: false,
      setter: <NumberSetter />,
    },
    {
      name: 'categoryConfig',
      title: '导航配置',
      display: 'inline',
      supportVariable: false,
      initialValue: [
        {
          title: '导航1',
          anchor: 'anchor1',
          children: [
            {
              title: '导航1-1',
              anchor: 'anchor1-1',
            },

            {
              title: '导航1-2',
              anchor: 'anchor1-2',
            },
          ],
        },

        {
          title: '导航2',
          anchor: 'anchor2',
          children: [
            {
              title: '导航2-1',
              anchor: 'anchor2-1',
            },

            {
              title: '导航2-2',
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
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('FusionFloatNav')
      ],
    }
  ],
});
