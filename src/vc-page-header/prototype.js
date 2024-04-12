import React from 'react';
import { Bundle } from '@ali/visualengine';
import { BoolSetter, TextSetter, I18nSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
export default [
  Bundle.createPrototype({
    title: $i18n.get({ id: 'deepHeader', dm: '页头' }),
    componentName: 'PageHeader',
    category: null,
    icon: Icon,
    docUrl: '',
    canDragging: false,
    canDropTo: false,
    canDropIn: false,
    isContainer: true,
    canOperating: false,
    canUseCondition: false,
    canLoop: false,
    initialChildren: [],
    context: {
      Root: [
        {
          name: $i18n.get({ id: 'deepEnablePageHeader', dm: '启用页头' }),
          enable: (prop) => {
            const rootNode = prop.getNode();
            const rootChildren = rootNode.getChildren();
            const page = rootNode.getPage();
            const newNode = page.createNode({
              componentName: 'PageHeader',
            });

            let hasRootHeader = false;
            setTimeout(() => {
              rootChildren.forEach((node) => {
                if (node.getComponentName() === 'RootHeader') {
                  node.insertBefore(newNode);
                  hasRootHeader = true;
                }
              });
              if (!hasRootHeader) {
                rootNode.insertBefore(newNode);
              }
            }, 500);
          },
          disable: (prop) => {
            const rootNode = prop.getNode();
            const rootChildren = rootNode.getChildren();
            let hasRootHeader = false;
            let nodeList = [];
            rootChildren.forEach((node) => {
              if (node.getComponentName() === 'RootHeader') {
                nodeList = node.getChildren().filter((c) => c.getComponentName() === 'PageHeader');
                hasRootHeader = true;
              }
            });
            if (!hasRootHeader) {
              nodeList = rootNode
                .getChildren()
                .filter((c) => c.getComponentName() === 'PageHeader');
            }
            nodeList.forEach((node) => node.remove());
          },
        },
      ],
    },

    configure: [
      ...createSlot({
        slotName: 'title',
        slotTitle: $i18n.get({ id: 'deepPageTitle', dm: '页面标题' }),
        display: 'block',
        allowTextInput: false,
        initialValue: true,
        initialChildren: [
          {
            componentName: 'Text',
            props: {
              content: {
                type: 'i18n',
                en_US: 'Title',
                zh_CN: '页面标题',
              },
            },
          },
        ],
      }),

      ...createSlot({
        slotName: 'subTitle',
        slotTitle: $i18n.get({ id: 'deepSubtitle', dm: '副标题' }),
        display: 'block',
        allowTextInput: false,
        initialValue: false,
        initialChildren: [
          {
            componentName: 'Text',
            props: {
              content: {
                type: 'i18n',
                en_US: 'Title',
                zh_CN: '副标题',
              },
            },
          },
        ],
      }),

      ...createSlot({
        slotName: 'logo',
        slotTitle: $i18n.get({ id: 'deepPageMap', dm: '页面配图' }),
        display: 'block',
        allowTextInput: false,
        initialValue: null,
      }),

      ...createSlot({
        slotName: 'content',
        slotTitle: $i18n.get({ id: 'deepMainContent', dm: '主内容' }),
        display: 'block',
        allowTextInput: false,
        initialValue: true,
      }),

      ...createSlot({
        slotName: 'action',
        slotTitle: $i18n.get({ id: 'deepOperatingArea', dm: '操作区' }),
        display: 'block',
        allowTextInput: false,
        initialValue: true,
        initialChildren: [
          {
            componentName: 'Button',
            props: {
              content: {
                type: 'i18n',
                en_US: 'Button',
                zh_CN: '操作一',
              },

              __style__: ':root {\n  margin-right: 15px;\n}',
              type: 'primary',
              size: 'medium',
            },
          },

          {
            componentName: 'Button',
            props: {
              content: {
                type: 'i18n',
                en_US: 'Button',
                zh_CN: '操作二',
              },

              type: 'secondary',
              size: 'medium',
            },
          },
        ],
      }),

      ...createSlot({
        slotName: 'extraContent',
        slotTitle: $i18n.get({ id: 'deepExtension', dm: '扩展内容' }),
        display: 'block',
        allowTextInput: false,
        initialValue: false,
      }),

      ...createSlot({
        slotName: 'tab',
        slotTitle: $i18n.get({ id: 'deepTagArea', dm: '页签区域' }),
        display: 'block',
        initialChildren: [
          {
            componentName: 'TabsLayout',
            props: {
              defaultActiveKey: '1',
              items: [
                {
                  primaryKey: '1',
                  title: {
                    zh_CN: '标签项',
                    en_US: 'Tab Item',
                    type: 'i18n',
                  },

                  closeable: null,
                  disabled: null,
                  defaultActived: true,
                },
                {
                  primaryKey: '2',
                  title: {
                    zh_CN: '标签项',
                    en_US: 'Tab Item',
                    type: 'i18n',
                  },

                  closeable: null,
                  disabled: null,
                },
              ],

              shape: 'pure',
              size: 'medium',
              excessMode: 'slide',
              tabPosition: 'top',
              style: {},
              fieldId: 'tabs_layout_js9spn3l',
              events: {},
            },

            children: [
              {
                componentName: 'Tab',
                id: 'node_js9spn3k',
                props: {
                  primaryKey: '1',
                  title: {
                    zh_CN: '标签项',
                    en_US: 'Tab Item',
                    type: 'i18n',
                  },
                },

                children: [],
              },
              {
                componentName: 'Tab',
                id: 'node_js9spn3l',
                props: {
                  primaryKey: '2',
                  title: {
                    zh_CN: '标签项',
                    en_US: 'Tab Item',
                    type: 'i18n',
                  },
                },

                children: [],
              },
            ],
          },
        ],
      }),

      style({ advanced: true }),
      {
        type: 'group',
        title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
        display: 'accordion',
        collapsed: true,
        items: [uuid('pageHeader')],
      },
    ],
  }),
];
