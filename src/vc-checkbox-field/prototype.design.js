import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  JsonSetter,
  OptionsSetter,
  ChoiceSetter,
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
  wrapperColSpan,
  wrapperColOffset,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  validation,
  formCategory,
  advanced,
  defaultValue,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import { checkboxDoc } from '../common/tipUrls';

function defaultValueChanged(_value, _hotValue, _preValue, _preHotValue) {
  if (_hotValue !== undefined && _hotValue === _preHotValue) {
    return;
  }
  const datasourceProp = this.getProps().getProp('dataSource');
  if (datasourceProp.useVariable) {
    return;
  }
  const valueProp = this.getProps().getProp('value');
  const value = valueProp.getValue() || [];
  if (!Array.isArray(value)) {
    return;
  }
  let defaultChecked;
  if (valueProp.useVariable) {
    defaultChecked = () => false;
    valueProp.setValue('[]', true, true, { disableMutator: true });
  } else {
    defaultChecked = item => value.indexOf(item.value) >= 0;
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
  valueProp.setValue(JSON.stringify(checkedValue), true, false, { disableMutator: true });
}

export default Bundle.createPrototype({
  title: '多选',
  componentName: 'CheckboxField',
  category: '表单',
  icon: Icon,
  docUrl: checkboxDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1EJN7uYY1gK0jSZTEXXXDQVXa-112-64.png",
      label: "复选",
      schema: {
        componentName: "CheckboxField",
        props: {},
      },
    },
  ],
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: false,
      initialValue: {
        zh_CN: '多选',
        en_US: 'CheckboxField',
        type: 'i18n',
      },
    }),
    labelAlign({
      setter: (
        <ChoiceSetter
          options={[{
            title: '左',
            value: 'left',
          }, {
            title: '上',
            value: 'top',
          }]}
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
      title: '选项',
      supportVariable: false,
      tip: {
        content: '数据格式',
        url: '',
      },
      initialValue: [{
        text: {
          zh_CN: '选项一',
          en_US: 'Option 1',
          type: 'i18n',
        },
        value: '1',
      }, {
        text: {
          zh_CN: '选项二',
          en_US: 'Option 2',
          type: 'i18n',
        },
        value: '2',
      }, {
        text: {
          zh_CN: '选项三',
          en_US: 'Option 3',
          type: 'i18n',
        },
        value: '3',
      }],
      setter: <OptionsSetter multiple />,
      mutator: datasourceChanged,
      useVariableChange: datasourceChanged,
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    style({ advanced: true }),
    advanced('checkboxField', [
      {
        name: 'onChange', title: 'onChange 值发生变化', initialValue: `/**
* checkboxField onChange
* @param value 选中的值
*/
function onChange({value}) {
  console.log('onChange', value);
}`,
      },
    ], { collapsed: true }),
  ],
});
