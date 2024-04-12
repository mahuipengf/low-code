import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  JsonSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  label,
  labelAlign,
  labelTextAlign,
  placeholder,
  tips,
  size,
  labelColSpan,
  wrapperColSpan,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  wrapperColOffset,
  validation,
  advanced,
  formCategory,
  defaultValue,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import { treeSelectDataSource, treeSelectDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '树形选择',
  componentName: 'TreeSelectField',
  category: '表单',
  icon: Icon,
  docUrl: treeSelectDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1ONaNuYj1gK0jSZFOXXc7GpXa-112-64.png",
      label: "单选",
      schema: {
        componentName: "TreeSelectField",
        props: {},
      },
    },
    {
      screenshot: "https://img.alicdn.com/tfs/TB1F0GNu.Y1gK0jSZFCXXcwqXXa-112-64.png",
      label: "多选",
      schema: {
        componentName: "TreeSelectField",
        props: {
          multiple: true,
        },
      },
    },
  ],
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: false,
      initialValue: {
        zh_CN: '树形选择',
        en_US: 'TreeSelectField',
        type: 'i18n',
      },
    }),
    labelAlign({
      setter: (
        <ChoiceSetter
          options={[{
            title: '左',
            value: 'left',
          }, {
            title: '上',
            value: 'top',
          }]}
          compact={false}
        />
      ),
      supportVariable: false,
    }),
    labelColSpan({ 
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
    placeholder({
      initialValue: {
        zh_CN: '请选择',
        en_US: 'please select',
        type: 'i18n',
      },
      supportVariable: false,
    }),
    tips({ 
      supportVariable: false,
    }),
    size({ 
      supportVariable: false,
    }),
    behavior({ 
      hasReadOnly: true,
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
    {
      name: 'hasArrow',
      title: '下拉箭头',
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'hasBorder',
      title: '边框',
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'showSearch',
      title: '启用搜索',
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'multiple',
      title: '多选',
      display: 'inline',
      initlalValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'hasClear',
      title: '清除按钮',
      display: 'inline',
      initialValue: false,
      hidden() {
        return (this.getProps().getPropValue('multiple') === true);
      },
      setter: <BoolSetter />,
    },
    {
      name: 'treeCheckable',
      title: '复选框',
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
      hidden() {
        return !this.getProps().getPropValue('multiple')
      }
    },
    {
      name: 'treeCheckStrictly',
      title: '复选框完全受控',
      tip: {
        content: '父子节点选中状态不再关联',
      },
      hidden() {
        return !this.getProps().getPropValue('treeCheckable');
      },
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'dataSource',
      title: '下拉数据',
      display: 'none',
      supportVariable: false,
      tip: {
        content: '点击？查看数据结构',
        url: treeSelectDataSource,
      },
      initialValue: [{
        label: '服装',
        value: '1',
        key: '1',
        selectable: false,
        children: [{
          label: '男装',
          value: '2',
          key: '2',
          children: [{
            label: '外套',
            value: '4',
            key: '4',
            disableCheckbox: true,
          }, {
            label: '夹克',
            value: '5',
            key: '5',
            disabled: true,
          }],
        }, {
          label: '女装',
          value: '3',
          key: '3',
          children: [{
            label: '裙子',
            value: '6',
            key: '6',
          }],
        }],
      }],
      setter: <JsonSetter />,
    },
    {
      name: 'autoWidth',
      title: '下拉框是否于选择器对齐',
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'treeDefaultExpandAll',
      title: '默认展开所有',
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'treeCheckedStrategy',
      title: '定义选中时回填的方式',
      initialValue: 'parent',
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('treeCheckable');
      },
      setter: <ChoiceSetter options={[
        { title: 'all', value: 'all', tip: '返回所有选中的节点' },
        { title: 'parent', value: 'parent', tip: '父子节点都选中时只返回父节点' },
        { title: 'child', value: 'child', tip: '父子节点都选中时只返回子节点' },
      ]}
      />,
    },
    {
      name: 'notFoundContent',
      title: '无数据时显示内容',
      display: 'block',
      initialValue: {
        zh_CN: '无数据',
        en_US: 'Not Found',
        type: 'i18n',
      },
      setter: <I18nSetter />,
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    style({ advanced: true }),
    advanced('treeSelect', [
      {
        name: 'onChange', title: 'onChange 值发生变化', initialValue: `
/**
 * TreeSelect onChange
 * @param value 选中的值
 */
function onChange({ value }) {
  console.log(value);
}`,
      },
      {
        name: 'onSearch', title: 'onSearch 搜索回调', initialValue: `
/**
 * TreeSelect treeSelectOnSearch
 * @param keyword 搜索关键字
 */
function treeSelectOnSearch(keyword) {
  console.log(keyword);
}`,
      },
      {
        name: 'onVisibleChange', title: 'onVisibleChange 下拉框显示隐藏回调', initialValue: `
/**
 * TreeSelect onVisibleChange
 * @param visible {Boolean} 是否显示
 * @param type {String} 触发显示关闭的操作类型
 */
function onTreeSelectVisibleChange(visible, type) {
  console.log(visible, type);
}`,
      },
      {
        name: 'treeLoadData', title: 'treeLoadData 异步加载数据的函数', initialValue: `
/**
 * TreeSelect treeLoadData
 * @param node 被展开节点
 */
function treeLoadData(node) {
  console.log(node);
}`,
      },
    ], { collapsed: true }),
  ],
});
