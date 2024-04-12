import React from 'react';
import { Bundle } from '@ali/visualengine';
import { TextSetter, BoolSetter } from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import { label, advanced } from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import $i18n from '../i18n/index';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepCheckBox', dm: '勾选框' }),
  componentName: 'Checkbox',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: '',
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1pVCOu7T2gK0jSZFkXXcIQFXa-112-64.png',
      label: $i18n.get({ id: 'deepCheckBox', dm: '勾选框' }),
      schema: {
        componentName: 'Checkbox',
        props: {
          label: $i18n.get({ id: 'deepCheckBox', dm: '勾选框' }),
          name: 'checkbox',
          value: 'Y',
          indeterminate: false,
          disabled: false,
          controlChecked: false,
          checked: false,
        },
      },
    },
  ],

  configure: [
    label({
      supportVariable: true,
      initialValue: {
        zh_CN: '勾选框',
        en_US: 'Checkbox',
        type: 'i18n',
      },
    }),

    {
      name: 'name',
      title: 'Name',
      display: 'inline',
      initialValue: 'checkbox',
      supportVariable: true,
      setter: <TextSetter />,
    },

    {
      name: 'value',
      title: 'Value',
      display: 'inline',
      initialValue: 'Y',
      supportVariable: true,
      setter: <TextSetter />,
    },

    {
      name: 'indeterminate',
      title: $i18n.get({ id: 'deepSelection', dm: '半选状态' }),
      tip: $i18n.get({ id: 'deepCanBeUsedTo', dm: '可以用来表达部分记录被选中' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'disabled',
      title: $i18n.get({ id: 'deepIsItDisabled', dm: '是否禁用' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'controlChecked',
      title: $i18n.get({ id: 'deepExternalControlSelection', dm: '外部控制选中' }),
      tip: $i18n.get({
        id: 'deepAfterTheExternalControl',
        dm: '外部控制选中后，选中状态需要开发者自己根据 onChange 回传的值重新设置给组件才能生效',
      }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'checked',
      title: $i18n.get({ id: 'deepSelectAState', dm: '选中状态' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
      hidden() {
        return this.getProps().getPropValue('controlChecked') === false;
      },
    },

    style({ advanced: true }),
    advanced('checkbox', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* checkbox onChange
* @param checked 是否选中
*/
function onChange(checked, evt) {
  console.log('onChange', checked);
}`,
      },

      {
        name: 'onMouseEnter',
        title: $i18n.get({ id: 'deepOnmouseEnterMouseEntry', dm: 'onMouseEnter 鼠标进入' }),
        initialValue: `/**
* checkbox onMouseEnter
*/
function onMouseEnter(evt) {
  console.log('onMouseEnter');
}`,
      },

      {
        name: 'onMouseLeave',
        title: $i18n.get({ id: 'deepONMOUSELEAVEMouseOff', dm: 'onMouseLeave 鼠标离开' }),
        initialValue: `/**
* checkbox onMouseLeave
*/
function onMouseLeave(evt) {
  console.log('onMouseLeave');
}`,
      },
    ]),
  ],
});
