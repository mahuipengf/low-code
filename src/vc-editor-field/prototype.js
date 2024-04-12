import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  CodeSetter,
  JsonSetter,
  EditorSetter,
  ChoiceSetter,
} from '@ali/visualengine-utils';
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
  placeholder,
  defaultValue,
} from '../common/vu-fusion-field-property';
import Logo from './logo.svg';
import $i18n from '../i18n/index';
import { editorDoc, editorUploadConfig } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepRichTextBox', dm: '富文本框' }),
  componentName: 'EditorField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Logo,
  docUrl: editorDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1edSKu9f2gK0jSZFPXXXsopXa-112-64.png',
      label: $i18n.get({ id: 'deepRichTextBox', dm: '富文本框' }),
      schema: {
        componentName: 'EditorField',
        props: {
          label: $i18n.get({ id: 'deepRichTextBox', dm: '富文本框' }),
          labelAlign: 'top',
          labelColSpan: 4,
          labelColOffset: 0,
          wrapperColSpan: 0,
          wrapperColOffset: 0,
          labelTextAlign: 'right',
          placeholder: $i18n.get({ id: 'deepPleaseEnter', dm: '请输入' }),
          size: 'medium',
          behavior: 'NORMAL',
          value: '',
          labelTipsTypes: 'none',
          labelTipsIcon: 'prompt',
          labelTipsText: '',
          config: {
            statusbar: false,
            menubar: false,
            toolbar1:
              'undo redo bold italic | fontselect fontsizeselect forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table link upload',
            toolbar2: false,
            height: 300,
            fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
            visual: true,
            keep_values: false,
            forced_root_block: 'div',
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table contextmenu paste code',
              'colorpicker',
              'upload',
              'placeholder',
              'variable',
              'noneditable',
            ],
          },
          validation: [],
        },
      },
    },
  ],

  configure: [
    formCategory(),
    label({
      supportVariable: true,
      initialValue: {
        zh_CN: '富文本框',
        en_US: 'Editor Field',
        type: 'i18n',
      },
    }),

    labelAlign(),
    labelColSpan(),
    labelColOffset(),
    wrapperColSpan(),
    wrapperColOffset(),
    labelTextAlign(),
    placeholder({
      initialValue: {
        zh_CN: '请输入',
        en_US: 'Please type',
        type: 'i18n',
      },
    }),

    tips(),
    size(),
    behavior({ hasReadOnly: false }),
    defaultValue({
      name: 'defaultValue',
      title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
      display: 'inline',
      supportVariable: true,
      setter: (
        <EditorSetter title={$i18n.get({ id: 'deepEditTheDefaultValue', dm: '编辑默认值' })} />
      ),
    }),

    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    // maxWidth({
    //   initialValue: MAX_WIDTH,
    // }),
    // layout(),
    // gridLayout({
    //   resetMaxWidth: MAX_WIDTH,
    // }),
    {
      name: 'config',
      title: $i18n.get({ id: 'deepGeneralConfiguration', dm: '通用配置' }),
      supportVariable: true,
      initialValue: {
        statusbar: false,
        menubar: false,
        toolbar1:
          'undo redo bold italic | fontselect fontsizeselect forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table link upload',
        toolbar2: false,
        height: 300,
        fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
        visual: true,
        keep_values: false,
        forced_root_block: 'div',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table contextmenu paste code',
          'colorpicker',
          'upload',
          'placeholder',
          'variable',
          'noneditable',
        ],
      },

      setter: <JsonSetter />,
    },

    {
      name: 'uploadConfig',
      title: $i18n.get({ id: 'deepUploadImageConfiguration', dm: '上传图片配置' }),
      type: 'group',
      display: 'accordion',
      collapsed: true,
      tip: {
        content: $i18n.get({ id: 'deepClickToViewDetailed', dm: '点击查看详细说明' }),
        url: editorUploadConfig,
      },

      items: [
        {
          name: 'inputName',
          title: $i18n.get({ id: 'deepUploadName', dm: '上传名称' }),
          display: 'inline',
          tip: $i18n.get({
            id: 'deepUploadedFileInputS',
            dm: '上传的file input的name属性，默认file',
          }),
          supportVariable: true,
          ignore() {
            // 如果为空，则忽略改字段
            return !this.getValue();
          },
          setter: <TextSetter />,
        },

        {
          name: 'actionUrl',
          title: $i18n.get({ id: 'deepUploadInterface', dm: '上传接口' }),
          display: 'inline',
          tip: $i18n.get({
            id: 'deepDataSubmitTheBackend',
            dm: '数据提交后端处理接口，需要返回JSON格式数据',
          }),
          supportVariable: true,
          ignore() {
            // 如果为空，则忽略改字段
            return !this.getValue();
          },
          setter: <TextSetter placeholder="http://" />,
        },

        {
          name: 'formatResult',
          title: $i18n.get({ id: 'deepProcessingReturnData', dm: '处理返回数据' }),
          display: 'block',
          initialValue: `function formatResult(response) {
  response.content = response.content || {};
  // downloarUrl为必须属性
  response.content.downloarUrl = response.content.downloarUrl || response.content.previewUrl;
  return response;
}`,
          setter: <CodeSetter />,
        },

        {
          name: 'errorCallback',
          title: $i18n.get({ id: 'deepIncorrectCallback', dm: '错误回调' }),
          display: 'block',
          initialValue: `function errorCallback() {
  console.log(arguments);
}`,
          setter: <CodeSetter />,
        },

        {
          name: 'progressCallback',
          title: $i18n.get({ id: 'deepUploadProgressCallback', dm: '上传进度回调' }),
          display: 'block',
          initialValue: `function progressCallback() {
  console.log(arguments);
}`,
          setter: <CodeSetter />,
        },

        {
          name: 'headers',
          title: $i18n.get({ id: 'deepImageUploadRequestHead', dm: '图片上传请求头配置' }),
          display: 'block',
          supportVariable: true,
          initialValue: {},
          setter: <JsonSetter />,
        },
      ],
    },

    validation(),
    advanced('editorField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepValueChanges', dm: '值发生变化' }),
        initialValue: `/**
* editorField onChange
* @param value 富文本框内的html字符串
*/
function onChange({ value }){
  console.log(value);
}`,
      },
    ]),
  ],
});
