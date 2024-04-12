
import React from 'react';
import { Bundle } from '@ali/visualengine';
import { I18nSetter, ChoiceSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '段落',
  componentName: 'Paragraph',
  category: '基础', // 暂时不显示该组件
  icon: Icon,
  docUrl: '',
  configure: [{
    name: 'content',
    title: '内容',
    display: 'block',
    initialValue: {
      zh_CN: '人最宝贵的是生命。它给予我们只有一次。人的一生应当这样度过：当他回首往事时不因虚度年华而悔恨，也不因碌碌无为而羞耻。这样在他临死的时侯就能够说:我已把我整个的生命和全部精力都献给最壮丽的事业——为人类的解放而斗争。',
      en_US: 'Mans dearest possession is life. It is given to him but once, and he must live it so as to feel no torturing regrets for wasted years, never know the burning shame of a mean and petty past; so live that, dying, he might say: all my life, all my strength were given to the finest cause in all the world——the fight for the Liberation of Mankind.',
      type: 'i18n',
    },
    supportVariable: false,
    setter: <I18nSetter placeholder="请输入" />,
  },
  {
    name: 'size',
    title: '尺寸',
    display: 'block',
    initialValue: 'medium',
    setter: (
      <ChoiceSetter
        options={[{
          title: '小',
          value: 'small',
          tip: '小尺寸',
        }, {
          title: '中',
          value: 'medium',
          tip: '正常尺寸',
        }]}
        compact={false}
      />
    ),
  },
  {
    name: 'type',
    title: '展示段落的方式',
    display: 'block',
    initialValue: 'long',
    setter: <ChoiceSetter options={[
      { title: 'long', value: 'long', tip: '展示所有文本' },
      { title: 'short', value: 'short', tip: '展示三行以内（非强制)' },
    ]}
    />,
  },
  style({ advanced: true }),
  {
    type: 'group',
    title: '高级',
    display: 'accordion',
    collapsed: true,
    items: [
      uuid('paragraph'),
    ],
  }],
});
