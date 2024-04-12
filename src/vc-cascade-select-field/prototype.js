import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  JsonSetter,
  NumberSetter,
  CodeSetter,
  ActionSetter,
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
  defaultValue,
  advanced,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { cascadeSelectDoc, cascadeSelectIsLoadData } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepCascadeSelection', dm: '级联选择' }),
  componentName: 'CascadeSelectField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: cascadeSelectDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1tAeOuYj1gK0jSZFuXXcrHpXa-112-64.png',
      label: $i18n.get({ id: 'deepRadio', dm: '单选' }),
      schema: {
        componentName: 'CascadeSelectField',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB14MZcuebviK0jSZFNXXaApXXa-112-64.png',
      label: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }),
      schema: {
        componentName: 'CascadeSelectField',
        props: {
          multiple: true,
          hasClear: true,
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
        zh_CN: '级联选择',
        en_US: 'CascadeSelect',
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
    }),

    {
      name: 'columnsNum',
      title: $i18n.get({ id: 'deepCascadeLevel', dm: '级联层级' }),
      display: 'inline',
      initialValue: 0,
      supportVariable: true,
      setter: <NumberSetter />,
    },

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

    {
      name: 'listStyle',
      title: $i18n.get({ id: 'deepListStyle', dm: '列表样式' }),
      display: 'inline',
      initialValue: {},
      supportVariable: true,
      setter: <JsonSetter />,
    },

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
      supportVariable: true,
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
      name: 'hasArrow',
      title: $i18n.get({ id: 'deepPullDownArrow', dm: '下拉箭头' }),
      display: 'inline',
      initialValue: true,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'hasBorder',
      title: $i18n.get({ id: 'deepFrame', dm: '边框' }),
      display: 'inline',
      initialValue: true,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'showSearch',
      title: $i18n.get({ id: 'deepSearchBar', dm: '搜索框' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'multiple',
      title: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
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
      initlalValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'hasClear',
      title: $i18n.get({ id: 'deepClearButton', dm: '清除按钮' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'compatibleDataSource',
      title: $i18n.get({ id: 'deepCompatibilityFormat', dm: '兼容格式' }),
      tip: $i18n.get({
        id: 'deepCompatibleFormatsCanAvoid',
        dm:
          '兼容格式可以在大数据量的场景下避免内部格式化而提高效率，兼容格式需要同时提供 text 和 label 两个属性',
      }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepDataSource', dm: '数据源' }),
      display: 'block',
      supportVariable: true,
      initialValue: [
        {
          value: '2974',
          label: $i18n.get({ id: 'deepXiAn', dm: '西安' }),
          children: [
            {
              value: '2975',
              text: $i18n.get({ id: 'deepXiAnCity', dm: '西安市' }),
              disabled: true,
            },
            {
              value: '2976',
              text: $i18n.get({ id: 'deepGaolingCounty', dm: '高陵县' }),
              checkboxDisabled: true,
            },
            { value: '2977', text: $i18n.get({ id: 'deepLantianCounty', dm: '蓝田县' }) },
            { value: '2978', text: $i18n.get({ id: 'deepCounty', dm: '户县' }) },
            { value: '2979', text: $i18n.get({ id: 'deepZhouJiCounty', dm: '周至县' }) },
            { value: '4208', text: $i18n.get({ id: 'deepBridgeArea', dm: '灞桥区' }) },
            { value: '4209', text: $i18n.get({ id: 'deepChangAnDistrict', dm: '长安区' }) },
            { value: '4210', text: $i18n.get({ id: 'deepLianhuDistrict', dm: '莲湖区' }) },
            { value: '4211', text: $i18n.get({ id: 'deepLinyiDistrict', dm: '临潼区' }) },
            { value: '4212', text: $i18n.get({ id: 'deepUniversalArea', dm: '未央区' }) },
            { value: '4213', text: $i18n.get({ id: 'deepNewTownArea', dm: '新城区' }) },
            { value: '4214', text: $i18n.get({ id: 'deepYanliangDistrict', dm: '阎良区' }) },
            { value: '4215', text: $i18n.get({ id: 'deepYantaDistrict', dm: '雁塔区' }) },
            { value: '4388', text: $i18n.get({ id: 'deepBeilinDistrict', dm: '碑林区' }) },
            { value: '610127', text: $i18n.get({ id: 'deepOtherDistrict', dm: '其它区' }) },
          ],
        },
      ],

      required: false,
      setter: <JsonSetter />,
    },

    {
      name: 'checkStrictly',
      title: $i18n.get({ id: 'deepFatherAndSonSelection', dm: '父子选中不关联' }),
      display: 'block',
      initialValue: false,
      supportVariable: true,
      hidden() {
        return !this.getProps().getPropValue('multiple');
      },
      setter: <BoolSetter />,
    },

    {
      title: $i18n.get({ id: 'deepOpenAsynchronousLoading', dm: '开启异步加载' }),
      name: 'isLoadData',
      display: 'block',
      initialValue: false,
      supportVariable: true,
      required: false,
      tip: {
        content: $i18n.get({ id: 'deepClickViewUsage', dm: '点击 ? 查看用法' }),
        url: cascadeSelectIsLoadData,
      },

      setter: <BoolSetter />,
    },

    {
      title: $i18n.get({ id: 'deepLoadDataFunction', dm: 'loadData 函数' }),
      name: 'loadData',
      display: 'accordion',
      required: false,
      initialValue: `function loadData(node){
  return new Promise((resolve) => {
    resolve();
  })
}`,
      hidden() {
        return !this.getProps().getPropValue('isLoadData');
      },
      setter: <CodeSetter />,
    },

    {
      name: 'canOnlyCheckLeaf',
      title: $i18n.get({ id: 'deepCanOnlyCheckThe', dm: '只能勾选叶子节点' }),
      display: 'block',
      initlalValue: false,
      supportVariable: true,
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
      name: 'valueRender',
      title: $i18n.get({ id: 'deepCascadeValueRender', dm: '自定义显示结果' }),
      display: 'block',
      setter: <ActionSetter
        defaultActionName="valueRender"
        defaultCode={"function valueRender(item) {\n  return item.label;\n}"}
      />
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    style({ advanced: true }),
    advanced('cascadeSelectField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* CascadeSelectField onChange
* @param value 选中的值，单选时返回单个值，多选时返回数组
* @param data 选中的数据，包括 value 和 label，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点
* @param extra 额外参数
*/
function onChange({ value, data, extra }){
  console.log('onChange', value, data, extra);
}`,
      },

      {
        name: 'onVisibleChange',
        title: $i18n.get({
          id: 'deepONVISibleChangeHomewhereShowHidden',
          dm: 'onVisibleChange 弹层显示隐藏变化',
        }),
        initialValue: `/**
* CascadeSelectField onVisibleChange
* @param visible 是否显示
* @param type 触发显示关闭的操作类型
*/
function onVisibleChange(visible){
  console.log('onVisibleChange', visible);
}`,
      },
      {
        name: 'onSearch',
        title: $i18n.get({ id: 'deepOnSearch', dm: 'onSearch 搜索' }),
        initialValue: `/**
* CascadeSelectField onSearch
* @param value 搜索值
*/
function onSearch(value){
  console.log('onSearch', value);
}`,
      },
    ]),
  ],
});
