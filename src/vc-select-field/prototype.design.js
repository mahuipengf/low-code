
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
  NumberSetter,
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
import Icon from './logo.svg';
import { selectDataSource, selectDoc } from '../common/tipUrls';


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
    defaultChecked = item => value === item.value || value.value === item.value;
  } else {
    defaultChecked = item => Array.isArray(value) && !!value.find(v => v === item.value || v.value === item.value);
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
  const mode = this.getProps().getPropValue('mode');
  if (datasourceProp.useVariable) {
    return;
  }
  const valueProp = this.getProps().getProp('value');
  if (valueProp.useVariable) {
    return;
  }
  const getCheckedValue = v => v.filter(item => item.defaultChecked).map(item => item.value);
  let checkedValue = getCheckedValue(datasourceProp.getHotValue());

  if (mode === 'single') {
    checkedValue = checkedValue[0] || '';
  }
  valueProp.setValue(JSON.stringify(checkedValue), true, false, { disableMutator: true });
}

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '下拉选择',
  componentName: 'SelectField',
  category: '表单',
  icon: Icon,
  docUrl: selectDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1zR03u4n1gK0jSZKPXXXvUXXa-112-64.png",
      label: "下拉选择",
      schema: {
        componentName: "SelectField",
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
        zh_CN: '下拉选择',
        en_US: 'SelectField',
        type: 'i18n',
      },
    }),
    defaultValue({
      display: 'none',
      initial(val) {
        return val || '';
      },
      setter: (
        <JsonSetter
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
    placeholder({
      initialValue: {
        zh_CN: '请选择',
        en_US: 'please select',
        type: 'i18n',
      },
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
      name: 'mode',
      title: '模式',
      display: 'inline',
      initialValue: 'single',
      supportVariable: false,
      mutator: datasourceChanged,
      useVariableChange: datasourceChanged,
      setter: (
        <ChoiceSetter
          options={[{
            title: '单选',
            value: 'single',
          }, {
            title: '多选',
            value: 'multiple',
          }, {
            title: '标签',
            value: 'tag',
          }]}
          compact={false}
        />
      ),
    },
    {
      name: 'hasClear',
      title: '清除按钮',
      display: 'inline',
      initialValue: false,
      hidden() {
        return (this.getProps().getPropValue('mode') !== 'single');
      },
      setter: <BoolSetter />,
    },
    {
      name: 'hasSelectAll',
      title: '全选功能',
      display: 'inline',
      initialValue: false,
      hidden() {
        return (this.getProps().getPropValue('mode') !== 'multiple');
      },
      setter: <BoolSetter />,
    },
    {
      name: 'tagInline',
      title: '单行显示',
      display: 'inline',
      initialValue: false,
      hidden() {
        return (this.getProps().getPropValue('mode') !== 'multiple');
      },
      setter: <BoolSetter />,
    },
    {
      name: 'showSearch',
      display: 'inline',
      tip: 'tag 模式下固定为true',
      title: '可搜索',
      initialValue: false,
      hidden() {
        return this.getProps().getPropValue('mode') === 'tag';
      },
      setter: <BoolSetter />,
    },

    {
      name: 'filterLocal',
      display: 'inline',
      tip: '在数据源为远程的时候需要关闭此项',
      title: '本地过滤',
      initialValue: true,
      hidden() {
        return !this.getProps().getPropValue('showSearch');
      },
      setter: <BoolSetter />,
    },
    {
      name: 'filter',
      title: '自定义本地过滤方法',
      display: 'block',
      tip: '返回一个 Boolean 值确定是否保留',
      hidden() {
        return !this.getProps().getPropValue('showSearch') || !this.getProps().getPropValue('filterLocal');
      },
      setter: <ActionSetter defaultActionName="filter"
        defaultCode={`function filter(value, data){
  console.log(value, data);
  // 返回一个 Boolean 值确定是否保留
  return true;
}`}
      />,
    },
    {
      name: 'dataSource',
      display: 'block',
      title: '选项',
      supportVariable: false,
      tip: {
        content: '点击 ? 查看数据格式',
        url: selectDataSource,
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
      setter() {
        const mode = this.getProps().getPropValue('mode');
        return mode === 'single' ? <OptionsSetter /> : <OptionsSetter multiple />;
      },
      mutator: datasourceChanged,
      useVariableChange: datasourceChanged,
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    {
      title: '其他配置',
      type: 'group',
      display: 'accordion',
      items: [
        {
          name: 'notFoundContent',
          title: '为空文案',
          display: 'inline',
          setter: <I18nSetter placeholder="请输入" />,
          supportVariable: false,
        },
        {
          name: 'hasArrow',
          title: '下拉箭头',
          display: 'inline',
          initialValue: true,
          setter: <BoolSetter />,
          supportVariable: false,
        },
        {
          name: 'hasBorder',
          title: '边框',
          display: 'inline',
          initialValue: true,
          setter: <BoolSetter />,
          supportVariable: false,
        },
        {
          name: 'autoWidth',
          display: 'inline',
          title: '下拉等宽',
          initialValue: true,
          setter: <BoolSetter />,
          supportVariable: false,
        },
        {
          name: 'hiddenSelected',
          title:'选择后是否立即关闭面板',
          display: 'inline',
          initialValue: false, 
          hidden() {
            return this.getProps().getPropValue('mode') === 'single';
          },
          setter: <BoolSetter />,
          supportVariable: true,
        },
      ],
    },
    style({ advanced: true }),
    advanced('select', [
      {
        name: 'onChange', title: 'onChange 值发生变化', initialValue: `/**
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
        name: 'onVisibleChange', title: 'onVisibleChange 弹层显示隐藏变化', initialValue: `/**
* selectField onVisibleChange
* @param visible: {Boolean} 下拉框是否显示
*/
function onVisibleChange(visible) {
  console.log('onVisibleChange', visible);
}`,
      },
      {
        name: 'onRemove', title: 'onRemove Tag被删除', initialValue: `/**
* selectField onRemove
* @param item: {object} 渲染节点的item
*/
function onRemove(item) {
  console.log('onRemove', item.value);
}`,
      },
      {
        name: 'onSearch', title: 'onSearch 搜索', initialValue: `/**
* selectField onSearch
* @param value: {String} 数据
*/
function onSearch(keyword) {
  console.log('onSearch', keyword);
  // 注：需开启“可搜索”
  // 如果 Select 需要调用远程接口搜索，请将下方的 selectOptions 改为实际的数据源名称
  return this.dataSourceMap['selectOptions'].load({keyword: keyword});
}`,
      },
    ], { collapsed: true }),
  ],
});
