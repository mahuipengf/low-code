import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ValidationSetter,
  I18nSetter,
  ChoiceSetter,
  BoolSetter,
  JsonSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import { fieldName } from '@ali/vu-field-property';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import {
  label,
  labelAlign,
  labelTextAlign,
  labelColSpan,
  labelColOffset,
  wrapperColSpan,
  wrapperColOffset,
  validation,
  defaultValue,
  behavior,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  formCategory,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { transferDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepShuttle', dm: '穿梭框' }),
  componentName: 'TransferField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Icon,
  docUrl: transferDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1SNWMu1L2gK0jSZFmXXc7iXXa-112-64.png',
      label: $i18n.get({ id: 'deepShuttle', dm: '穿梭框' }),
      schema: {
        componentName: 'TransferField',
        props: {
          mode: 'simple',
        },
      },
    },
  ],

  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: true,
      initialValue: {
        zh_CN: '穿梭框',
        en_US: 'TransferField',
        type: 'i18n',
      },
    }),

    defaultValue({
      name: 'value',
      title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
      display: 'inline',
      supportVariable: true,
      initialValue: ['0'],
      setter: (
        <JsonSetter
          multiline
          rows={2}
          placeholder={$i18n.get({ id: 'deepPleaseEnterTheDefault', dm: '请输入默认值' })}
        />
      ),
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
    behavior({ hasReadOnly: false }),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    {
      name: 'mode',
      title: $i18n.get({ id: 'deepMode', dm: '模式' }),
      display: 'inline',
      initialValue: 'normal',
      setter: (
        <ChoiceSetter
          options={[
            { title: 'normal', value: 'normal' },
            { title: 'simple', value: 'simple' },
          ]}
        />
      ),
    },

    {
      name: 'showSearch',
      title: $i18n.get({ id: 'deepSearchBar', dm: '搜索框' }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'sortable',
      title: $i18n.get({ id: 'deepDragAndDrop', dm: '拖拽排序' }),
      display: 'inline',
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepDataSource', dm: '数据源' }),
      display: 'block',
      supportVariable: true,
      initialValue: [
        {
          label: 'item0',
          value: '0',
          disabled: false,
        },
        {
          label: 'item1',
          value: '1',
          disabled: false,
        },
        {
          label: 'item2',
          value: '2',
          disabled: true,
        },
      ],

      setter: (
        <JsonSetter
          multiline
          rows={2}
          placeholder={$i18n.get({ id: 'deepPleaseEnterTheDefault', dm: '请输入默认值' })}
        />
      ),
    },

    {
      name: 'defaultLeftChecked',
      title: $i18n.get({ id: 'deepLeftPanelDefaultSelection', dm: '左侧面板默认选中值' }),
      display: 'block',
      supportVariable: true,
      initialValue: ['1'],
      setter: (
        <JsonSetter
          multiline
          rows={2}
          placeholder={$i18n.get({ id: 'deepPleaseEnterTheDefault', dm: '请输入默认值' })}
        />
      ),
    },

    {
      name: 'defaultRightChecked',
      title: $i18n.get({ id: 'deepRightPanelDefaultSelection', dm: '右侧面板默认选中值' }),
      display: 'block',
      supportVariable: true,
      initialValue: [],
      setter: (
        <JsonSetter
          multiline
          rows={2}
          placeholder={$i18n.get({ id: 'deepPleaseEnterTheDefault', dm: '请输入默认值' })}
        />
      ),
    },

    {
      name: 'titles',
      title: $i18n.get({ id: 'deepPanelTitle', dm: '面板标题' }),
      display: 'block',
      supportVariable: true,
      initialValue: ['Title', 'Title'],
      setter: (
        <JsonSetter
          multiline
          rows={2}
          placeholder={$i18n.get({ id: 'deepPleaseEnterTheDefault', dm: '请输入默认值' })}
        />
      ),
    },

    {
      name: 'notFoundContent',
      title: $i18n.get({ id: 'deepNoDataDisplayContent', dm: '无数据时显示内容' }),
      display: 'block',
      initialValue: {
        zh_CN: '无数据',
        en_US: 'Not Found',
        type: 'i18n',
      },

      setter: <I18nSetter />,
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    style({ advanced: true }),
    {
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      type: 'group',
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('transferField'),
        fieldName(),
        ...events([
          {
            name: 'onChange',
            title: $i18n.get({ id: 'deepONCHANGEValueChanges', dm: 'onChange 值发生变化' }),
            initialValue: `/**
* transferField onChange
* @param value 已选中的值
*/
function onChange({ value }){
  console.log('onChange', value);
}`,
          },
        ]),
      ],
    },
  ],
});
