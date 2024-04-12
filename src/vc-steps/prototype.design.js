
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ChoiceSetter,
  BoolSetter,
  NumberSetter,
  ListSetter,
  TextSetter,
  I18nSetter,
  ActionSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import { stepsDataSource, stepsDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '步骤',
  componentName: 'Steps',
  category: '高级',
  icon: Icon,
  docUrl: stepsDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ahKNu4D1gK0jSZFyXXciOVXa-112-64.png',
      label: '普通型',
      schema: {
        componentName: 'Steps',
        props: {},
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1RNWMu1L2gK0jSZFmXXc7iXXa-112-64.png',
      label: '箭头型',
      schema: {
        componentName: 'Steps',
        props: {
          "shape": "arrow",
          "direction": "horizontal",
          "labelPlacement": "vertical",
          "readOnly": false,
          "animation": true,
          "current": 1,
        },
      },
    },
  ],
  configure: [{
    name: 'dataSource',
    title: '步骤数据',
    display: 'block',
    supportVariable: false,
    tip: {
      content: '点击 ？ 查看数据结构',
      url: stepsDataSource,
    },
    initialValue: [
      { title: 'step1', content: 'Open the refrigerator door' },
      { title: 'step2', content: 'Put the elephant in the refrigerator' },
      { title: 'step3', content: 'Close the refrigerator door' },
    ],
    required: false,
    setter: (<ListSetter
      descriptor="title"
      display="drawer"
      checkField={null}
      configure={[{
        name: 'title',
        title: '标题',
        defaultValue: {
          zh_CN: '标题', en_US: 'Step Item', type: 'i18n',
        },
        display: 'inline',
        setter: I18nSetter,
      }, {
        name: 'status',
        title: '状态',
        tip: '默认会根据当前步骤渲染当前节点的状态，一旦配置为其它值，则当前节点状态需要完全自行控制',
        display: 'inline',
        defaultValue: '',
        setter: <ChoiceSetter options={[
          { title: '默认', value: '' },
          { title: '等待', value: 'wait' },
          { title: '进行', value: 'process' },
          { title: '完成', value: 'finish' },
        ]}
        />,
      }, {
        name: 'content',
        title: '内容',
        display: 'inline',
        setter: I18nSetter,
        disabled() {
          return this.parent.getParam('customSwitcher').toData()
        }
      },{
        name: 'customSwitcher',
        title: '开启自定义渲染',
        display: 'block',
        tip: '自定义渲染开启后,content配置失效！',
        initialValue: false,
        setter: BoolSetter ,
      }, {
        name: 'customRender',
        title: '自定义渲染',
        display: 'block',
        setter: <ActionSetter defaultActionName={'renderStep'}
          defaultCode={
`/**
 * @param index 节点索引
 * @param status 节点状态
 */
function renderStep(item) {
  return item.content;
}`}
        />,
        disabled() {
          return !this.parent.getParam('customSwitcher').toData()
        }
      }, {
        name: 'icon',
        title: '图标名',
        tip: '在步骤节点中显示 ICON，请输入主题套系中支持的图标名称',
        display: 'inline',
        setter: TextSetter,
      }, {
        name: 'percent',
        title: '百分比',
        tip: '在步骤节点中显示当前步骤进度的百分比，请输入1-100之间的数字',
        display: 'inline',
        setter: NumberSetter,
      }, {
        name: 'disabled',
        title: '是否禁用',
        display: 'inline',
        setter: BoolSetter,
      }
      ]}
    />),
  },
  {
    name: 'current',
    title: '当前步骤',
    display: 'inline',
    initialValue: 1,
    supportVariable: false,
    setter: <NumberSetter />,
  },
  {
    name: 'shape',
    title: '类型',
    display: 'inline',
    initialValue: 'circle',
    setter: <ChoiceSetter options={[
      { title: 'circle', value: 'circle' },
      { title: 'arrow', value: 'arrow' },
      { title: 'dot', value: 'dot' },
    ]}
    />,
  },
  {
    name: 'direction',
    title: '展示方向',
    display: 'inline',
    initialValue: 'horizontal',
    mutator: function(value) {
      const node = this.getNode().getDOMNode();
      if (value === 'vertical') {
        node.style.height = 'unset'
      } else {
        node.style.height = '96px'
      }
    },
    setter: <ChoiceSetter options={[
      { title: '水平', value: 'horizontal' },
      { title: '垂直', value: 'vertical' },
    ]}
    />,
  },
  {
    name: 'labelPlacement',
    title: '内容排列',
    display: 'inline',
    initialValue: 'vertical',
    hidden() {
      return (this.getProps().getPropValue('shape') !== 'circle' || this.getProps().getPropValue('direction') !== 'horizontal');
    },
    setter: <ChoiceSetter options={[
      { title: '水平', value: 'horizontal' },
      { title: '垂直', value: 'vertical' },
    ]}
    />,
  },
  {
    name: 'readOnly',
    title: '只读模式',
    display: 'inline',
    initialValue: false,
    setter: <BoolSetter />,
  },
  {
    name: 'animation',
    title: '开启动效',
    display: 'inline',
    initialValue: true,
    setter: <BoolSetter />,
  },
  style({ advanced: true }),
  {
    type: 'group',
    title: '高级',
    display: 'accordion',
    collapsed: true,
    items: [
      uuid('steps'),
      ...events([
        {
          name: 'onClick', title: 'onClick 点击按钮', initialValue: `
/**
 * FusionStep onClick
 * @param value 节点索引
 */
function onClick(index) {
  console.log(index);
}`,
        },
      ], { display: 'none' }),
    ],
  }],
});
