
import React from 'react';
import { Bundle } from '@ali/visualengine';
import { TextSetter, ChoiceSetter, BoolSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import { stateBarDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '状态指示器',
  componentName: 'StateBar',
  // 高级 | 其他
  category: '其他',
  icon: Icon,
  docUrl: stateBarDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB17JvZinM11u4jSZPxXXahcXXa-464-182.png',
      label: '状态指示器',
      schema: {
        componentName: 'StateBar',
        props: {},
      },
    },
  ],
  configure: [
    {
      name: 'text',
      title: '文字',
      // 按需设置，尽量用 title 描述清楚，tip 是万不得已的时候用的
      tip: {
        content: '可以配置默认跟在后面的文字',
      },
      // block | inline | accordion | entry | none | tab
      // @see https://lark.alipay.com/vision/docs/props_setter#3.-在设计器中属性显示方式
      display: 'block',
      initialValue: '流程中',
      // 现有的可以使用的 setter 请参考：
      // @see https://lark.alipay.com/vision/docs/utils
      setter: <TextSetter placeholder="请输入" />,
    },
    {
      name: 'type',
      title: '类型',
      display: 'block',
      initialValue: 'notice',
      setter: <ChoiceSetter options={[{
        value: 'notice',
      }, {
        value: 'success',
      }, {
        value: 'warning',
      }, {
        value: 'error',
      }]}
        compact={false}
      />,
    },
    {
      name: 'breath',
      title: '呼吸态',
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },
    // 原则上有抽象出来的公用属性请尽量使用公用函数，方便后期统一升级
    // @see https://lark.alipay.com/vision/docs/props_setter#通用属性设置器
    style({ advanced: true }),
  ],
});
