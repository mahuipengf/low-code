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
import $i18n from '../i18n/index';

function handlerHideValReset(name, showType) {
  const val = this.getParent().getParamValue('type');
  const isShow = showType.includes(val);
  !isShow ? this.getParent().setParamValue(name, false) : '';
  return !isShow;
}

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepLabel', dm: '标签' }),
  componentName: 'EditableTag',
  // 高级 | 其他
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: editableTagDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1kwoA4kY2gK0jSZFgXXc5OFXa-360-114.png",
      label: "标签",
      schema: {
        componentName: "EditableTag",
        props: {
          noPadding: true
        },
      },
    }
  ],
  configure: [
    {
      name: 'canAddTags',
      title: $i18n.get({ id: 'deepAddNew', dm: '可新增' }),
      display: 'block',
      initialValue: false,
      // 现有的可以使用的 setter 请参考：
      // @see https://lark.alipay.com/vision/docs/utils
      setter: <BoolSetter />,
    },

    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepTagData', dm: '标签数据' }),
      display: 'block',
      supportVariable: true,
      tip: {
        content: $i18n.get({ id: 'deepClickToViewThe', dm: '点击查看用法' }),
        url: tagDataSource,
      },

      initialValue: [
        {
          text: $i18n.get({ id: 'deepTag', dm: '标签1' }),
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
              title: $i18n.get({ id: 'deepTagContent', dm: '标签内容' }),
              display: 'inline',
              initialValue: '标签',
              setter: <TextSetter />,
            },

            {
              name: 'type',
              title: $i18n.get({ id: 'deepTagType', dm: '标签类型' }),
              display: 'block',
              initialValue: '',
              setter: (
                <ChoiceSetter
                  options={[
                    { value: '', text: $i18n.get({ id: 'deepDefault', dm: '默认' }) },
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
              title: $i18n.get({ id: 'deepDelete', dm: '可删除' }),
              display: 'inline',
              setter: <BoolSetter />,
            },

            {
              name: 'canEdit',
              title: $i18n.get({ id: 'deepEditable', dm: '可编辑' }),
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
              title: $i18n.get({ id: 'deepPraise', dm: '可点赞' }),
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
              title: $i18n.get({ id: 'deepPraiseNumber', dm: '点赞数' }),
              display: 'inline',
              supportVariable: true,
              hidden() {
                return !this.getParent().getParamValue('canAddCount');
              },
              setter: <TextSetter />,
            },

            {
              name: 'maxDisplayCount',
              title: $i18n.get({
                id: 'deepMaximumDisplayPointsSuch',
                dm: '最大显示点赞数（如99+）',
              }),
              display: 'block',
              hidden() {
                return !this.getParent().getParamValue('canAddCount');
              },
              setter: <TextSetter />,
            },

            {
              name: 'level',
              title: $i18n.get({ id: 'deepLabelLevel', dm: '标签level' }),
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
      title: $i18n.get({ id: 'deepCustomizedDeleteInteractiveCopy', dm: '自定义删除交互文案' }),
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'confirmDeleteTitle',
      title: $i18n.get({ id: 'deepDeletePromptTitle', dm: '删除提示标题' }),
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('isDiyDeleteMsg');
      },
      initialValue: '您确定要删除该标签吗？',
      setter: <TextSetter />,
    },

    {
      name: 'confirmDeleteContent',
      title: $i18n.get({ id: 'deepDeleteAPromptContent', dm: '删除提示内容' }),
      display: 'block',
      hidden() {
        return !this.getProps().getPropValue('isDiyDeleteMsg');
      },
      initialValue: '标签删除后将不可恢复！',
      setter: <TextSetter />,
    },

    {
      name: 'noPadding',
      title: '关闭外边距',
      display: 'block',
      initialValue: false,
      setter: <BoolSetter />,
    },
    {
      name: 'onTagItemAdd',
      title: $i18n.get({ id: 'deepLabelNewIncident', dm: '标签新增事件' }),
      display: 'block',
      setter: (
        <ActionSetter
          defaultCode={$i18n.get({
            id: 'deepCustomizedNewEventsFunction',
            dm:
              '\n/**\n* 自定义新增事件\n*/\nfunction onTagItemAdd(tagText) {\n  console.log(tagText,this)\n  return tagText;\n}',
          })}
          defaultActionName="onTagItemAdd"
        />
      ),
    },

    {
      name: 'onTagItemDelete',
      title: $i18n.get({ id: 'deepTagDeleteEvent', dm: '标签删除事件' }),
      display: 'block',
      setter: (
        <ActionSetter
          defaultCode={$i18n.get({
            id: 'deepCustomDeleteEventFunction',
            dm:
              "\n/**\n* 自定义删除事件\n*/\nfunction onTagItemDelete(...args) {\n  console.log(args)\n  return '';\n}",
          })}
          defaultActionName="onTagItemDelete"
        />
      ),
    },

    {
      name: 'onTagItemEdit',
      title: $i18n.get({ id: 'deepLabelEditingEvent', dm: '标签编辑事件' }),
      display: 'block',
      setter: (
        <ActionSetter
          defaultCode={$i18n.get({
            id: 'deepCustomEditingEventFunction',
            dm:
              "\n/**\n* 自定义编辑事件\n*/\nfunction onTagItemEdit(...args) {\n  console.log(args)\n  return '';\n}",
          })}
          defaultActionName="onTagItemEdit"
        />
      ),
    },

    {
      name: 'onTagItemAddCount',
      title: $i18n.get({ id: 'deepLabelPoints', dm: '标签点赞事件' }),
      display: 'block',
      setter: (
        <ActionSetter
          defaultCode={$i18n.get({
            id: 'deepCustomPointVocalEvent',
            dm:
              "\n/**\n* 自定义点赞事件\n*/\nfunction onTagItemAddCount(...args) {\n  console.log(args)\n  return '';\n}",
          })}
          defaultActionName="onTagItemAddCount"
        />
      ),
    },

    // 原则上有抽象出来的公用属性请尽量使用公用函数，方便后期统一升级
    // @see https://lark.alipay.com/vision/docs/props_setter#通用属性设置器
    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      // events([{ name: 'onClick', title: '当点击按钮时' }])
      items: [
        uuid('EditableTag')
      ],
    },
  ],
});
