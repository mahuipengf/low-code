import React from 'react'; /* eslint-disable-line */
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  ImageSetter,
  NumberSetter,
  BoolSetter,
  SelectSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import events from '@ali/vu-events-property';
import Icon from './logo.svg';

export default Bundle.createPrototype({
  title: '图片',
  componentName: 'Image',
  category: '基础',
  icon: Icon,
  docUrl: '',
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB10nEur.Y1gK0jSZFCXXcwqXXa-234-230.png',
      label: '图片',
      schema: {
        componentName: 'Image',
        props: {},
      },
    },
  ],
  configure: [
    {
      name: 'src',
      title: '图片地址',
      display: 'inline',
      supportVariable: false,
      initialValue: '',
      setter: <ImageSetter placeholder="支持直接粘贴上传" />,
    },
    {
      name: 'width',
      title: '宽',
      display: 'inline',
      initialValue: '350',
      supportVariable: false,
      setter: <NumberSetter />,
      tip: '宽',
    },
    {
      name: 'autoWidth',
      title: 'auto',
      display: 'inline',
      initialValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
      tip: 'auto',
      hidden() {
        return this.getProps().getPropValue('preview') === true;
      },
    },
    {
      name: 'height',
      title: '高',
      display: 'inline',
      supportVariable: false,
      initialValue: '200',
      setter: <NumberSetter />,
      tip: '宽',
    },
    {
      name: 'autoHeight',
      title: 'auto',
      display: 'inline',
      initialValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
      tip: 'auto',
      hidden() {
        return this.getProps().getPropValue('preview') === true;
      },
    },
    {
      name: 'fit',
      title: '摆放方式',
      display: 'inline',
      initialValue: 'cover',
      supportVariable: false,
      setter: (
        <SelectSetter
          options={[
            {
              title: '铺满 Cover',
              value: 'cover',
            },
            {
              title: '适合 Contain',
              value: 'contain',
            },
            {
              title: '拉伸',
              value: 'fill',
            },
          ]}
        />
      ),
      tip: '摆放方式',
      hidden() {
        return this.getProps().getPropValue('preview') === true;
      },
    },
    {
      name: 'round',
      title: '圆角',
      display: 'inline',
      initialValue: '0',
      supportVariable: false,
      setter: (
        <SelectSetter
          options={[
            {
              title: '大(16px)',
              value: '16',
            },
            {
              title: '中(8px)',
              value: '8',
            },
            {
              title: '小(4px)',
              value: '4',
            },
            {
              title: '无(0px)',
              value: '0',
            },
            {
              title: '自定义',
              value: '自定义',
            },
          ]}
        />
      ),
      tip: '圆角',
      hidden() {
        return this.getProps().getPropValue('preview') === true;
      },
    },
    {
      name: 'roundRadius',
      title: '圆角大小',
      display: 'inline',
      initialValue: '0',
      supportVariable: false,
      setter: <NumberSetter />,
      hidden() {
        return (
          this.getProps().getPropValue('round') !== '自定义' &&
          this.getProps().getPropValue('preview') === true
        );
      },
    },
    style({
      advanced: true,
    }),
    {
      title: '高级',
      type: 'group',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('image'),
        ...events([
          {
            name: 'onClick',
            title: '当点击时',
            initialValue: `/**
* Image onClick
* @param e 点击事件对象
*/
function onClick(e){
  console.log(e);
}`,
          },
        ], { display: 'none' }),
      ],
    },
  ],
});
