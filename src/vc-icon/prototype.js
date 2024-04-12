import React from 'react';
import { Bundle } from '@ali/visualengine';
import { TextSetter, ChoiceSetter } from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import uuid from '@ali/vu-uuid-property';
import FusionIconSetter from '../common/vs-fusion-icon/index';
import Icon from './logo.svg';
import $i18n from '../i18n/index';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepIcon', dm: '图标' }),
  componentName: 'Icon',
  category: $i18n.get({ id: 'deepBasis', dm: '基础' }),
  icon: Icon,
  docUrl: '',
  configure: [
    {
      type: 'composite',
      name: 'type',
      title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
      display: 'block',

      items: [
        {
          name: 'useType',
          title: ' ',
          display: 'plain',
          initialValue: true,
          setter: (
            <ChoiceSetter
              options={[
                {
                  title: $i18n.get({ id: 'deepUseTheBaseIcon', dm: '使用基础图标' }),
                  value: true,
                  tip: $i18n.get({ id: 'deepUseTheBaseIcon', dm: '使用基础图标' }),
                },
                {
                  title: $i18n.get({ id: 'deepUseCustomIcons', dm: '使用自定义图标' }),
                  value: false,
                  tip: $i18n.get({ id: 'deepUseCustomIcons', dm: '使用自定义图标' }),
                },
              ]}
            />
          ),
        },

        {
          name: 'baseType',
          title: $i18n.get({ id: 'deepBasicIcon', dm: '基础图标' }),
          display: 'inline',
          initialValue: 'smile',
          supportVariable: true,
          hidden() {
            return !this.getProps().getPropValue('type.useType');
          },
          setter: <FusionIconSetter />,
        },
        {
          name: 'otherType',
          title: $i18n.get({ id: 'deepOtherIcons', dm: '其他图标' }),
          display: 'inline',
          initialValue: 'smile',
          tip: $i18n.get({ id: 'deepPleaseEnterTheIcon', dm: '请输入图标的name' }),
          hidden() {
            return this.getProps().getPropValue('type.useType');
          },
          setter: <TextSetter />,
        },
      ],
    },

    {
      name: 'size',
      title: $i18n.get({ id: 'deepSize', dm: '大小' }),
      display: 'block',
      initialValue: 'medium',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: 'xxs',
              value: 'xxs',
              tip: 'xxs',
            },
            {
              title: 'xs',
              value: 'xs',
              tip: 'xs',
            },
            {
              title: 'small',
              value: 'small',
              tip: 'small',
            },
            {
              title: 'medium',
              value: 'medium',
              tip: 'medium',
            },
            {
              title: 'large',
              value: 'large',
              tip: 'large',
            },
            {
              title: 'xl',
              value: 'xl',
              tip: 'xl',
            },
            {
              title: 'xxl',
              value: 'xxl',
              tip: 'xxl',
            },
            {
              title: 'xxxl',
              value: 'xxxl',
              tip: 'xxxl',
            },
          ]}
          compact={false}
        />
      ),
    },

    style({
      advanced: true,
    }),
    {
      name: 'advance',
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('icon'),
        {
          name: 'extraClass',
          title: $i18n.get({ id: 'deepStyleClassName', dm: '样式类名' }),
          display: 'inline',
          setter: <TextSetter />,
        },
      ],
    },
  ],
});
