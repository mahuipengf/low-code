import React from 'react';
import {
  JsonSetter,
} from '@ali/visualengine-utils';
import {
  defaultValue,
} from '../common/vu-fusion-field-property';
import commonConfig from './commonConfig';
import { moneyValue } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default [
  commonConfig(
    {
      title: '金额输入框',
      componentName: 'MoneyInputField',
      snippets: [
        {
          screenshot: "https://img.alicdn.com/tfs/TB1PauKuYr1gK0jSZR0XXbP8XXa-112-64.png",
          label: "金额输入框",
          schema: {
            componentName: "MoneyInputField",
            props: {}
          }
        }
      ],
      supportVariable: false,
    },

    defaultValue({
      name: 'value',
      title: '默认值',
      tip: {
        url: moneyValue,
        content: '点击 ? 查看数据格式。',
      },
      display: 'inline',
      initialValue: {
        currency: 'CNY',
        amount: '',
      },
      supportVariable: false,
      setter: (
        <JsonSetter label="编辑默认值" />
      ),
    }),
    true,
  ),
];
