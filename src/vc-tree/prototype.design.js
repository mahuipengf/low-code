import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ChoiceSetter,
  BoolSetter,
  JsonSetter,
  ActionSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import events from '@ali/vu-events-property';
import Icon from './logo.svg';
import { treeDoc, treeDraggable, treeIsLoadData, treeSelectDataSource } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '树形控件',
  componentName: 'Tree',
  category: '高级',
  icon: Icon,
  docUrl: treeDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1.bOIu2b2gK0jSZK9XXaEgFXa-112-64.png',
      label: '树形控件',
      schema: {
        componentName: 'Tree',
        props: {},
      },
    },
  ],
  configure: [
    {
      name: 'dataSource',
      title: '节点数据',
      display: 'block',
      supportVariable: false,
      tip: {
        content: '点击？查看数据结构',
        url: treeSelectDataSource,
      },
      initialValue: [{
        key: '0-0',
        label: '0-0',
        children: [{
          key: '0-0-0',
          label: '0-0-0',
          children: [{
            key: '0-0-0-0',
            label: '0-0-0-0',
            children: [{
              key: '0-0-0-0-0',
              label: '0-0-0-0-0',
            }],
          }, {
            key: '0-0-0-1',
            label: '0-0-0-1',
          }],
        }, {
          key: '0-0-1',
          label: '0-0-1',
          children: [{
            key: '0-0-1-0',
            label: '0-0-1-0',
          }, {
            key: '0-0-1-1',
            label: '0-0-1-1',
          }],
        }],
      }],
      setter: <JsonSetter />,
    },
    {
      name: 'processDataSource',
      title: '数据预处理',
      display: 'block',
      setter: <ActionSetter defaultActionName="processDataSource"
        defaultCode={`function processDataSource(data) {
  return data
}`}
      />,
    },
    {
      name: 'showLine',
      title: '显示线',
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'multiple',
      title: '支持多选',
      display: 'block',
      initlalValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'editable',
      title: '支持编辑',
      initialValue: false,
      display: 'block',
      setter: <BoolSetter />,
    },
    {
      name: 'draggable',
      title: '支持拖拽',
      initialValue: false,
      display: 'block',
      tip: {
        content: '点击查看详情',
        url: treeDraggable,
      },
      setter: <BoolSetter />,
    },
    {
      name: 'defaultExpandAll',
      title: '默认展开所有节点',
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'defaultExpandedKeys',
      title: '默认展开的节点',
      display: 'block',
      initlalValue: [],
      initial(val) {
        return val || [];
      },
      setter: <JsonSetter />,
      disabled() {
        return this.getProps().getPropValue('defaultExpandAll');
      },
    },
    {
      name: 'expandedKeys',
      title: '展开的节点',
      tip: 'Array',
      display: 'block',
      initialValue: '',
      supportVariable: false,
      setter: <JsonSetter />,
    },
    {
      name: 'selectable',
      title: '支持选中',
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'selectedKeys',
      title: '默认选中节点',
      tip: 'Array',
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('selectable');
      },
      initialValue: [],
      supportVariable: false,
      setter: <JsonSetter />,
    },
    {
      name: 'checkable',
      title: '复选框',
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'checkedKeys',
      title: '默认勾选节点',
      tip: 'Array',
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('checkable');
      },
      initialValue: [],
      supportVariable: false,
      setter: <JsonSetter />,
    },
    {
      name: 'checkStrictly',
      title: '复选框完全受控',
      tip: {
        content: '父子节点选中状态不再关联',
      },
      hidden() {
        return !this.getProps().getPropValue('checkable');
      },
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'checkedStrategy',
      title: '定义选中时回填的方式',
      initialValue: 'parent',
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('checkable');
      },
      setter: <ChoiceSetter options={[
        { title: 'all', value: 'all', tip: '返回所有选中的节点' },
        { title: 'parent', value: 'parent', tip: '父子节点都选中时只返回父节点' },
        { title: 'child', value: 'child', tip: '父子节点都选中时只返回子节点' },
      ]}
      />,
    },
    {
      title: '开启异步加载',
      name: 'isLoadData',
      display: 'block',
      initialValue: false,
      required: false,
      tip: {
        content: '点击 ? 查看用法',
        url: treeIsLoadData,
      },
      setter: <BoolSetter />,
    },
    {
      title: 'loadData 函数',
      name: 'loadData',
      display: 'accordion',
      required: false,
      hidden() {
        return !this.getProps().getPropValue('isLoadData');
      },
      setter: <ActionSetter defaultActionName="loadData"
        defaultCode={`function loadData(data){
  return new Promise((resolve) => {
    resolve();
  });
}`}
      />,
    },
    style({ advanced: true }),
    {
      type: 'group',
      name: 'advance',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('tree'),
        ...events([
          {
            name: 'onSelect', title: 'onSelect 选中或取消选中节点时', initialValue: `/**
* Tree onSelect
* @param selectedKeys 选中节点key的数组
* @param extra 额外的参数
*/
function onSelect(selectedKeys, extra){
  console.log('选中节点key的数组: ', selectedKeys, ' 额外参数：', extra);
}`,
          },
          {
            name: 'onCheck', title: 'onCheck 勾选或取消勾选复选框时', initialValue: `/**
* Tree onCheck
* @param checkedKeys 勾选复选框节点key的数组
* @param extra 额外参数
*/
function onCheck(checkedKeys, extra){
  console.log('勾选复选框节点key的数组: ', checkedKeys, ' 额外参数：', extra);
}`,
          },
          {
            name: 'onExpand', title: 'onExpand 展开收起节点时', initialValue: `/**
* Tree onExpand
* @param expandedKeys 展开的节点key的数组
* @param extra 额外参数
*/
function onExpand(expandedKeys, extra){
  console.log('展开的节点key的数组: ', expandedKeys, ' 额外参数：', extra);
}`,
          },
          {
            name: 'onEditFinish', title: 'onEditFinish 编辑节点内容完成时', initialValue: `/**
* Tree onEditFinish
* @param key 编辑节点的 key
* @param label 编辑节点完成时节点的文本
* @param node 当前编辑的节点
*/
function onEditFinish(key, label, node){
  console.log('key: ', key, ' label: ', label, ' node: ', node);
}`,
          },
          {
            name: 'onDragStart', title: 'onDragStart 开始拖拽节点时', initialValue: `/**
* Tree onDragStart
* @param info 拖拽信息
*/
function onDragStart(info){

}`,
          },
          {
            name: 'onDragEnter', title: 'onDragEnter 拖拽节点进入目标时', initialValue: `/**
* Tree onDragEnter
* @param info 拖拽信息
*/
function onDragEnter(info){

}`,
          },
          {
            name: 'onDragOver', title: 'onDragOver 拖拽节点在目标节点上移动时', initialValue: `/**
* Tree onDragOver
* @param info 拖拽信息
*/
function onDragOver(info){

}`,
          },
          {
            name: 'onDragLeave', title: 'onDragLeave 拖拽节点离开目标节点时', initialValue: `/**
* Tree onDragLeave
* @param info 拖拽信息
*/
function onDragLeave(info){

}`,
          },
          {
            name: 'onDragEnd', title: 'onDragEnd 拖拽结束时', initialValue: `/**
* Tree onDragEnd
* @param info 拖拽信息
*/
function onDragEnd(info){

}`,
          },
          {
            name: 'onDrop', title: 'onDrop 拖拽节点放入目标节点内或前后时', initialValue: `/**
* Tree onDrop
* @param info 拖拽信息
*/
function onDrop(info){

}`,
          },
          {
            name: 'canDrop', title: 'canDrop 节点是否可被作为目标节点', initialValue: `/**
* Tree canDrop
* @param info 拖拽信息
*/
function canDrop(info){

}`,
          },
          //           {
          //             name: 'onRightClick', title: 'onRightClick 右键点击节点', initialValue: `/**
          // * Tree onRightClick
          // * @param info 信息对象
          // */
          // function onRightClick(info){
          //   console.log('info: ', info);
          // }`,
          //           },
        ], { display: 'none' }),
      ],
    },
  ],
});
