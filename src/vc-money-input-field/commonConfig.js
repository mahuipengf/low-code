import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  NumberSetter,
  ListSetter,
  TextSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  label,
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
  validation,
  formCategory,
  advanced,
  placeholder,
} from '../common/vu-fusion-field-property';
import { moneyCurrencyOptions } from '../common/tipUrls';
import Icon from './logo.svg';
import $i18n from '../i18n/index';
// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
const commonConfig = (options, defaultValueConfig, isDesignMode) => {
  const supportVariable = !isDesignMode;
  return Bundle.createPrototype({
    ...options,
    category: $i18n.get({ id: 'deepForm', dm: '表单' }),
    icon: Icon,
    docUrl: '',
    configure: [
      formCategory(),
      formCategory('mediator'), // 受控处理标记
      label({
        supportVariable,
        initialValue: {
          zh_CN: '金额输入框',
          en_US: 'MoneyInputField',
          type: 'i18n',
        },
      }),
      {
        ...defaultValueConfig,
        display: isDesignMode ? 'none' : 'inline',
      },
      {
        name: 'labelAlign',
        title: '标题位置',
        display: 'inline',
        initialValue: 'top',
        supportVariable,
        setter() {
          return (
            <ChoiceSetter
              options={[{
                title: '左',
                value: 'left',
                tip: '左侧',
              }, {
                title: '上',
                value: 'top',
                tip: '上',
              }]}
              compact={false}
            />
          );
        },
      },
      labelColSpan({
        supportVariable,
      }),
      labelColOffset({
        supportVariable,
      }),
      wrapperColSpan({
        supportVariable,
      }),
      wrapperColOffset({
        supportVariable,
      }),
      labelTextAlign({
        supportVariable,
      }),
      placeholder({
        supportVariable,
      }),
      tips({
        supportVariable,
      }),
      size({
        supportVariable,
      }),
      behavior({
        hasReadOnly: true,
        supportVariable,
      }),
      labelTipsType({
        supportVariable,
      }, false),
      labelTipsIcon({
        supportVariable,
      }),
      labelTips({
        supportVariable,
      }),
      labelTipsText({
        supportVariable,
      }),
      labelTipsRender({
        supportVariable,
      }),
      /* MoneyInput 底层未透传，后续应该增加
      {
        name: 'state',
        title: '状态',
        display: 'inline',
        supportVariable: true,
        initialValue: '',
        setter: (
          <ChoiceSetter
            options={[{
              title: '正常',
              value: '',
            }, {
              title: '失败',
              value: 'error',
            }, {
              title: '加载中',
              value: 'loading',
            }, {
              title: '成功',
              value: 'success',
            }]}
            compact={false}
          />
        ),
      },
      */
      {
        name: 'fixedNumber',
        title: '货币精度',
        initialValue: 2,
        display: 'inline',
        supportVariable: true,
        setter: <NumberSetter />,
      },
      {
        name: 'currencyInValue',
        title: '包含币种',
        initialValue: true,
        tip: {
          content: '包含币种的情况，默认值和返回值的格式会有变化',
          url: moneyCurrencyOptions,
        },

        display: 'inline',
        setter: <BoolSetter />,
      },
      {
        name: 'showCurrency',
        title: '币种切换',
        display: 'inline',
        initialValue: true,
        setter: <BoolSetter />,
        disabled() {
          return !this.getProps().getPropValue('currencyInValue');
        },
      },
      {
        name: 'currencyOptions',
        title: '币种选项',
        tip: {
          content: '点击查看币种选项的格式',
          url: moneyCurrencyOptions,
        },
        supportVariable: true,
        initialValue: [
          {
            value: 'CNY',
            text: 'CNY',
          },

          {
            value: 'USD',
            text: 'USD',
          },
        ],
        disabled() {
          return !this.getProps().getPropValue('currencyInValue');
        },
        setter: (
          <ListSetter
            checkField={null}
            descriptor="text"
            configure={[
              {
                name: 'text',
                title: '显示值',
                display: 'inline',
                setter: <I18nSetter />,
              },

              {
                name: 'value',
                title: '选项值',
                display: 'inline',
                setter: <TextSetter />,
              },
            ]}
          />
        ),
      },
      /* MoneyInput 底层未透传，后续应该增加
      {
        name: 'hasClear',
        title: '是否显示清除按钮',
        display: 'block',
        initialValue: false,
        hidden() {
          return this.getProps().getPropValue('htmlType') === 'textarea';
        },
        setter: <BoolSetter />,
      },
      {
        name: 'trim',
        title: '自动去除头尾空字符',
        display: 'block',
        initialValue: false,
        setter: <BoolSetter />,
      },
      {
        name: 'autoFocus',
        title: '自动聚焦',
        display: 'block',
        initialValue: false,
        setter: <BoolSetter />,
      },
      {
        name: 'hasLimitHint',
        title: '是否展现最大长度样式',
        display: 'block',
        initialValue: false,
        hidden() {
          return !this.getProps().getPropValue('validation').some(rule => rule.type === 'maxLength');
        },
        setter: <BoolSetter />,
      },
      {
        name: 'cutString',
        title: '超出maxlength截断超出字符串',
        display: 'block',
        initialValue: false,
        hidden() {
          return !this.getProps().getPropValue('validation').some(rule => rule.type === 'maxLength');
        },
        setter: <BoolSetter />,
      },
      */
      validation({
        setter: <ValidationSetter supports={['required', 'minLength', 'maxLength']} enableCustomValidate={!isDesignMode} />,
        supportVariable,
      }),
      style({ advanced: true }),
      advanced('moneyInputField', [
        {
          name: 'onChange', title: 'onChange 值发生变化', initialValue: `/**
  * textField onChange
  * @param value 当前值
  */
  function onChange({ value }) {
    console.log('onChange', value);
  }`,
        },
      ], { collapsed: isDesignMode }),
    ],
  });
}



// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default commonConfig;
