import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  BoolSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  label,
  advanced,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';

export default Bundle.createPrototype({
  title: '勾选框',
  componentName: 'Checkbox',
  category: '高级',
  icon: Icon,
  docUrl: '',
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1pVCOu7T2gK0jSZFkXXcIQFXa-112-64.png',
      label: '勾选框',
      schema: {
        componentName: 'Checkbox',
        props: {
          "label":  "勾选框",
          "name": "checkbox",
          "value": "Y",
          "indeterminate": false,
          "disabled": false,
          "controlChecked": false,
          "checked": false
        }
      }
    }
  ],
  configure: [
    label({
      supportVariable: false,
      initialValue: {
        zh_CN: '勾选框',
        en_US: 'Checkbox',
        type: 'i18n',
      },
    }),
    {
      name: 'indeterminate',
      title: '半选状态',
      tip: '可以用来表达部分记录被选中',
      display: 'inline',
      initialValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    {
      name: 'disabled',
      title: '是否禁用',
      display: 'inline',
      initialValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    {
      name: 'checked',
      title: '选中状态',
      display: 'inline',
      initialValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
      hidden() {
        return this.getProps().getPropValue('controlChecked') === false;
      },
    },
    style({ advanced: false }),
    advanced('checkbox', [
      {
        name: 'onChange', title: 'onChange 值发生变化', initialValue: `/**
* checkbox onChange
* @param checked 是否选中
*/
function onChange(checked, evt) {
  console.log('onChange', checked);
}`,
      },
      {
        name: 'onMouseEnter', title: 'onMouseEnter 鼠标进入', initialValue: `/**
* checkbox onMouseEnter
*/
function onMouseEnter(evt) {
  console.log('onMouseEnter');
}`,
      },
      {
        name: 'onMouseLeave', title: 'onMouseLeave 鼠标离开', initialValue: `/**
* checkbox onMouseLeave
*/
function onMouseLeave(evt) {
  console.log('onMouseLeave');
}`,
      },
    ], { collapsed: true }),
  ],
});
