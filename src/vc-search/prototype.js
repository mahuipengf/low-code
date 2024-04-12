import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  JsonSetter,
  SelectSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { searchDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepSearchFor', dm: '搜索' }),
  componentName: 'Search',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: searchDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1PSqJuYr1gK0jSZFDXXb9yVXa-112-64.png',
      label: $i18n.get({ id: 'deepNormalType', dm: '普通型' }),
      schema: {
        componentName: 'Search',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1rRaLu5_1gK0jSZFqXXcpaXXa-112-64.png',
      label: $i18n.get({ id: 'deepClassification', dm: '带分类' }),
      schema: {
        componentName: 'Search',
        props: {
          isFilter: true,
          filter: {
            data: [
              {
                label: 'one',
                value: 'one',
              },

              {
                label: 'two',
                value: 'two',
              },

              {
                label: 'three',
                value: 'three',
              },
            ],
          },

          defaultFilterValue: 'one',
        },
      },
    },
  ],

  configure: [
    {
      name: 'placeholder',
      title: $i18n.get({ id: 'deepPromptText', dm: '提示文字' }),
      display: 'inline',
      initialValue: {
        zh_CN: '请输入',
        en_US: '',
        type: 'i18n',
      },

      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
    },

    {
      name: 'defaultValue',
      title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
      display: 'inline',
      initialValue: '',
      setter: <TextSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
    },

    {
      name: 'searchText',
      title: $i18n.get({ id: 'deepButtonName', dm: '按钮名称' }),
      display: 'inline',
      initialValue: {
        zh_CN: '搜索',
        en_US: 'search',
        type: 'i18n',
      },

      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
    },

    {
      name: 'size',
      title: $i18n.get({ id: 'deepSize', dm: '尺寸' }),
      display: 'inline',
      initialValue: 'medium',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              value: 'medium',
              title: $i18n.get({ id: 'deepIn', dm: '中' }),
              tip: $i18n.get({ id: 'deepNormalSize', dm: '正常尺寸' }),
            },
            {
              value: 'large',
              title: $i18n.get({ id: 'deepBig', dm: '大' }),
              tip: $i18n.get({ id: 'deepLargeSize', dm: '大号尺寸' }),
            },
          ]}
        />
      ),
    },

    {
      name: 'type',
      title: $i18n.get({ id: 'deepTypesOf', dm: '类型' }),
      display: 'inline',
      initialValue: 'normal',
      supportVariable: true,
      setter: (
        <SelectSetter
          options={[
            { title: 'normal', value: 'normal' },
            { title: 'primary', value: 'primary' },
            { title: 'secondary', value: 'secondary' },
            { title: 'dark', value: 'dark' },
          ]}
        />
      ),
    },

    {
      name: 'shape',
      title: $i18n.get({ id: 'deepShape', dm: '形状' }),
      display: 'inline',
      initialValue: 'normal',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            { title: 'normal', value: 'normal' },
            { title: 'simple', value: 'simple' },
          ]}
        />
      ),
    },

    {
      name: 'autoFocus',
      title: $i18n.get({ id: 'deepAutomaticFocus', dm: '自动聚焦' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'disabled',
      title: $i18n.get({ id: 'deepIsItDisabled', dm: '是否禁用' }),
      display: 'inline',
      initialValue: false,
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
      name: 'dataSource',
      title: $i18n.get({ id: 'deepSearchBoxLenovoList', dm: '搜索框下拉联想列表' }),
      display: 'block',
      supportVariable: true,
      initialValue: {
        data: [
          { label: $i18n.get({ id: 'deepTmall', dm: '天猫' }), value: 'value1' },
          { label: $i18n.get({ id: 'deepTaobao', dm: '淘宝' }), value: 'value2' },
          { label: $i18n.get({ id: 'deepAlibaba', dm: '阿里巴巴' }), value: 'value3' },
        ],
      },

      required: false,
      setter: <JsonSetter />,
    },

    {
      name: 'isFilter',
      title: $i18n.get({ id: 'deepOpenTheSelector', dm: '开启选择器' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'filter',
      title: $i18n.get({ id: 'deepSelectorData', dm: '选择器数据' }),
      display: 'accordion',
      supportVariable: true,
      initialValue: {
        data: [
          { label: 'one', value: 'one' },
          { label: 'two', value: 'two' },
          { label: 'three', value: 'three' },
        ],
      },

      required: false,
      hidden() {
        return !this.getProps().getPropValue('isFilter');
      },
      setter: <JsonSetter />,
    },

    {
      name: 'defaultFilterValue',
      title: $i18n.get({ id: 'deepSelectorDefaultValue', dm: '选择器默认值' }),
      display: 'block',
      initialValue: 'one',
      supportVariable: true,
      hidden() {
        return !this.getProps().getPropValue('isFilter');
      },
      setter: <TextSetter />,
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('search'),
        ...events([
          {
            name: 'onChange',
            title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
            initialValue: `/**
* Search
* onChange 输入关键字时的回调
*/
function onChange(value) {
  console.log(value);
}`,
          },

          {
            name: 'onSearch',
            title: $i18n.get({ id: 'deepOnsersClickTheSearch', dm: 'onSearch 点击搜索按钮' }),
            initialValue: `/**
* Search
* onSearchChange 点击搜索按钮触发的回调
*/
function onSearchChange(value) {
  console.log(value);
}`,
          },

          {
            name: 'onFilterChange',
            title: $i18n.get({
              id: 'deepONFILTERCHANGESelectorChanges',
              dm: 'onFilterChange 选择器发生变化',
            }),
            initialValue: `/**
* Search
* onFilterChange 选择器发生变化时回调
*/
function onFilterChange(filterValue) {
  console.log(filterValue);
}`,
          },
        ]),
      ],
    },
  ],
});
