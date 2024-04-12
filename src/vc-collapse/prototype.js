import React from 'react';
import { Bundle, Env } from '@ali/visualengine';
import { ListSetter, BoolSetter, I18nSetter, JsonSetter } from '@ali/visualengine-utils';
import { uniqueId } from '@ali/ve-utils';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import uuid from '@ali/vu-uuid-property';

import Logo from './logo.svg';
import $i18n from '../i18n/index';
import { collapseDoc } from '../common/tipUrls';

function isI18nValue(value) {
  return value && value.type === 'i18n';
}

export default [
  Bundle.createPrototype({
    componentName: 'Collapse',
    title: $i18n.get({ id: 'deepFoldedPanel', dm: '折叠面板' }),
    icon: Logo,
    docUrl: collapseDoc,
    category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
    isInline: false,
    isContainer: true,
    canHovering: true,
    canSelecting: true,
    canDragging: true,
    canDropIn: 'Panel',
    canDropTo: true,
    initialChildren: [
      {
        componentName: 'Panel',
        props: { primaryKey: 'item_primaryKey1' },
      },
      {
        componentName: 'Panel',
        props: { primaryKey: 'item_primaryKey2' },
      },
    ],

    snippets: [
      {
        screenshot: 'https://img.alicdn.com/tfs/TB1VlOMuYH1gK0jSZFwXXc7aXXa-112-64.png',
        label: $i18n.get({ id: 'deepNormalType', dm: '普通型' }),
        schema: {
          componentName: 'Collapse',
          props: {},
        },
      },

      {
        screenshot: 'https://img.alicdn.com/tfs/TB1t0qFuWL7gK0jSZFBXXXZZpXa-112-64.png',
        label: $i18n.get({ id: 'deepAccordion', dm: '手风琴' }),
        schema: {
          componentName: 'Collapse',
          props: {
            accordion: true,
          },
        },
      },
    ],

    configure: [
      {
        name: 'defaultActiveKey',
        title: $i18n.get({ id: 'deepDefaultActivation', dm: '默认激活' }),
        display: 'none',
        sync() {},
      },
      {
        name: 'items',
        title: $i18n.get({ id: 'deepPanelSingleItem', dm: '面板单项' }),
        display: 'block',
        setter: (
          <ListSetter
            checkField="*defaultActived"
            descriptor="title"
            configure={[
              {
                name: 'primaryKey',
                title: 'ID',
                display: 'none',
                initial: (val) => val || uniqueId(null, 'item', 'list'),
              },
              {
                name: 'title',
                title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
                display: 'inline',
                initialValue: { zh_CN: '面板项', en_US: 'Pane Item', type: 'i18n' },
                setter: I18nSetter,
              },
              {
                name: 'defaultActived',
                title: $i18n.get({ id: 'deepIsItSelected', dm: '是否选中' }),
                display: 'none',
                initialValue: false,
                setter: BoolSetter,
              },
              {
                name: 'disabled',
                title: $i18n.get({ id: 'deepDisable', dm: '禁用' }),
                display: 'inline',
                initialValue: false,
                setter: BoolSetter,
              },
            ]}
          />
        ),

        accessor(value) {
          if (value) {
            return value;
          }
          const node = this.getNode();
          const children = node.getChildren();
          const defaultActiveKey = node.getPropValue('defaultActiveKey');
          return children.map((child) => {
            const primaryKey = String(child.getPropValue('primaryKey'));
            const title = child.getPropValue('title');
            const data = { primaryKey, title };
            if (Array.isArray(defaultActiveKey)) {
              defaultActiveKey.forEach((item) => {
                if (primaryKey === item) {
                  data.defaultActived = true;
                }
              });
            } else if (primaryKey === defaultActiveKey) {
              data.defaultActived = true;
            }
            return data;
          });
        },
        mutator(value, hotValue) {
          const node = this.getNode();
          const accordion = node.getPropValue('accordion');
          const map = {};
          let defaultActiveKey = accordion ? '' : [];
          if (!Array.isArray(value)) {
            value = [];
          }
          value.forEach((item) => {
            const panelItem = Object.assign({}, item);
            map[item.primaryKey] = panelItem;
            if (panelItem.defaultActived) {
              if (accordion) {
                defaultActiveKey = defaultActiveKey || String(panelItem.primaryKey);
              } else {
                defaultActiveKey.push(String(panelItem.primaryKey));
              }
            }
            delete panelItem.defaultActived;
          });
          this.getProps().setPropValue('defaultActiveKey', defaultActiveKey);
          node.mergeChildren(
            (child) => {
              const primaryKey = String(child.getPropValue('primaryKey'));
              if (Object.hasOwnProperty.call(map, primaryKey)) {
                child.setPropValue('title', map[primaryKey].title);
                delete map[primaryKey];
                return false;
              }
              return true;
            },
            () => {
              const items = [];
              for (const primaryKey in map) {
                if (Object.hasOwnProperty.call(map, primaryKey)) {
                  items.push({ componentName: 'Panel', props: map[primaryKey] });
                }
              }
              return items;
            },
            (child1, child2) => {
              const a = hotValue.findIndex(
                (item) => String(item.primaryKey) === String(child1.getPropValue('primaryKey'))
              );

              const b = hotValue.findIndex(
                (item) => String(item.primaryKey) === String(child2.getPropValue('primaryKey'))
              );

              return a - b;
            }
          );
        },
      },

      {
        name: 'accordion',
        title: $i18n.get({ id: 'deepAccordionMode', dm: '手风琴模式' }),
        initialValue: false,
        tip: {
          content: $i18n.get({
            id: 'deepInAccordionModeOnly',
            dm: '手风琴模式下，只有第一个被激活的面板会被展开',
          }),
          url: collapseDoc,
        },

        setter: <BoolSetter />,
      },

      {
        name: 'separated',
        title: $i18n.get({ id: 'deepSubPanelSeparationMode', dm: '子面板分离模式' }),
        initialValue: false,
        tip: {
          content: $i18n.get({
            id: 'deepWhenThereAreMultiple',
            dm: '在有多个面板单项时，让不同面板产生上下间距，产生视觉上的分离效果',
          }),
          url: collapseDoc,
        },

        setter: <BoolSetter />,
      },

      style({
        advanced: true,
      }),

      {
        type: 'group',
        name: 'advance',
        title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
        display: 'accordion',
        items: [
          uuid('collapse'),
          {
            name: 'CONTROL',
            title: $i18n.get({ id: 'deepRestrictedComponents', dm: '受限组件' }),
            tip: $i18n.get({
              id: 'deepTurnOnTheRestricted',
              dm: '开启受限组件，开启受控后必须自行通过绑定 onExpand 来更新折叠和展开状态',
            }),
            display: 'inline',
            supportVariable: true,
            initialValue: false,
            setter: <BoolSetter />,
          },

          {
            name: 'expandedKeys',
            title: $i18n.get({ id: 'deepExpandedPanel', dm: '展开的面板' }),
            display: 'inline',
            supportVariable: true,
            initialValue: '',
            hidden() {
              return !this.getProps().getPropValue('CONTROL');
            },
            setter: <JsonSetter />,
          },

          ...events([
            {
              name: 'onExpand',
              title: $i18n.get({
                id: 'deepONEXPANDExpansionStateChanges',
                dm: 'onExpand 展开状态发生变化',
              }),
              initialValue: `/**
* onPanelStatusChange
* @param itemPrimaryKeyArray 打开项的 key
*/
function onPanelStatusChange(itemPrimaryArray){
  console.log(itemPrimaryArray);
}`,
            },
          ]),
        ],
      },
    ],
  }),

  Bundle.createPrototype({
    componentName: 'Panel',
    title: $i18n.get({ id: 'deepTagItem', dm: '标签项' }),
    icon: Logo,
    category: null,
    isInline: false,
    isContainer: true,
    canHovering: false,
    canSelecting: false,
    canDropIn: true,
    canDragging: false,
    canDropTo: 'Collapse',
    configure: [
      {
        name: 'primaryKey',
        title: $i18n.get({ id: 'deepKeyValue', dm: '键值' }),
        display: 'none',
      },
      {
        name: 'title',
        title: $i18n.get({ id: 'deepName', dm: '名称' }),
        display: 'none',
        defaultValue: { zh_CN: '面板项', en_US: 'Pane Item', type: 'i18n' },
        initial(val, defaultValue) {
          const locale = Env.getLocale();
          const useLocale = Env.supports('i18nPane') ? locale : null;
          if (val == null || val === defaultValue) {
            val = defaultValue;
          }
          if (isI18nValue(val)) {
            return { ...val, use: useLocale };
          }
          return {
            type: 'i18n',
            [locale]: val,
            use: useLocale,
          };
        },
      },
    ],
  }),
];
