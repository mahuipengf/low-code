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
import { attachmentDoc, attachmentValue } from '../common/tipUrls'
import Icon from './logo.svg';
import $i18n from '../i18n/index';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepUploadAttachment', dm: '上传附件' }),
  componentName: 'AttachmentField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: attachmentDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1wJh4u.T1gK0jSZFhXXaAtVXa-112-64.png',
      label: $i18n.get({ id: 'deepUploadAttachment', dm: '上传附件' }),
      schema: {
        componentName: 'AttachmentField',
        props: {},
      },
    },
  ],

  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: true,
      initialValue: {
        zh_CN: '上传附件',
        en_US: 'Upload attachment',
        type: 'i18n',
      },
    }),

    defaultValue({
      name: 'value',
      title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
      tip: {
        url: attachmentValue,
        content: $i18n.get({
          id: 'deepClickViewTheData',
          dm: '点击 ? 查看数据格式。注意：勾中的选项的优先级高于手动输入的默认值',
        }),
      },

      display: 'inline',
      initialValue: '',
      initial(val) {
        return val || [];
      },
      supportVariable: true,
      setter: <JsonSetter label={$i18n.get({ id: 'deepEditTheDefaultValue', dm: '编辑默认值' })} />,
    }),

    labelAlign({
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepLeft', dm: '左' }),
              value: 'left',
              tip: $i18n.get({ id: 'deepLeftSide', dm: '左侧' }),
            },
            {
              title: $i18n.get({ id: 'deepOn', dm: '上' }),
              value: 'top',
              tip: $i18n.get({ id: 'deepOn', dm: '上' }),
            },
          ]}
          compact={false}
        />
      ),
    }),

    labelColSpan(),
    labelColOffset(),
    wrapperColSpan(),
    wrapperColOffset(),
    labelTextAlign(),
    tips(),
    size(),
    behavior(),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    {
      title: $i18n.get({ id: 'deepUploadDetailsSet', dm: '上传详情设置' }),
      type: 'group',
      display: 'accordion',
      items: [
        {
          name: 'type',
          title: $i18n.get({ id: 'deepUploadType', dm: '上传类型' }),
          display: 'inline',
          initialValue: 'normal',
          supportVariable: true,
          setter: (
            <ChoiceSetter
              options={[
                { title: $i18n.get({ id: 'deepDefault', dm: '默认' }), value: 'normal' },
                { title: $i18n.get({ id: 'deepDrag', dm: '拖拽' }), value: 'drag' },
              ]}
            />
          ),
        },

        {
          name: 'listType',
          title: $i18n.get({ id: 'deepUploadListStyle', dm: '上传列表样式' }),
          display: 'none',
          initialValue: 'text',
          supportVariable: true,
          setter: (
            <ChoiceSetter
              options={[{ title: $i18n.get({ id: 'deepWriting', dm: '文字' }), value: 'text' }]}
            />
          ),
        },

        {
          name: 'buttonText',
          title: $i18n.get({ id: 'deepButtonContent', dm: '按钮内容' }),
          display: 'inline',
          initialValue: {
            zh_CN: '上传文件',
            en_US: 'Upload',
            type: 'i18n',
          },

          hidden() {
            return this.getProps().getPropValue('type') === 'drag';
          },
          supportVariable: true,
          setter: <I18nSetter />,
        },

        {
          name: 'customUploadPane',
          title: $i18n.get({ id: 'deepCustomPanel', dm: '定制面板' }),
          display: 'inline',
          ignore() {
            // 如果为空，则忽略改字段
            // { type: 'actionRef' }
            return !this.getValue();
          },
          hidden() {
            return this.getProps().getPropValue('type') !== 'drag';
          },
          tip: {
            content: $i18n.get({ id: 'deepCustomDragAndDrop', dm: '自定义拖拽上传面板' }),
          },

          setter: (
            <ActionSetter
              defaultActionName="customUploadPane"
              defaultCode={$i18n.get({
                id: 'deepImageFieldCustomUploadPaneFunctionCustomUploadPane',
                dm:
                  '/**\n* imageField customUploadPane\n*/\nfunction customUploadPane() {\n  return (\n    <div className="next-upload-drag">\n      <p className="next-upload-drag-icon">\n        <i className="next-icon next-icon-upload next-large"></i>\n      </p>\n      <p className="next-upload-drag-text">点击或者拖动文件到虚线框内上传</p>\n      <p className="next-upload-drag-hint">支持 docx, xls, PDF, rar, zip, PNG, JPG 等类型的文件</p>\n    </div>\n  );\n}',
              })}
            />
          ),
        },

        {
          name: 'buttonSize',
          title: $i18n.get({ id: 'deepButtonSize', dm: '按钮尺寸' }),
          display: 'none',
          initialValue: 'medium',
          sync() {
            const props = this.getProps();
            return props.getProp('size').getValue();
          },
          // hidden() {
          //   return (this.getProps().getPropValue('type') !== 'normal');
          // },
          supportVariable: true,
          setter: (
            <ChoiceSetter
              options={[
                {
                  title: $i18n.get({ id: 'deepSmall', dm: '小' }),
                  value: 'small',
                  tip: $i18n.get({ id: 'deepSmallSize', dm: '小尺寸' }),
                },
                {
                  title: $i18n.get({ id: 'deepIn', dm: '中' }),
                  value: 'medium',
                  tip: $i18n.get({ id: 'deepNormalSize', dm: '正常尺寸' }),
                },
                {
                  title: $i18n.get({ id: 'deepBig', dm: '大' }),
                  value: 'large',
                  tip: $i18n.get({ id: 'deepLargeSize', dm: '大尺寸' }),
                },
              ]}
              compact={false}
            />
          ),
        },

        {
          name: 'buttonType',
          title: $i18n.get({ id: 'deepButtonType', dm: '按钮类型' }),
          display: 'inline',
          initialValue: 'primary',
          hidden() {
            return this.getProps().getPropValue('type') !== 'normal';
          },
          supportVariable: true,
          setter: (
            <ChoiceSetter
              options={[
                { title: 'primary', value: 'primary' },
                { title: 'second', value: 'secondary' },
                { title: 'normal', value: 'normal' },
              ]}
            />
          ),
        },

        {
          name: 'multiple',
          title: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }),
          display: 'inline',
          initialValue: false,
          supportVariable: true,
          setter: <BoolSetter />,
        },

        {
          name: 'timeout',
          title: $i18n.get({ id: 'deepUploadTimeout', dm: '上传超时' }),
          display: 'inline',
          tip: {
            content: $i18n.get({ id: 'deepSetUpTheUpload', dm: '设置上传超时, 单位 ms' }),
          },

          ignore() {
            // 如果为空，则忽略改字段
            return !this.getValue();
          },
          initialValue: '',
          supportVariable: true,
          setter: <NumberSetter placeholder="ms" />,
        },

        {
          name: 'url',
          title: $i18n.get({ id: 'deepInterfaceAddress', dm: '接口地址' }),
          display: 'inline',
          ignore() {
            // 如果为空，则忽略改字段
            if (this.isUseVariable()) {
              return false;
            }
            return !this.getValue();
          },
          initialValue: '',
          tip: {
            content: $i18n.get({
              id: 'deepByDefaultGlobalConfiguration',
              dm: '默认使用全局配置，也可自定义，数据格式可点击查看',
            }),
            url:
              'https://lark.alipay.com/vision/docs/component_data#上传附件（vc-attachment-field）',
          },

          supportVariable: true,
          setter: <TextSetter placeholder="http://" pattern={/^(?:(?:http|https):)?\/\//} />,
        },

        {
          name: 'name',
          title: 'name',
          display: 'inline',
          initialValue: '',
          tip: {
            content: $i18n.get({ id: 'deepNameSentToThe', dm: '上传时发送给服务端的name' }),
          },

          ignore() {
            // 如果为空，则忽略改字段
            if (this.isUseVariable()) {
              return false;
            }
            return !this.getValue();
          },
          supportVariable: true,
          setter: <TextSetter />,
        },

        {
          name: 'data',
          title: $i18n.get({ id: 'deepExtraParameter', dm: '额外参数' }),
          display: 'inline',
          ignore() {
            // 如果为空，则忽略改字段
            if (this.isUseVariable()) {
              return false;
            }
            return !Object.keys(this.getValue()).length;
          },
          supportVariable: true,
          initialValue: {},
          tip: {
            content: $i18n.get({ id: 'deepUploadedExtraParameters', dm: '上传可附带的额外参数' }),
          },

          setter: <JsonSetter />,
        },

        {
          name: 'headers',
          title: $i18n.get({ id: 'deepHeadInformation', dm: '头部信息' }),
          display: 'inline',
          ignore() {
            // 如果为空，则忽略改字段
            if (this.isUseVariable()) {
              return false;
            }
            return !Object.keys(this.getValue()).length;
          },
          supportVariable: true,
          initialValue: {},
          tip: {
            content: $i18n.get({ id: 'deepSetUpTheUpload.1', dm: '设置上传的请求头部' }),
          },

          setter: <JsonSetter />,
        },

        {
          name: 'beforeUpload',
          title: $i18n.get({ id: 'deepUploadPreProcessing', dm: '上传前处理' }),
          display: 'inline',
          ignore() {
            // 如果为空，则忽略改字段
            // { type: 'actionRef' }
            return !this.getValue();
          },
          tip: {
            content: $i18n.get({ id: 'deepUploadPreambleFunction', dm: '上传前处理函数' }),
          },

          setter: (
            <ActionSetter
              defaultActionName="beforeUpload"
              defaultCode={$i18n.get({
                id: 'deepImageFieldBeforeuploadParamFile',
                dm:
                  "/**\n* imageField beforeUpload\n* @param file: {Object} 所有文件\n* @param options: {Object} 参数\n*/\nfunction beforeUpload(file, options) {\n  console.log('beforeUpload', file, options);\n  return true;\n}",
              })}
            />
          ),
        },

        {
          name: 'fileNameRender',
          title: $i18n.get({ id: 'deepUploadFileNameRender', dm: '自定义文件名渲染' }),
          display: 'inline',
          setter: (
            <ActionSetter
              defaultActionName="fileNameRender"
              defaultCode={`function fileNameRender(file) {
                //  return react node
                return <div>file</div>;
              }`}
            />
          ),
        },

        {
          name: 'formatter',
          title: $i18n.get({ id: 'deepDataProcessing', dm: '数据处理' }),
          display: 'inline',
          ignore() {
            // 如果为空，则忽略改字段
            // { type: 'actionRef' }
            return !this.getValue();
          },
          tip: {
            content: $i18n.get({ id: 'deepDataProcessingFunction', dm: '数据处理函数' }),
          },

          setter: (
            <ActionSetter
              defaultActionName="formatter"
              defaultCode={`function formatter(response) {
  return response;
}`}
            />
          ),
        },

        {
          name: 'method',
          title: $i18n.get({ id: 'deepUploadMethod', dm: '上传方法' }),
          display: 'none',
          initialValue: 'post',
          supportVariable: true,
          setter: (
            <ChoiceSetter
              options={[
                { title: 'post', value: 'post' },
                { title: 'put', value: 'put' },
              ]}
            />
          ),
        },

        {
          name: 'limit',
          title: $i18n.get({ id: 'deepMaximumNumberOfUploaded', dm: '最大上传文件个数' }),
          display: 'block',
          ignore() {
            return !this.getValue();
          },
          supportVariable: true,
          setter: <NumberSetter />,
        },

        {
          name: 'withCredentials',
          title: $i18n.get({ id: 'deepWhetherToAllowRequest', dm: '是否允许请求携带 cookie' }),
          display: 'block',
          initialValue: false,
          supportVariable: true,
          setter: <BoolSetter />,
        },
        {
          name: 'webkitdirectory',
          title: $i18n.get({ id: 'deepWhetherToAllowUploadFolder', dm: '上传文件夹' }),
          display: 'block',
          tip: {
            content: $i18n.get({
              id: 'deepUploaderFolderTip',
              dm: '开启后将只允许选择目录',
            }),
            url: 'https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement/webkitdirectory',
          },
          initialValue: false,
          supportVariable: true,
          setter: <BoolSetter />,
        },

        {
          name: 'autoUpload',
          title: $i18n.get({ id: 'deepAutomaticUpload', dm: '自动上传' }),
          display: 'block',
          tip: {
            content: $i18n.get({
              id: 'deepAfterTheShutdownYou',
              dm: "关闭后，需要手动调用 this.$('fieldId').startUpload() 开始上传",
            }),
          },

          initialValue: true,
          supportVariable: true,
          setter: <BoolSetter />,
        },

        {
          name: 'accept',
          title: $i18n.get({ id: 'deepUploadFileType', dm: '上传文件类型' }),
          display: 'block',
          initialValue: '',
          tip: {
            content: $i18n.get({
              id: 'deepPdfDocSeeInput',
              dm: '.pdf, .doc, 详见 input accept attribute',
            }),
            url: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept',
          },

          supportVariable: true,
          setter: <TextSetter />,
        },
      ],
    },

    style({ advanced: true }),
    advanced('attachmentField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
        initialValue: `/**
* attachmentField onChange
* @param value 当前值
*/
function onChange({ value }) {
  console.log('onChange', value);
}`,
      },

      {
        name: 'onProgress',
        title: $i18n.get({ id: 'deepOnprogressUpload', dm: 'onProgress 上传中' }),
        initialValue: `/**
* attachmentField onProgress
*/
function onProgress() {
  console.log('onProgress');
}`,
      },

      {
        name: 'onSuccess',
        title: $i18n.get({ id: 'deepOnSuccessUploadSuccess', dm: 'onSuccess 上传成功' }),
        initialValue: `/**
* attachmentField onSuccess
* @param file: {Object} 文件
* @param value: {Array} 值
*/
function onSuccess(file, value) {
  console.log('onSuccess', file, value);
}`,
      },

      {
        name: 'onError',
        title: $i18n.get({ id: 'deepOneRrorUploadFailed', dm: 'onError 上传失败' }),
        initialValue: `/**
* attachmentField onError
* @param file: {Object} 出错的文件
* @param value: {Array} 当前值
*/
function onError(file, value) {
  console.log('onError', file, value);
}`,
      },

      {
        name: 'onSelect',
        title: $i18n.get({ id: 'deepOnselectSelectionFile', dm: 'onSelect 选择文件' }),
        initialValue: `/**
* attachmentField onSelect
*/
function onSelect() {
  console.log('onSelect');
}`,
      },

      {
        name: 'onRemove',
        title: $i18n.get({ id: 'deepOnRemoveClickRemoval', dm: 'onRemove 点击移除' }),
        initialValue: `/**
* attachmentField onRemove
* @param file: {Object} 文件
*/
function onRemove(file) {
  console.log('onRemove', file);
}`,
      },

      {
        name: 'onCancel',
        title: $i18n.get({ id: 'deepOncancelCancelsUpload', dm: 'onCancel 取消上传' }),
        initialValue: `/**
* attachmentField onCancel
*/
function onCancel() {
  console.log('onCancel');
}`,
      },

      {
        name: 'onDragOver',
        title: $i18n.get({ id: 'deepOndragoverDragged', dm: 'onDragOver 拖拽经过' }),
        initialValue: `/**
* attachmentField onDragOver
*/
function onDragOver() {
  console.log('onDragOver');
}`,
      },

      {
        name: 'onDragLeave',
        title: $i18n.get({ id: 'deepOnDragleaveDraggedAway', dm: 'onDragLeave 拖拽离开' }),
        initialValue: `/**
* attachmentField onDragLeave
*/
function onDragLeave() {
  console.log('onDragLeave');
}`,
      },

      {
        name: 'onDrop',
        title: $i18n.get({ id: 'deepOnDropDragAndDrop', dm: 'onDrop 拖拽完成' }),
        initialValue: `/**
* attachmentField onDrop
*/
function onDrop() {
  console.log('onDrop');
}`,
      },
    ]),
  ],
});
