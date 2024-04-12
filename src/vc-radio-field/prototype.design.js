import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter, ChoiceSetter, OptionsSetter, JsonSetter, ActionSetter
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  label,
  labelAlign,
  labelTextAlign,
  tips,
  size,
  labelColSpan,
  labelColOffset,
  wrapperColOffset,
  wrapperColSpan,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  validation,
  formCategory,
  defaultValue,
  advanced,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import { radioDataSource, radioDoc } from '../common/tipUrls';

function defaultValueChanged(_value, _hotValue, _preValue, _preHotValue) {
  if (_hotValue !== undefined && _hotValue === _preHotValue) {
    return;
  }
  const datasourceProp = this.getProps().getProp('dataSource');
  if (datasourceProp.useVariable) {
    return;
  }
  const valueProp = this.getProps().getProp('value');
  const value = valueProp.getValue();
  let defaultChecked;
  if (valueProp.useVariable) {
    defaultChecked = () => false;
    valueProp.setValue('""', true, true, { disableMutator: true });
  } else {
    defaultChecked = item => value === item.value;
  }
  const datasourceValue = datasourceProp.getHotValue();
  datasourceProp.setValue(
    datasourceValue.map(item => ({ ...item, defaultChecked: defaultChecked(item) })),
    true,
    true,
    { disableMutator: true },
  );
}

function datasourceChanged() {
  const datasourceProp = this.getProps().getProp('dataSource');
  if (datasourceProp.useVariable) {
    return;
  }
  const valueProp = this.getProps().getProp('value');
  if (valueProp.useVariable) {
    return;
  }
  const getCheckedValue = v => v.filter(item => item.defaultChecked).map(item => item.value);
  const checkedValue = getCheckedValue(datasourceProp.getHotValue());
  valueProp.setValue(checkedValue.length === 1 ? `"${checkedValue[0]}"` : '""', true, false, {
    disableMutator: true,
  });
}

export default Bundle.createPrototype({
  title: '单选',
  componentName: 'RadioField',
  category: '表单',
  icon: Icon,
  docUrl: radioDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1.AR5u5_1gK0jSZFqXXcpaXXa-112-64.png",
      label: "普通型",
      schema: {
        componentName: "RadioField",
        props: {},
      },
    },
    {
      screenshot: "https://img.alicdn.com/tfs/TB16Np7uYj1gK0jSZFOXXc7GpXa-112-64.png",
      label: "按钮型",
      schema: {
        componentName: "RadioField",
        props: {
          shape: "button",
          dataSource: [
            {
              text: {
                zh_CN: "选项一",
                en_US: "Option 1",
                type: "i18n",
              },
              value: "1",
              defaultChecked: true
            },
            {
              text: {
                zh_CN: "选项二",
                en_US: "Option 2",
                type: "i18n",
              },
              value: "2",
              defaultChecked: false
            },
            {
              text: {
                zh_CN: "选项三",
                en_US: "Option 3",
                type: "i18n",
              },
              value: "3",
              defaultChecked: false
            }
          ]
        }
      }
    }
  ],
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: false,
      initialValue: {
        zh_CN: '单选',
        en_US: 'RadioField',
        type: 'i18n',
      },
    }),
    labelAlign({
      setter: (
        <ChoiceSetter
          options={[
            {
              title: '左',
              value: 'left',
            },
            {
              title: '上',
              value: 'top',
            },
          ]}
          compact={false}
        />
      ),
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
      name: 'shape',
      display: 'inline',
      title: '展示形状',
      initialValue: 'default',
      supportVariable: false,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: '默认',
              value: 'default',
            },
            {
              title: '按钮',
              value: 'button',
            },
          ]}
          compact={false}
        />
      ),
    },
    {
      name: 'itemDirection',
      title: '排列方式',
      display: 'inline',
      initialValue: 'hoz',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: '水平排列',
              value: 'hoz',
            },
            {
              title: '垂直排列',
              value: 'ver',
            },
          ]}
          compact={false}
        />
      ),
      supportVariable: false,
    },
    {
      name: 'useDrawerInMobile',
      title: '移动端排列方式',
      display: 'block',
      tip: '仅移动端生效',
      initialValue: false,
      supportVariable: false,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: '移动端平铺',
              value: false,
            },
            {
              title: '底部弹层',
              value: true,
            },
          ]}
          compact={false}
        />
      )
    },
    {
      name: 'iconPosition',
      title: '移动端Icon位置',
      display: 'block',
      tip: '仅移动端生效',
      initialValue: 'left',
      supportVariable: false,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: '左侧',
              value: 'left',
            },
            {
              title: '右侧',
              value: 'right',
            },
          ]}
        />
      )
    },
    {
      name: 'dataSource',
      display: 'block',
      supportVariable: false,
      tip: {
        content: '数据格式',
        url: radioDataSource,
      },
      title: '选项',
      initialValue: [
        {
          text: {
            zh_CN: '选项一',
            en_US: 'Option 1',
            type: 'i18n',
          },
          value: '1',
          disable: false,
        },
        {
          text: {
            zh_CN: '选项二',
            en_US: 'Option 2',
            type: 'i18n',
          },
          value: '2',
          disable: false,
        },
        {
          text: {
            zh_CN: '选项三',
            en_US: 'Option 3',
            type: 'i18n',
          },
          value: '3',
          disable: true,
        },
      ],
      setter: <OptionsSetter />,
      mutator: datasourceChanged,
      useVariableChange: datasourceChanged,
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    style({ advanced: true }),
    advanced('radioField', [
      {
        name: 'onChange',
        title: 'onChange 值发生变化',
        initialValue: `/**
* radioField onChange
* @param value 被选中的选项的值
*/
function onChange({value}){
  console.log('onChange', value);
}`,
      },
    ], { collapsed: true }),
  ],
});
