import React from 'react';
import { Bundle, Env } from '@ali/visualengine';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import {
  Util,
  ChoiceSetter,
  I18nSetter,
  TextSetter,
  CodeSetter,
  SkinSetter,
  BoolSetter,
} from '@ali/visualengine-utils';
import FusionIconSetter from '../common/vs-fusion-icon/index';

import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { behavior } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepButton', dm: '按钮' }),
  componentName: 'Button',
  category: $i18n.get({ id: 'deepBasis', dm: '基础' }),
  icon: Icon,
  docUrl: 'https://go.alibaba-inc.com/help3/vc-button',
  transform: [(props) => Util.i18nTransform(props, Env.getLocale())],
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1Bdp2u.z1gK0jSZLeXXb9kVXa-112-64.png',
      label: $i18n.get({ id: 'deepMainButton', dm: '主按钮' }),
      schema: {
        componentName: 'Button',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1a.N1uVT7gK0jSZFpXXaTkpXa-112-64.png',
      label: $i18n.get({ id: 'deepSecondaryButton', dm: '次按钮' }),
      schema: {
        componentName: 'Button',
        props: {
          type: 'secondary',
        },
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1N6x2u7L0gK0jSZFtXXXQCXXa-112-64.png',
      label: $i18n.get({ id: 'deepIconButton', dm: '图标按钮' }),
      schema: {
        componentName: 'Button',
        props: {
          type: 'secondary',
          baseIcon: 'set',
        },
      },
    },
  ],

  configure: [
    {
      name: 'content',
      title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
      display: 'inline',
      initialValue: {
        zh_CN: '按 钮',
        en_US: 'Button',
        type: 'i18n',
      },

      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
    },

    {
      name: 'type',
      title: $i18n.get({ id: 'deepButtonType', dm: '按钮类型' }),
      display: 'inline',
      initialValue: 'primary',
      supportVariable: true,
      setter: (
        <SkinSetter
          options={[
            {
              value: 'primary',
              imageUrl: 'https://img.alicdn.com/tps/TB1Pd0yOpXXXXagXpXXXXXXXXXX-412-72.png',
            },
            {
              value: 'normal',
              imageUrl: 'https://img.alicdn.com/tps/TB1jmhnOpXXXXaLXFXXXXXXXXXX-412-72.png',
            },
            {
              value: 'secondary',
              imageUrl: 'https://img.alicdn.com/tps/TB1erk2OXXXXXaPaXXXXXXXXXXX-412-72.png',
            },
            {
              value: 'ghostLight',
              imageUrl: 'https://img.alicdn.com/tfs/TB1Rq6JSpXXXXc_aXXXXXXXXXXX-412-72.png',
            },
            {
              value: 'ghostDark',
              imageUrl: 'https://img.alicdn.com/tfs/TB14Z_vSpXXXXb1aFXXXXXXXXXX-412-72.png',
            },
            {
              value: 'warningNormal',
              imageUrl: 'https://img.alicdn.com/tfs/TB1EavopA9WBuNjSspeXXaz5VXa-412-53.png',
            },
            {
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
      title: $i18n.get({ id: 'deepButtonSize', dm: '按钮尺寸' }),
      display: 'inline',
      initialValue: 'medium',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepSmall', dm: '小' }),
              value: 'small',
              tip: $i18n.get({ id: 'deepSmallSize', dm: '小号尺寸' }),
            },
            {
              title: $i18n.get({ id: 'deepIn', dm: '中' }),
              value: 'medium',
              tip: $i18n.get({ id: 'deepNormalSize', dm: '正常尺寸' }),
            },
            {
              title: $i18n.get({ id: 'deepBig', dm: '大' }),
              value: 'large',
              tip: $i18n.get({ id: 'deepLargeSize', dm: '大号尺寸' }),
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'behavior',
      title: $i18n.get({ id: 'deepStatus', dm: '状态' }),
      display: 'inline',
      initialValue: 'NORMAL',
      supportVariable: true,
      tip: {
        content: $i18n.get({ id: 'deepClickToViewEnumeration', dm: '点击查看枚举值及api' }),
        url: behavior,
      },

      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepOrdinary', dm: '普通' }), value: 'NORMAL' },
            { title: $i18n.get({ id: 'deepDisable', dm: '禁用' }), value: 'DISABLED' },
            { title: $i18n.get({ id: 'deepHide', dm: '隐藏' }), value: 'HIDDEN' },
          ]}
        />
      ),
    },

    {
      name: 'baseIcon',
      title: $i18n.get({ id: 'deepBasicIcon', dm: '基础图标' }),
      display: 'inline',
      initialValue: '',
      supportVariable: true,
      setter: <FusionIconSetter />,
    },

    {
      name: 'otherIcon',
      title: $i18n.get({ id: 'deepOtherIcons', dm: '其他图标' }),
      display: 'inline',
      tip: $i18n.get({
        id: 'deepUserDefinedIconOverwritten',
        dm: '用户自定义图标，可覆盖基础图标',
      }),
      initialValue: '',
      setter: <TextSetter />,
    },

    {
      name: 'loading',
      title: $i18n.get({ id: 'deepLoadState', dm: '加载状态' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'triggerEventsWhenLoading',
      title: $i18n.get({ id: 'deepLoadClick', dm: '加载点击' }),
      display: 'inline',
      tip: $i18n.get({
        id: 'deepWhetherTheButtonResponds',
        dm: '当按钮为加载状态时，是否响应动作。',
      }),
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('button'),
        ...events([
          {
            name: 'onClick',
            title: $i18n.get({ id: 'deepOnclickClickButton', dm: 'onClick 点击按钮' }),
            initialValue: `/**
* button onClick
*/
function onClick(){
  console.log('onClick');
}`,
          },
        ]),
      ],
    },
  ],
});
