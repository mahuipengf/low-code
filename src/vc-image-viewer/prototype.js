import React from 'react'; /* eslint-disable-line */
import { Bundle } from '@ali/visualengine';
import {
  JsonSetter,
  BoolSetter,
  NumberSetter,
  TextSetter,
  ChoiceSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import events from '@ali/vu-events-property';
import Icon from './logo.svg';
import $i18n from '../i18n/index';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepPictureViewer', dm: '图片浏览' }),
  componentName: 'ImageViewer',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: '',
  configure: [
    {
      name: 'photos',
      title: $i18n.get({ id: 'deepPictureData', dm: '图片数据' }),
      display: 'block',
      supportVariable: true,
      initialValue: [
        {
          src:
            'https://img.alicdn.com/imgextra/i4/673400424/TB1d2PkKXXXXXbiXXXXXXXXXXXX_!!673400424-0-tstar.jpg',
          title: $i18n.get({ id: 'deepFigureOne', dm: '图一' }),
        },
        {
          src:
            'https://img.alicdn.com/imgextra/i1/673400424/TB1Jze1KXXXXXcfXFXXXXXXXXXX_!!673400424-0-tstar.jpg',
          title: $i18n.get({ id: 'deepFigureII', dm: '图二' }),
        },
      ],

      setter: <JsonSetter />,
    },

    {
      name: 'current',
      title: $i18n.get({ id: 'deepCurrentPicture', dm: '当前图片' }),
      tip: $i18n.get({ id: 'deepCurrentImageIndexNumber', dm: '当前图片索引编号，从 0 开始' }),
      display: 'inline',
      initialValue: 0,
      supportVariable: true,
      setter: <NumberSetter />,
    },

    {
      name: 'width',
      title: $i18n.get({ id: 'deepContainerWidth', dm: '容器宽度' }),
      display: 'inline',
      initialValue: '350',
      supportVariable: true,
      setter: <NumberSetter />,
      tip: $i18n.get({ id: 'deepPictureWidth', dm: '图片宽度' }),
    },

    {
      name: 'height',
      title: $i18n.get({ id: 'deepContainerHeight', dm: '容器高度' }),
      display: 'inline',
      initialValue: '200',
      supportVariable: true,
      setter: <NumberSetter />,
      tip: $i18n.get({ id: 'deepPictureWidth', dm: '图片宽度' }),
    },

    {
      name: 'thumbBackground',
      title: $i18n.get({ id: 'deepBackgroundColor', dm: '背景颜色' }),
      display: 'inline',
      initialValue: '#000000',
      supportVariable: true,
      setter: <TextSetter />,
    },

    {
      name: 'enableThumbs',
      title: $i18n.get({ id: 'deepDisplayThumbnail', dm: '显示缩略图' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'thumbPlacement',
      title: $i18n.get({ id: 'deepThumbnailPosition', dm: '缩略图位置' }),
      display: 'inline',
      initialValue: 'right',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepTop', dm: '顶部' }), value: 'top' },
            { title: $i18n.get({ id: 'deepRight', dm: '右侧' }), value: 'right' },
            { title: $i18n.get({ id: 'deepBottom', dm: '底部' }), value: 'bottom' },
            { title: $i18n.get({ id: 'deepLeftSide', dm: '左侧' }), value: 'left' },
          ]}
        />
      ),

      hidden() {
        return !this.getProps().getPropValue('enableThumbs');
      },
    },

    {
      name: 'enableKeyBoardControl',
      title: $i18n.get({ id: 'deepKeyboardControl', dm: '键盘控制' }),
      display: 'inline',
      initialValue: true,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'showButton',
      title: $i18n.get({ id: 'deepFunctionButtons', dm: '功能按钮' }),
      tip: $i18n.get({ id: 'deepTheZoomStatusIs', dm: '放大状态是否显示缩放翻转功能按钮' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    style({
      advanced: true,
    }),

    {
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      type: 'group',
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('imageViewer'),
        ...events([
          {
            name: 'onChange',
            title: $i18n.get({ id: 'deepONCHANGEWhenICan', dm: 'onChange 当图标切换时' }),
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
            title: $i18n.get({ id: 'deepONOPENWhenTheBig', dm: 'onOpen 当大图打开时' }),
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
            title: $i18n.get({ id: 'deepOnCloseWhenTheBig', dm: 'onClose 当大图关闭时' }),
            initialValue: `/**
* ImageViewer onClose
*/
function onClose(){
  console.log('closed');
}`,
          },
        ]),
      ],
    },
  ],
});
