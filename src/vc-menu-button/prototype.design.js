import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  JsonSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import FusionIconSetter from '../common/vs-fusion-icon/index';
import {
  size,
  iconSize,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '菜单按钮',
  componentName: 'MenuButton',
  // 高级 | 其他
  category: null, // 暂时不显示该组件
  icon: Icon,
  docUrl: '',
  configure: [
    {
      name: 'dataSource',
      title: '下拉选项',
      display: 'block',
      supportVariable: false,
      initialValue: {
        data: [
          { text: 'Undo' },
          { icon: 'smile', text: 'Redo' },
          { icon: 'cry', text: 'Cut', disabled: true },
        ],
      },
      required: false,
      setter: <JsonSetter />,
    },
    {
      name: 'label',
      title: '按钮上的文本内容',
      display: 'block',
      initialValue: {
        zh_CN: 'Document Edit',
        en_US: 'Document Edit',
        type: 'i18n',
      },
      setter: <I18nSetter />,
    },
    size(),
    {
      name: 'baseIcon',
      title: '基础图标',
      display: 'inline',
      initialValue: '',
      setter: <FusionIconSetter />,
    },
    {
      name: 'otherIcon',
      title: '其他图标',
      display: 'inline',
      tip: '用户自定义图标，可覆盖基础图标',
      initialValue: '',
      setter: <TextSetter />,
    },
    iconSize(),
    {
      name: 'type',
      title: '按钮样式',
      display: 'block',
      initialValue: 'normal',
      setter: (
        <ChoiceSetter
          options={[
            { title: 'normal', value: 'normal' },
            { title: 'primary', value: 'primary' },
            { title: 'secondary', value: 'secondary' },
          ]}
        />
      ),
    },
    {
      name: 'shape',
      title: '按钮类型',
      display: 'block',
      initialValue: 'normal',
      setter: (
        <ChoiceSetter
          options={[
            { title: 'normal', value: 'normal' },
            { title: 'text', value: 'text' },
            { title: 'warning', value: 'warning' },
            { title: 'light', value: 'light' },
            { title: 'dark', value: 'dark' },
          ]}
        />
      ),
    },
    {
      name: 'popupTriggerType',
      title: '弹层触发方式',
      display: 'block',
      initialValue: 'click',
      setter: (
        <ChoiceSetter
          options={[{ title: 'hover', value: 'hover' }, { title: 'click', value: 'click' }]}
        />
      ),
    },
    {
      name: 'autoWidth',
      title: '弹层是否与按钮宽度相同',
      display: 'block',
      initialValue: true,
      setter: <BoolSetter />,
    },
    {
      name: 'isSelect',
      title: '选择模式',
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'selectedKeys',
      title: '默认激活的菜单项',
      display: 'block',
      tip: {
        content: '如果是多选支持选择多个，格式：a,b',
      },
      initialValue: ['Undo'],
      hidden() {
        return !this.getProps().getPropValue('isSelect');
      },
      setter: <TextSetter />,
    },
    {
      name: 'selectMode',
      title: '选择模式',
      display: 'inline',
      initialValue: 'single',
      hidden() {
        return !this.getProps().getPropValue('isSelect');
      },
      setter: (
        <ChoiceSetter
          options={[{ title: '单选', value: 'single' }, { title: '多选', value: 'multiple' }]}
        />
      ),
    },
    style({ advanced: true }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('menuButton'),
        ...events([
          { name: 'onItemClick', title: '点击菜单项后的回调' },
          { name: 'onSelect', title: '选择菜单后的回调' },
          { name: 'onVisibleChange', title: '弹层在显示和隐藏触发的事件' },
        ], { display: 'none' }),
      ],
    },
  ],
});
