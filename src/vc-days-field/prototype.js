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
import $i18n from '../i18n/index';
import { daysDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepDateSort', dm: '日期分选' }),
  componentName: 'DaysField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: daysDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1tNl7u4D1gK0jSZFyXXciOVXa-112-64.png',
      label: $i18n.get({ id: 'deepDateSort', dm: '日期分选' }),
      schema: {
        componentName: 'DaysField',
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
        zh_CN: '日期选择',
        en_US: 'Choose Dates',
        type: 'i18n',
      },
    }),

    defaultValue({
      initialValue: undefined,
      setter: <JsonSetter />,
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
              tip: $i18n.get({ id: 'deepCharacterStringInAccordance', dm: '符合下方格式的字符串' }),
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
      name: 'format',
      title: $i18n.get({ id: 'deepCharacterFormat', dm: '字符格式' }),
      display: 'inline',
      initialValue: 'YYYY-MM-DD',
      supportVariable: true,
      setter: <TextSetter />,
    },

    {
      name: 'unselectable',
      title: $i18n.get({ id: 'deepSupport', dm: '支持反选' }),
      tip: $i18n.get({ id: 'deepClickTheSelectedDate', dm: '点击已选中日期后执行取消选中' }),
      initialValue: true,
      display: 'inline',
      setter: <BoolSetter />,
    },

    {
      name: 'tagRender',
      title: $i18n.get({ id: 'deepTagCustomRendering', dm: '标签自定义渲染' }),
      tip: $i18n.get({
        id: 'deepCustomizedInputBoxSelected',
        dm: '自定义输入框中已选中的日期显示格式',
      }),
      hidden: false,
      setter: (
        <ActionSetter
          defaultActionName="tagRender"
          defaultCode={$i18n.get({
            id: 'deepParamValueCurrentValue',
            dm:
              "/**\n  * @param value 当前值，是一个 Moment 对象\n  */\nfunction tagRender(value) {\n  return value.format('MM/DD');\n}",
          })}
        />
      ),
    },

    {
      name: 'calendarProps',
      title: $i18n.get({ id: 'deepCalendarProperty', dm: '日历属性' }),
      hidden: false,
      setter: (
        <ActionSetter
          defaultActionName="getCalendarProps"
          defaultCode={$i18n.get({
            id: 'deepDaysfieldDefinesCalendarExtension',
            dm:
              '/**\n  * DaysField 定义日历扩展属性\n  */\nfunction getCalendarProps() {\n  return {};\n}',
          })}
        />
      ),
    },

    {
      name: 'selectProps',
      title: $i18n.get({ id: 'deepDropDownSelectAttribute', dm: '下拉选择属性' }),
      hidden: false,
      setter: (
        <ActionSetter
          defaultActionName="getSelectProps"
          defaultCode={$i18n.get({
            id: 'deepDaysfieldDefinesDropDown',
            dm:
              '/**\n  * DaysField 定义下拉选择扩展属性\n  */\nfunction getSelectProps() {\n  return {};\n}',
          })}
        />
      ),
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    style({ advanced: true }),
    advanced('daysField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* daysField onChange
* @param value Array<Moment> 选中日期
*/
function onChange({ value }) {
  console.log(value);
}`,
      },
    ]),
  ],
});
