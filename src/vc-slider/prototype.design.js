import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter, ListSetter, I18nSetter, ImageSetter, LinkSetter, ChoiceSetter, BoolSetter,
  NumberSetter, JsonSetter, ActionSetter
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import { sliderDoc, sliderImages } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '轮播',
  componentName: 'Slider',
  category: '高级',
  isContainer: true,
  hasSlot: true,
  icon: Icon,
  docUrl: sliderDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1MTowr8v0gK0jSZKbXXbK2FXa-1050-638.png',
      label: '单项',
      schema: {
        componentName: 'Slider',
        props: {},
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1LUEDr8r0gK0jSZFnXXbRRXXa-1034-680.png',
      label: '多项',
      schema: {
        componentName: 'Slider',
        props: {
          type: 'multi',
          slidesToShow: 2,
        },
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1NwZBrYH1gK0jSZFwXXc7aXXa-1056-656.png',
      label: '垂直',
      schema: {
        componentName: 'Slider',
        props: {
          slideDirection: 'ver',
          arrowDirection: 'ver',
          dotsDirection: 'ver',
        },
      },
    },
  ],
  configure: [{
    name: '__router',
    title: '隐含传入 this.utils.router 供链接跳转使用',
    display: 'none',
    initialValue: {
      type: 'JSExpression',
      value: 'this.utils.router',
    },
  },{
    name: 'isDiy',
    title: '自定义模式',
    display: 'block',
    initialValue: false,
    setter: <BoolSetter />,
  }, {
    name: 'diyContents',
    title: '自定义模式数据',
    display: 'block',
    supportVariable: false,
    initialValue: [],
    setter: <JsonSetter />,
    hidden() {
      return !this.getProps().getPropValue('isDiy');
    },
  },
  {
    name: 'diyContentsRender',
    title: '自定义模式渲染',
    hidden() {
      return !this.getProps().getPropValue('isDiy');
    },
    setter:
    <ActionSetter
      defaultCode={`
/**
 * Slider renderDiyContent
 *
 * @param item 轮播项 item 来自 自定义模式数据
 * @param index 轮播项的索引
 */
function renderDiyContent(item, index) {
  console.log(item);
  return <strong> 我是下标为 {index} 的元素</strong>;
}`}
    defaultActionName="renderDiyContent"
    />,
  },{
    name: 'images',
    title: '轮播项',
    supportVariable: false,
    display: 'block',
    tip: {
      content: '点击 ? 查看对应的数据结构',
      url: sliderImages,
    },
    initialValue: [{
      src: 'https://img.alicdn.com/tps/TB1bewbNVXXXXc5XXXXXXXXXXXX-1000-300.png',
      title: {
        type: 'i18n',
        zh_CN: '图片一',
        en_US: 'Picture one',
      },
    }, {
      src: 'https://img.alicdn.com/tps/TB1xuUcNVXXXXcRXXXXXXXXXXXX-1000-300.jpg',
      title: {
        type: 'i18n',
        zh_CN: '图片二',
        en_US: 'Picture two',
      },
    }, {
      src: 'https://img.alicdn.com/tps/TB1s1_JNVXXXXbhaXXXXXXXXXXX-1000-300.jpg',
      title: {
        type: 'i18n',
        zh_CN: '图片三',
        en_US: 'Picture three',
      },
    }, {
      src: 'https://img.alicdn.com/tps/TB1ikP.NVXXXXaYXpXXXXXXXXXX-1000-300.jpg',
      title: {
        type: 'i18n',
        zh_CN: '图片四',
        en_US: 'Picture four',
      },
    }],
    setter: (<ListSetter
      display="entry"
      descriptor="title"
      checkField={null}
      configure={[{
        name: 'title',
        title: '图片标题',
        defaultValue: {
          zh_CN: '图片项', en_US: 'Picture Item', type: 'i18n',
        },
        display: 'inline',
        setter: I18nSetter,
      }, {
        name: 'src',
        title: '图片地址',
        display: 'inline',
        setter: <ImageSetter showPanel={false} placeholder="支持直接粘贴上传" />,
      }, {
        name: 'link',
        title: '链接',
        display: 'block',
        setter: <LinkSetter />,
      }]}
    />),
    hidden() {
      return !!this.getProps().getPropValue('isDiy');
    },
  },
  {
    name: 'type',
    title: '类型',
    display: 'inline',
    initialValue: 'single',
    setter: <ChoiceSetter options={[
      { title: '单项轮播', value: 'single' },
      { title: '多项轮播', value: 'multi' },
    ]}
    />,
  },
  {
    name: 'slideImageWidth',
    title: '轮播项宽度',
    display: 'block',
    initialValue: '100%',
    hidden: true,
    setter: <TextSetter />,
  },
  {
    name: 'slideImageHeightAuto',
    title: '轮播项高度自适应（图片时会保持长宽比）',
    display: 'block',
    initialValue: false,
    setter: <BoolSetter />,
  },
  {
    name: 'slideImageHeight',
    title: '轮播项高度',
    display: 'block',
    initialValue: 300,
    hidden() {
      return this.getProps().getPropValue('slideImageHeightAuto');
    },
    setter: <NumberSetter
      units={[{
        type: 'px',
        list: true,
      }, {
        type: '%',
        list: true,
      }]}
    />,
  },
  {
    name: 'slidesToShow',
    title: '同时展示的轮播项数量',
    display: 'block',
    initialValue: 2,
    hidden() {
      return (this.getProps().getPropValue('type') === 'single');
    },
    setter: <NumberSetter />,
  },
  {
    name: 'slidesToScroll',
    title: '同时滑动的轮播项数量',
    display: 'block',
    initialValue: 1,
    hidden() {
      return (this.getProps().getPropValue('type') === 'single');
    },
    setter: <NumberSetter />,
  },
  {
    name: 'centerMode',
    title: '居中模式',
    display: 'block',
    initialValue: false,
    hidden() {
      return (this.getProps().getPropValue('type') === 'single');
    },
    setter: <BoolSetter />,
  },
  {
    name: 'focusOnSelect',
    title: '多项轮播时，点击选中后自动居中',
    display: 'block',
    initialValue: false,
    hidden() {
      return !this.getProps().getPropValue('centerMode');
    },
    setter: <BoolSetter />,
  },
  {
    name: 'margin',
    title: '轮播项间距',
    display: 'block',
    initialValue: 10,
    setter: <NumberSetter />,
  },
  {
    name: 'slideDirection',
    title: '轮播方向',
    display: 'inline',
    initialValue: 'hoz',
    setter: <ChoiceSetter options={[
      { title: '水平', value: 'hoz' },
      { title: '垂直', value: 'ver' },
    ]}
    />,
  },
  {
    name: 'speed',
    title: '轮播速度',
    display: 'inline',
    initialValue: 500,
    setter: <NumberSetter placeholder="ms" />,
  },
  {
    name: 'lazyLoad',
    title: '懒加载',
    display: 'inline',
    initialValue: false,
    setter: <BoolSetter />,
  },
  {
    name: 'animation',
    title: '动效类型',
    display: 'inline',
    initialValue: 'slide',
    setter: <ChoiceSetter options={[
      { title: '左右滑动', value: 'slide' },
      { title: '渐变', value: 'fade' },
    ]}
    />,
  },
  {
    name: 'arrows',
    title: '箭头',
    display: 'inline',
    initialValue: true,
    setter: <BoolSetter />,
  },
  {
    name: 'arrowSize',
    title: '箭头大小',
    display: 'inline',
    initialValue: 'medium',
    hidden() {
      return !this.getProps().getPropValue('arrows');
    },
    setter: <ChoiceSetter options={[
      { title: '中', value: 'medium', tip: '正常尺寸' },
      { title: '大', value: 'large', tip: '大号尺寸' },
    ]}
    />,
  },
  {
    name: 'arrowPosition',
    title: '箭头位置',
    display: 'inline',
    initialValue: 'inner',
    hidden() {
      return !this.getProps().getPropValue('arrows');
    },
    setter: <ChoiceSetter options={[
      { title: '内', value: 'inner' },
      { title: '外', value: 'outer' },
    ]}
    />,
  },
  {
    name: 'arrowDirection',
    title: '箭头方向',
    display: 'inline',
    initialValue: 'hoz',
    hidden() {
      return !this.getProps().getPropValue('arrows');
    },
    setter: <ChoiceSetter options={[
      { title: '水平', value: 'hoz' },
      { title: '垂直', value: 'ver' },
    ]}
    />,
  },
  {
    name: 'autoplay',
    title: '自动播放',
    display: 'inline',
    initialValue: false,
    setter: <BoolSetter />,
  },
  {
    name: 'autoplaySpeed',
    title: '自动播放的速度',
    display: 'block',
    initialValue: 3000,
    hidden() {
      return !this.getProps().getPropValue('autoplay');
    },
    setter: <NumberSetter placeholder="ms" />,
  },
  {
    name: 'dots',
    title: '导航锚点',
    display: 'inline',
    initialValue: true,
    setter: <BoolSetter />,
  },
  {
    name: 'dotsDirection',
    title: '导航锚点位置',
    display: 'block',
    initialValue: 'hoz',
    hidden() {
      return !this.getProps().getPropValue('dots');
    },
    setter: <ChoiceSetter options={[
      { title: '水平', value: 'hoz' },
      { title: '垂直', value: 'ver' },
    ]}
    />,
  },
  {
    name: 'triggerType',
    title: '锚点导航触发方式',
    display: 'block',
    initialValue: 'click',
    hidden() {
      return !this.getProps().getPropValue('dots');
    },
    setter: <ChoiceSetter options={[
      { title: 'click', value: 'click' },
      { title: 'hover', value: 'hover' },
    ]}
    />,
  },
  style({
    advanced: true,
  }),
  {
    type: 'group',
    title: '高级',
    display: 'accordion',
    collapsed: true,
    items: [
      uuid('slider'),
      ...events([
        {
          name: 'onChange', title: 'onChange 轮播切换', initialValue: `
/**
 * Slider onChange
 * @param index 轮播项的索引
 */
function onChange(index) {
  console.log(index);
}`,
        },
      ], { display: 'none' }),
    ],
  }],
});
