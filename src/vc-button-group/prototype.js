import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ListSetter,
  I18nSetter,
  SkinSetter,
  ChoiceSetter,
  BoolSetter,
  NumberSetter,
  TextSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from './i18n/index';
import { behavior, buttonGroupDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'buttonGroupButtonGroup', dm: '按钮组' }),
  componentName: 'ButtonGroup',
  // 高级 | 其他
  category: $i18n.get({ id: 'buttonGroupBase', dm: '基础' }),
  icon: Icon,
  isContainer: true,
  canDropIn: 'Button',
  docUrl: buttonGroupDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1t6dhvV67gK0jSZPfXXahhFXa-310-122.png',
      label: $i18n.get({ id: 'deepButtonGroup', dm: '按钮组' }),
      schema: {
        componentName: 'ButtonGroup',
        props: {
          separated: true,
          size: 'medium',
          actionType: 'button',
          maxLength: 3,
          items: [
            {
              content: {
                zh_CN: $i18n.get({ id: 'deepButtonOne', dm: '按钮一' }),
                en_US: 'Button',
                type: 'i18n',
                use: 'zh_CN',
              },

              type: 'primary',
              fieldBehavior: 'NORMAL',
            },

            {
              content: {
                zh_CN: $i18n.get({ id: 'deepTwoButton', dm: '按钮二' }),
                en_US: 'Button 2',
                type: 'i18n',
                use: 'zh_CN',
              },

              type: 'secondary',
              fieldBehavior: 'NORMAL',
            },
          ],
        },
      },
    },
  ],

  configure: [
    {
      name: 'separated',
      title: $i18n.get({ id: 'buttonGroupSeparatedForm', dm: '分隔形态' }),
      initialValue: true,
      supportVariable: true,
      display: 'inline',
      setter: <BoolSetter />,
    },

    {
      name: 'type',
      title: $i18n.get({ id: 'buttonGroupButtonType', dm: '按钮类型' }),
      display: 'inline',
      initialValue: 'primary',
      setter: (
        <SkinSetter
          options={[
            {
              value: 'primary',
              imageUrl: 'https://img.alicdn.com/tps/TB1Pd0yOpXXXXagXpXXXXXXXXXX-412-72.png',
            },

            {
              value: 'secondary',
              imageUrl: 'https://img.alicdn.com/tps/TB1erk2OXXXXXaPaXXXXXXXXXXX-412-72.png',
            },

            {
              value: 'normal',
              imageUrl: 'https://img.alicdn.com/tps/TB1jmhnOpXXXXaLXFXXXXXXXXXX-412-72.png',
            },

            {
              value: 'ghostNormal',
              imageUrl: 'https://img.alicdn.com/tfs/TB130L6SpXXXXapXFXXXXXXXXXX-412-72.png',
            },

            {
              value: 'ghostSecondary',
              imageUrl: 'https://img.alicdn.com/tfs/TB14Z_vSpXXXXb1aFXXXXXXXXXX-412-72.png',
            },

            {
              value: 'ghostWhite',
              imageUrl: 'https://img.alicdn.com/tfs/TB1Rq6JSpXXXXc_aXXXXXXXXXXX-412-72.png',
            },
          ]}
          compact={false}
        />
      ),

      disabled() {
        return this.getProps().getPropValue('separated');
      },
    },

    {
      name: 'size',
      title: $i18n.get({ id: 'buttonGroupButtonSize', dm: '按钮尺寸' }),
      display: 'inline',
      initialValue: 'medium',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'buttonGroupSmall', dm: '小' }),
              value: 'small',
              tip: $i18n.get({ id: 'buttonGroupSmallSize', dm: '小尺寸' }),
            },

            {
              title: $i18n.get({ id: 'buttonGroupNormal', dm: '中' }),
              value: 'medium',
              tip: $i18n.get({ id: 'buttonGroupNormalSize', dm: '正常尺寸' }),
            },

            {
              title: $i18n.get({ id: 'buttonGroupLarge', dm: '大' }),
              value: 'large',
              tip: $i18n.get({ id: 'buttonGroupLargeSize', dm: '大尺寸' }),
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'actionType',
      title: $i18n.get({ id: 'buttonGroupForm', dm: '形态' }),
      display: 'inline',
      initialValue: 'button',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'buttonGroupButtonType.1', dm: '按钮型' }),
              value: 'button',
            },

            {
              title: $i18n.get({ id: 'buttonGroupLinkType', dm: '链接型' }),
              value: 'link',
            },
          ]}
        />
      ),
    },

    {
      name: 'maxLength',
      title: $i18n.get({ id: 'buttonGroupMaximumNumber', dm: '最大个数' }),
      tip: $i18n.get({ id: 'buttonGroupStartFoldingWhenMore', dm: '超过多少个按钮时开始折叠' }),
      display: 'inline',
      initialValue: 3,
      supportVariable: true,
      setter: <NumberSetter />,
      disabled() {
        return !this.getProps().getPropValue('separated');
      },
    },

    {
      name: 'items',
      title: $i18n.get({ id: 'buttonGroupButtonConfiguration', dm: '按钮配置' }),
      display: 'block',
      supportVariable: true,
      initialValue: [
        {
          content: {
            zh_CN: $i18n.get({ id: 'deepButtonOne', dm: '按钮一' }),
            en_US: 'Button',
            type: 'i18n',
            use: 'zh_CN',
          },

          type: 'primary',
          fieldBehavior: 'NORMAL',
        },

        {
          content: {
            zh_CN: $i18n.get({ id: 'deepTwoButton', dm: '按钮二' }),
            en_US: 'Button 2',
            type: 'i18n',
            use: 'zh_CN',
          },

          type: 'secondary',
          fieldBehavior: 'NORMAL',
        },
      ],

      setter: (
        <ListSetter
          descriptor="content"
          checkField={null}
          display="entry"
          configure={[
            {
              name: 'content',
              title: $i18n.get({ id: 'buttonGroupTitle', dm: '标题' }),
              display: 'inline',
              initialValue: {
                zh_CN: '按 钮',
                en_US: 'Button',
                type: 'i18n',
              },

              setter: (
                <I18nSetter
                  placeholder={$i18n.get({ id: 'buttonGroupPleaseEnter', dm: '请输入' })}
                />
              ),
            },

            {
              name: 'type',
              title: $i18n.get({ id: 'buttonGroupButtonType', dm: '按钮类型' }),
              display: 'inline',
              initialValue: 'primary',
              setter: (
                <SkinSetter
                  options={[
                    {
                      value: 'primary',
                      imageUrl: 'https://img.alicdn.com/tps/TB1Pd0yOpXXXXagXpXXXXXXXXXX-412-72.png',
                    },

                    {
                      value: 'secondary',
                      imageUrl: 'https://img.alicdn.com/tps/TB1erk2OXXXXXaPaXXXXXXXXXXX-412-72.png',
                    },

                    {
                      value: 'normal',
                      imageUrl: 'https://img.alicdn.com/tps/TB1jmhnOpXXXXaLXFXXXXXXXXXX-412-72.png',
                    },

                    {
                      value: 'ghostNormal',
                      imageUrl: 'https://img.alicdn.com/tfs/TB130L6SpXXXXapXFXXXXXXXXXX-412-72.png',
                    },

                    {
                      value: 'ghostSecondary',
                      imageUrl: 'https://img.alicdn.com/tfs/TB14Z_vSpXXXXb1aFXXXXXXXXXX-412-72.png',
                    },

                    {
                      value: 'ghostWhite',
                      imageUrl: 'https://img.alicdn.com/tfs/TB1Rq6JSpXXXXc_aXXXXXXXXXXX-412-72.png',
                    },
                  ]}
                  compact={false}
                />
              ),
            },

            {
              name: 'fieldBehavior',
              title: $i18n.get({ id: 'buttonGroupDefaultState', dm: '默认状态' }),
              display: 'inline',
              initialValue: 'NORMAL',
              supportVariable: true,
              tip: {
                content: $i18n.get({
                  id: 'buttonGroupClickToViewEnumeration',
                  dm: '点击查看枚举值及api',
                }),

                url: behavior,
              },

              setter: (
                <ChoiceSetter
                  options={[
                    {
                      title: $i18n.get({ id: 'buttonGroupOrdinary', dm: '普通' }),
                      value: 'NORMAL',
                    },

                    {
                      title: $i18n.get({ id: 'buttonGroupDisable', dm: '禁用' }),
                      value: 'DISABLED',
                    },

                    {
                      title: $i18n.get({ id: 'buttonGroupHidden', dm: '隐藏' }),
                      value: 'HIDDEN',
                    },
                  ]}
                />
              ),
            },

            {
              name: 'componentId',
              title: $i18n.get({ id: 'deepUniquelyIdentifies', dm: '唯一标识' }),
              display: 'inline',
              supportVariable: true,
              setter: <TextSetter />,
            },
          ]}
        />
      ),
    },

    {
      type: 'group',
      title: $i18n.get({ id: 'buttonGroupAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('ButtonGroup'),
        ...events([
          {
            name: 'onClick',
            title: $i18n.get({ id: 'buttonGroupWhenTheButtonIs', dm: '当点击按钮时' }),
            initialValue: `/**
* Button onClickButtonGroup
* @param { index, content }
*/
function onClickButtonGroup({ index, content, componentId }){
  console.log(index, content, componentId);
}`,
          },
        ]),
      ],
    },

    style({ advanced: true }),
  ],
});
