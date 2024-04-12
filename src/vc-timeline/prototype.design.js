
import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  JsonSetter, ChoiceSetter, TextSetter, I18nSetter, ListSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import { timelineDataSource, timelineDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '时间轴',
  componentName: 'Timeline',
  category: '高级',
  icon: Icon,
  docUrl: timelineDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ZjCKu7L0gK0jSZFAXXcA9pXa-112-64.png',
      label: '时间轴',
      schema: {
        componentName: 'Timeline',
        props: {},
      },
    },
  ],
  configure: [{
    name: 'dataSource',
    title: '时间轴数据',
    display: 'block',
    supportVariable: false,
    tip: {
      content: '点击 ？ 查看数据结构',
      url: timelineDataSource,
    },
    initialValue: [
      { title: 'Cloudy', time: '2016-06-10 10:30:00' },
      { title: 'Sunny', time: '2016-06-11' },
      { title: 'Rainy', time: '2016-06-09' },
      { title: 'Receipt', time: '2016-06-08' },
    ],
    required: false,
    setter: <ListSetter
      descriptor="title"
      checkField={null}
      configure={[{
        name: 'title',
        title: '标题',
        display: 'inline',
        setter: I18nSetter,
      }, {
        name: 'time',
        title: '时间',
        display: 'inline',
        setter: TextSetter,
      }, {
        name: 'state',
        title: '状态',
        display: 'inline',
        defaultValue: '',
        setter: <ChoiceSetter
          options={[
            { value: '', title: '无状态' },
            { value: 'process', title: '进行中' },
            { value: 'success', title: '成功' },
            { value: 'error', title: '失败' },
          ]}
        />,
      }, {
        name: 'content',
        title: '内容',
        display: 'inline',
        setter: TextSetter,
      }, {
        name: 'timeLeft',
        title: '时间在左',
        display: 'inline',
        hidden: true,
        setter: TextSetter,
      }, {
        name: 'icon',
        title: '图标名',
        display: 'inline',
        hidden: true,
        setter: TextSetter,
      }]}
    />,
  },
  style({ advanced: true }),
  {
    type: 'group',
    title: '高级',
    display: 'accordion',
    collapsed: true,
    items: [
      uuid('timeline'),
    ],
  }],
});
