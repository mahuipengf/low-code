import React from 'react';
import { Bundle } from '@ali/visualengine';
import { ChoiceSetter, I18nSetter, BoolSetter, TextSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { anchor, titleDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
  componentName: 'Title',
  category: $i18n.get({ id: 'deepBasis', dm: '基础' }),
  icon: Icon,
  docUrl: titleDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1dPB4u7L0gK0jSZFAXXcA9pXa-112-64.png',
      label: $i18n.get({ id: 'deepTitle', dm: '标题' }),
      schema: {
        componentName: 'Title',
        props: {
          text: {
            type: 'i18n',
            en_US: null,
            zh_CN: '我是文档标题',
          },
        },
      },
    },
  ],

  configure: [
    {
      name: 'text',
      title: $i18n.get({ id: 'deepWritings', dm: '文案' }),
      display: 'inline',
      initialValue: {
        type: 'i18n',
        zh_CN: '标题',
        en_US: 'Title',
      },

      setter: (
        <I18nSetter
          multiline={1}
          placeholder={$i18n.get({ id: 'deepPleaseEnterContent', dm: '请输入内容' })}
        />
      ),
      supportVariable: true,
    },

    {
      name: 'anchor',
      title: $i18n.get({ id: 'deepAnchor', dm: '锚点' }),
      tip: {
        content: $i18n.get({ id: 'deepDescriptionOfAnchorFunction', dm: '锚点功能的说明' }),
        url: anchor,
      },

      display: 'inline',
      supportVariable: true,
      setter: <TextSetter />,
    },

    {
      name: 'type',
      title: $i18n.get({ id: 'deepTypesOf', dm: '类型' }),
      display: 'inline',
      initialValue: 'primary',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepLevel', dm: '一级' }),
              value: 'primary',
            },

            {
              title: $i18n.get({ id: 'deepSecondary', dm: '二级' }),
              value: 'secondary',
            },

            {
              title: $i18n.get({ id: 'deepLevelThree', dm: '三级' }),
              value: 'thirdary',
            },
          ]}
        />
      ),
    },

    {
      name: 'noDecoration',
      title: $i18n.get({ id: 'deepPureText', dm: '纯文字' }),
      tip: $i18n.get({
        id: 'deepWithoutAdditionalSpacingAnd',
        dm: '没有额外的间距和修饰物，不能开箱即用，但具有更加灵活的组合能力',
      }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      items: [uuid('title')],
    },
  ],
});
