import React from 'react';
import { Bundle, Viewport } from '@ali/visualengine';
import { Util, ChoiceSetter, JsonSetter, BoolSetter } from '@ali/visualengine-utils';
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
import $i18n from '../i18n/index';
import { fieldApi, formDataSource, formDoc } from '../common/tipUrls';

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
  ...behavior({
    hasReadOnly: true,
  }),

  supportVariable: true,
  mutator(value) {
    setChildrenFieldProps(this.getNode(), 'behavior', value);
  },
};

const inputWrapper = {
  ...wrapperColSpan({ title: $i18n.get({ id: 'deepInputWidth', dm: '输入宽度' }) }),
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
  title: $i18n.get({ id: 'deepTableMonolor', dm: '表单容器' }),
  componentName: 'Form',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
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
      screenshot: 'https://img.alicdn.com/tfs/TB1oH02u2b2gK0jSZK9XXaEgFXa-112-64.png',
      label: $i18n.get({ id: 'deepTableMonolor', dm: '表单容器' }),
      schema: {
        componentName: 'Form',
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
      title: $i18n.get({ id: 'deepBulkSettings', dm: '批量设置' }),
      type: 'group',
      display: 'accordion',
      items: [
        {
          name: 'labelAlign',
          title: $i18n.get({ id: 'deepTitlePosition', dm: '标题位置' }),
          display: 'inline',
          initialValue: 'top',
          setter: (
            <ChoiceSetter
              options={[
                {
                  title: $i18n.get({ id: 'deepLeft', dm: '左' }),
                  value: 'left',
                  tip: $i18n.get({ id: 'deepLeftSide', dm: '左侧' }),
                },
                {
                  title: $i18n.get({ id: 'deepOn', dm: '上' }),
                  value: 'top',
                  tip: $i18n.get({ id: 'deepOn', dm: '上' }),
                },
                {
                  title: $i18n.get({ id: 'deepInside', dm: '内' }),
                  value: 'inset',
                  tip: $i18n.get({ id: 'deepInside', dm: '内' }),
                },
              ]}
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
          supportVariable: true,
        }),

        inputWrapper,
        size({
          mutator(value) {
            setChildrenFieldProps(this.getNode(), 'size', value);
          },
          supportVariable: false,
        }),

        behaviorSetter,
        {
          name: 'autoValidate',
          title: $i18n.get({ id: 'deepAutomaticVerification', dm: '自动校验' }),
          display: 'inline',
          tip: $i18n.get({
            id: 'deepWhenYouModifyThe',
            dm: '是否修改数据的时候就自动触发校验, 设为 false 后只能通过 validate() 来触发校验',
          }),
          initialValue: true,
          setter: <BoolSetter />,
        },

        {
          name: 'scrollToFirstError',
          title: $i18n.get({ id: 'deepLocationError', dm: '定位错误' }),
          display: 'inline',
          tip: $i18n.get({
            id: 'deepThePageIsAutomatically',
            dm: '页面自动滚动到第一个发生表单校验错误的位置',
          }),
          initialValue: true,
          setter: <BoolSetter />,
        },

        {
          name: 'autoUnmount',
          title: $i18n.get({ id: 'deepAutomaticUninstall', dm: '自动卸载' }),
          display: 'inline',
          tip: $i18n.get({
            id: 'deepAutomaticallyDeleteUnmoutElements',
            dm: '自动删除 Unmout 元素，如果想保留数据可以设置为 false',
          }),
          initialValue: true,
          setter: <BoolSetter />,
        },
      ],
    },

    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepFormDataSource', dm: '表单数据源' }),
      display: 'block',
      hidden: false,
      tip: {
        url: formDataSource,
        content: $i18n.get({ id: 'deepClickToViewThe', dm: '点击查看数据结构' }),
      },

      supportVariable: true,
      setter: <JsonSetter />,
    },

    {
      name: 'fieldOptions',
      title: $i18n.get({ id: 'deepFieldInitializationConfiguration', dm: 'Field初始化配置' }),
      display: 'block',
      tip: {
        url: fieldApi,
        content: $i18n.get({
          id: 'deepClickToViewThe.1',
          dm: '点击查看具体配置项说明,values不生效',
        }),
      },

      supportVariable: true,
      initialValue: {},
      setter: <JsonSetter />,
    },

    style({ advanced: true }),
    advanced('form', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* form onChange
* @param values 表单数据
* @param item 发生变化的 Field 数据
*/
function onChange(values, item){
  console.log('onChange', values, item);
}`,
      },
    ]),
  ],
});
