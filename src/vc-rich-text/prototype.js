import React from 'react';
import { Bundle } from '@ali/visualengine';
import style from '@ali/vu-style-property';
import uuid from '@ali/vu-uuid-property';
import { NumberSetter, EditorSetter } from '@ali/visualengine-utils';

import Logo from './logo.svg';
import $i18n from '../i18n/index';
import { richTextDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepRichText', dm: '富文本' }),
  componentName: 'RichText',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Logo,
  docUrl: richTextDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1TyuLu7L0gK0jSZFxXXXWHVXa-112-64.png',
      label: $i18n.get({ id: 'deepRichText', dm: '富文本' }),
      schema: {
        componentName: 'RichText',
        props: {
          content: {
            zh_CN:
              '<div><span style="color: #ff0000;">五</span><span style="color: #99cc00;">彩</span><span style="color: #339966;">斑</span><span style="color: #ff6600;">斓<span style="color: #0000ff;">的</span></span>黑</div>',
            en_US: 'rich text',
            type: 'i18n',
          },
        },
      },
    },
  ],

  configure: [
    {
      name: 'content',
      title: $i18n.get({ id: 'deepContent', dm: '内容' }),
      display: 'inline',
      supportVariable: true,
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
    supportVariable: true,
    initialValue: true,
    setter: <BoolSetter />,
  }, */
    {
      name: 'foldHeight',
      title: $i18n.get({ id: 'deepFoldHeight', dm: '折叠高度' }),
      tip: $i18n.get({
        id: 'deepFoldingItOverThis',
        dm: '超过这个高度，就折叠起来。仅移动端支持。',
      }),
      display: 'inline',
      supportVariable: true,
      initialValue: 110,
      // hidden() {
      //   return !this.getProps().getPropValue('isFold');
      // },
      setter: <NumberSetter />,
    },
    style({
      advanced: true,
    }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      items: [uuid('richText')],
    },
  ],
});
