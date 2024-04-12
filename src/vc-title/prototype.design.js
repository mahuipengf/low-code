import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ChoiceSetter, I18nSetter, BoolSetter, TextSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import { titleDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '标题',
  componentName: 'Title',
  category: '基础',
  icon: Icon,
  docUrl: titleDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1dPB4u7L0gK0jSZFAXXcA9pXa-112-64.png",
      label: "标题",
      schema: {
        componentName: "Title",
        props: {
          text: {
            type: "i18n",
            en_US: null,
            zh_CN: "我是文档标题",
          },
        },
      },
    },
  ],
  configure: [
    {
      name: 'text',
      title: '文案',
      display: 'inline',
      initialValue: {
        type: 'i18n',
        zh_CN: '标题',
        en_US: 'Title',
      },
      setter: <I18nSetter multiline={1} placeholder="请输入内容" />,
      supportVariable: false,
    },
    {
      name: 'type',
      title: '类型',
      display: 'inline',
      initialValue: 'primary',
      supportVariable: false,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: '一级',
              value: 'primary',
            },
            {
              title: '二级',
              value: 'secondary',
            },
            {
              title: '三级',
              value: 'thirdary',
            },
          ]}
        />
      ),
    },
    {
      name: 'noDecoration',
      title: '纯文字',
      tip: '没有额外的间距和修饰物，不能开箱即用，但具有更加灵活的组合能力',
      display: 'inline',
      initialValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    style({ advanced: true }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [uuid('title')],
    },
  ],
});
