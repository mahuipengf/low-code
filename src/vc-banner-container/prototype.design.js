import React from 'react';
import { Bundle, Env } from '@ali/visualengine';
import uuid from '@ali/vu-uuid-property';
import {
  Util, ChoiceSetter, NumberSetter, BoolSetter, ActionSetter,
} from '@ali/visualengine-utils';
import { createSlot } from '@ali/vu-slot-property';

import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '底部通栏',
  componentName: 'BannerContainer',
  category: '高级', //
  icon: Icon,
  isContainer: true,
  isFloating: true,
  canSelecting: true,
  canDropIn(placement) {
    // const componentName = placement.getComponentName(); console.log(componentName);
    // if (['Button', 'ButtonGroup'].indexOf(componentName) !== -1) {
    //   return true;
    // }
    // return false;
    // 默认放开此限制，有用户决定使用
    return true;
  },
  initialChildren: null,
  docUrl: '',
  transform: [props => Util.i18nTransform(props, Env.getLocale())],
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1sB9Lu4z1gK0jSZSgXXavwpXa-112-64.png',
      label: '底部通栏',
      schema: {
        componentName: 'BannerContainer',
        props: {},
      },
    },
  ],
  configure: [
    {
      name: 'autoWidth',
      title: '自适应宽度',
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
      supportVariable: false,
    },
    {
      name: 'layout',
      title: '布局方式',
      display: 'inline',
      initialValue: 'h',
      setter: (
        <ChoiceSetter
          options={[
            { value: 'h', title: '横向' },
            { value: 'v', title: '纵向' },
          ]}
        />
      ),
      supportVariable: false,
    },
    {
      name: 'contentWidth',
      title: '内容宽度',
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
      supportVariable: false,
    },
    {
      name: 'containerWidth',
      title: '容器宽度',
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
      supportVariable: false,
    },
    ...createSlot({
      slotName: 'extra',
      slotTitle: '自定义内容',
      allowTextInput: false,
      display: 'block',
      initialValue: '',
    }),
    {
      name: 'getRefContainer',
      title: '自定义挂载容器',
      display: 'accordion',
      setter: <ActionSetter defaultCode={`/**
* 自定义挂载容器
*/
function getBannerContainerWrapper() {
  return document.body;
}`}
        defaultActionName="getBannerContainerWrapper"
      />,
    },
    uuid('bannerContainer')
  ],
});
