import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  ChoiceSetter,
  BoolSetter,
  ValidationSetter,
  NumberSetter,
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
import $i18n from '../i18n/index';
import { switchDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepSwitch', dm: '开关' }),
  componentName: 'SwitchField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: switchDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1e1R5u7Y2gK0jSZFgXXc5OFXa-112-64.png',
      label: $i18n.get({ id: 'deepSwitch', dm: '开关' }),
      schema: {
        componentName: 'SwitchField',
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
      supportVariable: true,
      initialValue: {
        zh_CN: '开关',
        en_US: 'SwitchField',
        type: 'i18n',
      },
    }),

    defaultValue({
      initialValue: false,
      setter: <BoolSetter />,
    }),

    labelAlign({
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepLeft', dm: '左' }),
              value: 'left',
            },
            {
              title: $i18n.get({ id: 'deepOn', dm: '上' }),
              value: 'top',
            },
          ]}
          compact={false}
        />
      ),
    }),

    labelColSpan(),
    labelColOffset(),
    wrapperColOffset(),
    labelTextAlign(),
    tips(),
    size(),
    behavior(),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    {
      name: 'checkedChildren',
      title: $i18n.get({ id: 'deepOpenText', dm: '开启文本' }),
      display: 'inline',
      supportVariable: true,
      setter: <TextSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
    },

    {
      name: 'unCheckedChildren',
      title: $i18n.get({ id: 'deepCloseText', dm: '关闭文本' }),
      display: 'inline',
      supportVariable: true,
      setter: <TextSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
    },

    {
      name: 'switchWidth',
      title: $i18n.get({ id: 'deepSwitchWidth', dm: '开关宽度' }),
      display: 'inline',
      setter: <NumberSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      initialValue: '',
      tip: $i18n.get({
        id: 'deepMatchTheTextAnd',
        dm: '配合开启文本和关闭文本使用，需要配置对应文本显示需要的宽度',
      }),
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    style({ advanced: true }),
    advanced('switchField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
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
        title: $i18n.get({ id: 'deepOnclickMouseClick', dm: 'onClick 鼠标点击' }),
        initialValue: `/**
* switchField onClick
*/
function onClick() {
  console.log('点击事件');
}`,
      },

      {
        name: 'onKeyDown',
        title: $i18n.get({ id: 'deepONKEYDOWNKeyboardPress', dm: 'onKeyDown 键盘按下' }),
        initialValue: `/**
* switchField onKeyDown
*/
function onKeyDown() {
  console.log('键盘事件');
}`,
      },
    ]),
  ],
});
