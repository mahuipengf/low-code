import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  I18nSetter,
  NumberSetter,
  JsonSetter,
  ChoiceSetter,
  BoolSetter,
  ListSetter,
  ActionSetter,
  ValidationSetter,
} from '@ali/visualengine-utils';
import {
  label,
  behavior,
  formCategory,
  labelAlign,
  labelColSpan,
  labelColOffset,
  wrapperColSpan,
  wrapperColOffset,
  labelTextAlign,
  tips,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  validation,
  advanced,
} from '../common/vu-fusion-field-property';
import Logo from './logo.svg';
import { tableFieldDoc } from '../common/tipUrls';

// 允许拖入明细组件中的非表单组件列表
const NOT_FORMFIELD_DROP_IN_LIST = [
  'ColumnsLayout',
];

// 不允许拖入明细组件中的表单组件列表
const FORMFIELD_NOT_DROP_IN_LIST = [
  'TableField',
  'Form',
  'SearchField',
  'InstanceField',
];

export default Bundle.createPrototype({
  title: '明细',
  componentName: 'TableField',
  category: '表单',
  icon: Logo,
  docUrl: tableFieldDoc,
  isContainer: true,
  canDragging: true,
  canDropIn(placement) {
    const componentName = placement.getComponentName();
    if (NOT_FORMFIELD_DROP_IN_LIST.indexOf(componentName) > -1) {
      return true;
    }
    if (FORMFIELD_NOT_DROP_IN_LIST.indexOf(componentName) > -1) {
      return false;
    }
    if (placement.getCategory && placement.getCategory() !== '表单') {
      return false;
    }
    if (placement.getPrototype && placement.getPrototype().getCategory() !== '表单') {
      return false;
    }
    return true;
  },
  didDropIn(dragment) {
    dragment.setPropValue('isCustomStore', true);
    if (this.getProps().getPropValue('representation') === 'TABLE') {
      dragment.getPrototype().options.isInline = true;
    }
  },
  didDropOut(dragment) {
    dragment.setPropValue('isCustomStore', false);
    dragment.getPrototype().options.isInline = false;
  },
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1nYqOuW61gK0jSZFlXXXDKFXa-112-64.png",
      label: "明细",
      schema: {
        componentName: "TableField",
        props: {},
      },
    },
  ],
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: false,
      initialValue: {
        zh_CN: '明细',
        en_US: 'Table Field',
        type: 'i18n',
      },
    }),
    labelAlign({ 
      supportVariable: false,
    }),
    labelColSpan({ 
      supportVariable: false,
    }),
    labelColOffset({ 
      supportVariable: false,
    }),
    wrapperColSpan({ 
      supportVariable: false,
    }),
    wrapperColOffset({ 
      supportVariable: false,
    }),
    labelTextAlign({ 
      supportVariable: false,
    }),
    tips({ 
      supportVariable: false,
    }),
    behavior({ 
      supportVariable: false,
    }),
    labelTipsType({ 
      supportVariable: false,
    }, false),
    labelTipsIcon({ 
      supportVariable: false,
    }),
    labelTips({ 
      supportVariable: false,
    }),
    labelTipsText({ 
      supportVariable: false,
    }),
    labelTipsRender({ 
      supportVariable: false,
    }),
    // {{ 兼容旧版属性，只保留申明，不显示 Start
    { name: 'representation', display: 'none', ignore: true },
    { name: 'buttonName', display: 'none', ignore: true },
    { name: 'buttonBehavior', display: 'none', ignore: true },
    { name: 'deleteButtonName', display: 'none', ignore: true },
    { name: 'moveUpButtonName', display: 'none', ignore: true },
    { name: 'moveDownButtonName', display: 'none', ignore: true },
    { name: 'listNum', display: 'none', ignore: true },
    { name: 'listMinNum', display: 'none', ignore: true },
    // 兼容旧版属性，只保留申明，不显示 End }}
    {
      name: 'layout',
      title: '排列方式',
      tip: '表格方式只在 PC 模式下有效',
      display: 'inline',
      initialValue: 'TILED',
      supportVariable: false,
      setter: (
        <ChoiceSetter
          options={[
            {
              tip: '平铺方式',
              title: '平铺方式',
              value: 'TILED',
            },
            {
              tip: '表格方式',
              title: '表格方式',
              value: 'TABLE',
            },
          ]}
        />
      ),
      initial(value) {
        if (['TABLE', 'TILED'].indexOf(value) !== -1) {
          return value;
        }

        const oldValue = this.getProps().getPropValue('representation');
        if (oldValue) {
          return oldValue;
        }

        return 'TILED';
      }
    },
    {
      name: 'theme',
      title: '主题',
      tip: '只在 PC 表格方式下有效',
      display: 'inline',
      initialValue: 'split',
      supportVariable: false,
      setter: (
        <ChoiceSetter
          options={[
            { value: 'zebra', title: '斑马纹' },
            { value: 'split', title: '分割线' },
            { value: 'border', title: '边框线' },
          ]}
        />
      ),
      hidden() {
        return this.getProps().getPropValue('layout') !== 'TABLE';
      },
    },
    {
      name: 'showIndex',
      title: '显示序号',
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'showTableHead',
      title: '显示表头',
      tip: '只在 PC 表格方式下有效',
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
      hidden() {
        return this.getProps().getPropValue('layout') !== 'TABLE';
      },
    },
    {
      name: 'showSortable',
      title: '显示排序',
      tip: '只在 PC 表格方式下有效',
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'showActions',
      title: '显示操作',
      tip: '关闭后删除、排序均不再显示',
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'addButtonPosition',
      title: '按钮位置',
      display: 'inline',
      initialValue: 'bottom',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: '底部',
              value: 'bottom',
            },
            {
              title: '顶部',
              value: 'top',
            },
          ]}
        />
      ),
    },
    {
      name: 'addButtonText',
      title: '按钮名称',
      display: 'inline',
      initialValue: {
        zh_CN: '新增一项',
        en_US: 'Add item',
        type: 'i18n',
      },
      setter: <I18nSetter placeholder="请输入" />,
      supportVariable: false,
      initial(value) {
        if (value) {
          return value;
        }

        const oldValue = this.getProps().getPropValue('buttonName');
        if (oldValue) {
          return oldValue;
        }

        return '新增一项';
      }
    },
    {
      name: 'addButtonBehavior',
      title: '按钮状态',
      tip: '新增按钮的可操作状态',
      display: 'inline',
      initialValue: 'NORMAL',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: '普通',
              value: 'NORMAL',
            },
            {
              title: '禁用',
              value: 'DISABLED',
            },
            {
              title: '隐藏',
              value: 'HIDDEN',
            },
          ]}
        />
      ),
      supportVariable: false,
      initial(value) {
        if (value) {
          return value;
        }

        const oldValue = this.getProps().getPropValue('buttonBehavior');
        if (oldValue) {
          return oldValue;
        }

        return 'NORMAL';
      }
    },
    {
      name: 'delButtonText',
      title: '删除按钮',
      tip: '删除按钮文案',
      display: 'inline',
      initialValue: {
        zh_CN: '删除',
        en_US: 'Remove',
        type: 'i18n',
      },
      setter: <I18nSetter placeholder="请输入" />,
      supportVariable: false,
      initial(value) {
        if (value) {
          return value;
        }

        const oldValue = this.getProps().getPropValue('deleteButtonName');
        if (oldValue) {
          return oldValue;
        }

        return '删除';
      }
    },
    {
      name: 'moveUp',
      title: '上移按钮',
      tip: '上移按钮文案',
      display: 'inline',
      initialValue: {
        zh_CN: '上移',
        en_US: 'Up',
        type: 'i18n',
      },
      setter: <I18nSetter placeholder="请输入" />,
      supportVariable: false,
      hidden() {
        return !this.getProps().getPropValue('showSortable');
      },
      initial(value) {
        if (value) {
          return value;
        }

        const oldValue = this.getProps().getPropValue('moveUpButtonName');
        if (oldValue) {
          return oldValue;
        }

        return '上移';
      }
    },
    {
      name: 'moveDown',
      title: '下移按钮',
      tip: '下移按钮文案',
      display: 'inline',
      initialValue: {
        zh_CN: '下移',
        en_US: 'Down',
        type: 'i18n',
      },
      setter: (
        <I18nSetter placeholder="请输入" />
      ),
      supportVariable: false,
      hidden() {
        return !this.getProps().getPropValue('showSortable');
      },
      initial(value) {
        if (value) {
          return value;
        }

        const oldValue = this.getProps().getPropValue('moveDownButtonName');
        if (oldValue) {
          return oldValue;
        }

        return '下移';
      }
    },
    {
      name: 'maxItems',
      title: '最大条数',
      display: 'inline',
      setter: <NumberSetter min={0} />,
    },
    {
      name: 'minItems',
      title: '最小条数',
      display: 'inline',
      initialValue: 1,
      setter: <NumberSetter min={0} />,
    },
    {
      name: 'actionsColumnWidth',
      title: '操作宽度',
      display: 'inline',
      initialValue: 70,
      setter: <NumberSetter min={0}
        units={[
          {
            type: 'px',
            list: true,
          },
        ]}
      />,
    },
    {
      name: 'actions',
      title: '操作列',
      tip: '仅 PC 端支持, 操作列默认是最后一列',
      display: 'accordion',
      collapsed: false,
      initialValue: [],
      setter: (
        <ListSetter
          display="entry"
          checkField={null}
          configure={[
            {
              name: 'content',
              title: '名称',
              initialValue: {
                type: 'i18n',
                zh_CN: '操作',
                en_US: 'action',
              },
              setter: <I18nSetter />,
            },
            {
              name: 'callback',
              title: '回调函数',
              setter: <ActionSetter
                defaultCode={
`function onActionClick({ index, groupId, itemValue, actionKey }) {
  console.log(actionKey);
}`
                }
                defaultActionName="onActionClick"
              />,
            },
            {
              name: 'render',
              title: '定制渲染',
              tip: '返回 false 时，该操作不可见',
              setter: <ActionSetter defaultCode={
`function onActionRender({ index, groupId, itemValue, actionKey }) {
  return title;
}`
                }
                defaultActionName="onActionRender"
              />,
            },
          ]}
        />
      ),
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    advanced('tableField', [
      {
        name: 'onChange', title: 'onChange 表单值变化', initialValue: `/**
* TableField onChange
*/
function onChange({ value, extra }){
  console.log(value, extra);
}`,
      },
      {
        name: 'beforeAddClick', title: 'beforeAddClick 添加回调执行前', initialValue: `/**
* TableField beforeAddClick
*/
function beforeAddClick(){
  console.log('添加回调执行前');
}`,
      },
      {
        name: 'onAddClick', title: 'onAddClick 点击添加', initialValue: `/**
* TableField onAddClick
*/
function onAddClick(newGroupId){
  console.log('点击添加');
}`,
      },
      {
        name: 'beforeDelClick', title: 'beforeDelClick 删除回调执行前', initialValue: `/**
* TableField beforeDelClick
*/
function beforeDelClick(groupId, item){
  console.log('删除回调执行前');
}`,
      },
      {
        name: 'onDelClick', title: 'onDelClick 点击删除', initialValue: `/**
* TableField onDelClick
* @param groupId 被删除的ID
* @param removedItem 被删除的项数据
*/
function onDelClick(groupId, removedItem){
  console.log(groupId, removedItem);
}`,
      },
    ], { collapsed: true }),
  ],
});
