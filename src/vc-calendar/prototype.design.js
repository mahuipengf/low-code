
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ChoiceSetter,
  BoolSetter,
  ActionSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import DatePickerSetter from '../common/vs-fusion-date-picker';
import Icon from './logo.svg';
import { calendarDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '日历',
  componentName: 'Calendar',
  category: '高级',
  icon: Icon,
  docUrl: calendarDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB158yMu4v1gK0jSZFFXXb0sXXa-112-64.png',
      label: '卡片型',
      schema: {
        componentName: 'Calendar',
        props: {
          shape: 'card',
        },
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1PRmJu7P2gK0jSZPxXXacQpXa-112-64.png',
      label: '面板型',
      schema: {
        componentName: 'Calendar',
        props: {
          shape: 'panel',
        },
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB10JuKu.T1gK0jSZFhXXaAtVXa-112-64.png',
      label: '全屏型',
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
      title: '语言',
      display: 'inline',
      initialValue: 'zh-cn',
      supportVariable: false,
      setter: (
        <ChoiceSetter
          options={[
            {
              title: '中文',
              value: 'zh-cn',
              tip: 'zh-cn',
            }, {
              title: '英文',
              value: 'en',
              tip: 'en',
            }]}
          compact={false}
        />
      ),
    },
    {
      name: 'shape',
      title: '展现形态',
      display: 'inline',
      initialValue: 'fullscreen',
      supportVariable: false,
      setter: <ChoiceSetter options={[
        { title: 'card', value: 'card' },
        { title: 'fullscreen', value: 'fullscreen' },
        { title: 'panel', value: 'panel', tip: '通常用于弹层容器' },
      ]}
      />,
    },
    {
      name: 'showOtherMonth',
      title: '展示非本月的日期',
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'defaultDate',
      title: '默认日期',
      supportVariable: false,
      display: 'inline',
      setter: <DatePickerSetter type="DatePicker" format="YYYY-MM-DD" showTime={false} />,
    },
    {
      name: 'defaultMonth',
      title: '默认月份',
      supportVariable: false,
      display: 'inline',
      setter: <DatePickerSetter type="MonthPicker" format="YYYY-MM" />,
    },
    style({ advanced: true }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('calendar'),
        ...events([
          {
            name: 'onSelect',
            title: 'onSelect 选择日期',
            initialValue: `/**
* calendar onSelect
*/
function onSelect(value){
  console.log('onSelect');
}`,
          },
          {
            name: 'onVisibleMonthChange',
            title: 'onVisibleMonthChange 月份变化',
            initialValue: `/**
* calendar onVisibleMonthChange
*/
function onVisibleMonthChange(value, reason){
  console.log('onVisibleMonthChange');
}`,
          },
          {
            name: 'onModeChange',
            title: 'onModeChange 日、月、年面板切换',
            initialValue: `/**
* calendar onModeChange
*/
function onModeChange(mode){
  console.log('onModeChange');
}`,
          },
        ], { display: 'none' }),
      ],
    },
  ],
});
