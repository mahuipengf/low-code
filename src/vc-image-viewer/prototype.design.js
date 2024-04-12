import React from 'react'; /* eslint-disable-line */
import { Bundle } from '@ali/visualengine';
import {
  JsonSetter, BoolSetter, NumberSetter, TextSetter, ChoiceSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import events from '@ali/vu-events-property';
import Icon from './logo.svg';

export default Bundle.createPrototype({
  title: '图片浏览',
  componentName: 'ImageViewer',
  category: '高级',
  icon: Icon,
  docUrl: '',
  configure: [
    {
      name: 'photos',
      title: '图片数据',
      display: 'block',
      supportVariable: false,
      initialValue: [{
        src: 'https://img.alicdn.com/imgextra/i4/673400424/TB1d2PkKXXXXXbiXXXXXXXXXXXX_!!673400424-0-tstar.jpg',
        title: '图一'
      }, {
        src: 'https://img.alicdn.com/imgextra/i1/673400424/TB1Jze1KXXXXXcfXFXXXXXXXXXX_!!673400424-0-tstar.jpg',
        title: '图二'
      }],
      setter: <JsonSetter />,
    },
    {
      name: 'current',
      title: '当前图片',
      tip: '当前图片索引编号，从 0 开始',
      display: 'inline',
      initialValue: 0,
      supportVariable: false,
      setter: <NumberSetter />,
    },
    {
      name: 'width',
      title: '容器宽度',
      display: 'inline',
      initialValue: '350',
      supportVariable: false,
      setter: <NumberSetter />,
      tip: '图片宽度',
    },
    {
      name: 'height',
      title: '容器高度',
      display: 'inline',
      initialValue: '200',
      supportVariable: false,
      setter: <NumberSetter />,
      tip: '图片宽度',
    },
    {
      name: 'thumbBackground',
      title: '背景颜色',
      display: 'inline',
      initialValue: '#000000',
      supportVariable: false,
      setter: <TextSetter />,
    },
    {
      name: 'enableThumbs',
      title: '显示缩略图',
      display: 'inline',
      initialValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    {
      name: 'thumbPlacement',
      title: '缩略图位置',
      display: 'inline',
      initialValue: 'right',
      supportVariable: false,
      setter: <ChoiceSetter
        options={[
          { title: '顶部', value: 'top' },
          { title: '右侧', value: 'right' },
          { title: '底部', value: 'bottom' },
          { title: '左侧', value: 'left' },
        ]}
      />,
      hidden() {
        return !this.getProps().getPropValue('enableThumbs');
      },
    },
    {
      name: 'enableKeyBoardControl',
      title: '键盘控制',
      display: 'inline',
      initialValue: true,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    {
      name: 'showButton',
      title: '功能按钮',
      tip: '放大状态是否显示缩放翻转功能按钮',
      display: 'inline',
      initialValue: false,
      supportVariable: false,
      setter: <BoolSetter />,
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
        uuid('imageViewer'),
        ...events([
          {
            name: 'onChange',
            title: 'onChange 当图标切换时',
            initialValue: `/**
* ImageViewer onChange
* @param current 当前选中图片索引
*/
function onChange(current){
  console.log(current);
}`,
          },
          {
            name: 'onOpen',
            title: 'onOpen 当大图打开时',
            initialValue: `/**
* ImageViewer onOpen
* @param current 当前选中图片索引
*/
function onOpen(current){
  console.log(current);
}`,
          },
          {
            name: 'onClose',
            title: 'onClose 当大图关闭时',
            initialValue: `/**
* ImageViewer onClose
*/
function onClose(){
  console.log('closed');
}`,
          },
        ], { display: 'none' }),
      ],
    },
  ],
});
