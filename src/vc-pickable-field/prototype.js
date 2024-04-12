import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  ChoiceSetter,
  OptionsSetter,
  JsonSetter,
  BoolSetter,
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
import { pickableDataSource } from '../common/tipUrls';

function defaultValueChanged(_value, _hotValue, _preValue, _preHotValue) {
  if (_hotValue !== undefined && _hotValue === _preHotValue) {
    return;
  }
  const datasourceProp = this.getProps().getProp('dataSource');
  if (datasourceProp.useVariable) {
    return;
  }

  const isMultiple = this.getProps().getPropValue('multiple');
  const valueProp = this.getProps().getProp('value');
  const value = valueProp.getValue() || (mode === 'single' ? '' : []);

  let defaultChecked;
  if (valueProp.useVariable) {
    defaultChecked = () => false;
    const defaultVal = isMultiple ? '[]' : '""';
    valueProp.setValue(defaultVal, true, true, { disableMutator: true });
  } else if (!isMultiple) {
    defaultChecked = (item) => value === item.value || value.value === item.value;
  } else {
    defaultChecked = (item) =>
      Array.isArray(value) && !!value.find((v) => v === item.value || v.value === item.value);
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
  const isMultiple = this.getProps().getPropValue('multiple');
  if (datasourceProp.useVariable) {
    return;
  }
  const valueProp = this.getProps().getProp('value');
  if (valueProp.useVariable) {
    return;
  }
  const getCheckedValue = (v) => v.filter((item) => item.defaultChecked).map((item) => item.value);
  let checkedValue = getCheckedValue(datasourceProp.getHotValue());

  if (!isMultiple) {
    checkedValue = checkedValue[0] || '';
  }
  valueProp.setValue(JSON.stringify(checkedValue), true, false, { disableMutator: true });
}

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepFilter', dm: '筛选' }),
  componentName: 'PickableField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: '',
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1rXCOu7T2gK0jSZFkXXcIQFXa-112-64.png',
      label: $i18n.get({ id: 'deepFilter', dm: '筛选' }),
      schema: {
        componentName: 'PickableField',
        props: {
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
        zh_CN: '筛选',
        en_US: 'Pickable',
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
      name: 'type',
      title: $i18n.get({ id: 'deepOptionalStyle', dm: '选项风格' }),
      display: 'inline',
      initialValue: 'outline',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepConcise', dm: '简洁' }),
              value: 'default',
            },
            {
              title: $i18n.get({ id: 'deepWireframe', dm: '线框' }),
              value: 'outline',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'multiple',
      title: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
      mutator: datasourceChanged,
      useVariableChange: datasourceChanged,
    },

    {
      name: 'dataSource',
      display: 'block',
      supportVariable: true,
      tip: {
        content: $i18n.get({ id: 'deepDataFormat', dm: '数据格式' }),
        url: pickableDataSource,
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
          disable: false,
        },
      ],

      setter() {
        const isMultiple = this.getProps().getPropValue('multiple');
        return isMultiple ? <OptionsSetter multiple /> : <OptionsSetter />;
      },
      mutator: datasourceChanged,
      useVariableChange: datasourceChanged,
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    style({ advanced: true }),
    advanced('pickableField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* pickableField onChange
* @param value 被选中的选项的值
*/
function onChange({value}){
  console.log('onChange', value);
}`,
      },
    ]),
  ],
});
