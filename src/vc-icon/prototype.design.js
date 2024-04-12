import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter, ChoiceSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import uuid from '@ali/vu-uuid-property';
import FusionIconSetter from '../common/vs-fusion-icon/index';
import Icon from './logo.svg';

export default Bundle.createPrototype({
  title: '图标',
  componentName: 'Icon',
  category: '基础',
  icon: Icon,
  docUrl: '',
  configure: [
    {
      type: 'composite',
      name: 'type',
      title: '默认值',
      display: 'block',

      items: [
        {
          name: 'useType',
          title: ' ',
          display: 'plain',
          initialValue: true,
          setter: <ChoiceSetter options={[{
            title: '使用基础图标',
            value: true,
            tip: '使用基础图标',
          }, {
            title: '使用自定义图标',
            value: false,
            tip: '使用自定义图标',
          }]}
          />,
        },
        {
          name: 'baseType',
          title: '基础图标',
          display: 'inline',
          initialValue: 'smile',
          supportVariable: false,
          hidden() {
            return !this.getProps().getPropValue('type.useType');
          },
          setter: <FusionIconSetter />,
        }, {
          name: 'otherType',
          title: '其他图标',
          display: 'inline',
          initialValue: 'smile',
          tip: '请输入图标的name',
          hidden() {
            return this.getProps().getPropValue('type.useType');
          },
          setter: <TextSetter />,
        }],
    },
    {
      name: 'size',
      title: '大小',
      display: 'block',
      initialValue: 'medium',
      setter: (
        <ChoiceSetter
          options={[{
            title: 'xxs',
            value: 'xxs',
            tip: 'xxs',
          }, {
            title: 'xs',
            value: 'xs',
            tip: 'xs',
          }, {
            title: 'small',
            value: 'small',
            tip: 'small',
          }, {
            title: 'medium',
            value: 'medium',
            tip: 'medium',
          }, {
            title: 'large',
            value: 'large',
            tip: 'large',
          }, {
            title: 'xl',
            value: 'xl',
            tip: 'xl',
          }, {
            title: 'xxl',
            value: 'xxl',
            tip: 'xxl',
          }, {
            title: 'xxxl',
            value: 'xxxl',
            tip: 'xxxl',
          }]}
          compact={false}
        />
      ),
    },
    style({
      advanced: true,
    }), {
      name: 'advance',
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('icon'),
        {
          name: 'extraClass',
          title: '样式类名',
          display: 'inline',
          setter: <TextSetter />,
        },
      ],
    }],
});
