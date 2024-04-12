import React from 'react';
import { Bundle, Env } from '@ali/visualengine';
import {
  TextSetter,
  ValidationSetter,
  NumberSetter,
  BoolSetter,
  ChoiceSetter,
  JsonSetter,
  CodeSetter,
  ActionSetter,
  Util,
} from '@ali/visualengine-utils';
import {
  label,
  labelAlign,
  labelTextAlign,
  tips,
  size,
  labelColSpan,
  labelColOffset,
  wrapperColSpan,
  wrapperColOffset,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  placeholder,
  validation,
  formCategory,
  advanced,
  defaultValue,
} from '../common/vu-fusion-field-property';

import Logo from './logo.svg';
import { employeeDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: '人员搜索框',
  componentName: 'EmployeeField',
  icon: Logo,
  category: '表单',
  docUrl: employeeDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1ouOLu7Y2gK0jSZFgXXc5OFXa-112-64.png",
      label: "多选",
      schema: {
        componentName: "EmployeeField",
        props: {},
      },
    },
    {
      screenshot: "https://img.alicdn.com/tfs/TB144CJu.T1gK0jSZFrXXcNCXXa-112-64.png",
      label: "单选",
      schema: {
        componentName: "EmployeeField",
        props: {
          multiple: false,
        },
      },
    },
  ],
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: false,
      initialValue: {
        zh_CN: '人员搜索',
        en_US: 'Employee Field',
        type: 'i18n',
      },
    }),
    placeholder({
      supportVariable: false,
      initialValue: {
        zh_CN: '请选择',
        en_US: 'Please Select',
        type: 'i18n',
      },
    }),
    labelAlign({ 
      supportVariable: false,
    }),
    labelColSpan({ 
      supportVariable: false,
    }),
    labelColOffset({ 
      supportVariable: false,
    }),
    wrapperColSpan({ 
      supportVariable: false,
    }),
    wrapperColOffset({ 
      supportVariable: false,
    }),
    labelTextAlign({ 
      supportVariable: false,
    }),
    tips({ 
      supportVariable: false,
    }),
    size({ 
      supportVariable: false,
    }),
    behavior({ 
      supportVariable: false,
    }),
    labelTipsType({ 
      supportVariable: false,
    }, false),
    labelTipsIcon({ 
      supportVariable: false,
    }),
    labelTips({ 
      supportVariable: false,
    }),
    labelTipsText({ 
      supportVariable: false,
    }),
    labelTipsRender({ 
      supportVariable: false,
    }),
    {
      name: 'multiple',
      title: '多选模式',
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'startWithDepartmentId',
      title: '选人起点',
      display: 'none',
      initialValue: 'SELF',
      setter: (
        <ChoiceSetter
          options={[
            { title: '自己部门', value: 'SELF' },
            { title: '企业顶层', value: 'TOP' },
          ]}
        />
      ),
    },
    {
      name: 'dataSource',
      title: '人员数据',
      display: 'block',
      supportVariable: false,
      initialValue: [],
      setter: <JsonSetter />,
      ignore() {
        return this.getProps().getPropValue('dataType') === 'url';
      },
      hidden() {
        return this.getProps().getPropValue('dataType') === 'url';
      },
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),

    advanced('employeeField', [
      {
        name: 'onChange',
        title: 'onChange 值发生变化',
        initialValue: `/**
* employeeField onChange
* @param value 当前值
*/
function onChange({ value }) {
  console.log('onChange', value);
}`,
      },
      {
        name: 'onSearch',
        title: 'onSearch 用户输入搜索关键字',
        initialValue: `/**
* employeeField onSearch
* @param value 当前值
*/
function onSearch(keyword) {
  console.log('onSearch', keyword);
}`,
      },
    ], { collapsed: true }),
  ],
});
