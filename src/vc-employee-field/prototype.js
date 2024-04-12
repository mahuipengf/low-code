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
import $i18n from '../i18n/index';
import { employeeAmdpMode, employeeDoc, employeeUrl } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepPersonnelSearchBox', dm: '人员搜索框' }),
  componentName: 'EmployeeField',
  icon: Logo,
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  docUrl: employeeDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ouOLu7Y2gK0jSZFgXXc5OFXa-112-64.png',
      label: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }),
      schema: {
        componentName: 'EmployeeField',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB144CJu.T1gK0jSZFrXXcNCXXa-112-64.png',
      label: $i18n.get({ id: 'deepRadio', dm: '单选' }),
      schema: {
        componentName: 'EmployeeField',
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
      supportVariable: true,
      initialValue: {
        zh_CN: '人员搜索',
        en_US: 'Employee Field',
        type: 'i18n',
      },
    }),

    placeholder({
      supportVariable: true,
      initialValue: {
        zh_CN: '请选择',
        en_US: 'Please Select',
        type: 'i18n',
      },
    }),

    defaultValue({
      name: 'value',
      title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
      display: 'inline',
      initialValue: '',
      initial(val) {
        return val || [];
      },
      supportVariable: true,
      setter: <JsonSetter label={$i18n.get({ id: 'deepEditTheDefaultValue', dm: '编辑默认值' })} />,
    }),

    labelAlign(),
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
      name: 'multiple',
      title: $i18n.get({ id: 'deepMultiSelectionMode', dm: '多选模式' }),
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'hasClear',
      title: '可以清除',
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'startWithDepartmentId',
      title: $i18n.get({ id: 'deepStartingPoint', dm: '选人起点' }),
      display: 'none',
      initialValue: 'SELF',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepDepartmentalDepartment', dm: '自己部门' }),
              value: 'SELF',
            },
            { title: $i18n.get({ id: 'deepTopOfTheCorporate', dm: '企业顶层' }), value: 'TOP' },
          ]}
        />
      ),
    },

    {
      name: 'dataType',
      title: $i18n.get({ id: 'deepTypeOfData', dm: '数据类型' }),
      display: 'inline',
      initialValue: 'url',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepInterfaceRequest', dm: '接口请求' }),
              value: 'url',
            },

            {
              title: $i18n.get({ id: 'deepDataSource', dm: '数据源' }),
              value: 'dataSource',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepPersonnedData', dm: '人员数据' }),
      display: 'block',
      supportVariable: true,
      initialValue: [],
      setter: <JsonSetter />,
      ignore() {
        return this.getProps().getPropValue('dataType') === 'url';
      },
      hidden() {
        return this.getProps().getPropValue('dataType') === 'url';
      },
    },

    {
      title: $i18n.get({ id: 'deepInterfaceConfiguration', dm: '接口配置' }),
      type: 'group',
      display: 'accordion',
      hidden() {
        return this.getProps().getPropValue('dataType') === 'dataSource';
      },
      items: [
        {
          name: 'url',
          title: $i18n.get({ id: 'deepInterfaceAddress', dm: '接口地址' }),
          display: 'inline',
          ignore() {
            return !this.getValue() && !this.getVariableValue();
          },
          supportVariable: true,
          tip: {
            content: $i18n.get({
              id: 'deepEmployeeUrlTip',
              dm: '仅 PC 支持，查询参数为 key，点击查看如何自定义接口',
            }),
            url: employeeUrl,
          },

          initialValue: '',
          setter: <TextSetter placeholder="https://" pattern={/^(?:(?:http|https):)?\/\//} />,
        },

        {
          name: 'beforeSearch',
          title: $i18n.get({ id: 'deepParameterProcessing', dm: '参数处理1' }),
          display: 'inline',
          tip: $i18n.get({
            id: 'deepYouCanProcessParameters',
            dm: '发送请求前，可以通过此函数处理参数',
          }),
          setter: (
            <ActionSetter
              defaultActionName="beforeSearch"
              defaultCode={`function employeeBeforeSearch(params) {
  return params;
}`}
            />
          ),
        },

        {
          name: 'fit',
          title: $i18n.get({ id: 'deepDataProcessing', dm: '数据处理' }),
          display: 'inline',
          tip: $i18n.get({ id: 'deepProcessingTheReturnedData', dm: '对返回的数据进行处理' }),
          setter: (
            <ActionSetter
              defaultActionName="fit"
              defaultCode={`function employeeFitResponse(response) {
  return response;
}`}
            />
          ),
        },
        {
          name: 'amdpMode',
          title: $i18n.get({id: 'deepEmployeeAmdpMode', dm: 'AMDP 模式'}),
          display: 'inline',
          tip: {
            content: $i18n.get({id: 'deepEmployeeAmdpModeDes', dm: '适配 AMDP 接口的入参出参'}),
            url: employeeAmdpMode,
          },
          initialValue: false,
          setter: <BoolSetter />
        },

        {
          name: 'subUrl',
          title: $i18n.get({ id: 'deepSubordinateInterface', dm: '下属接口' }),
          display: 'inline',
          supportVariable: true,
          ignore() {
            return !this.getValue();
          },
          tip: $i18n.get({
            id: 'deepCustomizeTheServiceURL',
            dm: '自定义搜索全员和下属时的服务 URL，默认用 接口地址',
          }),
          initialValue: '',
          setter: <TextSetter placeholder="https://" pattern={/^(?:(?:http|https):)?\/\//} />,
        },

        {
          name: 'beforeSearchTeam',
          title: $i18n.get({ id: 'deepParameterProcessing.1', dm: '参数处理2' }),
          display: 'inline',
          tip: $i18n.get({
            id: 'deepYouCanProcessParameters',
            dm: '发送请求前，可以通过此函数处理参数',
          }),
          setter: (
            <ActionSetter
              defaultActionName="beforeSearch"
              defaultCode={`function employeeBeforeSearch(params) {
  return params;
}`}
            />
          ),
        },
      ],
    },

    {
      title: $i18n.get({ id: 'deepOtherProperties', dm: '其它属性' }),
      type: 'group',
      display: 'accordion',
      collapsed: true,
      items: [
        {
          name: 'searchDelay',
          title: $i18n.get({ id: 'deepSearchDelay', dm: '搜索延迟' }),
          display: 'inline',
          setter: (
            <NumberSetter
              min={0}
              placeholder={$i18n.get({ id: 'deepDefaultMS', dm: '默认100(ms)' })}
            />
          ),
        },

        {
          name: 'fetchDataOnMount',
          title: $i18n.get({ id: 'deepAutomaticRequest', dm: '自动请求' }),
          tip: $i18n.get({
            id: 'deepAutomaticRequestInterfaceAfter',
            dm: '页面加载后自动请求接口',
          }),
          initialValue: true,
          display: 'inline',
          setter: <BoolSetter />,
        },

        {
          name: 'closeOnSelect',
          title: $i18n.get({ id: 'deepCheckClose', dm: '选中关闭' }),
          display: 'inline',
          initialValue: true,
          setter: <BoolSetter />,
          hidden() {
            return !this.getProps().getPropValue('multiple');
          },
        },

        {
          name: 'showAvater',
          title: $i18n.get({ id: 'deepAvatar', dm: '头像' }),
          display: 'inline',
          initialValue: true,
          setter: <BoolSetter />,
        },

        {
          name: 'showEmplId',
          title: $i18n.get({ id: 'deepListJobNumber', dm: '列表工号' }),
          tip: $i18n.get({ id: 'deepWhetherTheWorkNumber', dm: '工号是否显示在下拉列表中' }),
          display: 'inline',
          initialValue: true,
          setter: <BoolSetter />,
        },

        {
          name: 'emplIdInLabel',
          title: $i18n.get({ id: 'deepResults', dm: '结果工号' }),
          tip: $i18n.get({ id: 'deepWhetherTheWorkNumber.1', dm: '工号是否显示在选中的结果中' }),
          display: 'inline',
          initialValue: true,
          setter: <BoolSetter />,
        },

        {
          name: 'showDeptDesc',
          title: $i18n.get({ id: 'deepDepartmentDescription', dm: '部门描述' }),
          display: 'inline',
          initialValue: true,
          setter: <BoolSetter />,
        },

        {
          name: 'showJobDesc',
          title: $i18n.get({ id: 'deepDescriptionOfJob', dm: '职位描述' }),
          display: 'inline',
          initialValue: true,
          setter: <BoolSetter />,
        },

        {
          name: 'hasOrderNum',
          title: $i18n.get({ id: 'deepPrimaryProfession', dm: '主兼职' }),
          display: 'inline',
          setter: <BoolSetter />,
        },

        {
          name: 'showAllSub',
          title: $i18n.get({ id: 'deepFullMember', dm: '全员' }),
          display: 'inline',
          setter: <BoolSetter />,
        },

        {
          name: 'showSub',
          title: $i18n.get({ id: 'deepShow', dm: '显示下属' }),
          display: 'inline',
          initialValue: false,
          setter: <BoolSetter />,
        },

        {
          name: 'renderOption',
          title: $i18n.get({ id: 'deepOptionRendering', dm: '选项渲染' }),
          display: 'inline',
          setter: (
            <ActionSetter
              defaultActionName="renderOption"
              defaultCode={`function renderOption(option) {
  return option.displayName ? option.displayName : option.label;
}`}
            />
          ),
        },

        {
          name: 'renderSelection',
          title: $i18n.get({ id: 'deepSelectRendering', dm: '选中后渲染' }),
          display: 'inline',
          setter: (
            <ActionSetter
              defaultActionName="renderSelection"
              defaultCode={`function renderSelection(option) {
  return option.displayName ? option.displayName : option.label;
}`}
            />
          ),
        },

        /*
    {
      name: 'renderLinkForView',
      title: '查看链接',
      tip: '查看时是否显示为链接',
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'useAliworkUrl',
      title: '内外链接',
      tip: '链接形式下，是否使用阿里内外主页链接',
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
      disabled() {
        return !this.getProps().getPropValue('renderLinkForView');
      },
    },
    {
      name: 'viewUrlKey',
      title: '索引名称',
      tip: '链接形式下，链接从哪个字段获取',
      display: 'inline',
      initialValue: 'url',
      setter: <TextSetter />,
      disabled() {
        const props = this.getProps();
        const renderLinkForView = props.getPropValue('renderLinkForView');
        const useAliworkUrl = props.getPropValue('useAliworkUrl');
        return !renderLinkForView || useAliworkUrl;
      },
    },
    */
      ],
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    advanced('employeeField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
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
        title: $i18n.get({ id: 'deepONSEARCHUserInputSearch', dm: 'onSearch 用户输入搜索关键字' }),
        initialValue: `/**
* employeeField onSearch
* @param value 当前值
*/
function onSearch(keyword) {
  console.log('onSearch', keyword);
}`,
      },
    ]),
  ],
});
