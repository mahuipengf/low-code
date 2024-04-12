import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  ChoiceSetter,
  I18nSetter,
  BoolSetter,
  NumberSetter,
  SelectSetter,
  SkinSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import Icon from './logo.svg';
import $i18n from '../i18n/index';
import { drawerDoc } from '../common/tipUrls';

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
  title: 'Drawer',
  componentName: 'Drawer',
  category: $i18n.get({ id: 'deepBasis', dm: '基础' }),
  isContainer: true,
  icon: Icon,
  docUrl: drawerDoc,
  isModal: true,
  rectSelector: '.vc-drawer',
  canDropIn(placement) {
    const componentName = placement.getComponentName();
    if (componentName === 'Drawer') {
      return false;
    }
    return true;
  },
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1o0t4u9f2gK0jSZFPXXXsopXa-112-64.png',
      label: $i18n.get({ id: 'deepSideDrawer', dm: '侧抽屉' }),
      schema: {
        componentName: 'Drawer',
        props: {},
      },
    },

    {
      screenshot: 'https://img.alicdn.com/tfs/TB1YOd2u2b2gK0jSZK9XXaEgFXa-112-64.png',
      label: $i18n.get({ id: 'deepBottomDrawer', dm: '底部抽屉' }),
      schema: {
        componentName: 'Drawer',
        props: {
          placement: 'bottom',
        },
      },
    },
  ],

  configure: [
    {
      title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
      name: 'title',
      display: 'inline',
      supportVariable: true,
      initialValue: {
        type: 'i18n',
        zh_CN: 'Drawer标题',
        en_US: 'Drawer Title',
      },

      setter: <I18nSetter />,
    },

    {
      name: 'width',
      title: $i18n.get({ id: 'deepWidth', dm: '宽度' }),
      display: 'inline',
      supportVariable: true,
      setter: (
        <NumberSetter
          min={0}
          units={[maxWidthUnit('px', '520')]}
          placeholder={$i18n.get({ id: 'deepPleaseEnterTheWidth', dm: '请输入宽度' })}
        />
      ),
    },

    {
      name: 'height',
      title: $i18n.get({ id: 'deepHeight', dm: '高度' }),
      display: 'inline',
      supportVariable: true,
      setter: (
        <NumberSetter
          min={0}
          units={[maxWidthUnit('px', '446')]}
          placeholder={$i18n.get({ id: 'deepPleaseEnterTheHeight', dm: '请输入高度' })}
        />
      ),
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
      name: 'placement',
      title: $i18n.get({ id: 'deepPopUpPosition', dm: '弹出位置' }),
      display: 'inline',
      initialValue: 'right',
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepTop', dm: '顶部' }), value: 'top' },
            { title: $i18n.get({ id: 'deepRight', dm: '右侧' }), value: 'right' },
            { title: $i18n.get({ id: 'deepBottom', dm: '底部' }), value: 'bottom' },
            { title: $i18n.get({ id: 'deepLeftSide', dm: '左侧' }), value: 'left' },
          ]}
        />
      ),
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
                { title: $i18n.get({ id: 'deepRight.1', dm: '右' }), value: 'right' },
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
      ],
    },

    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('drawer'),
        ...events([
          {
            name: 'onOk',
            title: $i18n.get({ id: 'deepONOKClickOK', dm: 'onOk 点击确定' }),
            initialValue: `/**
* drawer onOk
*/
function onOk() {
  console.log('onOk');
}`,
          },

          {
            name: 'onCancel',
            title: $i18n.get({ id: 'deepOncancelClickCancellation', dm: 'onCancel 点击取消' }),
            initialValue: `/**
* drawer onCancel
*/
function onCancel() {
  console.log('onCancel');
}`,
          },

          {
            name: 'onClose',
            title: $i18n.get({ id: 'deepWhenTheOncloseDialog', dm: 'onClose 对话框关闭时' }),
            initialValue: `/**
* drawer onClose
*/
function onClose() {
  console.log('onClose');
}`,
          },

          {
            name: 'afterClose',
            title: $i18n.get({ id: 'deepAfterCloseDialogIsTurned', dm: 'afterClose 对话框关闭后' }),
            initialValue: `/**
* drawer afterClose
*/
function afterClose() {
  console.log('afterClose');
}`,
          },

          {
            name: 'afterOpen',
            title: $i18n.get({ id: 'deepAfterTheAfterOpenDialog', dm: 'afterOpen 对话框打开后' }),
            initialValue: `/**
* drawer afterOpen
*/
function afterOpen() {
  console.log('afterOpen')
}`,
          },
        ]),
      ],
    },
  ],
});
