import React from 'react';
import { Bundle, Env } from '@ali/visualengine';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import {
  Util, ChoiceSetter, I18nSetter, TextSetter, CodeSetter, SkinSetter, BoolSetter,
} from '@ali/visualengine-utils';
import FusionIconSetter from '../common/vs-fusion-icon/index';

import Icon from './logo.svg';
import { behavior, buttonDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '按钮',
  componentName: 'Button',
  category: '基础',
  icon: Icon,
  docUrl: buttonDoc,
  transform: [props => Util.i18nTransform(props, Env.getLocale())],
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1Bdp2u.z1gK0jSZLeXXb9kVXa-112-64.png",
      label: "主按钮",
      schema: {
        componentName: "Button",
        props: {},
      },
    },
    {
      screenshot: "https://img.alicdn.com/tfs/TB1a.N1uVT7gK0jSZFpXXaTkpXa-112-64.png",
      label: "次按钮",
      schema: {
        componentName: "Button",
        props: {
          type: "secondary",
        },
      },
    },
    {
      screenshot: "https://img.alicdn.com/tfs/TB1N6x2u7L0gK0jSZFtXXXQCXXa-112-64.png",
      label: "图标按钮",
      schema: {
        componentName: "Button",
        props: {
          type: "secondary",
          baseIcon: "set",
        },
      },
    },
  ],
  configure: [
    {
      name: 'content',
      title: '标题',
      display: 'inline',
      initialValue: {
        zh_CN: '按 钮',
        en_US: 'Button',
        type: 'i18n',
      },
      setter: <I18nSetter placeholder="请输入" />,
      supportVariable: false,
    },
    {
      name: 'type',
      title: '按钮类型',
      display: 'inline',
      initialValue: 'primary',
      supportVariable: false,
      setter: (
        <SkinSetter
          options={[{
            value: 'primary',
            imageUrl: 'https://img.alicdn.com/tps/TB1Pd0yOpXXXXagXpXXXXXXXXXX-412-72.png',
          }, {
            value: 'normal',
            imageUrl: 'https://img.alicdn.com/tps/TB1jmhnOpXXXXaLXFXXXXXXXXXX-412-72.png',
          }, {
            value: 'secondary',
            imageUrl: 'https://img.alicdn.com/tps/TB1erk2OXXXXXaPaXXXXXXXXXXX-412-72.png',
          }, {
            value: 'ghostLight',
            imageUrl: 'https://img.alicdn.com/tfs/TB1Rq6JSpXXXXc_aXXXXXXXXXXX-412-72.png',
          }, {
            value: 'ghostDark',
            imageUrl: 'https://img.alicdn.com/tfs/TB14Z_vSpXXXXb1aFXXXXXXXXXX-412-72.png',
          }, {
            value: 'warningNormal',
            imageUrl: 'https://img.alicdn.com/tfs/TB1EavopA9WBuNjSspeXXaz5VXa-412-53.png',
          }, {
            value: 'warningPrimary',
            imageUrl: 'https://img.alicdn.com/tfs/TB1M8OLppmWBuNjSspdXXbugXXa-409-58.png',
          },
          {
            value: 'textNormal',
            imageUrl: 'https://img.alicdn.com/tfs/TB1MBOLppmWBuNjSspdXXbugXXa-396-46.png',
          },
          {
            value: 'textPrimary',
            imageUrl: 'https://img.alicdn.com/tfs/TB1NYDypx1YBuNjy1zcXXbNcXXa-398-45.png',
          },
          {
            value: 'textSecondary',
            imageUrl: 'https://img.alicdn.com/tfs/TB1MOnDpuySBuNjy1zdXXXPxFXa-393-49.png',
          },
          ]}
          compact={false}
        />
      ),
    },
    {
      name: 'size',
      title: '按钮尺寸',
      display: 'inline',
      initialValue: 'medium',
      supportVariable: false,
      setter: (
        <ChoiceSetter
          options={[{
            title: '小',
            value: 'small',
            tip: '小号尺寸'
          }, {
            title: '中',
            value: 'medium',
            tip: '正常尺寸'
          }, {
            title: '大',
            value: 'large',
            tip: '大号尺寸'
          }]}
          compact={false}
        />
      ),
    },
    {
      name: 'behavior',
      title: '状态',
      display: 'inline',
      initialValue: 'NORMAL',
      supportVariable: false,
      tip: {
        content: '点击查看枚举值及api',
        url: behavior,
      },
      setter: <ChoiceSetter
        options={[
          { title: '普通', value: 'NORMAL' },
          { title: '禁用', value: 'DISABLED' },
          { title: '隐藏', value: 'HIDDEN' },
        ]}
      />,
    },
    {
      name: 'baseIcon',
      title: '基础图标',
      display: 'inline',
      initialValue: '',
      supportVariable: false,
      setter: <FusionIconSetter />,
    },
    {
      name: 'otherIcon',
      title: '其他图标',
      display: 'inline',
      tip: '用户自定义图标，可覆盖基础图标',
      initialValue: '',
      setter: <TextSetter />,
    },
    style({ advanced: true }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('button'),
        ...events([
          {
            name: 'onClick',
            title: 'onClick 点击按钮',
            initialValue: `/**
* button onClick
*/
function onClick(){
  console.log('onClick');
}`,
          },
        ], { display: 'none' }),
      ],
    },
  ],
});
