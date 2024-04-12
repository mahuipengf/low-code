import React from 'react';
import { Bundle } from '@ali/visualengine';
import style from '@ali/vu-style-property';
import uuid from '@ali/vu-uuid-property';
import { NumberSetter, EditorSetter } from '@ali/visualengine-utils';

import Logo from './logo.svg';
import { richTextDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: '富文本',
  componentName: 'RichText',
  category: '高级',
  icon: Logo,
  docUrl: richTextDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1TyuLu7L0gK0jSZFxXXXWHVXa-112-64.png',
      label: '富文本',
      schema: {
        componentName: 'RichText',
        props: {
          content: {
            zh_CN: '<div><span style="color: #ff0000;">五</span><span style="color: #99cc00;">彩</span><span style="color: #339966;">斑</span><span style="color: #ff6600;">斓<span style="color: #0000ff;">的</span></span>黑</div>',
            en_US: 'rich text',
            type: 'i18n',
          },
        },
      },
    },
  ],
  configure: [{
    name: 'content',
    title: '内容',
    display: 'inline',
    supportVariable: false,
    initialValue: {
      zh_CN: '富文本',
      en_US: 'rich text',
      type: 'i18n',
    },
    setter: <EditorSetter />,
  },
  /* {
    name: 'isFold',
    title: '初始折叠',
    tip: '初始化状态时是否折叠。仅移动端支持。',
    display: 'inline',
    supportVariable: false,
    initialValue: true,
    setter: <BoolSetter />,
  }, */
  {
    name: 'foldHeight',
    title: '折叠高度',
    tip: '超过这个高度，就折叠起来。仅移动端支持。',
    display: 'inline',
    supportVariable: false,
    initialValue: 110,
    // hidden() {
    //   return !this.getProps().getPropValue('isFold');
    // },
    setter: <NumberSetter />,
  }, style({
    advanced: true,
  }), {
    type: 'group',
    title: '高级',
    display: 'accordion',
    collapsed: true,
    items: [
      uuid('richText'),
    ],
  }],
});
