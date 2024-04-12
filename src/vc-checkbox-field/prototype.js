import React from 'react';
import { Bundle } from '@ali/visualengine';
import { ValidationSetter, JsonSetter, OptionsSetter, ChoiceSetter, ActionSetter } from '@ali/visualengine-utils';
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
import $i18n from '../i18n/index';
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
    defaultChecked = (item) => value.indexOf(item.value) >= 0;
  }
  const datasourceValue = datasourceProp.getHotValue();
  datasourceProp.setValue(
    datasourceValue.map((item) => ({ ...item, defaultChecked: defaultChecked(item) })),
    true,
    true,
    { disableMutator: true }
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
  const getCheckedValue = (v) => v.filter((item) => item.defaultChecked).map((item) => item.value);
  const checkedValue = getCheckedValue(datasourceProp.getHotValue());
  valueProp.setValue(JSON.stringify(checkedValue), true, false, { disableMutator: true });
}

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }),
  componentName: 'CheckboxField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: checkboxDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1EJN7uYY1gK0jSZTEXXXDQVXa-112-64.png',
      label: $i18n.get({ id: 'deepCheck', dm: '复选' }),
      schema: {
        componentName: 'CheckboxField',
        props: {},
      },
    },
  ],

  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: true,
      initialValue: {
        zh_CN: '多选',
        en_US: 'CheckboxField',
        type: 'i18n',
      },
    }),

    defaultValue({
      initial(val) {
        return val || [];
      },
      setter: (
        <JsonSetter
          label={$i18n.get({ id: 'deepEditTheDefaultValue', dm: '编辑默认值' })}
          usePopup={false}
          height={80}
        />
      ),
      mutator: defaultValueChanged,
      useVariableChange() {
        defaultValueChanged.call(this);
      },
    }),

    labelAlign({
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepLeft', dm: '左' }),
              value: 'left',
            },
            {
              title: $i18n.get({ id: 'deepOn', dm: '上' }),
              value: 'top',
            },
          ]}
          compact={false}
        />
      ),
    }),

    labelColSpan(),
    labelColOffset(),
    wrapperColSpan(),
    wrapperColOffset(),
    labelTextAlign(),
    tips(),
    size(),
    behavior(),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    {
      name: 'itemDirection',
      title: $i18n.get({ id: 'deepArrangement', dm: '排列方式' }),
      display: 'inline',
      initialValue: 'hoz',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepHorizontalArrangement', dm: '水平排列' }),
              value: 'hoz',
            },

            {
              title: $i18n.get({ id: 'deepVerticalArrangement', dm: '垂直排列' }),
              value: 'ver',
            },
          ]}
          compact={false}
        />
      ),

      supportVariable: true,
    },

    {
      name: 'useDrawerInMobile',
      title: $i18n.get({ id: 'deepMobileDeviceArrangement', dm: '移动端排列方式' }),
      display: 'block',
      tip: $i18n.get({ id: 'deepOnlyMoveTheMobile', dm: '仅移动端生效' }),
      initialValue: false,
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepMobileTile', dm: '移动端平铺' }),
              value: false,
            },

            {
              title: $i18n.get({ id: 'deepBottomLaying', dm: '底部弹层' }),
              value: true,
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'iconPosition',
      title: $i18n.get({ id: 'deepMobileICONLocation', dm: '移动端Icon位置' }),
      display: 'block',
      tip: $i18n.get({ id: 'deepOnlyMoveTheMobile', dm: '仅移动端生效' }),
      initialValue: 'left',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepLeftSide', dm: '左侧' }),
              value: 'left',
            },

            {
              title: $i18n.get({ id: 'deepRight', dm: '右侧' }),
              value: 'right',
            },
          ]}
        />
      ),
    },

    {
      name: 'dataSource',
      display: 'block',
      title: $i18n.get({ id: 'deepOption', dm: '选项' }),
      supportVariable: true,
      tip: {
        content: $i18n.get({ id: 'deepDataFormat', dm: '数据格式' }),
        url: '',
      },

      initialValue: [
        {
          text: {
            zh_CN: '选项一',
            en_US: 'Option 1',
            type: 'i18n',
          },

          value: '1',
        },
        {
          text: {
            zh_CN: '选项二',
            en_US: 'Option 2',
            type: 'i18n',
          },

          value: '2',
        },
        {
          text: {
            zh_CN: '选项三',
            en_US: 'Option 3',
            type: 'i18n',
          },

          value: '3',
        },
      ],

      setter: <OptionsSetter multiple />,
      mutator: datasourceChanged,
      useVariableChange: datasourceChanged,
    },

    {
      name: 'customRender',
      title: $i18n.get({ id: 'deepCustomRendering', dm: '定制渲染' }),
      display: 'block',
      setter: (
        <ActionSetter
          defaultActionName="customRender"
          defaultCode={`function customRender(item) {
  return <span>{item.text}</span>;
}`}
        />
      ),
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    style({ advanced: true }),
    advanced('checkboxField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* checkboxField onChange
* @param value 选中的值
*/
function onChange({value}) {
  console.log('onChange', value);
}`,
      },
    ]),
  ],
});
