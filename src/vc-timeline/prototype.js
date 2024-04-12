import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  JsonSetter,
  ChoiceSetter,
  TextSetter,
  I18nSetter,
  ListSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { timelineDataSource, timelineDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepTimeline', dm: '时间轴' }),
  componentName: 'Timeline',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: timelineDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ZjCKu7L0gK0jSZFAXXcA9pXa-112-64.png',
      label: $i18n.get({ id: 'deepTimeline', dm: '时间轴' }),
      schema: {
        componentName: 'Timeline',
        props: {},
      },
    },
  ],

  configure: [
    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepTimelineData', dm: '时间轴数据' }),
      display: 'block',
      supportVariable: true,
      tip: {
        content: $i18n.get({ id: 'deepClickViewDataStructure', dm: '点击 ？ 查看数据结构' }),
        url: timelineDataSource,
      },

      initialValue: [
        { title: 'Cloudy', time: '2016-06-10 10:30:00' },
        { title: 'Sunny', time: '2016-06-11' },
        { title: 'Rainy', time: '2016-06-09' },
        { title: 'Receipt', time: '2016-06-08' },
      ],

      required: false,
      setter: (
        <ListSetter
          descriptor="title"
          checkField={null}
          configure={[
            {
              name: 'title',
              title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
              display: 'inline',
              setter: I18nSetter,
            },
            {
              name: 'time',
              title: $i18n.get({ id: 'deepTime', dm: '时间' }),
              display: 'inline',
              setter: TextSetter,
            },
            {
              name: 'state',
              title: $i18n.get({ id: 'deepStatus', dm: '状态' }),
              display: 'inline',
              defaultValue: '',
              setter: (
                <ChoiceSetter
                  options={[
                    { value: '', title: $i18n.get({ id: 'deepNoStatus', dm: '无状态' }) },
                    { value: 'process', title: $i18n.get({ id: 'deepProcessing', dm: '进行中' }) },
                    { value: 'success', title: $i18n.get({ id: 'deepSuccess', dm: '成功' }) },
                    { value: 'error', title: $i18n.get({ id: 'deepFailure', dm: '失败' }) },
                  ]}
                />
              ),
            },

            {
              name: 'content',
              title: $i18n.get({ id: 'deepContent', dm: '内容' }),
              display: 'inline',
              setter: TextSetter,
            },
            {
              name: 'timeLeft',
              title: $i18n.get({ id: 'deepTimeIsLeft', dm: '时间在左' }),
              display: 'inline',
              hidden: true,
              setter: TextSetter,
            },
            {
              name: 'icon',
              title: $i18n.get({ id: 'deepIconName', dm: '图标名' }),
              display: 'inline',
              hidden: true,
              setter: TextSetter,
            },
          ]}
        />
      ),
    },

    {
      name: 'fold',
      title: $i18n.get({ id: 'deepFoldingConfiguration', dm: '折叠配置' }),
      display: 'block',
      supportVariable: true,
      tip: {
        content: $i18n.get({ id: 'deepClickViewDataStructure', dm: '点击 ？ 查看数据结构' }),
        url: timelineDataSource,
      },

      initialValue: [{ foldArea: [1, 2], foldShow: false }],

      required: false,
      setter: <JsonSetter />,
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      items: [uuid('timeline')],
    },
  ],
});
