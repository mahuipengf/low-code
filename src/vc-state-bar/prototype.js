import React from 'react';
import { Bundle } from '@ali/visualengine';
import { TextSetter, ChoiceSetter, BoolSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { stateBarDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepStatusIndicator', dm: '状态指示器' }),
  componentName: 'StateBar',
  // 高级 | 其他
  category: $i18n.get({ id: 'deepOther', dm: '其他' }),
  icon: Icon,
  docUrl: stateBarDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB17JvZinM11u4jSZPxXXahcXXa-464-182.png',
      label: $i18n.get({ id: 'deepStatusIndicator', dm: '状态指示器' }),
      schema: {
        componentName: 'StateBar',
        props: {},
      },
    },
  ],

  configure: [
    {
      name: 'text',
      title: $i18n.get({ id: 'deepWriting', dm: '文字' }),
      // 按需设置，尽量用 title 描述清楚，tip 是万不得已的时候用的
      tip: {
        content: $i18n.get({ id: 'deepYouCanConfigureThe', dm: '可以配置默认跟在后面的文字' }),
      },

      // block | inline | accordion | entry | none | tab
      // @see https://lark.alipay.com/vision/docs/props_setter#3.-在设计器中属性显示方式
      display: 'block',
      initialValue: '流程中',
      supportVariable: true,
      
      // 现有的可以使用的 setter 请参考：
      // @see https://lark.alipay.com/vision/docs/utils
      setter: <TextSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
    },

    {
      name: 'type',
      title: $i18n.get({ id: 'deepTypesOf', dm: '类型' }),
      display: 'block',
      initialValue: 'notice',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              value: 'notice',
            },
            {
              value: 'success',
            },
            {
              value: 'warning',
            },
            {
              value: 'error',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'breath',
      title: $i18n.get({ id: 'deepBreathe', dm: '呼吸态' }),
      display: 'block',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    // 原则上有抽象出来的公用属性请尽量使用公用函数，方便后期统一升级
    // @see https://lark.alipay.com/vision/docs/props_setter#通用属性设置器
    style({ advanced: true }),
    // {
    //   type: 'group',
    //   title: '高级',
    //   display: 'accordion',
    //   collapsed: true,
    //   items: [
    //     uuid('StateBar'),
    //     events([
    //       { name: 'onClick', title: '当点击按钮时' },
    //     ]),
    //   ],
    // },
  ],
});
