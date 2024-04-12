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
import { editorDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: '富文本框',
  componentName: 'EditorField',
  category: '表单',
  icon: Logo,
  docUrl: editorDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1edSKu9f2gK0jSZFPXXXsopXa-112-64.png',
      label: '富文本框',
      schema: {
        componentName: 'EditorField',
        props: {
          "label": "富文本框",
          "labelAlign": "top",
          "labelColSpan": 4,
          "labelColOffset": 0,
          "wrapperColSpan": 0,
          "wrapperColOffset": 0,
          "labelTextAlign": "right",
          "placeholder": "请输入",
          "size": "medium",
          "behavior": "NORMAL",
          "value": "",
          "labelTipsTypes": "none",
          "labelTipsIcon": "prompt",
          "labelTipsText": "",
          "config": {
            "statusbar": false,
            "menubar": false,
            "toolbar1": "undo redo bold italic | fontselect fontsizeselect forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table link upload",
            "toolbar2": false,
            "height": 300,
            "fontsize_formats": "8px 10px 12px 14px 16px 18px 24px 36px 48px",
            "visual": true,
            "keep_values": false,
            "forced_root_block": "div",
            "plugins": [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table contextmenu paste code",
              "colorpicker",
              "upload",
              "placeholder",
              "variable",
              "noneditable"
            ]
          },
          "formatResult": {
            "type": "JSExpression",
            "value": "function formatResult(response) {\n  response.content = response.content || {};\n  // downloarUrl为必须属性\n  response.content.downloarUrl = response.content.downloarUrl || response.content.previewUrl;\n  return response;\n}"
          },
          "errorCallback": {
            "type": "JSExpression",
            "value": "function errorCallback() {\n  console.log(arguments);\n}"
          },
          "progressCallback": {
            "type": "JSExpression",
            "value": "function progressCallback() {\n  console.log(arguments);\n}"
          },
          "validation": []
        }
      }
    }
  ],
  configure: [
    formCategory(),
    label({
      supportVariable: false,
      initialValue: {
        zh_CN: '富文本框',
        en_US: 'Editor Field',
        type: 'i18n',
      },
    }),
    labelAlign({ 
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
    placeholder({
      initialValue: {
        zh_CN: '请输入',
        en_US: 'Please type',
        type: 'i18n',
      },
    }),
    tips({ 
      supportVariable: false,
    }),
    size({ 
      supportVariable: false,
    }),
    behavior({ 
      hasReadOnly: false,
      supportVariable: false,
    }),
    defaultValue({
      name: 'defaultValue',
      title: '默认值',
      display: 'inline',
      supportVariable: false,
      setter: <EditorSetter title="编辑默认值" />,
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
      supportVariable: false,
    }),
    advanced('editorField', [
      {
        name: 'onChange',
        title: '值发生变化',
        initialValue: `/**
* editorField onChange
* @param value 富文本框内的html字符串
*/
function onChange({ value }){
  console.log(value);
}`,
      },
    ], { collapsed: true }),
  ],
});
