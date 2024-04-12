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

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { stepsDataSource, stepsDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepStep', dm: '步骤' }),
  componentName: 'Steps',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: stepsDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ahKNu4D1gK0jSZFyXXciOVXa-112-64.png',
      label: $i18n.get({ id: 'deepNormalType', dm: '普通型' }),
      schema: {
        componentName: 'Steps',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1RNWMu1L2gK0jSZFmXXc7iXXa-112-64.png',
      label: $i18n.get({ id: 'deepArrowType', dm: '箭头型' }),
      schema: {
        componentName: 'Steps',
        props: {
          shape: 'arrow',
          direction: 'horizontal',
          labelPlacement: 'vertical',
          readOnly: false,
          animation: true,
          current: 1,
        },
      },
    },
  ],

  configure: [
    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepStepData', dm: '步骤数据' }),
      display: 'block',
      supportVariable: true,
      tip: {
        content: $i18n.get({ id: 'deepClickViewDataStructure', dm: '点击 ？ 查看数据结构' }),
        url: stepsDataSource,
      },

      initialValue: [
        { title: 'step1', content: 'Open the refrigerator door' },
        { title: 'step2', content: 'Put the elephant in the refrigerator' },
        { title: 'step3', content: 'Close the refrigerator door' },
      ],

      required: false,
      setter: (
        <ListSetter
          descriptor="title"
          display="drawer"
          checkField={null}
          configure={[
            {
              name: 'title',
              title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
              defaultValue: {
                zh_CN: '标题',
                en_US: 'Step Item',
                type: 'i18n',
              },

              display: 'inline',
              setter: I18nSetter,
            },
            {
              name: 'status',
              title: $i18n.get({ id: 'deepStatus', dm: '状态' }),
              tip: $i18n.get({
                id: 'deepTheDefaultWillRender',
                dm:
                  '默认会根据当前步骤渲染当前节点的状态，一旦配置为其它值，则当前节点状态需要完全自行控制',
              }),
              display: 'inline',
              defaultValue: '',
              setter: (
                <ChoiceSetter
                  options={[
                    { title: $i18n.get({ id: 'deepDefault', dm: '默认' }), value: '' },
                    { title: $i18n.get({ id: 'deepWait', dm: '等待' }), value: 'wait' },
                    { title: $i18n.get({ id: 'deepGetOn', dm: '进行' }), value: 'process' },
                    { title: $i18n.get({ id: 'deepCarryOut', dm: '完成' }), value: 'finish' },
                  ]}
                />
              ),
            },

            {
              name: 'content',
              title: $i18n.get({ id: 'deepContent', dm: '内容' }),
              display: 'inline',
              setter: I18nSetter,
              disabled() {
                return this.parent.getParam('customSwitcher').toData();
              },
            },
            {
              name: 'customSwitcher',
              title: $i18n.get({ id: 'deepTurnOnCustomRendering', dm: '开启自定义渲染' }),
              display: 'block',
              tip: $i18n.get({
                id: 'deepAfterCustomRenderingIs',
                dm: '自定义渲染开启后,content配置失效！',
              }),
              initialValue: false,
              setter: BoolSetter,
            },
            {
              name: 'customRender',
              title: $i18n.get({ id: 'deepCustomRendering', dm: '自定义渲染' }),
              display: 'block',
              setter: (
                <ActionSetter
                  defaultActionName={'renderStep'}
                  defaultCode={$i18n.get({
                    id: 'deepPARAMINDEXNodeIndex',
                    dm:
                      '/**\n * @param index 节点索引\n * @param status 节点状态\n */\nfunction renderStep(item) {\n  return item.content;\n}',
                  })}
                />
              ),

              disabled() {
                return !this.parent.getParam('customSwitcher').toData();
              },
            },
            {
              name: 'icon',
              title: $i18n.get({ id: 'deepIconName', dm: '图标名' }),
              tip: $i18n.get({
                id: 'deepDisplayICONInThe',
                dm: '在步骤节点中显示 ICON，请输入主题套系中支持的图标名称',
              }),
              display: 'inline',
              setter: TextSetter,
            },
            {
              name: 'percent',
              title: $i18n.get({ id: 'deepPercentage', dm: '百分比' }),
              tip: $i18n.get({
                id: 'deepWhenTheCurrentStep',
                dm: '在步骤节点中显示当前步骤进度的百分比，请输入1-100之间的数字',
              }),
              display: 'inline',
              setter: NumberSetter,
            },
            {
              name: 'disabled',
              title: $i18n.get({ id: 'deepIsItDisabled', dm: '是否禁用' }),
              display: 'inline',
              setter: BoolSetter,
            },
          ]}
        />
      ),
    },

    {
      name: 'current',
      title: $i18n.get({ id: 'deepCurrentSteps', dm: '当前步骤' }),
      display: 'inline',
      initialValue: 1,
      supportVariable: true,
      setter: <NumberSetter />,
    },

    {
      name: 'shape',
      title: $i18n.get({ id: 'deepTypesOf', dm: '类型' }),
      display: 'inline',
      initialValue: 'circle',
      setter: (
        <ChoiceSetter
          options={[
            { title: 'circle', value: 'circle' },
            { title: 'arrow', value: 'arrow' },
            { title: 'dot', value: 'dot' },
          ]}
        />
      ),
    },

    {
      name: 'direction',
      title: $i18n.get({ id: 'deepDirection', dm: '展示方向' }),
      display: 'inline',
      initialValue: 'horizontal',
      mutator: function (value) {
        const node = this.getNode().getDOMNode();
        if (value === 'vertical') {
          node.style.height = 'unset';
        } else {
          node.style.height = '96px';
        }
      },
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepLevel', dm: '水平' }), value: 'horizontal' },
            { title: $i18n.get({ id: 'deepVertical', dm: '垂直' }), value: 'vertical' },
          ]}
        />
      ),
    },

    {
      name: 'labelPlacement',
      title: $i18n.get({ id: 'deepContentArrangement', dm: '内容排列' }),
      display: 'inline',
      initialValue: 'vertical',
      hidden() {
        return (
          this.getProps().getPropValue('shape') !== 'circle' ||
          this.getProps().getPropValue('direction') !== 'horizontal'
        );
      },
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepLevel', dm: '水平' }), value: 'horizontal' },
            { title: $i18n.get({ id: 'deepVertical', dm: '垂直' }), value: 'vertical' },
          ]}
        />
      ),
    },

    {
      name: 'readOnly',
      title: $i18n.get({ id: 'deepReadOnlyMode', dm: '只读模式' }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'animation',
      title: $i18n.get({ id: 'deepEnable', dm: '开启动效' }),
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'contentRender',
      title: $i18n.get({ id: 'deepContentCustomRendering', dm: '内容自定义渲染' }),
      hidden: false,
      setter: (
        <ActionSetter
          defaultActionName="renderContent"
          defaultCode={$i18n.get({
            id: 'deepParamITEMNodeObject',
            dm:
              '/**\n * @param item 节点对象\n * @param index 节点索引\n */\nfunction renderContent(item, index) {\n  return item.content;\n}',
          })}
        />
      ),
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('steps'),
        ...events([
          {
            name: 'onClick',
            title: $i18n.get({ id: 'deepOnclickClickButton', dm: 'onClick 点击按钮' }),
            initialValue: `
/**
 * FusionStep onClick
 * @param value 节点索引
 */
function onClick(index) {
  console.log(index);
}`,
          },
        ]),
      ],
    },
  ],
});
