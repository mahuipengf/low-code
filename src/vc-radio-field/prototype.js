import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  ChoiceSetter,
  OptionsSetter,
  JsonSetter,
  ActionSetter,
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
import $i18n from '../i18n/index';
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
    defaultChecked = (item) => value === item.value;
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
  valueProp.setValue(checkedValue.length === 1 ? `"${checkedValue[0]}"` : '""', true, false, {
    disableMutator: true,
  });
}

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepRadio', dm: '单选' }),
  componentName: 'RadioField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: radioDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1.AR5u5_1gK0jSZFqXXcpaXXa-112-64.png',
      label: $i18n.get({ id: 'deepNormalType', dm: '普通型' }),
      schema: {
        componentName: 'RadioField',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB16Np7uYj1gK0jSZFOXXc7GpXa-112-64.png',
      label: $i18n.get({ id: 'deepButtonType', dm: '按钮型' }),
      schema: {
        componentName: 'RadioField',
        props: {
          shape: 'button',
          dataSource: [
            {
              text: {
                zh_CN: '选项一',
                en_US: 'Option 1',
                type: 'i18n',
              },

              value: '1',
              defaultChecked: true,
            },

            {
              text: {
                zh_CN: '选项二',
                en_US: 'Option 2',
                type: 'i18n',
              },

              value: '2',
              defaultChecked: false,
            },

            {
              text: {
                zh_CN: '选项三',
                en_US: 'Option 3',
                type: 'i18n',
              },

              value: '3',
              defaultChecked: false,
            },
          ],
        },
      },
    },
  ],

  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: true,
      initialValue: {
        zh_CN: '单选',
        en_US: 'RadioField',
        type: 'i18n',
      },
    }),

    defaultValue({
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
      name: 'shape',
      display: 'inline',
      title: $i18n.get({ id: 'deepShape', dm: '展示形状' }),
      initialValue: 'default',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepDefault', dm: '默认' }),
              value: 'default',
            },

            {
              title: $i18n.get({ id: 'deepButton', dm: '按钮' }),
              value: 'button',
            },
          ]}
          compact={false}
        />
      ),
    },

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
      supportVariable: true,
      tip: {
        content: $i18n.get({ id: 'deepDataFormat', dm: '数据格式' }),
        url: radioDataSource,
      },

      title: $i18n.get({ id: 'deepOption', dm: '选项' }),
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
    advanced('radioField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* radioField onChange
* @param value 被选中的选项的值
*/
function onChange({value}){
  console.log('onChange', value);
}`,
      },
    ]),
  ],
});
