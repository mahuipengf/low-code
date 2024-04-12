import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter, ChoiceSetter, BoolSetter, ValidationSetter, NumberSetter
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
import { switchDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: '开关',
  componentName: 'SwitchField',
  category: '表单',
  icon: Icon,
  docUrl: switchDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1e1R5u7Y2gK0jSZFgXXc5OFXa-112-64.png",
      label: "开关",
      schema: {
        componentName: "SwitchField",
        props: {
          value: true,
          switchWidth: 50,
        },
      },
    },
  ],
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: false,
      initialValue: {
        zh_CN: '开关',
        en_US: 'SwitchField',
        type: 'i18n',
      },
    }),
    defaultValue({
      initialValue: false,
      setter: <BoolSetter />,
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
      name: 'checkedChildren',
      title: '开启文本',
      display: 'inline',
      setter: <TextSetter placeholder="请输入" />,
    },
    {
      name: 'unCheckedChildren',
      title: '关闭文本',
      display: 'inline',
      setter: <TextSetter placeholder="请输入" />,
    },
    {
      name: 'switchWidth',
      title: '开关宽度',
      display: 'inline',
      setter: <NumberSetter placeholder="请输入" />,
      initialValue: '',
      tip: '配合开启文本和关闭文本使用，需要配置对应文本显示需要的宽度'
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    style({ advanced: true }),
    advanced('switchField', [
      {
        name: 'onChange',
        title: 'onChange 值发生变化',
        initialValue: `/**
* switchField onChange
* @param value boolean 开关的值
*/
function onChange({ value }) {
  console.log(value);
}`,
      },
      {
        name: 'onClick',
        title: 'onClick 鼠标点击',
        initialValue: `/**
* switchField onClick
*/
function onClick() {
  console.log('点击事件');
}`,
      },
      {
        name: 'onKeyDown',
        title: 'onKeyDown 键盘按下',
        initialValue: `/**
* switchField onKeyDown
*/
function onKeyDown() {
  console.log('键盘事件');
}`,
      },
    ], { collapsed: true }),
  ],
});
