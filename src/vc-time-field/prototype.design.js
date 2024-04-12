
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
import $i18n from '../i18n/index';
import { timeDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '时间选择框',
  componentName: 'TimeField',
  category: '表单',
  icon: Icon,
  docUrl: timeDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1Cal5u.T1gK0jSZFhXXaAtVXa-112-64.png",
      label: "时间选择",
      schema: {
        componentName: "TimeField",
        props: {},
      },
    },
  ],
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: false,
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
    labelAlign({ 
      supportVariable: false,
    }),
    labelColSpan({ 
      supportVariable: false,
    }),
    labelColOffset({ 
      supportVariable: false,
    }),
    wrapperColSpan({ 
      supportVariable: false,
    }),
    wrapperColOffset({ 
      supportVariable: false,
    }),
    labelTextAlign({ 
      supportVariable: false,
    }),
    placeholder({
      initialValue: {
        zh_CN: '请选择',
        en_US: 'please select',
        type: 'i18n',
      },
      supportVariable: false,
    }),
    tips({ 
      supportVariable: false,
    }),
    size({ 
      supportVariable: false,
    }),
    behavior({ 
      hasReadOnly: false,
      supportVariable: false,
    }),
    labelTipsType({ 
      supportVariable: false,
    }, false),
    labelTipsIcon({ 
      supportVariable: false,
    }),
    labelTips({ 
      supportVariable: false,
    }),
    labelTipsText({ 
      supportVariable: false,
    }),
    labelTipsRender({ 
      supportVariable: false,
    }),
    {
      name: 'format',
      title: '时间格式',
      initialValue: 'HH:mm:ss',
      display: 'inline',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: 'HH:mm:ss',
              value: 'HH:mm:ss',
            }, {
              title: 'HH:mm',
              value: 'HH:mm',
            }, {
              title: 'mm:ss',
              value: 'mm:ss',
            }]}
          compact={false}
        />
      ),
    },
    {
      name: 'hasClear',
      title: '清除按钮',
      initialValue: true,
      display: 'inline',
      supportVariable: false,
      setter: <BoolSetter />,
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    style({ advanced: true }),
    advanced('timeField', [
      {
        name: 'onChange', title: 'onChange 值发生变化', initialValue: `/**
* timeField onChange
* @param value 变更属性值
*/
function onChange(value) {
  console.log('onChange', value);
}`,
      },
      {
        name: 'onVisibleChange', title: 'onVisibleChange 弹层展示状态变化', initialValue: `/**
* timeField onVisibleChange
* @param visibleState 变更属性值
*/
function onVisibleChange(visibleState) {
  console.log('onVisibleChange', visibleState);
}`,
      },
    ], { collapsed: true }),
  ],
});
