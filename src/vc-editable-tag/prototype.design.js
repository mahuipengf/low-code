import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  BoolSetter,
  ListSetter,
  ChoiceSetter,
  ActionSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import { editableTagDoc, tagDataSource } from '../common/tipUrls';
import Icon from './logo.svg';

function handlerHideValReset(name, showType) {
  const val = this.getParent().getParamValue('type');
  const isShow = showType.includes(val);
  !isShow ? this.getParent().setParamValue(name, false) : '';
  return !isShow;
}

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '标签',
  componentName: 'EditableTag',
  // 高级 | 其他
  category: '高级',
  icon: Icon,
  docUrl: editableTagDoc,
  configure: [
    {
      name: 'canAddTags',
      title: '可新增',
      display: 'block',
      initialValue: false,
      // 现有的可以使用的 setter 请参考：
      // @see https://lark.alipay.com/vision/docs/utils
      setter: <BoolSetter />,
    },
    {
      name: 'dataSource',
      title: '标签数据',
      display: 'block',
      supportVariable: false,
      tip: {
        content: '点击查看用法',
        url: tagDataSource,
      },
      initialValue: [
        {
          text: '标签1',
          type: '',
        },
      ],
      setter: (
        <ListSetter
          descriptor={(item) => item.getParamValue('text')}
          // 确定是否被选中的字段名称
          checkField={null}
          // 是否能够添加
          addable
          // listSetter 展示方式
          // 弹层编辑 or Slate 多层抽屉式编辑
          display="drawer"
          // 是否可以修改 item 的顺序
          draggable
          deletable
          editable
          configure={[
            {
              name: 'text',
              title: '标签内容',
              display: 'inline',
              initialValue: '标签',
              setter: <TextSetter />,
            },
            {
              name: 'type',
              title: '标签类型',
              display: 'block',
              initialValue: '',
              setter: (
                <ChoiceSetter
                  options={[
                    { value: '', text: '默认' },
                    { value: 'show', text: 'show' },
                    { value: 'success', text: 'success' },
                    { value: 'danger', text: 'danger' },
                    { value: 'info', text: 'info' },
                    { value: 'warning', text: 'warning' },
                  ]}
                />
              ),
            },
            {
              name: 'canDelete',
              title: '可删除',
              display: 'inline',
              setter: <BoolSetter />,
            },
            {
              name: 'canEdit',
              title: '可编辑',
              display: 'inline',
              hidden() {
                const isHide =
                  handlerHideValReset.bind(this)('canEdit', ['']) ||
                  this.getParent().getParamValue('canAddCount');
                return isHide;
              },
              setter: <BoolSetter />,
            },
            {
              name: 'canAddCount',
              title: '可点赞',
              display: 'inline',
              hidden() {
                const isHide =
                  handlerHideValReset.bind(this)('canAddCount', ['']) ||
                  this.getParent().getParamValue('canEdit');
                return isHide;
              },
              setter: <BoolSetter />,
            },
            {
              name: 'count',
              title: '点赞数',
              display: 'inline',
              supportVariable: false,
              hidden() {
                return !this.getParent().getParamValue('canAddCount');
              },
              setter: <TextSetter />,
            },
            {
              name: 'maxDisplayCount',
              title: '最大显示点赞数（如99+）',
              display: 'block',
              hidden() {
                return !this.getParent().getParamValue('canAddCount');
              },
              setter: <TextSetter />,
            },
            {
              name: 'level',
              title: '标签level',
              display: 'block',
              initialValue: '',
              setter: (
                <ChoiceSetter
                  options={[
                    { value: 'normal', text: 'normal' },
                    { value: 'secondary', text: 'secondary' },
                    { value: 'primary', text: 'primary' },
                  ]}
                />
              ),
            },
          ]}
        />
      ),
    },
    {
      name: 'isDiyDeleteMsg',
      title: '自定义删除交互文案',
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'confirmDeleteTitle',
      title: '删除提示标题',
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('isDiyDeleteMsg');
      },
      initialValue: '您确定要删除该标签吗？',
      setter: <TextSetter />,
    },
    {
      name: 'confirmDeleteContent',
      title: '删除提示内容',
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('isDiyDeleteMsg');
      },
      initialValue: '标签删除后将不可恢复！',
      setter: <TextSetter />,
    },
    // 原则上有抽象出来的公用属性请尽量使用公用函数，方便后期统一升级
    // @see https://lark.alipay.com/vision/docs/props_setter#通用属性设置器
    style({ advanced: true }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      // events([{ name: 'onClick', title: '当点击按钮时' }])
      items: [uuid('EditableTag')],
    },
  ],
});
