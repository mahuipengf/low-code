
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  JsonSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  fieldName,
} from '@ali/vu-field-property';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import {
  label,
  labelAlign,
  labelTextAlign,
  labelColSpan,
  labelColOffset,
  wrapperColSpan,
  wrapperColOffset,
  validation,
  defaultValue,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  formCategory,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import { transferDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '穿梭框',
  componentName: 'TransferField',
  category: '表单',
  icon: Icon,
  docUrl: transferDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1SNWMu1L2gK0jSZFmXXc7iXXa-112-64.png",
      label: "穿梭框",
      schema: {
        componentName: "TransferField",
        props: {
          mode: "simple",
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
        zh_CN: '穿梭框',
        en_US: 'TransferField',
        type: 'i18n',
      },
    }),
    labelAlign({
      setter: (
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
      ),
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
      name: 'mode',
      title: '模式',
      display: 'inline',
      initialValue: 'normal',
      setter: <ChoiceSetter options={[
        { title: 'normal', value: 'normal' },
        { title: 'simple', value: 'simple' },
      ]}
      />,
    },
    {
      name: 'showSearch',
      title: '搜索框',
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'sortable',
      title: '拖拽排序',
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'notFoundContent',
      title: '无数据时显示内容',
      display: 'block',
      initialValue: {
        zh_CN: '无数据',
        en_US: 'Not Found',
        type: 'i18n',
      },
      setter: <I18nSetter />,
    },
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    style({ advanced: true }),
    {
      title: '高级',
      type: 'group',
      display: 'accordion',
      collapsed: true,
      items: [uuid('transferField'), fieldName(), ...events([{
        name: 'onChange', title: 'onChange 值发生变化', initialValue: `/**
* transferField onChange
* @param value 已选中的值
*/
function onChange({ value }){
  console.log('onChange', value);
}`,
      }], { display: 'none' })],
    },
  ],
});
