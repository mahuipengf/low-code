import React from 'react';
import { JsonSetter } from '@ali/visualengine-utils';
import { defaultValue } from '../common/vu-fusion-field-property';
import { moneyValue } from '../common/tipUrls';
import commonConfig from './commonConfig';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
export default [
  commonConfig(
    {
      title: $i18n.get({ id: 'deepGiveInputBox', dm: '金额输入框' }),
      componentName: 'MoneyInputField',
      snippets: [
        {
          screenshot: 'https://img.alicdn.com/tfs/TB1PauKuYr1gK0jSZR0XXbP8XXa-112-64.png',
          label: $i18n.get({ id: 'deepGiveInputBox', dm: '金额输入框' }),
          schema: {
            componentName: 'MoneyInputField',
            props: {},
          },
        },
      ],
    },

    defaultValue({
      name: 'value',
      title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
      tip: {
        url: moneyValue,
        content: $i18n.get({ id: 'deepClickViewTheData', dm: '点击 ? 查看数据格式。' }),
      },

      display: 'inline',
      initialValue: {
        currency: 'CNY',
        amount: '',
      },

      supportVariable: true,
      setter: <JsonSetter label={$i18n.get({ id: 'deepEditTheDefaultValue', dm: '编辑默认值' })} />,
    }),

    false
  ),
];
