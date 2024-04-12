import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  ChoiceSetter,
  BoolSetter,
  JsonSetter,
  CodeSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import { defaultValue } from '@ali/vu-field-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { cascaderDataSource, cascaderDoc, cascaderValue, cascadeSelectIsLoadData } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepCascade', dm: '级联' }),
  componentName: 'Cascader',
  category: null, // 暂时不显示该组件
  icon: Icon,
  docUrl: cascaderDoc,
  configure: [
    {
      title: $i18n.get({ id: 'deepDataSource', dm: '数据源' }),
      type: 'group',
      display: 'entry',
      items: [
        {
          name: 'dataType',
          title: $i18n.get({ id: 'deepDataSourceMode', dm: '数据源模式' }),
          display: 'block',
          initialValue: 'remote',
          setter: (
            <ChoiceSetter
              options={[
                { value: 'local', title: $i18n.get({ id: 'deepLocal', dm: '本地' }) },
                { value: 'remote', title: $i18n.get({ id: 'deepRemotely', dm: '远程' }) },
              ]}
            />
          ),
        },

        {
          name: 'dataSource',
          title: $i18n.get({ id: 'deepDataSourceLocal', dm: '数据源（本地）' }),
          display: 'accordion',
          hidden() {
            return this.getProps().getPropValue('dataType') !== 'local';
          },
          tip: {
            content: $i18n.get({ id: 'deepClickToViewThe', dm: '点击查看数据格式' }),
            url: cascaderDataSource,
          },

          supportVariable: true,
          initialValue: [
            {
              value: '2974',
              label: $i18n.get({ id: 'deepXiAn', dm: '西安' }),
              children: [
                {
                  value: '2975',
                  label: $i18n.get({ id: 'deepXiAnCity', dm: '西安市' }),
                  disabled: true,
                },
                {
                  value: '2976',
                  label: $i18n.get({ id: 'deepGaolingCounty', dm: '高陵县' }),
                  checkboxDisabled: true,
                },
                { value: '2977', label: $i18n.get({ id: 'deepLantianCounty', dm: '蓝田县' }) },
                { value: '2978', label: $i18n.get({ id: 'deepCounty', dm: '户县' }) },
                { value: '2979', label: $i18n.get({ id: 'deepZhouJiCounty', dm: '周至县' }) },
                { value: '4208', label: $i18n.get({ id: 'deepBridgeArea', dm: '灞桥区' }) },
                { value: '4209', label: $i18n.get({ id: 'deepChangAnDistrict', dm: '长安区' }) },
                { value: '4210', label: $i18n.get({ id: 'deepLianhuDistrict', dm: '莲湖区' }) },
                { value: '4211', label: $i18n.get({ id: 'deepLinyiDistrict', dm: '临潼区' }) },
                { value: '4212', label: $i18n.get({ id: 'deepUniversalArea', dm: '未央区' }) },
                { value: '4213', label: $i18n.get({ id: 'deepNewTownArea', dm: '新城区' }) },
                { value: '4214', label: $i18n.get({ id: 'deepYanliangDistrict', dm: '阎良区' }) },
                { value: '4215', label: $i18n.get({ id: 'deepYantaDistrict', dm: '雁塔区' }) },
                { value: '4388', label: $i18n.get({ id: 'deepBeilinDistrict', dm: '碑林区' }) },
                { value: '610127', label: $i18n.get({ id: 'deepOtherDistrict', dm: '其它区' }) },
              ],
            },
          ],

          required: false,
          setter: <JsonSetter />,
        },

        {
          name: 'fetchUrl',
          title: $i18n.get({ id: 'deepDataSourceURL', dm: '数据源（url）' }),
          hidden() {
            return this.getProps().getPropValue('dataType') !== 'remote';
          },
          initialValue: 'https://mocks.alibaba-inc.com/mock/HymIpfMfQ/cascaderSelect.json',
          required: false,
          display: 'block',
          setter: <TextSetter multiline rows={2} />,
          supportVariable: true,
        },

        {
          name: 'fetchParams',
          title: $i18n.get({ id: 'deepRequestCarryingParameters', dm: '请求携带的参数' }),
          initialValue: {},
          required: false,
          display: 'accordion',
          collapsed: true,
          hidden() {
            return this.getProps().getPropValue('dataType') !== 'remote';
          },
          setter: <JsonSetter />,
          supportVariable: true,
        },

        {
          name: 'processData',
          title: $i18n.get({ id: 'deepReturnDataProcessing', dm: '返回数据处理' }),
          initialValue: 'function processData(data, ctx, vcState) { return data; }',
          tip: $i18n.get({
            id: 'deepIfYouUseThe',
            dm: '如果在这里使用了 ctx，设计器中看到的，可能与预想不符，请以预览效果为准',
          }),
          required: false,
          display: 'accordion',
          collapsed: true,
          hidden() {
            return this.getProps().getPropValue('dataType') !== 'remote';
          },
          setter: <CodeSetter mode="javascript" wrapEnabled />,
        },

        {
          name: 'fetchError',
          title: $i18n.get({ id: 'deepRequestAnErrorHandling', dm: '请求出错处理' }),
          initialValue:
            'function onFetchError(err, ctx, vcState) {\n  if (err) {\n   ctx.fn.toast({type: "error", title: err}) \n  }\n}',
          display: 'accordion',
          collapsed: true,
          hidden() {
            return this.getProps().getPropValue('dataType') !== 'remote';
          },
          setter: <CodeSetter mode="javascript" wrapEnabled />,
        },

        {
          name: 'fetchMethod',
          title: $i18n.get({ id: 'deepRequestMethod', dm: '请求方式' }),
          display: 'block',
          initialValue: 'GET',
          hidden() {
            return this.getProps().getPropValue('dataType') !== 'remote';
          },
          setter: (
            <ChoiceSetter
              options={[
                { value: 'GET', title: 'GET' },
                { value: 'POST', title: 'POST' },
              ]}
            />
          ),
        },
      ],
    },

    defaultValue({
      items: [
        {
          name: 'value',
          title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
          display: 'block',
          supportVariable: true,
          initialValue: [],
          setter: (
            <JsonSetter label={$i18n.get({ id: 'deepEditTheDefaultValue', dm: '编辑默认值' })} />
          ),
          tip: {
            url: cascaderValue,
            content: $i18n.get({
              id: 'deepClickViewTheCorresponding',
              dm: '点击 ? 查看对应的数据结构',
            }),
          },
        },
      ],
    }),

    // {
    //   name: 'defaultExpandedValue',
    //   title: '默认展开值',
    //   display: 'block',
    //   supportVariable: true,
    //   initialValue: [],
    //   setter: <JsonSetter label="编辑默认值" />,
    // },
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
      name: 'multiple',
      title: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }),
      display: 'inline',
      initlalValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'canOnlySelectLeaf',
      title: $i18n.get({ id: 'deepCanOnlyChooseThe', dm: '只能选中叶子节点' }),
      display: 'block',
      initlalValue: false,
      hidden() {
        return this.getProps().getPropValue('multiple');
      },
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
      name: 'checkStrictly',
      title: $i18n.get({ id: 'deepFatherAndSonSelection', dm: '父子选中不关联' }),
      display: 'block',
      initialValue: false,
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

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('Cascader'),
        ...events([
          {
            name: 'onChange',
            title: $i18n.get({
              id: 'deepTheCallbackFunctionTriggered',
              dm: '选中值改变时触发的回调函数',
            }),
          },
          {
            name: 'onExpand',
            title: $i18n.get({
              id: 'deepTheCallbackFunctionTriggered.1',
              dm: '展开时触发的回调函数',
            }),
          },
        ]),
      ],
    },
  ],
});
