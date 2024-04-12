import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  ChoiceSetter,
  BoolSetter,
  ValidationSetter,
  JsonSetter,
  ActionSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  label,
  labelAlign,
  labelTextAlign,
  tips,
  labelColSpan,
  labelColOffset,
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
  size,
  defaultValue,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import { daysDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: '日期分选',
  componentName: 'DaysField',
  category: '表单',
  icon: Icon,
  docUrl: daysDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1tNl7u4D1gK0jSZFyXXciOVXa-112-64.png",
      label: "日期分选",
      schema: {
        componentName: "DaysField",
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
        zh_CN: '日期选择',
        en_US: 'Choose Dates',
        type: 'i18n',
      },
    }),
    defaultValue({
      initialValue: undefined,
      setter: <JsonSetter />,
      supportVariable: false,
    }),
    labelAlign({
      setter: (
        <ChoiceSetter
          options={[{
            title: '左',
            value: 'left',
          }, {
            title: '上',
            value: 'top',
          }]}
          compact={false}
        />
      ),
      supportVariable: false,
    }),
    labelColSpan({ 
      supportVariable: false,
    }),
    labelColOffset({ 
      supportVariable: false,
    }),
    wrapperColOffset({ 
      supportVariable: false,
    }),
    labelTextAlign({ 
      supportVariable: false,
    }),
    tips({ 
      supportVariable: false,
    }),
    size({ 
      supportVariable: false,
    }),
    behavior({ 
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
      title: '字符格式',
      display: 'inline',
      initialValue: 'YYYY-MM-DD',
      supportVariable: false,
      setter: <TextSetter />,
    },
    {
      name: 'unselectable',
      title: '支持反选',
      tip: '点击已选中日期后执行取消选中',
      initialValue: true,
      display: 'inline',
      setter: <BoolSetter />,
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    style({ advanced: true }),
    advanced('daysField', [
      {
        name: 'onChange',
        title: 'onChange 值发生变化',
        initialValue: `/**
* daysField onChange
* @param value Array<Moment> 选中日期
*/
function onChange({ value }) {
  console.log(value);
}`,
      },
    ], { collapsed: true }),
  ],
});
