import React from 'react';
import { Bundle } from '@ali/visualengine';
import { TextSetter, BoolSetter, NumberSetter, ChoiceSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { paginationDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepPages', dm: '翻页器' }),
  componentName: 'Pagination',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: paginationDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1c_KLu7P2gK0jSZPxXXacQpXa-112-8.png',
      label: $i18n.get({ id: 'deepFullVersion', dm: '完整版' }),
      schema: {
        componentName: 'Pagination',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1iYUur7L0gK0jSZFAXXcA9pXa-582-124.png',
      label: $i18n.get({ id: 'deepSimpleVersion', dm: '简洁版' }),
      schema: {
        componentName: 'Pagination',
        props: {
          type: 'simple',
        },
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1UxWMu1L2gK0jSZFmXXc7iXXa-112-64.png',
      label: $i18n.get({ id: 'deepMINIVersion', dm: 'mini版' }),
      schema: {
        componentName: 'Pagination',
        props: {
          type: 'mini',
          shape: 'arrow-only',
        },
      },
    },
  ],

  configure: [
    {
      name: 'total',
      title: $i18n.get({ id: 'deepTotal', dm: '总记录数' }),
      display: 'inline',
      initialValue: 100,
      supportVariable: true,
      setter: <NumberSetter />,
    },

    {
      name: 'current',
      title: $i18n.get({ id: 'deepCurrentPageNumber', dm: '当前页码' }),
      display: 'inline',
      initialValue: 1,
      supportVariable: true,
      setter: <NumberSetter />,
    },

    {
      name: 'size',
      title: $i18n.get({ id: 'deepSplitSize', dm: '分页尺寸' }),
      display: 'inline',
      initialValue: 'medium',
      setter: (
        <ChoiceSetter
          options={[
            { value: 'small', title: $i18n.get({ id: 'deepSmall', dm: '小' }) },
            { value: 'medium', title: $i18n.get({ id: 'deepIn', dm: '中' }) },
            { value: 'large', title: $i18n.get({ id: 'deepBig', dm: '大' }) },
          ]}
        />
      ),
    },

    {
      name: 'type',
      title: $i18n.get({ id: 'deepPatementType', dm: '分页类型' }),
      display: 'inline',
      initialValue: 'normal',
      setter: (
        <ChoiceSetter
          options={[
            { value: 'normal', title: 'normal' },
            { value: 'simple', title: 'simple' },
            { value: 'mini', title: 'mini' },
          ]}
        />
      ),
    },

    {
      name: 'shape',
      title: $i18n.get({ id: 'deepAdvanceBackFetterButton', dm: '前进后退按钮样式' }),
      display: 'block',
      initialValue: 'normal',
      setter: (
        <ChoiceSetter
          options={[
            { value: 'normal', title: 'normal' },
            { value: 'arrow-only', title: 'arrow-only' },
            { value: 'arrow-prev-only', title: 'arrow-prev-only' },
            { value: 'no-border', title: 'no-border' },
          ]}
        />
      ),
    },

    {
      name: 'pageSizeSelector',
      title: $i18n.get({ id: 'deepPageDisplaySelectorType', dm: '每页显示选择器类型' }),
      display: 'block',
      supportVariable: true,
      initialValue: false,
      setter: (
        <ChoiceSetter
          options={[
            { value: false, title: $i18n.get({ id: 'deepDoNotShow', dm: '不显示' }) },
            { value: 'filter', title: 'filter' },
            { value: 'dropdown', title: 'dropdown' },
          ]}
        />
      ),
    },

    {
      name: 'pageSizeList',
      supportVariable: true,
      title: $i18n.get({ id: 'deepOptionalValueOfThe', dm: '每页显示选择器可选值' }),
      display: 'block',
      initialValue: '5,10,20',
      hidden() {
        return this.getProps().getPropValue('pageSizeSelector') === false;
      },
      setter: <TextSetter />,
    },

    {
      name: 'pageSize',
      title: 'pageSize',
      display: 'block',
      initialValue: 10,
      supportVariable: true,
      setter: <NumberSetter />,
    },

    {
      name: 'pageSizePosition',
      title: $i18n.get({ id: 'deepTheLocationOfThe', dm: '每页显示选择器在组件中的位置' }),
      display: 'block',
      initialValue: 'end',
      hidden() {
        return this.getProps().getPropValue('pageSizeSelector') === false;
      },
      setter: (
        <ChoiceSetter
          options={[
            { value: 'start', title: 'start' },
            { value: 'end', title: 'end' },
          ]}
        />
      ),
    },

    {
      name: 'hideOnlyOnePage',
      title: $i18n.get({ id: 'deepWhenTheNumberOf', dm: '当分页数为1时，是否隐藏分页器' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'showJump',
      title: $i18n.get({ id: 'deepDisplayJumpInputBox', dm: '显示跳转输入框与按钮' }),
      tip: $i18n.get({
        id: 'deepWhenThePageType',
        dm: '分页类型为normal时,且在页码数超过5页后 起作用',
      }),
      hidden() {
        return this.getProps().getPropValue('type') !== 'normal';
      },
      initialValue: true,
      display: 'block',
      setter: <BoolSetter />,
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('pagination'),
        ...events([
          {
            name: 'onChange',
            title: $i18n.get({ id: 'deepONCHANGEPageNumberChange', dm: 'onChange 页码改变' }),
            initialValue: `/**
* Pagination onChange 
* @param currentPagination 当前页码值
*/
function onChange(currentPagination){
  console.log('onChange', currentPagination);
}`,
          },

          {
            name: 'onPageSizeChange',
            title: $i18n.get({
              id: 'deepONPAGESIZECHANGEMRDChanges',
              dm: 'onPageSizeChange 每页显示数改变',
            }),
            initialValue: `/**
* Pagination onPageSizeChange 
* @param pageSize 改变后的每页显示记录数
*/
function onPageSizeChange(pageSize){
  console.log('onPageSizeChange', pageSize);
}`,
          },
        ]),
      ],
    },
  ],
});
