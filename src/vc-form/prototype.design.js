import React from 'react';
import { Bundle, Viewport } from '@ali/visualengine';
import {
  Util, ChoiceSetter, JsonSetter, BoolSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import { getPcChild } from './initChild';

import { isComponentFormField } from '../common/formFieldUtils';

import {
  size,
  behavior,
  labelColSpan,
  wrapperColSpan,
  advanced,
} from '../common/vu-fusion-field-property';
import { fieldApi, formDoc } from '../common/tipUrls';

const getParentsName = (container) => {
  const names = [container.getComponentName()];
  const parent = container.getParent();
  if (parent) {
    return names.concat(getParentsName(parent));
  }
  return names;
};

const setChildrenFieldProps = (node, prop, value) => {
  const children = node.getChildren();
  if (children) {
    children.forEach((child) => {
      if (isComponentFormField(child)) {
        child.setPropValue(prop, value);
      }
      if (child.getPropValue('isFormButtonBox')) {
        const device = Viewport.getDevice();
        if (device === 'pc') {
          child.setPropValue('style', {
            ...child.getPropValue('style'),
            // paddingLeft: value === 'HORIZONTAL' ? '88px' : '0px',
          });
        }
      }
      setChildrenFieldProps(child, prop, value);
    });
  }
};

const behaviorSetter = {
  ...(behavior({
    hasReadOnly: true,
  })),
  supportVariable: false,
  mutator(value) {
    setChildrenFieldProps(this.getNode(), 'behavior', value);
  },
};

const inputWrapper = {
  ...wrapperColSpan({ title: '输入宽度' }),
  display: 'inline',
  mutator(value) {
    setChildrenFieldProps(this.getNode(), 'wrapperColSpan', value);
  },
  disabled() {
    return this.getProps().getPropValue('labelAlign') === 'top';
  },
};

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '表单容器',
  componentName: 'Form',
  category: '表单',
  icon: Icon,
  docUrl: formDoc,
  isContainer: true,
  canDropTo(container) {
    const parentsName = getParentsName(container);
    return parentsName.indexOf('Form') === -1;
  },
  didDropIn(dragment) {
    if (isComponentFormField(dragment)) {
      ['labelAlign', 'labelColSpan', 'size'].forEach((prop) => {
        dragment.setPropValue(prop, this.getProps().getPropValue(prop));
      });
    }
  },
  initialChildren() {
    return getPcChild();
  },
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1oH02u2b2gK0jSZK9XXaEgFXa-112-64.png",
      label: "表单容器",
      schema: {
        componentName: "Form",
        props: {},
      },
    },
  ],
  configure: [
    // {
    //   name: '__useMediator',
    //   display: 'none',
    //   initialValue: 'dataSource',
    // },
    {
      title: '批量设置',
      type: 'group',
      display: 'accordion',
      items: [
        {
          name: 'labelAlign',
          title: '标题位置',
          display: 'inline',
          initialValue: 'top',
          setter: (
            <ChoiceSetter
              options={[{
                title: '左',
                value: 'left',
                tip: '左侧',
              }, {
                title: '上',
                value: 'top',
                tip: '上',
              }, {
                title: '内',
                value: 'inset',
                tip: '内',
              }]}
              compact={false}
            />
          ),
          mutator(value) {
            setChildrenFieldProps(this.getNode(), 'labelAlign', value);
          },
        },
        labelColSpan({
          display: 'inline',
          mutator(value) {
            setChildrenFieldProps(this.getNode(), 'labelColSpan', value);
          },
          disabled() {
            return this.getProps().getPropValue('labelAlign') === 'top';
          },
          supportVariable: false,
        }),
        inputWrapper,
        size({
          mutator(value) {
            setChildrenFieldProps(this.getNode(), 'size', value);
          },
          supportVariable: false,
        }),
        behaviorSetter,
      ],
    },
    {
      name: 'fieldOptions',
      title: 'Field初始化配置',
      display: 'none',
      tip: {
        url: fieldApi,
        content: '点击查看具体配置项说明,values不生效',
      },
      supportVariable: false,
      initialValue: {},
      setter: <JsonSetter />,
    },
    style({ advanced: true }),
    advanced('form', [
      {
        name: 'onChange',
        title: 'onChange 值发生变化',
        initialValue: `/**
* form onChange
* @param values 表单数据
* @param item 发生变化的 Field 数据
*/
function onChange(values, item){
  console.log('onChange', values, item);
}`,
      },
    ], { collapsed: true }),
  ],
});
