import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  JsonSetter,
  SelectSetter,
  TextSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  label,
  labelTextAlign,
  placeholder,
  tips,
  size,
  labelAlign,
  labelColSpan,
  wrapperColSpan,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  wrapperColOffset,
  validation,
  defaultValue,
  formCategory,
  advanced,
  labelColOffset,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { citySelectData, citySelectValue } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepRegionalChoice', dm: '地区选择' }),
  componentName: 'CitySelectField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: '',
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1_0OKu9f2gK0jSZFPXXXsopXa-112-64.png',
      label: $i18n.get({ id: 'deepRadio', dm: '单选' }),
      schema: {
        componentName: 'CitySelectField',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB15PWIu4D1gK0jSZFsXXbldVXa-112-64.png',
      label: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }),
      schema: {
        componentName: 'CitySelectField',
        props: {
          multiple: true,
        },
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1RGuKuYr1gK0jSZR0XXbP8XXa-112-64.png',
      label: $i18n.get({ id: 'deepSearch', dm: '带搜索' }),
      schema: {
        componentName: 'CitySelectField',
        props: {
          showSearch: true,
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
        zh_CN: '地区选择',
        en_US: 'City',
        type: 'i18n',
      },
    }),

    defaultValue({
      name: 'value',
      title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
      display: 'inline',
      supportVariable: true,
      initialValue: [],
      setter: (
        <JsonSetter label={$i18n.get({ id: 'deepEditTheDefaultValue', dm: '编辑默认值' })} />
      ),
      tip: {
        url: citySelectValue,
        content: $i18n.get({
          id: 'deepClickViewTheCorresponding',
          dm: '点击 ? 查看对应的数据结构',
        }),
      },
    }),

    labelAlign(),
    labelColSpan(),
    labelColOffset(),
    wrapperColSpan(),
    wrapperColOffset(),
    labelTextAlign(),
    placeholder({
      initialValue: {
        zh_CN: '请选择',
        en_US: 'please select',
        type: 'i18n',
      },
    }),

    tips(),
    size(),
    behavior({ hasReadOnly: true }),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    {
      name: 'expandTriggerType',
      title: $i18n.get({ id: 'deepTriggerBehavior', dm: '触发行为' }),
      display: 'inline',
      initialValue: 'click',
      setter: (
        <ChoiceSetter
          options={[
            { title: 'click', value: 'click' },
            { title: 'hover', value: 'hover' },
          ]}
        />
      ),
    },

    {
      name: 'addressType',
      title: $i18n.get({ id: 'deepTypesOf', dm: '类型' }),
      display: 'inline',
      // DEFAULT | PROVINCE | CITY
      initialValue: 'DEFAULT',
      setter: (
        <SelectSetter
          options={[
            {
              title: $i18n.get({ id: 'deepProvinceCityDistrict', dm: '省 / 市 / 区' }),
              value: 'DEFAULT',
            },

            {
              title: $i18n.get({ id: 'deepProvinceCity', dm: '省 / 市' }),
              value: 'CITY',
            },

            {
              title: $i18n.get({ id: 'deepProvince', dm: '省' }),
              value: 'PROVINCE',
            },
          ]}
        />
      ),

      mutator(type) {
        const dsProp = this.props.getProp('columns');
        if (type === 'CITY') {
          dsProp.setValue(['1', '2']);
        } else if (type === 'PROVINCE') {
          dsProp.setValue(['1']);
        } else {
          dsProp.setValue(['1', '2', '3']);
        }
      },
    },

    {
      name: 'hasArrow',
      title: $i18n.get({ id: 'deepPullDownArrow', dm: '下拉箭头' }),
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'changeOnSelect',
      title: $i18n.get({ id: 'deepReputation', dm: '选任意级' }),
      tip: $i18n.get({
        id: 'deepWhetherOrNotTo',
        dm: '是否选中即发生改变, 该属性仅在单选模式下有效',
      }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'hasBorder',
      title: $i18n.get({ id: 'deepFrame', dm: '边框' }),
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'hasClear',
      title: $i18n.get({ id: 'deepClearButton', dm: '清除按钮' }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'showSearch',
      title: $i18n.get({ id: 'deepSearchBar', dm: '搜索框' }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'multiple',
      title: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }),
      display: 'inline',
      initlalValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'checkStrictly',
      title: $i18n.get({ id: 'deepFatherAndSonSelection', dm: '父子选中不关联' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'canOnlyCheckLeaf',
      title: $i18n.get({ id: 'deepCanOnlyCheckThe', dm: '只能勾选叶子节点' }),
      display: 'block',
      initlalValue: false,
      hidden() {
        return !this.getProps().getPropValue('multiple');
      },
      setter: <BoolSetter />,
    },

    {
      name: 'notFoundContent',
      title: $i18n.get({ id: 'deepNoDataDisplayContent', dm: '无数据时显示内容' }),
      display: 'block',
      initialValue: {
        zh_CN: '无数据',
        en_US: 'Not Found',
        type: 'i18n',
      },

      setter: <I18nSetter />,
    },

    {
      name: 'dataUrl',
      display: 'block',
      title: $i18n.get({id: 'deepCitySelectDataUrl', dm: '自定义数据源'}),
      tip: {
        url: citySelectData,
        content: $i18n.get({
          id: 'deepClickViewTheCorresponding',
          dm: '点击 ? 查看对应的数据结构',
        }),
      },
      setter: <TextSetter />,
    },
    {
      name: 'useRaw',
      display: 'block',
      title: '使用菜鸟原始数据',
      setter: <BoolSetter />,
      tip: {
        url: citySelectData,
        content: $i18n.get({
          id: 'deepClickViewTheCorresponding',
          dm: '点击 ? 查看对应的数据结构',
        }),
      },
      hidden() {
        return !this.getProps().getPropValue('dataUrl');
      },
      initialValue: false, 
    },
    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    style({ advanced: true }),
    advanced('citySelectField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `
/**
* citySelectField onChange
* @param value 选中的地区的值
*/
function onChange({ value }) {
  console.log(value);
}`,
      },
    ]),
  ],
});
