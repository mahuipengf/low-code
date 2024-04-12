import React from 'react';
import { Bundle, Env } from '@ali/visualengine';
import uuid from '@ali/vu-uuid-property';
import {
  Util,
  ChoiceSetter,
  NumberSetter,
  BoolSetter,
  ActionSetter,
} from '@ali/visualengine-utils';
import { createSlot } from '@ali/vu-slot-property';

import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepBottomColumn', dm: '底部通栏' }),
  componentName: 'BannerContainer',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }), //
  icon: Icon,
  isContainer: true,
  isFloating: true,
  canSelecting: true,
  canDropIn(placement) {
    // const componentName = placement.getComponentName();
    // console.log(componentName);
    // if (['Button', 'ButtonGroup'].indexOf(componentName) !== -1) {
    //   return true;
    // }
    // return false;
    // 默认放开此限制，有用户决定使用
    return true;
  },
  initialChildren: null,
  docUrl: '',
  transform: [(props) => Util.i18nTransform(props, Env.getLocale())],
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1sB9Lu4z1gK0jSZSgXXavwpXa-112-64.png',
      label: $i18n.get({ id: 'deepBottomColumn', dm: '底部通栏' }),
      schema: {
        componentName: 'BannerContainer',
        props: {},
      },
    },
  ],

  configure: [
    {
      name: 'autoWidth',
      title: $i18n.get({ id: 'deepAdaptiveWidth', dm: '自适应宽度' }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
      supportVariable: true,
    },

    {
      name: 'layout',
      title: $i18n.get({ id: 'deepLayoutMethod', dm: '布局方式' }),
      display: 'inline',
      initialValue: 'h',
      setter: (
        <ChoiceSetter
          options={[
            { value: 'h', title: $i18n.get({ id: 'deepLandscape', dm: '横向' }) },
            { value: 'v', title: $i18n.get({ id: 'deepPortrait', dm: '纵向' }) },
          ]}
        />
      ),

      supportVariable: true,
    },

    {
      name: 'contentWidth',
      title: $i18n.get({ id: 'deepContentWidth', dm: '内容宽度' }),
      display: 'inline',
      initialValue: 0,
      setter: (
        <NumberSetter
          units={[
            {
              type: 'px',
              list: true,
            },

            {
              type: '%',
              list: true,
            },
          ]}
        />
      ),

      supportVariable: true,
    },

    {
      name: 'containerWidth',
      title: $i18n.get({ id: 'deepContainerWidth', dm: '容器宽度' }),
      display: 'inline',
      initialValue: 0,
      setter: (
        <NumberSetter
          units={[
            {
              type: 'px',
              list: true,
            },

            {
              type: '%',
              list: true,
            },
          ]}
        />
      ),

      supportVariable: true,
    },

    ...createSlot({
      slotName: 'extra',
      slotTitle: $i18n.get({ id: 'deepCustomize', dm: '自定义内容' }),
      allowTextInput: false,
      display: 'block',
      initialValue: '',
    }),

    {
      name: 'getRefContainer',
      title: $i18n.get({ id: 'deepCustomMountContainer', dm: '自定义挂载容器' }),
      display: 'accordion',
      setter: (
        <ActionSetter
          defaultCode={$i18n.get({
            id: 'deepCustomMountContainerFunction',
            dm:
              '/**\n* 自定义挂载容器\n*/\nfunction getBannerContainerWrapper() {\n  return document.body;\n}',
          })}
          defaultActionName="getBannerContainerWrapper"
        />
      ),
    },

    uuid('bannerContainer'),
  ],
});
