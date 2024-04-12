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
import $i18n from '../i18n/index';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepImage', dm: '图片' }),
  componentName: 'Image',
  category: $i18n.get({ id: 'deepBasis', dm: '基础' }),
  icon: Icon,
  docUrl: '',
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB10nEur.Y1gK0jSZFCXXcwqXXa-234-230.png',
      label: $i18n.get({ id: 'deepImage', dm: '图片' }),
      schema: {
        componentName: 'Image',
        props: {},
      },
    },
  ],

  configure: [
    {
      name: 'src',
      title: $i18n.get({ id: 'deepTheMapSAddress', dm: '图片地址' }),
      display: 'inline',
      supportVariable: true,
      initialValue: '',
      setter: (
        <ImageSetter
          placeholder={$i18n.get({ id: 'deepSupportDirectPasteTo', dm: '支持直接粘贴上传' })}
        />
      ),
    },

    {
      name: 'width',
      title: $i18n.get({ id: 'deepWidth', dm: '宽' }),
      display: 'inline',
      initialValue: '350',
      supportVariable: true,
      setter: <NumberSetter />,
      tip: $i18n.get({ id: 'deepWidth', dm: '宽' }),
    },

    {
      name: 'autoWidth',
      title: 'auto',
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
      tip: 'auto',
      hidden() {
        return this.getProps().getPropValue('preview') === true;
      },
    },

    {
      name: 'height',
      title: $i18n.get({ id: 'deepHigh', dm: '高' }),
      display: 'inline',
      supportVariable: true,
      initialValue: '200',
      setter: <NumberSetter />,
      tip: $i18n.get({ id: 'deepWidth', dm: '宽' }),
    },

    {
      name: 'autoHeight',
      title: 'auto',
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
      tip: 'auto',
      hidden() {
        return this.getProps().getPropValue('preview') === true;
      },
    },

    {
      name: 'fit',
      title: $i18n.get({ id: 'deepPlacementMethod', dm: '摆放方式' }),
      display: 'inline',
      initialValue: 'cover',
      supportVariable: true,
      setter: (
        <SelectSetter
          options={[
            {
              title: $i18n.get({ id: 'deepCover', dm: '铺满 Cover' }),
              value: 'cover',
            },

            {
              title: $i18n.get({ id: 'deepSuitableContain', dm: '适合 Contain' }),
              value: 'contain',
            },

            {
              title: $i18n.get({ id: 'deepStretch', dm: '拉伸' }),
              value: 'fill',
            },
          ]}
        />
      ),

      tip: $i18n.get({ id: 'deepPlacementMethod', dm: '摆放方式' }),
      hidden() {
        return this.getProps().getPropValue('preview') === true;
      },
    },

    {
      name: 'round',
      title: $i18n.get({ id: 'deepRound', dm: '圆角' }),
      display: 'inline',
      initialValue: '0',
      supportVariable: true,
      setter: (
        <SelectSetter
          options={[
            {
              title: $i18n.get({ id: 'deepBigPx', dm: '大(16px)' }),
              value: '16',
            },

            {
              title: $i18n.get({ id: 'deepMediumPx', dm: '中(8px)' }),
              value: '8',
            },

            {
              title: $i18n.get({ id: 'deepSmallPx', dm: '小(4px)' }),
              value: '4',
            },

            {
              title: $i18n.get({ id: 'deepNoPx', dm: '无(0px)' }),
              value: '0',
            },

            {
              title: $i18n.get({ id: 'deepCustomize', dm: '自定义' }),
              value: $i18n.get({ id: 'deepCustomize', dm: '自定义' }),
            },
          ]}
        />
      ),

      tip: $i18n.get({ id: 'deepRound', dm: '圆角' }),
      hidden() {
        return this.getProps().getPropValue('preview') === true;
      },
    },

    {
      name: 'roundRadius',
      title: $i18n.get({ id: 'deepRounded', dm: '圆角大小' }),
      display: 'inline',
      initialValue: '0',
      supportVariable: true,
      setter: <NumberSetter />,
      hidden() {
        return (
          this.getProps().getPropValue('round') !==
            $i18n.get({ id: 'deepCustomize', dm: '自定义' }) &&
          this.getProps().getPropValue('preview') === true
        );
      },
    },

    {
      name: 'title',
      title: 'title',
      display: 'inline',
      supportVariable: true,
      setter: <TextSetter />,
      tip: $i18n.get({ id: 'deepHTMLNativeTitle', dm: 'html 原生 title' }),
    },

    {
      name: 'alt',
      title: $i18n.get({ id: 'deepAlternativeText', dm: '替代文本' }),
      display: 'inline',
      initialValue: 'Image 404',
      supportVariable: true,
      setter: <TextSetter />,
      tip: $i18n.get({ id: 'deepImageLoadFailedPlacement', dm: '图片加载失败的占位文字' }),
    },

    {
      name: 'preview',
      title: $i18n.get({ id: 'deepOpenImagePreview', dm: '开启图片预览' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
      tip: $i18n.get({ id: 'deepOpenImagePreview', dm: '开启图片预览' }),
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
        uuid('image'),
        ...events([
          {
            name: 'onClick',
            title: $i18n.get({ id: 'deepWhenYouClick', dm: '当点击时' }),
            initialValue: `/**
* Image onClick
* @param e 点击事件对象
*/
function onClick(e){
  console.log(e);
}`,
          },
        ]),
      ],
    },
  ],
});
