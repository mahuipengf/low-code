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

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { treeSelectDataSource, treeSelectDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepTreeSelection', dm: '树形选择' }),
  componentName: 'TreeSelectField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: treeSelectDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ONaNuYj1gK0jSZFOXXc7GpXa-112-64.png',
      label: $i18n.get({ id: 'deepRadio', dm: '单选' }),
      schema: {
        componentName: 'TreeSelectField',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1F0GNu.Y1gK0jSZFCXXcwqXXa-112-64.png',
      label: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }),
      schema: {
        componentName: 'TreeSelectField',
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
      supportVariable: true,
      initialValue: {
        zh_CN: '树形选择',
        en_US: 'TreeSelectField',
        type: 'i18n',
      },
    }),

    defaultValue({
      initial(val) {
        return val || [];
      },
      setter: (
        <JsonSetter
          label={$i18n.get({ id: 'deepEditTheDefaultValue', dm: '编辑默认值' })}
          usePopup={false}
          height={80}
        />
      ),
    }),

    labelAlign({
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepLeft', dm: '左' }),
              value: 'left',
            },
            {
              title: $i18n.get({ id: 'deepOn', dm: '上' }),
              value: 'top',
            },
          ]}
          compact={false}
        />
      ),
    }),

    labelColSpan(),
    wrapperColSpan(),
    wrapperColOffset(),
    labelTextAlign(),
    placeholder({
      initialValue: {
        zh_CN: '请选择',
        en_US: 'please select',
        type: 'i18n',
      },
    }),

    tips(),
    size(),
    behavior({ hasReadOnly: true }),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    {
      name: 'hasArrow',
      title: $i18n.get({ id: 'deepPullDownArrow', dm: '下拉箭头' }),
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'hasBorder',
      title: $i18n.get({ id: 'deepFrame', dm: '边框' }),
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'showSearch',
      title: $i18n.get({ id: 'deepEnableSearch', dm: '启用搜索' }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'multiple',
      title: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }),
      display: 'inline',
      initlalValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'tagInline',
      title: $i18n.get({ id: 'deepTagInline', dm: '单行显示' }),
      display: 'inline',
      initialValue: false,
      hidden() {
        return !this.getProps().getProp('multiple').getValue();
      },
      setter: <BoolSetter />,
    },

    {
      name: 'hasClear',
      title: $i18n.get({ id: 'deepClearButton', dm: '清除按钮' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      hidden() {
        return this.getProps().getPropValue('multiple') === true;
      },
      setter: <BoolSetter />,
    },

    {
      name: 'treeCheckable',
      title: $i18n.get({ id: 'deepCheckBox', dm: '复选框' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
      hidden() {
        return !this.getProps().getPropValue('multiple');
      },
    },

    {
      name: 'treeCheckStrictly',
      title: $i18n.get({ id: 'deepCheckBoxIsFully', dm: '复选框完全受控' }),
      tip: {
        content: $i18n.get({ id: 'deepTheParentChildNode', dm: '父子节点选中状态不再关联' }),
      },

      hidden() {
        return !this.getProps().getPropValue('treeCheckable');
      },
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepPullDownData', dm: '下拉数据' }),
      display: 'block',
      supportVariable: true,
      tip: {
        content: $i18n.get({ id: 'deepClickViewDataStructure', dm: '点击？查看数据结构' }),
        url: treeSelectDataSource,
      },

      initialValue: [
        {
          label: $i18n.get({ id: 'deepClothing', dm: '服装' }),
          value: '1',
          key: '1',
          selectable: false,
          children: [
            {
              label: $i18n.get({ id: 'deepMenS', dm: '男装' }),
              value: '2',
              key: '2',
              children: [
                {
                  label: $i18n.get({ id: 'deepCoat', dm: '外套' }),
                  value: '4',
                  key: '4',
                  disableCheckbox: true,
                },
                {
                  label: $i18n.get({ id: 'deepJacket', dm: '夹克' }),
                  value: '5',
                  key: '5',
                  disabled: true,
                },
              ],
            },

            {
              label: $i18n.get({ id: 'deepWomenSClothing', dm: '女装' }),
              value: '3',
              key: '3',
              children: [
                {
                  label: $i18n.get({ id: 'deepSkirt', dm: '裙子' }),
                  value: '6',
                  key: '6',
                },
              ],
            },
          ],
        },
      ],

      setter: <JsonSetter />,
    },

    {
      name: 'autoWidth',
      title: $i18n.get({ id: 'deepDropTheBoxIs', dm: '下拉框是否于选择器对齐' }),
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'treeDefaultExpandAll',
      title: $i18n.get({ id: 'deepByDefault', dm: '默认展开所有' }),
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'preserveNonExistentValue',
      title: $i18n.get({ id: 'deepTreeSelectPreserveNonExistentValue', dm: '下拉数据中不存在时仍然显示值' }),
      // title: '下拉数据中不存在时仍然显示值',
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'treeDefaultExpandedKeys',
      title: $i18n.get({ id: 'deepByDefaultExpansionNode', dm: '默认展开节点数组' }),
      tip: {
        content: $i18n.get({id: 'deepDefaultPropsExplain' }),
      },
      display: 'block',
      supportVariable: true,
      initlalValue: [],
      setter: <JsonSetter />,
    },

    {
      name: 'treeCheckedStrategy',
      title: $i18n.get({ id: 'deepDefineHowToSelect', dm: '定义选中时回填的方式' }),
      initialValue: 'parent',
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('treeCheckable');
      },
      setter: (
        <ChoiceSetter
          options={[
            {
              title: 'all',
              value: 'all',
              tip: $i18n.get({ id: 'deepReturnsAllSelectedNodes', dm: '返回所有选中的节点' }),
            },
            {
              title: 'parent',
              value: 'parent',
              tip: $i18n.get({
                id: 'deepTheParentChildNode.1',
                dm: '父子节点都选中时只返回父节点',
              }),
            },
            {
              title: 'child',
              value: 'child',
              tip: $i18n.get({
                id: 'deepTheParentChildNode.2',
                dm: '父子节点都选中时只返回子节点',
              }),
            },
          ]}
        />
      ),
    },

    {
      name: 'notFoundContent',
      title: $i18n.get({ id: 'deepNoDataDisplayContent', dm: '无数据时显示内容' }),
      display: 'block',
      initialValue: {
        zh_CN: '无数据',
        en_US: 'Not Found',
        type: 'i18n',
      },

      setter: <I18nSetter />,
    },

    {
      name: 'treeProps',
      title: $i18n.get({ id: 'deepTreeControlExtensionConfiguration', dm: '树形控件扩展配置' }),
      display: 'block',
      supportVariable: true,
      initlalValue: {},
      setter: <JsonSetter />,
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    style({ advanced: true }),
    advanced('treeSelect', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `
/**
 * TreeSelect onChange
 * @param value 选中的值
 */
function onChange({ value }) {
  console.log(value);
}`,
      },

      {
        name: 'onSearch',
        title: $i18n.get({ id: 'deepOnSearchCallback', dm: 'onSearch 搜索回调' }),
        initialValue: `
/**
 * TreeSelect treeSelectOnSearch
 * @param keyword 搜索关键字
 */
function treeSelectOnSearch(keyword) {
  console.log(keyword);
}`,
      },

      {
        name: 'onVisibleChange',
        title: $i18n.get({
          id: 'deepONVISIBLECHANGEDropDownBox',
          dm: 'onVisibleChange 下拉框显示隐藏回调',
        }),
        initialValue: `
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
        name: 'treeLoadData',
        title: $i18n.get({
          id: 'deepTREELOADDATAFunctionsForAsynchronously',
          dm: 'treeLoadData 异步加载数据的函数',
        }),
        initialValue: `
/**
 * TreeSelect treeLoadData
 * @param node 被展开节点
 */
function treeLoadData(node) {
  console.log(node);
}`,
      },
    ]),
  ],
});
