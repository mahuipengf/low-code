import React from 'react';
import { Bundle } from '@ali/visualengine';
import { ChoiceSetter, BoolSetter, JsonSetter, ActionSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import events from '@ali/vu-events-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { treeDoc, treeDraggable, treeIsLoadData, treeSelectDataSource } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepTreeControl', dm: '树形控件' }),
  componentName: 'Tree',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: treeDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1.bOIu2b2gK0jSZK9XXaEgFXa-112-64.png',
      label: $i18n.get({ id: 'deepTreeControl', dm: '树形控件' }),
      schema: {
        componentName: 'Tree',
        props: {},
      },
    },
  ],

  configure: [
    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepNodeData', dm: '节点数据' }),
      display: 'block',
      supportVariable: true,
      tip: {
        content: $i18n.get({ id: 'deepClickViewDataStructure', dm: '点击？查看数据结构' }),
        url: treeSelectDataSource,
      },

      initialValue: [
        {
          key: '0-0',
          label: '0-0',
          children: [
            {
              key: '0-0-0',
              label: '0-0-0',
              children: [
                {
                  key: '0-0-0-0',
                  label: '0-0-0-0',
                  children: [
                    {
                      key: '0-0-0-0-0',
                      label: '0-0-0-0-0',
                    },
                  ],
                },

                {
                  key: '0-0-0-1',
                  label: '0-0-0-1',
                },
              ],
            },

            {
              key: '0-0-1',
              label: '0-0-1',
              children: [
                {
                  key: '0-0-1-0',
                  label: '0-0-1-0',
                },
                {
                  key: '0-0-1-1',
                  label: '0-0-1-1',
                },
              ],
            },
          ],
        },
      ],

      setter: <JsonSetter />,
    },

    {
      name: 'processDataSource',
      title: $i18n.get({ id: 'deepDataPretreatment', dm: '数据预处理' }),
      display: 'block',
      setter: (
        <ActionSetter
          defaultActionName="processDataSource"
          defaultCode={`function processDataSource(data) {
  return data
}`}
        />
      ),
    },

    {
      name: 'showLine',
      title: $i18n.get({ id: 'deepDisplayLine', dm: '显示线' }),
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'multiple',
      title: $i18n.get({ id: 'deepSupportMultipleChoice', dm: '支持多选' }),
      display: 'block',
      initlalValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'editable',
      title: $i18n.get({ id: 'deepSupportEditing', dm: '支持编辑' }),
      initialValue: false,
      display: 'block',
      setter: <BoolSetter />,
    },

    {
      name: 'draggable',
      title: $i18n.get({ id: 'deepSupportDrag', dm: '支持拖拽' }),
      initialValue: false,
      display: 'block',
      tip: {
        content: $i18n.get({ id: 'deepClickForDetails', dm: '点击查看详情' }),
        url: treeDraggable,
      },

      setter: <BoolSetter />,
    },

    {
      name: 'defaultExpandAll',
      title: $i18n.get({ id: 'deepByDefaultToExpand', dm: '默认展开所有节点' }),
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'defaultExpandedKeys',
      title: $i18n.get({ id: 'deepByDefaultNode', dm: '默认展开的节点' }),
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
      title: $i18n.get({ id: 'deepUnfoldedNode', dm: '展开的节点' }),
      tip: 'Array',
      display: 'block',
      initialValue: '',
      supportVariable: true,
      setter: <JsonSetter />,
    },

    {
      name: 'selectable',
      title: $i18n.get({ id: 'deepSupport', dm: '支持选中' }),
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'selectedKeys',
      title: $i18n.get({ id: 'deepDefaultSelectionNode', dm: '默认选中节点' }),
      tip: 'Array',
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('selectable');
      },
      initialValue: [],
      supportVariable: true,
      setter: <JsonSetter />,
    },

    {
      name: 'checkable',
      title: $i18n.get({ id: 'deepCheckBox', dm: '复选框' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'checkedKeys',
      title: $i18n.get({ id: 'deepByDefaultCheckNode', dm: '默认勾选节点' }),
      tip: 'Array',
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('checkable');
      },
      initialValue: [],
      supportVariable: true,
      setter: <JsonSetter />,
    },

    {
      name: 'checkStrictly',
      title: $i18n.get({ id: 'deepCheckBoxIsFully', dm: '复选框完全受控' }),
      tip: {
        content: $i18n.get({ id: 'deepTheParentChildNode', dm: '父子节点选中状态不再关联' }),
      },

      hidden() {
        return !this.getProps().getPropValue('checkable');
      },
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'checkedStrategy',
      title: $i18n.get({ id: 'deepDefineHowToSelect', dm: '定义选中时回填的方式' }),
      initialValue: 'parent',
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('checkable');
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
      title: $i18n.get({ id: 'deepRenderChildNodes', dm: '子节点自定义渲染' }),
      name: 'renderChildNodes',
      display: 'accordion',
      required: false,
      setter: (
        <ActionSetter defaultActionName="renderChildNodes"
          defaultCode={`function renderChildNodes(nodes){
  console.log(nodes);
  return nodes;
}`}
        />
      ),
    },
    {
      title: $i18n.get({ id: 'deepTreeLabelRender', dm: '自定义渲染单个节点' }),
      name: 'labelRender',
      display: 'accordion',
      setter: (
        <ActionSetter defaultActionName="labelRender"
          defaultCode={`function labelRender(node){
  return <span>{node.label}</span>
}`}
        />
      ),
    },

    {
      name: 'filterTreeNode',
      title: $i18n.get({ id: 'deepTreeFilterTreeNode', dm: '按需筛选高亮节点' }),
      display: 'accordion',
      setter: (
        <ActionSetter defaultActionName="filterTreeNode"
          defaultCode={`function filterTreeNode(node){
  const matchedKeys = ['0-0-1'];
  return matchedKeys.indexOf(node.props.eventKey) > -1;
}`}
        />
      ),
    },

    {
      title: $i18n.get({ id: 'deepOpenAsynchronousLoading', dm: '开启异步加载' }),
      name: 'isLoadData',
      display: 'block',
      initialValue: false,
      required: false,
      tip: {
        content: $i18n.get({ id: 'deepClickViewUsage', dm: '点击 ? 查看用法' }),
        url: treeIsLoadData,
      },

      setter: <BoolSetter />,
    },

    {
      title: $i18n.get({ id: 'deepLoadDataFunction', dm: 'loadData 函数' }),
      name: 'loadData',
      display: 'accordion',
      required: false,
      hidden() {
        return !this.getProps().getPropValue('isLoadData');
      },
      setter: (
        <ActionSetter
          defaultActionName="loadData"
          defaultCode={`function loadData(data){
  return new Promise((resolve) => {
    resolve();
  });
}`}
        />
      ),
    },

    // {
    //   name: 'isLabelBlock',
    //   title: '节点是否占满剩余空间',
    //   tip: '一般用于统一在各节点右侧添加元素',
    //   display: 'block',
    //   initialValue: false,
    //   setter: <BoolSetter />,
    // },
    // {
    //   name: 'isNodeBlock',
    //   title: '节点是否占满一行',
    //   display: 'block',
    //   initialValue: false,
    //   setter: <BoolSetter />,
    // },
    style({ advanced: true }),
    {
      type: 'group',
      name: 'advance',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('tree'),
        ...events([
          {
            name: 'onSelect',
            title: $i18n.get({
              id: 'deepOnseTelectSelectsOrUncheck',
              dm: 'onSelect 选中或取消选中节点时',
            }),
            initialValue: `/**
* Tree onSelect
* @param selectedKeys 选中节点key的数组
* @param extra 额外的参数
*/
function onSelect(selectedKeys, extra){
  console.log('选中节点key的数组: ', selectedKeys, ' 额外参数：', extra);
}`,
          },

          {
            name: 'onCheck',
            title: $i18n.get({
              id: 'deepOnCheckChecksOrUnchecks',
              dm: 'onCheck 勾选或取消勾选复选框时',
            }),
            initialValue: `/**
* Tree onCheck
* @param checkedKeys 勾选复选框节点key的数组
* @param extra 额外参数
*/
function onCheck(checkedKeys, extra){
  console.log('勾选复选框节点key的数组: ', checkedKeys, ' 额外参数：', extra);
}`,
          },

          {
            name: 'onExpand',
            title: $i18n.get({
              id: 'deepONEXPANDExpandsWhenReceiving',
              dm: 'onExpand 展开收起节点时',
            }),
            initialValue: `/**
* Tree onExpand
* @param expandedKeys 展开的节点key的数组
* @param extra 额外参数
*/
function onExpand(expandedKeys, extra){
  console.log('展开的节点key的数组: ', expandedKeys, ' 额外参数：', extra);
}`,
          },

          {
            name: 'onEditFinish',
            title: $i18n.get({
              id: 'deepOneDitfinishEditingNodeContent',
              dm: 'onEditFinish 编辑节点内容完成时',
            }),
            initialValue: `/**
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
            name: 'onDragStart',
            title: $i18n.get({
              id: 'deepONDRAGSTARTStartsToDrag',
              dm: 'onDragStart 开始拖拽节点时',
            }),
            initialValue: `/**
* Tree onDragStart
* @param info 拖拽信息
*/
function onDragStart(info){

}`,
          },

          {
            name: 'onDragEnter',
            title: $i18n.get({
              id: 'deepOntragenterDraggedNodesWhen',
              dm: 'onDragEnter 拖拽节点进入目标时',
            }),
            initialValue: `/**
* Tree onDragEnter
* @param info 拖拽信息
*/
function onDragEnter(info){

}`,
          },

          {
            name: 'onDragOver',
            title: $i18n.get({
              id: 'deepTheONDRAGOVERDragNode',
              dm: 'onDragOver 拖拽节点在目标节点上移动时',
            }),
            initialValue: `/**
* Tree onDragOver
* @param info 拖拽信息
*/
function onDragOver(info){

}`,
          },

          {
            name: 'onDragLeave',
            title: $i18n.get({
              id: 'deepOnDragleaveDraggedNodesWhen',
              dm: 'onDragLeave 拖拽节点离开目标节点时',
            }),
            initialValue: `/**
* Tree onDragLeave
* @param info 拖拽信息
*/
function onDragLeave(info){

}`,
          },

          {
            name: 'onDragEnd',
            title: $i18n.get({ id: 'deepOndragendDragging', dm: 'onDragEnd 拖拽结束时' }),
            initialValue: `/**
* Tree onDragEnd
* @param info 拖拽信息
*/
function onDragEnd(info){

}`,
          },

          {
            name: 'onDrop',
            title: $i18n.get({
              id: 'deepOnDropDragNodeIs',
              dm: 'onDrop 拖拽节点放入目标节点内或前后时',
            }),
            initialValue: `/**
* Tree onDrop
* @param info 拖拽信息
*/
function onDrop(info){

}`,
          },

          {
            name: 'canDrop',
            title: $i18n.get({
              id: 'deepWhetherTheCANDROPNode',
              dm: 'canDrop 节点是否可被作为目标节点',
            }),
            initialValue: `/**
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
        ]),
      ],
    },
  ],
});
