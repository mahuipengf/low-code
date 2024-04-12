import React from 'react';
import { Bundle } from '@ali/visualengine';
import { ChoiceSetter, BoolSetter, ActionSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import DatePickerSetter from '../common/vs-fusion-date-picker';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { calendarDateCellRender, calendarDisableDate, calendarDoc, calendarMonthCellRender } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepCalendar', dm: '日历' }),
  componentName: 'Calendar',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: calendarDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB158yMu4v1gK0jSZFFXXb0sXXa-112-64.png',
      label: $i18n.get({ id: 'deepCardType', dm: '卡片型' }),
      schema: {
        componentName: 'Calendar',
        props: {
          shape: 'card',
        },
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1PRmJu7P2gK0jSZPxXXacQpXa-112-64.png',
      label: $i18n.get({ id: 'deepPanelType', dm: '面板型' }),
      schema: {
        componentName: 'Calendar',
        props: {
          shape: 'panel',
        },
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB10JuKu.T1gK0jSZFhXXaAtVXa-112-64.png',
      label: $i18n.get({ id: 'deepFullScreenType', dm: '全屏型' }),
      schema: {
        componentName: 'Calendar',
        props: {
          shape: 'fullscreen',
        },
      },
    },
  ],

  configure: [
    {
      name: 'language',
      title: $i18n.get({ id: 'deepLanguage', dm: '语言' }),
      display: 'inline',
      initialValue: 'zh-cn',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepChinese', dm: '中文' }),
              value: 'zh-cn',
              tip: 'zh-cn',
            },
            {
              title: $i18n.get({ id: 'deepEnglish', dm: '英文' }),
              value: 'en',
              tip: 'en',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'shape',
      title: $i18n.get({ id: 'deepDisplay', dm: '展现形态' }),
      display: 'inline',
      initialValue: 'fullscreen',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            { title: 'card', value: 'card' },
            { title: 'fullscreen', value: 'fullscreen' },
            {
              title: 'panel',
              value: 'panel',
              tip: $i18n.get({ id: 'deepUsuallyUsedForThe', dm: '通常用于弹层容器' }),
            },
          ]}
        />
      ),
    },

    {
      name: 'showOtherMonth',
      title: $i18n.get({ id: 'deepShowTheDateOf', dm: '展示非本月的日期' }),
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'defaultDate',
      title: $i18n.get({ id: 'deepDefaultDate', dm: '默认日期' }),
      supportVariable: true,
      display: 'inline',
      setter: <DatePickerSetter type="DatePicker" format="YYYY-MM-DD" showTime={false} />,
    },

    {
      name: 'defaultMonth',
      title: $i18n.get({ id: 'deepDefaultMonth', dm: '默认月份' }),
      supportVariable: true,
      display: 'inline',
      setter: <DatePickerSetter type="MonthPicker" format="YYYY-MM" />,
    },

    {
      name: 'dateCellRender',
      title: $i18n.get({ id: 'deepCustomDateRenderingFunction', dm: '自定义日期渲染函数' }),
      display: 'block',
      tip: {
        content: $i18n.get({ id: 'deepClickToViewThe', dm: '点击查看用法' }),
        url: calendarDateCellRender,
      },

      setter: (
        <ActionSetter
          defaultActionName="dateCellRender"
          defaultCode={'function dateCellRender(date) { return date.date(); }'}
        />
      ),
    },

    {
      name: 'monthCellRender',
      title: $i18n.get({ id: 'deepCustomizeTheMonthRendering', dm: '自定义月份渲染函数' }),
      display: 'block',
      tip: {
        content: $i18n.get({ id: 'deepClickToViewThe', dm: '点击查看用法' }),
        url: calendarMonthCellRender,
      },

      setter: (
        <ActionSetter
          defaultActionName="monthCellRender"
          defaultCode={'function dateCellRender(date) { return date.month(); }'}
        />
      ),
    },

    {
      name: 'disabledDate',
      title: $i18n.get({ id: 'deepDisableDateFunction', dm: '禁用日期函数' }),
      display: 'block',
      tip: {
        content: $i18n.get({ id: 'deepClickToViewThe', dm: '点击查看用法' }),
        url: calendarDisableDate,
      },

      setter: (
        <ActionSetter
          defaultActionName="disabledDate"
          defaultCode={'function disabledDate(date) {}'}
        />
      ),
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      items: [
        uuid('calendar'),
        ...events([
          {
            name: 'onSelect',
            title: $i18n.get({ id: 'deepOnseTelectSelectionDate', dm: 'onSelect 选择日期' }),
            initialValue: `/**
* calendar onSelect
*/
function onSelect(value){
  console.log('onSelect');
}`,
          },

          {
            name: 'onVisibleMonthChange',
            title: $i18n.get({
              id: 'deepOnvisibleMonthchangeMonthlyChange',
              dm: 'onVisibleMonthChange 月份变化',
            }),
            initialValue: `/**
* calendar onVisibleMonthChange
*/
function onVisibleMonthChange(value, reason){
  console.log('onVisibleMonthChange');
}`,
          },

          {
            name: 'onModeChange',
            title: $i18n.get({
              id: 'deepOnmodeChangeDayMonthConvention',
              dm: 'onModeChange 日、月、年面板切换',
            }),
            initialValue: `/**
* calendar onModeChange
*/
function onModeChange(mode){
  console.log('onModeChange');
}`,
          },
        ]),
      ],
    },
  ],
});
