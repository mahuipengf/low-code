import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ChoiceSetter,
  I18nSetter,
  BoolSetter,
  NumberSetter,
  SelectSetter,
  SkinSetter,
  JsonSetter,
  TextSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import $i18n from '../i18n/index';
import { dialogDoc } from '../common/tipUrls';

function maxWidthUnit(type, presetValue, options = {}) {
  return {
    type,
    cast(v, validNumber) {
      if (v === 'auto' || !validNumber) {
        v = presetValue;
      }
      return `${v}${type}`;
    },
    list: true,
    ...options,
  };
}

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepDialog', dm: '对话框' }),
  componentName: 'Dialog',
  category: $i18n.get({ id: 'deepBasis', dm: '基础' }),
  isContainer: true,
  icon: Icon,
  isModal: true,
  rectSelector: '.vc-dialog',
  canDropIn(placement) {
    const componentName = placement.getComponentName();
    if (componentName === 'Dialog') {
      return false;
    }
    return true;
  },
  docUrl: dialogDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1YvX4uYr1gK0jSZR0XXbP8XXa-112-64.png',
      label: $i18n.get({ id: 'deepNormalType', dm: '普通型' }),
      schema: {
        componentName: 'Dialog',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ySp7uYj1gK0jSZFOXXc7GpXa-112-64.png',
      label: $i18n.get({ id: 'deepHiddenBottom', dm: '隐藏底部' }),
      schema: {
        componentName: 'Dialog',
        props: {
          footer: false,
        },
      },
    },
  ],

  configure: [
    {
      title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
      name: 'title',
      display: 'inline',
      initialValue: {
        type: 'i18n',
        zh_CN: 'Dialog标题',
        en_US: 'Dialog Title',
      },

      setter: <I18nSetter />,
      supportVariable: true,
    },

    {
      name: 'width',
      title: $i18n.get({ id: 'deepWidth', dm: '宽度' }),
      display: 'inline',
      setter: (
        <NumberSetter
          min={0}
          units={[
            maxWidthUnit('px', '520'),
            // maxWidthUnit('%', '100'),
            // {
            //   type: 'auto',
            //   preset: true,
            //   list: true,
            // },
            // maxWidthUnit('rem', '28'), // 因为16px=1rem, 所以446px约等于28rem
            // maxWidthUnit('em', '37'), // 因为label为72px，按设计展示6个字，所以446px约等于37em
          ]}
          placeholder={$i18n.get({ id: 'deepPleaseEnterTheWidth', dm: '请输入宽度' })}
        />
      ),

      supportVariable: true,
    },

    {
      name: 'height',
      title: $i18n.get({ id: 'deepHeight', dm: '高度' }),
      display: 'inline',
      setter: (
        <NumberSetter
          min={0}
          units={[
            maxWidthUnit('px', '446'),
            // maxWidthUnit('%', '100'),
            // maxWidthUnit('vh', '100'),
            // {
            //   type: 'auto',
            //   preset: true,
            //   list: true,
            // },
            // maxWidthUnit('rem', '28'), // 因为16px=1rem, 所以446px约等于28rem
            // maxWidthUnit('em', '37'), // 因为label为72px，按设计展示6个字，所以446px约等于37em
          ]}
          placeholder={$i18n.get({ id: 'deepPleaseEnterTheHeight', dm: '请输入高度' })}
        />
      ),

      supportVariable: true,
    },

    {
      name: 'visible',
      title: $i18n.get({ id: 'deepDefaultDisplay', dm: '默认显示' }),
      display: 'inline',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'hasMask',
      title: $i18n.get({ id: 'deepShortMask', dm: '显示遮罩' }),
      display: 'inline',
      initialValue: true,
      setter: <BoolSetter />,
      supportVariable: true,
    },

    {
      name: 'closeable',
      title: $i18n.get({ id: 'deepShutDown', dm: '关闭方式' }),
      display: 'inline',
      initialValue: 'esc',
      setter: (
        <ChoiceSetter
          multiple
          options={[
            {
              title: $i18n.get({ id: 'deepClickToMask', dm: '点击遮罩' }),
              value: 'mask',
              tip: $i18n.get({ id: 'deepClickTheMaskArea', dm: '点击遮罩区域可以关闭对话框' }),
            },
            {
              title: 'ESC',
              value: 'esc',
              tip: $i18n.get({ id: 'deepPressTheESCButton', dm: '按下 esc 键可以关闭对话框' }),
            },
          ]}
        />
      ),
    },

    {
      name: 'autoFocus',
      title: $i18n.get({ id: 'deepAutomaticFocus', dm: '自动聚焦' }),
      display: 'inline',
      tip: $i18n.get({
        id: 'deepDialogIsAutomaticallyFocused',
        dm: 'Dialog打开时是否自动聚焦到内部的表单项',
      }),
      initialValue: true,
      setter: <BoolSetter />,
      supportVariable: true,
    },

    {
      title: $i18n.get({ id: 'deepBottomButtonConfiguration', dm: '底部按钮配置' }),
      type: 'group',
      display: 'block',
      items: [
        {
          title: $i18n.get({ id: 'deepWhetherItIsDisplayed', dm: '是否显示' }),
          name: 'footer',
          display: 'inline',
          initialValue: true,
          setter: <BoolSetter />,
          supportVariable: true,
        },

        {
          name: 'footerAlign',
          title: $i18n.get({ id: 'deepAlignment', dm: '对齐方式' }),
          display: 'inline',
          initialValue: 'right',
          hidden() {
            return !this.getProps().getPropValue('footer');
          },
          setter: (
            <ChoiceSetter
              options={[
                { title: $i18n.get({ id: 'deepLeft', dm: '左' }), value: 'left' },
                { title: $i18n.get({ id: 'deepIn', dm: '中' }), value: 'center' },
                { title: $i18n.get({ id: 'deepRight', dm: '右' }), value: 'right' },
              ]}
            />
          ),

          supportVariable: true,
        },

        {
          name: 'footerActions',
          title: $i18n.get({ id: 'deepArrangement', dm: '排列方式' }),
          display: 'inline',
          initialValue: 'cancel,ok',
          hidden() {
            return !this.getProps().getPropValue('footer');
          },
          supportVariable: true,
          setter: (
            <SelectSetter
              options={[
                {
                  title: $i18n.get({ id: 'deepConfirmCancellation', dm: '确定，取消' }),
                  value: 'ok,cancel',
                  tip: $i18n.get({
                    id: 'deepConfirmThatTheCancel',
                    dm: '确认取消按钮同时存在，确认按钮在左',
                  }),
                },

                {
                  title: $i18n.get({ id: 'deepCancelDetermine', dm: '取消，确定' }),
                  value: 'cancel,ok',
                  tip: $i18n.get({
                    id: 'deepConfirmThatTheCancel.1',
                    dm: '确认取消按钮同时存在，确认按钮在右',
                  }),
                },

                {
                  title: $i18n.get({ id: 'deepDetermine', dm: '确定' }),
                  value: 'ok',
                  tip: $i18n.get({ id: 'deepOnlyConfirmTheButton', dm: '只存在确认按钮' }),
                },

                {
                  title: $i18n.get({ id: 'deepCancel', dm: '取消' }),
                  value: 'cancel',
                  tip: $i18n.get({ id: 'deepOnlyTheCancelButton', dm: '只存在取消按钮' }),
                },
              ]}
            />
          ),
        },

        {
          title: $i18n.get({ id: 'deepConfirmButton', dm: '确认按钮' }),
          name: 'confirmText',
          display: 'inline',
          initialValue: {
            type: 'i18n',
            zh_CN: '确定',
            en_US: 'Confirm',
          },

          setter: <I18nSetter />,
          supportVariable: true,
        },

        {
          title: $i18n.get({ id: 'deepCancelButton', dm: '取消按钮' }),
          name: 'cancelText',
          display: 'inline',
          initialValue: {
            type: 'i18n',
            zh_CN: '取消',
            en_US: 'Cancel',
          },

          setter: <I18nSetter />,
          supportVariable: true,
        },

        {
          name: 'confirmStyle',
          title: $i18n.get({ id: 'deepConfirm', dm: '确认风格' }),
          display: 'inline',
          initialValue: 'primary',
          supportVariable: true,
          setter: (
            <SkinSetter
              options={[
                {
                  value: 'primary',
                  imageUrl: 'https://img.alicdn.com/tps/TB1Pd0yOpXXXXagXpXXXXXXXXXX-412-72.png',
                },
                {
                  value: 'warning',
                  imageUrl: 'https://img.alicdn.com/tfs/TB1M8OLppmWBuNjSspdXXbugXXa-409-58.png',
                },
                {
                  value: 'ghostLight',
                  imageUrl: 'https://img.alicdn.com/tfs/TB1Rq6JSpXXXXc_aXXXXXXXXXXX-412-72.png',
                },
                {
                  value: 'ghostDark',
                  imageUrl: 'https://img.alicdn.com/tfs/TB14Z_vSpXXXXb1aFXXXXXXXXXX-412-72.png',
                },
              ]}
              compact={false}
            />
          ),
        },

        {
          title: $i18n.get({ id: 'deepConfirmation', dm: '确认状态' }),
          name: 'confirmState',
          display: 'inline',
          initialValue: '确定',
          setter: (
            <ChoiceSetter
              options={[
                { title: $i18n.get({ id: 'deepOrdinary', dm: '普通' }), value: 'NORMAL' },
                { title: $i18n.get({ id: 'deepDisable', dm: '禁用' }), value: 'DISABLED' },
                { title: $i18n.get({ id: 'deepLoading', dm: '加载中' }), value: 'LOADING' },
              ]}
            />
          ),

          supportVariable: true,
        },
        
        {
          name: 'cancelProps',
          title: $i18n.get({ id: 'deepCancelProps', dm: '取消属性' }),
          display: 'block',
          initialValue: {"text": false, "type": "normal"},
          supportVariable: true,
          setter: (
            <JsonSetter
              label={$i18n.get({ id: 'deepEditTheDefaultValue', dm: '编辑默认值' })}
            />
          ),
        },
      ],
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('dialog'),
        {
          title: $i18n.get({ id: 'deepInternalFloatingLayerPositioning', dm: '内部浮层定位' }),
          name: 'popupOutDialog',
          display: 'block',
          tip: $i18n.get({
            id: 'deepIfTheDialogItself',
            dm: '如果Dialog本身高度小于内部浮层高度，建议选择弹框外',
          }),
          initialValue: true,
          setter: (
            <ChoiceSetter
              options={[
                { title: $i18n.get({ id: 'deepInsideTheBox', dm: '弹框内' }), value: false },
                { title: $i18n.get({ id: 'deepOutOfTheBox', dm: '弹框外' }), value: true },
              ]}
            />
          ),

          supportVariable: true,
        },
        ...events([
          {
            name: 'onOk',
            title: $i18n.get({ id: 'deepONOKClickOK', dm: 'onOk 点击确定' }),
            initialValue: `/**
* dialog onOk
*/
function onOk() {
  console.log('onOk');
}`,
          },

          {
            name: 'onCancel',
            title: $i18n.get({ id: 'deepOncancelClickCancellation', dm: 'onCancel 点击取消' }),
            initialValue: `/**
* dialog onCancel
*/
function onCancel() {
  console.log('onCancel');
}`,
          },

          {
            name: 'onClose',
            title: $i18n.get({ id: 'deepWhenTheOncloseDialog', dm: 'onClose 对话框关闭时' }),
            initialValue: `/**
* dialog onClose
*/
function onClose() {
  console.log('onClose');
}`,
          },

          {
            name: 'afterClose',
            title: $i18n.get({ id: 'deepAfterCloseDialogIsTurned', dm: 'afterClose 对话框关闭后' }),
            initialValue: `/**
* dialog afterClose
*/
function afterClose() {
  console.log('afterClose');
}`,
          },

          {
            name: 'afterOpen',
            title: $i18n.get({ id: 'deepAfterTheAfterOpenDialog', dm: 'afterOpen 对话框打开后' }),
            initialValue: `/**
* dialog afterOpen
*/
function afterOpen() {
  console.log('afterOpen')
}`,
          },

          {
            name: 'onOpen',
            title: $i18n.get({ id: 'deepONOPENDialogOpens', dm: 'onOpen 对话框打开时' }),
            initialValue: `/**
* dialog onOpen
*/
function onOpen() {
  console.log('onOpen')
}`,
          },
        ]),
      ],
    },
  ],
});
