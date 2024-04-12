import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  ActionSetter,
  OptionsSetter,
  JsonSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  validation,
  formCategory,
  defaultValue,
  label,
  labelAlign,
  labelTextAlign,
  labelColSpan,
  labelColOffset,
  placeholder,
  tips,
  size,
  advanced,
  wrapperColSpan,
  wrapperColOffset,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
} from '../common/vu-fusion-field-property';
import { selectValue } from '../common/tipUrls';
import Icon from './logo.svg';
import $i18n from '../i18n/index';

function defaultValueChanged(_value, _hotValue, _preValue, _preHotValue) {
  if (_hotValue !== undefined && _hotValue === _preHotValue) {
    return;
  }
  const datasourceProp = this.getProps().getProp('dataSource');
  if (datasourceProp.useVariable) {
    return;
  }

  const mode = this.getProps().getPropValue('mode');
  const valueProp = this.getProps().getProp('value');
  const value = valueProp.getValue() || (mode === 'single' ? '' : []);

  let defaultChecked;
  if (valueProp.useVariable) {
    defaultChecked = () => false;
    const defaultVal = mode === 'single' ? '""' : '[]';
    valueProp.setValue(defaultVal, true, true, { disableMutator: true });
  } else if (mode === 'single') {
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
  const mode = this.getProps().getPropValue('mode');
  if (datasourceProp.useVariable) {
    return;
  }
  const valueProp = this.getProps().getProp('value');
  if (valueProp.useVariable) {
    return;
  }
  const getCheckedValue = (v) => v.filter((item) => item.defaultChecked).map((item) => item.value);
  let checkedValue = getCheckedValue(datasourceProp.getHotValue());

  if (mode === 'single') {
    checkedValue = checkedValue[0] || '';
  }
  valueProp.setValue(JSON.stringify(checkedValue), true, false, { disableMutator: true });
}

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepNationalChoice', dm: '国家选择' }),
  componentName: 'CountrySelectField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: '',
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1lHqOuW61gK0jSZFlXXXDKFXa-112-64.png',
      label: $i18n.get({ id: 'deepNationalChoice', dm: '国家选择' }),
      schema: {
        componentName: 'CountrySelectField',
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
        zh_CN: '国家选择',
        en_US: 'Country',
        type: 'i18n',
      },
    }),

    defaultValue({
      tip: {
        url: selectValue,
        content: $i18n.get({
          id: 'deepClickViewTheData',
          dm: '点击 ? 查看数据格式。注意：勾中的选项的优先级高于手动输入的默认值',
        }),
      },

      initialValue: '',
      initial(val) {
        return val || '';
      },
      setter: (
        <JsonSetter
          label={$i18n.get({ id: 'deepEditTheDefaultValue', dm: '编辑默认值' })}
          usePopup={false}
          height={40}
        />
      ),
      mutator: defaultValueChanged,
      useVariableChange() {
        defaultValueChanged.call(this);
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
    behavior(),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    {
      name: 'mode',
      title: $i18n.get({ id: 'deepMode', dm: '模式' }),
      display: 'inline',
      initialValue: 'single',
      mutator: datasourceChanged,
      useVariableChange: datasourceChanged,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepRadio', dm: '单选' }),
              value: 'single',
            },
            {
              title: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }),
              value: 'multiple',
            },
            {
              title: $i18n.get({ id: 'deepLabel', dm: '标签' }),
              value: 'tag',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'hasClear',
      title: $i18n.get({ id: 'deepClearButton', dm: '清除按钮' }),
      display: 'inline',
      initialValue: true,
      hidden() {
        return this.getProps().getPropValue('mode') !== 'single';
      },
      setter: <BoolSetter />,
    },

    {
      name: 'hasSelectAll',
      title: $i18n.get({ id: 'deepAllInOne', dm: '全选功能' }),
      display: 'inline',
      initialValue: false,
      hidden() {
        return this.getProps().getPropValue('mode') !== 'multiple';
      },
      setter: <BoolSetter />,
    },

    {
      name: 'showSearch',
      display: 'inline',
      tip: $i18n.get({ id: 'deepTRUEInTagMode', dm: 'tag 模式下固定为true' }),
      title: $i18n.get({ id: 'deepSearch', dm: '可搜索' }),
      initialValue: false,
      hidden() {
        return this.getProps().getPropValue('mode') === 'tag';
      },
      setter: <BoolSetter />,
    },

    {
      name: 'filterLocal',
      display: 'inline',
      tip: $i18n.get({ id: 'deepWhenTheDataSource', dm: '在数据源为远程的时候需要关闭此项' }),
      title: $i18n.get({ id: 'deepLocalFiltering', dm: '本地过滤' }),
      initialValue: true,
      hidden() {
        return !this.getProps().getPropValue('showSearch');
      },
      setter: <BoolSetter />,
    },

    {
      name: 'filter',
      title: $i18n.get({ id: 'deepCustomLocalFilteringMethod', dm: '自定义本地过滤方法' }),
      display: 'block',
      tip: $i18n.get({ id: 'deepReturnsABooleanValue', dm: '返回一个 Boolean 值确定是否保留' }),
      hidden() {
        return (
          !this.getProps().getPropValue('showSearch') ||
          !this.getProps().getPropValue('filterLocal')
        );
      },
      setter: (
        <ActionSetter
          defaultActionName="filter"
          defaultCode={$i18n.get({
            id: 'deepFunctionFilterValueData',
            dm:
              'function filter(value, data){\n  console.log(value, data);\n  // 返回一个 Boolean 值确定是否保留\n  return true;\n}',
          })}
        />
      ),
    },

    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepNationalData', dm: '国家数据' }),
      display: 'block',
      supportVariable: true,
      tip: {
        content: $i18n.get({ id: 'deepClickViewDataStructure', dm: '点击？查看数据结构' }),
        url: '',
      },

      initialValue: '',
      setter: <JsonSetter />,
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    {
      title: $i18n.get({ id: 'deepOtherConfiguration', dm: '其他配置' }),
      type: 'group',
      display: 'accordion',
      items: [
        {
          name: 'notFoundContent',
          title: $i18n.get({ id: 'deepEmptyWritingCase', dm: '为空文案' }),
          display: 'inline',
          setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
        },

        {
          name: 'hasArrow',
          title: $i18n.get({ id: 'deepPullDownArrow', dm: '下拉箭头' }),
          display: 'inline',
          initialValue: true,
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
          name: 'autoWidth',
          display: 'inline',
          title: $i18n.get({ id: 'deepDropEquivalent', dm: '下拉等宽' }),
          initialValue: true,
          setter: <BoolSetter />,
        },
      ],
    },

    style({ advanced: true }),
    advanced('select', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* selectField onChange
* @param value: {mixed} 选中的值
* @param actionType: {String} 触发的方式, 'itemClick', 'enter', 'change'
* @param item: {mixed} 选中的值的对象数据
*/
function onChange({value, actionType, item}) {
  console.log('onChange', value);
}`,
      },

      {
        name: 'onVisibleChange',
        title: $i18n.get({
          id: 'deepONVISibleChangeHomewhereShowHidden',
          dm: 'onVisibleChange 弹层显示隐藏变化',
        }),
        initialValue: `/**
* selectField onVisibleChange
* @param visible: {Boolean} 下拉框是否显示
*/
function onVisibleChange(visible) {
  console.log('onVisibleChange', visible);
}`,
      },

      {
        name: 'onRemove',
        title: $i18n.get({ id: 'deepOnRemoveTAGIsDeleted', dm: 'onRemove Tag被删除' }),
        initialValue: `/**
* selectField onRemove
* @param item: {object} 渲染节点的item
*/
function onRemove(item) {
  console.log('onRemove', item.value);
}`,
      },

      {
        name: 'onSearch',
        title: $i18n.get({ id: 'deepOnSearch', dm: 'onSearch 搜索' }),
        initialValue: `/**
* selectField onSearch
* @param value: {String} 数据
*/
function onSearch(keyword) {
  console.log('onSearch', keyword);
  // 注：需开启“可搜索”
  // 如果使用远程接口作为select的选项数据源，理论上你只需要将下方的“optionList”改为实际的数据源名称即可
  this.dp.exec('optionList', {keyword: keyword});
}`,
      },
    ]),
  ],
});
