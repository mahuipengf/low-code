import React from 'react';
import { JsonSetter } from '@ali/visualengine-utils';
import { defaultValue } from '../common/vu-fusion-field-property';
import commonConfig from '../vc-money-input-field/commonConfig';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { moneyValue } from '../common/tipUrls';
export default [
  commonConfig(
    {
      title: $i18n.get({ id: 'deepOverRange', dm: '金额区间' }),
      componentName: 'MoneyRangeField',
      snippets: [
        {
          screenshot: 'https://img.alicdn.com/tfs/TB1Q9mJu4n1gK0jSZKPXXXvUXXa-112-64.png',
          label: $i18n.get({ id: 'deepOverRange', dm: '金额区间' }),
          schema: {
            componentName: 'MoneyRangeField',
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
        lower: '',
        upper: '',
      },

      supportVariable: true,
      setter: <JsonSetter label={$i18n.get({ id: 'deepEditTheDefaultValue', dm: '编辑默认值' })} />,
    }),

    false
  ),
];
