import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  ValidationSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  NumberSetter,
  JsonSetter,
  ActionSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import {
  label,
  labelAlign,
  labelTextAlign,
  tips,
  size,
  labelColSpan,
  labelColOffset,
  wrapperColSpan,
  wrapperColOffset,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  validation,
  formCategory,
  advanced,
  defaultValue,
} from '../common/vu-fusion-field-property';
import { attachmentDoc, attachmentValue } from '../common/tipUrls';
import Icon from './logo.svg';

export default Bundle.createPrototype({
  title: '上传附件',
  componentName: 'AttachmentField',
  category: '表单',
  icon: Icon,
  docUrl: attachmentDoc,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1wJh4u.T1gK0jSZFhXXaAtVXa-112-64.png",
      label: "上传附件",
      schema: {
        componentName: "AttachmentField",
        props: {},
      },
    },
  ],
  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      initialValue: {
        zh_CN: '上传附件',
        en_US: 'Upload attachment',
        type: 'i18n',
      },
      supportVariable: false,
    }),
    defaultValue({
      name: 'value',
      title: '默认值',
      tip: {
        url: attachmentValue,
        content: '点击 ? 查看数据格式。注意：勾中的选项的优先级高于手动输入的默认值',
      },
      display: 'inline',
      initialValue: '',
      initial(val) {
        return val || [];
      },
      setter: <JsonSetter label="编辑默认值" />,
      supportVariable: false,
    }),
    labelAlign({
      setter: (
        <ChoiceSetter
          options={[{
            title: '左',
            value: 'left',
            tip: '左侧',
          }, {
            title: '上',
            value: 'top',
            tip: '上',
          }]}
          compact={false}
        />
      ),
      supportVariable: false,
    }),
    labelColSpan({
      supportVariable: false,
    }),
    labelColOffset({
      supportVariable: false,
    }),
    wrapperColSpan({
      supportVariable: false,
    }),
    wrapperColOffset({
      supportVariable: false,
    }),
    labelTextAlign({
      supportVariable: false,
    }),
    tips({
      supportVariable: false,
    }),
    size({
      supportVariable: false,
    }),
    behavior({
      supportVariable: false,
    }),
    labelTipsType({
      supportVariable: false,
    }, false),
    labelTipsIcon({
      supportVariable: false,
    }),
    labelTips({
      supportVariable: false,
    }),
    labelTipsText({
      supportVariable: false,
    }),
    labelTipsRender({
      supportVariable: false,
    }),
    validation({
      setter: <ValidationSetter supports={['required']} enableCustomValidate={false} />,
      supportVariable: false,
    }),
    {
      title: '上传详情设置',
      type: 'group',
      display: 'accordion',
      items: [
        {
          name: 'type',
          title: '上传类型',
          display: 'inline',
          initialValue: 'normal',
          supportVariable: false,
          setter: <ChoiceSetter options={[
            { title: '默认', value: 'normal' },
            { title: '拖拽', value: 'drag' },
          ]}
          />,
        },
        {
          name: 'listType',
          title: '上传列表样式',
          display: 'none',
          initialValue: 'text',
          supportVariable: false,
          setter: <ChoiceSetter options={[
            { title: '文字', value: 'text' },
          ]}
          />,
        },
        {
          name: 'buttonText',
          title: '按钮内容',
          display: 'inline',
          initialValue: {
            zh_CN: '上传文件',
            en_US: 'Upload',
            type: 'i18n',
          },
          hidden() {
            return (this.getProps().getPropValue('type') === 'drag');
          },
          supportVariable: false,
          setter: <I18nSetter />,
        },
        {
          name: 'customUploadPane',
          title: '定制面板',
          display: 'inline',
          ignore() { // 如果为空，则忽略改字段
            // { type: 'actionRef' }
            return !this.getValue();
          },
          hidden() {
            return (this.getProps().getPropValue('type') !== 'drag');
          },
          tip: {
            content: '自定义拖拽上传面板',
          },
          setter: <ActionSetter
            defaultActionName="customUploadPane"
            defaultCode={`/**
* imageField customUploadPane
*/
function customUploadPane() {
  return (
    <div className="next-upload-drag">
      <p className="next-upload-drag-icon">
        <i className="next-icon next-icon-upload next-large"></i>
      </p>
      <p className="next-upload-drag-text">点击或者拖动文件到虚线框内上传</p>
      <p className="next-upload-drag-hint">支持 docx, xls, PDF, rar, zip, PNG, JPG 等类型的文件</p>
    </div>
  );
}`
            }
          />,
        },
        {
          name: 'buttonSize',
          title: '按钮尺寸',
          display: 'none',
          initialValue: 'medium',
          sync() {
            const props = this.getProps();
            return props.getPropValue('size');
          },
          // hidden() {
          //   return (this.getProps().getPropValue('type') !== 'normal');
          // },
          supportVariable: false,
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
              }, {
                title: '大',
                value: 'large',
                tip: '大尺寸',
              }]}
              compact={false}
            />
          ),
        },
        {
          name: 'buttonType',
          title: '按钮类型',
          display: 'inline',
          initialValue: 'primary',
          hidden() {
            return (this.getProps().getPropValue('type') !== 'normal');
          },
          supportVariable: false,
          setter: (
            <ChoiceSetter options={[
              { title: 'primary', value: 'primary' },
              { title: 'second', value: 'secondary' },
              { title: 'normal', value: 'normal' },
            ]}
            />
          ),
        },
        {
          name: 'multiple',
          title: '多选',
          display: 'inline',
          initialValue: false,
          supportVariable: false,
          setter: <BoolSetter />,
        },
      ],
    },
    style({ advanced: true }),
    advanced('attachmentField', [
      {
        name: 'onChange', title: 'onChange 值发生变化', initialValue: `/**
* attachmentField onChange
* @param value 当前值
*/
function onChange({ value }) {
  console.log('onChange', value);
}`,
      },
      {
        name: 'onProgress', title: 'onProgress 上传中', initialValue: `/**
* attachmentField onProgress
*/
function onProgress() {
  console.log('onProgress');
}`,
      },
      {
        name: 'onSuccess', title: 'onSuccess 上传成功', initialValue: `/**
* attachmentField onSuccess
* @param file: {Object} 文件
* @param value: {Array} 值
*/
function onSuccess(file, value) {
  console.log('onSuccess', file, value);
}`,
      },
      {
        name: 'onError', title: 'onError 上传失败', initialValue: `/**
* attachmentField onError
* @param file: {Object} 出错的文件
* @param value: {Array} 当前值
*/
function onError(file, value) {
  console.log('onError', file, value);
}`,
      },
      {
        name: 'onSelect', title: 'onSelect 选择文件', initialValue: `/**
* attachmentField onSelect
*/
function onSelect() {
  console.log('onSelect');
}`,
      },
      {
        name: 'onRemove', title: 'onRemove 点击移除', initialValue: `/**
* attachmentField onRemove
* @param file: {Object} 文件
*/
function onRemove(file) {
  console.log('onRemove', file);
}`,
      },
      {
        name: 'onCancel', title: 'onCancel 取消上传', initialValue: `/**
* attachmentField onCancel
*/
function onCancel() {
  console.log('onCancel');
}`,
      },
      {
        name: 'onDragOver', title: 'onDragOver 拖拽经过', initialValue: `/**
* attachmentField onDragOver
*/
function onDragOver() {
  console.log('onDragOver');
}`,
      },
      {
        name: 'onDragLeave', title: 'onDragLeave 拖拽离开', initialValue: `/**
* attachmentField onDragLeave
*/
function onDragLeave() {
  console.log('onDragLeave');
}`,
      },
      {
        name: 'onDrop', title: 'onDrop 拖拽完成', initialValue: `/**
* attachmentField onDrop
*/
function onDrop() {
  console.log('onDrop');
}`,
      },
    ], { collapsed: true }),
  ],
});
