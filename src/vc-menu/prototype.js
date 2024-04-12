import React from 'react';
import { Bundle } from '@ali/visualengine';
import { ChoiceSetter, JsonSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { menuDataSource, menuDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepMenu', dm: '菜单' }),
  componentName: 'Menu',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: menuDoc,
  hasSlot: true,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1QAaIu1L2gK0jSZPhXXahvXXa-112-64.png',
      label: $i18n.get({ id: 'deepMenu', dm: '菜单' }),
      schema: {
        componentName: 'Menu',
        props: {},
      },
    },
  ],

  configure: [
    // {
    //   name: 'dataType',
    //   title: '数据源模式',
    //   display: 'block',
    //   initialValue: 'local',
    //   setter: (
    //     <ChoiceSetter
    //       options={[
    //         { value: 'local', title: '本地' },
    //         { value: 'remote', title: '远程' },
    //       ]}
    //     />
    //   ),
    // },
    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepDataSource', dm: '数据源' }),
      display: 'block',
      // disabled() {
      //   return (this.getProps().getPropValue('dataType') !== 'local');
      // },
      tip: {
        content: $i18n.get({ id: 'deepClickToViewThe', dm: '点击查看数据格式' }),
        url: menuDataSource,
      },

      supportVariable: true,
      initialValue: {
        defaultOpenKeys: ['key1'],
        defaultSelectedKeys: ['key1-1'],
        menu: [
          {
            label: $i18n.get({ id: 'deepMenuItem', dm: '菜单项一' }),
            key: 'key1',
            children: [
              {
                label: $i18n.get({ id: 'deepOptionOne', dm: '选项一' }),
                key: 'key1-1',
                tag: {
                  text: $i18n.get({ id: 'deepInitialization', dm: '初始化' }),
                  color: 'blue',
                },
              },

              {
                label: $i18n.get({ id: 'deepOption', dm: '选项二' }),
                key: 'key1-2',
              },
            ],
          },

          {
            isDivider: true,
          },

          {
            label: $i18n.get({ id: 'deepMenuItem.1', dm: '菜单项二' }),
            key: 'key2',
            children: [
              {
                label: $i18n.get({ id: 'deepOptionOne', dm: '选项一' }),
                key: 'key2-1',
              },

              {
                label: $i18n.get({ id: 'deepOption', dm: '选项二' }),
                key: 'key2-2',
              },
            ],
          },

          {
            label: $i18n.get({ id: 'deepMenuItemThree', dm: '菜单项三' }),
            key: 'key3',
            disabled: true,
          },
        ],
      },

      required: false,
      setter: <JsonSetter />,
    },

    // {
    //   name: 'fetchUrl',
    //   title: '数据源（url）',
    //   disabled() {
    //     return (this.getProps().getPropValue('dataType') !== 'remote');
    //   },
    //   initialValue: 'https://mocks.alibaba-inc.com/mock/HymIpfMfQ/menu',
    //   required: false,
    //   display: 'block',
    //   setter: <TextSetter multiline rows={2} />,
    //   supportVariable: true,
    // },
    // {
    //   name: 'fetchParams',
    //   title: '请求携带的参数',
    //   initialValue: { },
    //   required: false,
    //   display: 'accordion',
    //   collapsed: true,
    //   disabled() {
    //     return (this.getProps().getPropValue('dataType') !== 'remote');
    //   },
    //   setter: <JsonSetter />,
    //   supportVariable: true,
    // },
    // {
    //   name: 'processData',
    //   title: '返回数据处理',
    //   initialValue: 'function processData(content){ \n/* 返回值转化成 \n {\n  defaultSelectedKey: "key",\n  menu: [{ label, key, children: [{ label, key, children: [...] }] }]\n} \n此种结构 */ \n  return content; \n}',
    //   tip: '如果在这里使用了 ctx，设计器中看到的，可能与预想不符，请以预览效果为准',
    //   required: false,
    //   display: 'accordion',
    //   collapsed: true,
    //   disabled() {
    //     return (this.getProps().getPropValue('dataType') !== 'remote');
    //   },
    //   setter: <CodeSetter mode="javascript" wrapEnabled />,
    // },
    // {
    //   name: 'fetchError',
    //   title: '请求出错处理',
    //   initialValue:
    //     'function onFetchError(err, ctx, vcState) {\n  if (err) {\n   ctx.fn.toast({type: "error", title: err}) \n  }\n}',
    //   display: 'accordion',
    //   collapsed: true,
    //   disabled() {
    //     return (this.getProps().getPropValue('dataType') !== 'remote');
    //   },
    //   setter: <CodeSetter mode="javascript" wrapEnabled />,
    // },
    // {
    //   name: 'fetchMethod',
    //   title: '请求方式',
    //   display: 'block',
    //   initialValue: 'GET',
    //   disabled() {
    //     return (this.getProps().getPropValue('dataType') !== 'remote');
    //   },
    //   setter: (
    //     <ChoiceSetter
    //       options={[{ value: 'GET', title: 'GET' }, { value: 'POST', title: 'POST' }, { value: 'JSONP', title: 'JSONP' }]}
    //     />
    //   ),
    // },
    {
      name: 'selectMode',
      title: $i18n.get({ id: 'deepSelectMode', dm: '选择模式' }),
      display: 'block',
      initialValue: false,
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepDoNotStart', dm: '不启动' }), value: false },
            { title: $i18n.get({ id: 'deepRadio', dm: '单选' }), value: 'single' },
            { title: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }), value: 'multiple' },
          ]}
        />
      ),
    },

    {
      name: 'triggerType',
      title: $i18n.get({ id: 'deepTriggerBehavior', dm: '触发行为' }),
      display: 'block',
      initialValue: 'click',
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepClick', dm: '点击' }), value: 'click' },
            { title: $i18n.get({ id: 'deepSuspend', dm: '悬浮' }), value: 'hover' },
          ]}
        />
      ),
    },

    {
      name: 'mode',
      title: $i18n.get({ id: 'deepSubMenuOpenMode', dm: '子菜单打开模式' }),
      display: 'block',
      initialValue: 'inline',
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepDropDown', dm: '下拉' }), value: 'inline' },
            { title: $i18n.get({ id: 'deepMatrix', dm: '弹层' }), value: 'popup' },
          ]}
        />
      ),
    },

    {
      name: 'popupAlign',
      title: $i18n.get({ id: 'deepHomanderAlignment', dm: '弹层对齐方式' }),
      display: 'block',
      initialValue: 'follow',
      hidden() {
        return this.getProps().getPropValue('mode') !== 'popup';
      },
      setter: (
        <ChoiceSetter
          options={[
            { title: 'follow', value: 'follow' },
            { title: 'outside', value: 'outside' },
          ]}
        />
      ),
    },

    {
      name: 'direction',
      title: $i18n.get({ id: 'deepDirection', dm: '展示方向' }),
      display: 'block',
      tip: $i18n.get({ id: 'deepMenuFirstLayerDisplay', dm: '菜单第一层展示方向' }),
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepLevel', dm: '水平' }), value: 'ver' },
            { title: $i18n.get({ id: 'deepVertical', dm: '垂直' }), value: 'hoz' },
          ]}
        />
      ),
    },

    ...createSlot({
      slotName: 'footer',
      slotTitle: 'Footer',
      display: 'block',
      initialChildren: [
        {
          componentName: 'Text',
          content: 'Hello, Footer',
        },
      ],

      allowTextInput: false,
      initialValue: false,
    }),

    ...createSlot({
      slotName: 'header',
      slotTitle: 'Header',
      display: 'block',
      initialChildren: [
        {
          componentName: 'Text',
          content: 'Hello, Header',
        },
      ],

      allowTextInput: false,
      initialValue: false,
    }),

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('menu'),
        ...events([
          {
            name: 'onItemClick',
            title: $i18n.get({ id: 'deepOnItemClickClickOnThe', dm: 'onItemClick 点击菜单项' }),
            initialValue: `/**
 * menu onItemClick
 * 参数配置参考这里：https://fusion.alibaba-inc.com/component/menu
 */
function onMenuItemClick(key, item, event) {
  console.log(key, item, event);
}
`,
          },

          {
            name: 'onSelect',
            title: $i18n.get({
              id: 'deepOnseTelectSelectedOrUnchecked',
              dm: 'onSelect 选中或取消选中菜单项',
            }),
            initialValue: `/**
 * menu onSelect
 * 参数配置参考这里：https://fusion.alibaba-inc.com/component/menu
 */
function onSelectItem(selectedKeys, extraObj) {
  console.log(selectedKeys, extraObj);
}
`,
          },
        ]),
      ],
    },
  ],
});
