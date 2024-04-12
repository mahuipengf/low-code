import React from 'react';
import {
  JsonSetter,
} from '@ali/visualengine-utils';
import {
  defaultValue,
} from '../common/vu-fusion-field-property';
import { moneyValue } from '../common/tipUrls';
import commonConfig from '../vc-money-input-field/commonConfig';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default [
  commonConfig(
    {
      title: '金额区间',
      componentName: 'MoneyRangeField',
      snippets: [
        {
          screenshot: "https://img.alicdn.com/tfs/TB1Q9mJu4n1gK0jSZKPXXXvUXXa-112-64.png",
          label: "金额区间",
          schema: {
            componentName: "MoneyRangeField",
            props: {},
          },
        },
      ],
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
        lower: '',
        upper: '',
      },
      supportVariable: false,
      setter: (
        <JsonSetter label="编辑默认值" />
      ),
    }),

    true
  ),
];
