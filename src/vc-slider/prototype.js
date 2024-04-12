import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  ListSetter,
  I18nSetter,
  ImageSetter,
  LinkSetter,
  ChoiceSetter,
  BoolSetter,
  NumberSetter,
  JsonSetter,
  ActionSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { sliderDoc, sliderImages } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepBoom', dm: '轮播' }),
  componentName: 'Slider',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  isContainer: true,
  hasSlot: true,
  icon: Icon,
  docUrl: sliderDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1MTowr8v0gK0jSZKbXXbK2FXa-1050-638.png',
      label: $i18n.get({ id: 'deepSingleItem', dm: '单项' }),
      schema: {
        componentName: 'Slider',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1LUEDr8r0gK0jSZFnXXbRRXXa-1034-680.png',
      label: $i18n.get({ id: 'deepMultipleItems', dm: '多项' }),
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
      label: $i18n.get({ id: 'deepVertical', dm: '垂直' }),
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

  configure: [
    {
      name: '__router',
      title: $i18n.get({
        id: 'deepImplicitIncomingTHISUTILS',
        dm: '隐含传入 this.utils.router 供链接跳转使用',
      }),
      display: 'none',
      initialValue: {
        type: 'JSExpression',
        value: 'this.utils.router',
      },
    },

    {
      name: 'isDiy',
      title: $i18n.get({ id: 'deepCustomMode', dm: '自定义模式' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'diyContents',
      title: $i18n.get({ id: 'deepCustomModeData', dm: '自定义模式数据' }),
      display: 'block',
      supportVariable: true,
      initialValue: [],
      setter: <JsonSetter />,
      hidden() {
        return !this.getProps().getPropValue('isDiy');
      },
    },

    {
      name: 'diyContentsRender',
      title: $i18n.get({ id: 'deepCustomModeRendering', dm: '自定义模式渲染' }),
      hidden() {
        return !this.getProps().getPropValue('isDiy');
      },
      setter: (
        <ActionSetter
          defaultCode={$i18n.get({
            id: 'deepSliderRenderDiyContentParamITEM',
            dm:
              '\n/**\n * Slider renderDiyContent\n *\n * @param item 轮播项 item 来自 自定义模式数据\n * @param index 轮播项的索引\n */\nfunction renderDiyContent(item, index) {\n  console.log(item);\n  return <strong> 我是下标为 {index} 的元素</strong>;\n}',
          })}
          defaultActionName="renderDiyContent"
        />
      ),
    },

    {
      name: 'images',
      title: $i18n.get({ id: 'deepRoundPlaying', dm: '轮播项' }),
      supportVariable: true,
      display: 'block',
      tip: {
        content: $i18n.get({
          id: 'deepClickViewTheCorresponding',
          dm: '点击 ? 查看对应的数据结构',
        }),
        url: sliderImages,
      },

      initialValue: [
        {
          src: 'https://img.alicdn.com/tps/TB1bewbNVXXXXc5XXXXXXXXXXXX-1000-300.png',
          title: {
            type: 'i18n',
            zh_CN: '图片一',
            en_US: 'Picture one',
          },
        },

        {
          src: 'https://img.alicdn.com/tps/TB1xuUcNVXXXXcRXXXXXXXXXXXX-1000-300.jpg',
          title: {
            type: 'i18n',
            zh_CN: '图片二',
            en_US: 'Picture two',
          },
        },

        {
          src: 'https://img.alicdn.com/tps/TB1s1_JNVXXXXbhaXXXXXXXXXXX-1000-300.jpg',
          title: {
            type: 'i18n',
            zh_CN: '图片三',
            en_US: 'Picture three',
          },
        },

        {
          src: 'https://img.alicdn.com/tps/TB1ikP.NVXXXXaYXpXXXXXXXXXX-1000-300.jpg',
          title: {
            type: 'i18n',
            zh_CN: '图片四',
            en_US: 'Picture four',
          },
        },
      ],

      setter: (
        <ListSetter
          display="entry"
          descriptor="title"
          checkField={null}
          configure={[
            {
              name: 'title',
              title: $i18n.get({ id: 'deepPictureTitle', dm: '图片标题' }),
              defaultValue: {
                zh_CN: '图片项',
                en_US: 'Picture Item',
                type: 'i18n',
              },

              display: 'inline',
              setter: I18nSetter,
            },
            {
              name: 'src',
              title: $i18n.get({ id: 'deepTheMapSAddress', dm: '图片地址' }),
              display: 'inline',
              setter: (
                <ImageSetter
                  showPanel={false}
                  placeholder={$i18n.get({
                    id: 'deepSupportDirectPasteTo',
                    dm: '支持直接粘贴上传',
                  })}
                />
              ),
            },
            {
              name: 'link',
              title: $i18n.get({ id: 'deepLink', dm: '链接' }),
              display: 'block',
              setter: <LinkSetter />,
            },
          ]}
        />
      ),

      hidden() {
        return !!this.getProps().getPropValue('isDiy');
      },
    },

    {
      name: 'type',
      title: $i18n.get({ id: 'deepTypesOf', dm: '类型' }),
      display: 'inline',
      initialValue: 'single',
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepSingleRotation', dm: '单项轮播' }), value: 'single' },
            { title: $i18n.get({ id: 'deepMultiRounded', dm: '多项轮播' }), value: 'multi' },
          ]}
        />
      ),
    },
    {
      name: 'defaultActiveIndex',
      title: $i18n.get({ id: 'deepSliderDefaultActiveIndex', dm: '初始被激活的轮播图' }),
      display: 'block',
      initialValue: 0,
      supportVariable: true,
      setter: <NumberSetter />,
    },

    {
      name: 'slideImageWidth',
      title: $i18n.get({ id: 'deepRoundPlayingWidth', dm: '轮播项宽度' }),
      display: 'block',
      initialValue: '100%',
      hidden: true,
      setter: <TextSetter />,
    },

    {
      name: 'slideImageHeightAuto',
      title: $i18n.get({
        id: 'deepRoundcarIsHighlyAdaptive',
        dm: '轮播项高度自适应（图片时会保持长宽比）',
      }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'slideImageHeight',
      title: $i18n.get({ id: 'deepRoundPlayingHeight', dm: '轮播项高度' }),
      display: 'block',
      initialValue: 300,
      hidden() {
        return this.getProps().getPropValue('slideImageHeightAuto');
      },
      setter: (
        <NumberSetter
          units={[
            {
              type: 'px',
              list: true,
            },
            {
              type: '%',
              list: true,
            },
          ]}
        />
      ),
    },

    {
      name: 'slidesToShow',
      title: $i18n.get({ id: 'deepNumberOfRotationOptions', dm: '同时展示的轮播项数量' }),
      display: 'block',
      initialValue: 2,
      hidden() {
        return this.getProps().getPropValue('type') === 'single';
      },
      setter: <NumberSetter />,
    },

    {
      name: 'slidesToScroll',
      title: $i18n.get({ id: 'deepNumberOfRotationItems', dm: '同时滑动的轮播项数量' }),
      display: 'block',
      initialValue: 1,
      hidden() {
        return this.getProps().getPropValue('type') === 'single';
      },
      setter: <NumberSetter />,
    },

    {
      name: 'centerMode',
      title: $i18n.get({ id: 'deepCenterMode', dm: '居中模式' }),
      display: 'block',
      initialValue: false,
      hidden() {
        return this.getProps().getPropValue('type') === 'single';
      },
      setter: <BoolSetter />,
    },

    {
      name: 'focusOnSelect',
      title: $i18n.get({ id: 'deepWhenYouHaveA', dm: '多项轮播时，点击选中后自动居中' }),
      display: 'block',
      initialValue: false,
      hidden() {
        return !this.getProps().getPropValue('centerMode');
      },
      setter: <BoolSetter />,
    },

    {
      name: 'margin',
      title: $i18n.get({ id: 'deepRoundcarUnitSpacing', dm: '轮播项间距' }),
      display: 'block',
      initialValue: 10,
      setter: <NumberSetter />,
    },

    {
      name: 'slideDirection',
      title: $i18n.get({ id: 'deepDirectionOfRotation', dm: '轮播方向' }),
      display: 'inline',
      initialValue: 'hoz',
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepLevel', dm: '水平' }), value: 'hoz' },
            { title: $i18n.get({ id: 'deepVertical', dm: '垂直' }), value: 'ver' },
          ]}
        />
      ),
    },

    {
      name: 'speed',
      title: $i18n.get({ id: 'deepRunningSpeed', dm: '轮播速度' }),
      display: 'inline',
      initialValue: 500,
      setter: <NumberSetter placeholder="ms" />,
    },

    {
      name: 'lazyLoad',
      title: $i18n.get({ id: 'deepLazyLoading', dm: '懒加载' }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'animation',
      title: $i18n.get({ id: 'deepMotionType', dm: '动效类型' }),
      display: 'inline',
      initialValue: 'slide',
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepSlideLeftAndRight', dm: '左右滑动' }), value: 'slide' },
            { title: $i18n.get({ id: 'deepGradient', dm: '渐变' }), value: 'fade' },
          ]}
        />
      ),
    },

    {
      name: 'arrows',
      title: $i18n.get({ id: 'deepArrow', dm: '箭头' }),
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'arrowSize',
      title: $i18n.get({ id: 'deepArrowSize', dm: '箭头大小' }),
      display: 'inline',
      initialValue: 'medium',
      hidden() {
        return !this.getProps().getPropValue('arrows');
      },
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepIn', dm: '中' }),
              value: 'medium',
              tip: $i18n.get({ id: 'deepNormalSize', dm: '正常尺寸' }),
            },
            {
              title: $i18n.get({ id: 'deepBig', dm: '大' }),
              value: 'large',
              tip: $i18n.get({ id: 'deepLargeSize', dm: '大号尺寸' }),
            },
          ]}
        />
      ),
    },

    {
      name: 'arrowPosition',
      title: $i18n.get({ id: 'deepArrowPosition', dm: '箭头位置' }),
      display: 'inline',
      initialValue: 'inner',
      hidden() {
        return !this.getProps().getPropValue('arrows');
      },
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepInside', dm: '内' }), value: 'inner' },
            { title: $i18n.get({ id: 'deepOuter', dm: '外' }), value: 'outer' },
          ]}
        />
      ),
    },

    {
      name: 'arrowDirection',
      title: $i18n.get({ id: 'deepArrowDirection', dm: '箭头方向' }),
      display: 'inline',
      initialValue: 'hoz',
      hidden() {
        return !this.getProps().getPropValue('arrows');
      },
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepLevel', dm: '水平' }), value: 'hoz' },
            { title: $i18n.get({ id: 'deepVertical', dm: '垂直' }), value: 'ver' },
          ]}
        />
      ),
    },

    {
      name: 'autoplay',
      title: $i18n.get({ id: 'deepAutoplay', dm: '自动播放' }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'autoplaySpeed',
      title: $i18n.get({ id: 'deepAutomaticPlaybackSpeed', dm: '自动播放的速度' }),
      display: 'block',
      initialValue: 3000,
      hidden() {
        return !this.getProps().getPropValue('autoplay');
      },
      setter: <NumberSetter placeholder="ms" />,
    },

    {
      name: 'dots',
      title: $i18n.get({ id: 'deepNavigationAnchorPoint', dm: '导航锚点' }),
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'dotsDirection',
      title: $i18n.get({ id: 'deepNavigationAnchorPosition', dm: '导航锚点位置' }),
      display: 'block',
      initialValue: 'hoz',
      hidden() {
        return !this.getProps().getPropValue('dots');
      },
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepLevel', dm: '水平' }), value: 'hoz' },
            { title: $i18n.get({ id: 'deepVertical', dm: '垂直' }), value: 'ver' },
          ]}
        />
      ),
    },

    {
      name: 'triggerType',
      title: $i18n.get({ id: 'deepAnchorNavigationTriggerMethod', dm: '锚点导航触发方式' }),
      display: 'block',
      initialValue: 'click',
      hidden() {
        return !this.getProps().getPropValue('dots');
      },
      setter: (
        <ChoiceSetter
          options={[
            { title: 'click', value: 'click' },
            { title: 'hover', value: 'hover' },
          ]}
        />
      ),
    },

    style({
      advanced: true,
    }),

    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('slider'),
        ...events([
          {
            name: 'onChange',
            title: $i18n.get({ id: 'deepONCHANGERMBSwitch', dm: 'onChange 轮播切换' }),
            initialValue: `
/**
 * Slider onChange
 * @param index 轮播项的索引
 */
function onChange(index) {
  console.log(index);
}`,
          },
        ]),
      ],
    },
  ],
});
