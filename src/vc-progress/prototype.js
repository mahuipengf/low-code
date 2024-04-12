import React from 'react';
import { Bundle } from '@ali/visualengine';
import { ChoiceSetter, BoolSetter, NumberSetter, ActionSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import { size } from '../common/vu-fusion-field-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { progressDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepProgressIndicator', dm: '进度指示器' }),
  componentName: 'Progress',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: progressDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1aCmJuVY7gK0jSZKzXXaikpXa-112-64.png',
      label: $i18n.get({ id: 'deepLinear', dm: '线形' }),
      schema: {
        componentName: 'Progress',
        props: {
          shape: 'line',
          percent: 30,
        },
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1wkeOuYj1gK0jSZFuXXcrHpXa-112-64.png',
      label: $i18n.get({ id: 'deepCircular', dm: '圆形' }),
      schema: {
        componentName: 'Progress',
        props: {
          shape: 'circle',
          percent: 30,
        },
      },
    },
  ],

  configure: [
    size(),
    {
      name: 'shape',
      title: $i18n.get({ id: 'deepForm', dm: '形态' }),
      display: 'inline',
      initialValue: 'line',
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepRound', dm: '圆型' }), value: 'circle' },
            { title: $i18n.get({ id: 'deepLineType', dm: '线型' }), value: 'line' },
          ]}
        />
      ),

      supportVariable: true,
    },

    {
      name: 'percent',
      title: $i18n.get({ id: 'deepPercentage', dm: '百分比' }),
      display: 'inline',
      supportVariable: true,
      initialValue: 0,
      setter: <NumberSetter />,
    },

    {
      name: 'state',
      title: $i18n.get({ id: 'deepStatus', dm: '状态' }),
      display: 'inline',
      initialValue: 'normal',
      supportVariable: true,
      hidden() {
        return this.getProps().getPropValue('progressive');
      },
      setter: (
        <ChoiceSetter
          options={[
            { title: 'normal', value: 'normal' },
            { title: 'success', value: 'success' },
            { title: 'error', value: 'error' },
          ]}
        />
      ),
    },

    {
      name: 'hasBorder',
      title: $i18n.get({ id: 'deepFrame', dm: '边框' }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
      supportVariable: true,
    },

    {
      name: 'progressive',
      title: $i18n.get({ id: 'deepColorPhaseChangeMode', dm: '色彩阶段变化模式' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },
    
    {
      name: 'textRender',
      title: $i18n.get({ id: 'deepProgressTextRender', dm: '自定义百分比信息' }),
      display: 'block',
      setter: (
        <ActionSetter
          defaultActionName="textRender"
          defaultCode={`
function textRender(percent) {
  console.log(percent);
  // 详见Progress文档
  // https://done.alibaba-inc.com/dsm/deep/components/detail/progress?themeid=97&tabActiveKey=component#percentrender-container
  return <span>{percent}</span>;
}`}
      />),
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      items: [uuid('progress')],
    },
  ],
});
