import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  ValidationSetter,
  ChoiceSetter,
  BoolSetter,
  NumberSetter,
  ActionSetter,
  I18nSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  label,
  labelAlign,
  labelTextAlign,
  placeholder,
  tips,
  size,
  labelColSpan,
  labelColOffset,
  wrapperColSpan,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  wrapperColOffset,
  validation,
  advanced,
  formCategory,
  defaultValue,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { timeDisabled, timeDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepTimeSelectionBox', dm: '时间选择框' }),
  componentName: 'TimeField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: timeDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1Cal5u.T1gK0jSZFhXXaAtVXa-112-64.png',
      label: $i18n.get({ id: 'deepTimeChoice', dm: '时间选择' }),
      schema: {
        componentName: 'TimeField',
        props: {},
      },
    },
  ],

  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: true,
      initialValue: {
        zh_CN: '时间选择框',
        en_US: 'TimeField',
        type: 'i18n',
      },
    }),

    defaultValue({
      name: 'value',
      title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
      display: 'inline',
      supportVariable: true,
      tip: $i18n.get({
        id: 'deepPleaseFillInThe',
        dm: '请根据下方时间格式填入正确的时间字符串如 HH:mm:ss',
      }),
      setter: (
        <I18nSetter
          multiline={3}
          rows={3}
          placeholder={$i18n.get({ id: 'deepTimeStringHhMm', dm: '时间字符串 HH:mm:ss' })}
        />
      ),
    }),

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

    tips(),
    size(),
    behavior({ hasReadOnly: false }),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    {
      name: 'format',
      title: $i18n.get({ id: 'deepTimeFormat', dm: '时间格式' }),
      initialValue: 'HH:mm:ss',
      display: 'inline',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: 'HH:mm:ss',
              value: 'HH:mm:ss',
            },
            {
              title: 'HH:mm',
              value: 'HH:mm',
            },
            {
              title: 'mm:ss',
              value: 'mm:ss',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'returnType',
      title: $i18n.get({ id: 'deepReturnType', dm: '返回类型' }),
      display: 'inline',
      initialValue: 'timestamp',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              text: $i18n.get({ id: 'deepTimestamp', dm: '时间戳' }),
              value: 'timestamp',
              tip: $i18n.get({ id: 'deepDigitalTimestamp', dm: '数字型时间戳' }),
            },
            {
              text: $i18n.get({ id: 'deepString', dm: '字符串' }),
              value: 'string',
              tip: $i18n.get({ id: 'deepStringInAccordanceWith', dm: '符合上述格式的字符串' }),
            },
            {
              text: 'Moment',
              value: 'moment',
              tip: $i18n.get({ id: 'deepMomentObject', dm: 'Moment 对象' }),
            },
          ]}
        />
      ),
    },

    {
      name: 'hourStep',
      title: $i18n.get({ id: 'deepHourWalk', dm: '小时步长' }),
      display: 'inline',
      initialValue: 1,
      supportVariable: true,
      setter: <NumberSetter />,
    },

    {
      name: 'minuteStep',
      title: $i18n.get({ id: 'deepMinute', dm: '分钟步长' }),
      display: 'inline',
      supportVariable: true,
      initialValue: 1,
      setter: <NumberSetter />,
    },

    {
      name: 'secondStep',
      title: $i18n.get({ id: 'deepSecondLong', dm: '秒钟步长' }),
      display: 'inline',
      supportVariable: true,
      initialValue: 1,
      setter: <NumberSetter />,
    },

    {
      name: 'hasClear',
      title: $i18n.get({ id: 'deepClearButton', dm: '清除按钮' }),
      initialValue: true,
      display: 'inline',
      supportVariable: true,
      setter: <BoolSetter />,
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    {
      name: 'disabledHours',
      title: $i18n.get({ id: 'deepDisableHourFunction', dm: '禁用小时函数' }),
      display: 'block',
      tip: {
        content: $i18n.get({ id: 'deepClickToViewAPI', dm: '点击查看api:disabledHours' }),
        url: timeDisabled,
      },

      setter: (
        <ActionSetter
          mode="javascript"
          defaultCode={`/**
 * @param index 0~23
 */
function disableHours(index) {
  return true;
}
`}
        />
      ),
    },

    {
      name: 'disabledMinutes',
      title: $i18n.get({ id: 'deepDisableMinuteFunctions', dm: '禁用分钟函数' }),
      display: 'block',
      tip: {
        content: $i18n.get({ id: 'deepClickToViewAPI.1', dm: '点击查看api:disabledMinutes' }),
        url: timeDisabled,
      },

      setter: (
        <ActionSetter
          mode="javascript"
          defaultCode={`/**
 * @param index 0~59
 */
function disableMinutes(index) {
  return true;
}
`}
        />
      ),
    },

    {
      name: 'disabledSeconds',
      title: $i18n.get({ id: 'deepDisableSecondFunction', dm: '禁用秒钟函数' }),
      display: 'block',
      tip: {
        content: $i18n.get({ id: 'deepClickToViewAPI.2', dm: '点击查看api:disabledSeconds' }),
        url: timeDisabled,
      },

      setter: (
        <ActionSetter
          mode="javascript"
          defaultCode={`/**
 * @param index 0~59
 */
function disableSeconds(index) {
  return true;
}
`}
        />
      ),
    },

    style({ advanced: true }),
    advanced('timeField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* timeField onChange
* @param value 变更属性值
*/
function onChange(value) {
  console.log('onChange', value);
}`,
      },

      {
        name: 'onVisibleChange',
        title: $i18n.get({
          id: 'deepOnVisibleChangeMatrixStateChange',
          dm: 'onVisibleChange 弹层展示状态变化',
        }),
        initialValue: `/**
* timeField onVisibleChange
* @param visibleState 变更属性值
*/
function onVisibleChange(visibleState) {
  console.log('onVisibleChange', visibleState);
}`,
      },
    ]),
  ],
});
