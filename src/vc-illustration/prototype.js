import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  SelectSetter,
  ChoiceSetter,
  BoolSetter,
  ActionSetter,
} from '@ali/visualengine-utils';

import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import style from '@ali/vu-style-property';
import { createSlot } from '@ali/vu-slot-property';

import Icon from './logo.svg';
import $i18n from '../i18n/index';
import { illustrationDoc } from '../common/tipUrls';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepDefaultPrompt', dm: '缺省提示' }),
  componentName: 'Illustration',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: illustrationDoc,
  isContainer: true,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1kDJQAy_1gK0jSZFqXXcpaXXa-112-64.png',
      label: $i18n.get({ id: 'deepDefaultPrompt', dm: '缺省提示' }),
      schema: {
        componentName: 'Illustration',
        props: {},
      },
    },
  ],

  configure: [
    {
      name: 'title',
      title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
      display: 'inline',
      setter: <TextSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
    },

    {
      name: 'content',
      title: $i18n.get({ id: 'deepContent', dm: '内容' }),
      display: 'inline',
      setter: <TextSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
    },

    {
      name: 'type',
      title: $i18n.get({ id: 'deepTypesOf', dm: '类型' }),
      display: 'inline',
      initialValue: 'empty',
      supportVariable: true,
      setter: (
        <SelectSetter
          options={[
            {
              title: $i18n.get({ id: 'deepAir', dm: '空' }),
              value: 'empty',
            },
            {
              title: $i18n.get({ id: 'deepCarryOut', dm: '完成' }),
              value: 'completed',
            },
            {
              title: $i18n.get({ id: 'deepNotFound', dm: '未找到' }),
              value: 'notFound',
            },
            {
              title: $i18n.get({ id: 'deepUnknown', dm: '未知异常' }),
              value: 'unkownError',
            },
            {
              title: $i18n.get({ id: 'deepServerException', dm: '服务器异常' }),
              value: 'serverError',
            },
            {
              title: $i18n.get({ id: 'deepServerRefuses', dm: '服务器拒绝' }),
              value: 'permissionDenied',
            },
            {
              title: $i18n.get({ id: 'deepTransfer', dm: '已转移' }),
              value: 'transferred',
            },
            {
              title: $i18n.get({ id: 'deepScanCode', dm: '扫码访问' }),
              value: 'qrCode',
            },
          ]}
          compact={false}
        />
      ),
    },

    {
      name: 'qrCodeUrl',
      title: $i18n.get({ id: 'deepQRCodeAddress', dm: '二维码地址' }),
      display: 'inline',
      supportVariable: true,
      setter: <TextSetter />,
      disabled() {
        return this.getProps().getPropValue('type') !== 'qrCode';
      },
    },

    {
      name: 'size',
      title: $i18n.get({ id: 'deepSize', dm: '尺寸' }),
      display: 'inline',
      initialValue: 'large',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepSingleLine', dm: '单行' }),
              value: 'small',
              tip: $i18n.get({ id: 'deepSuitableForBlock', dm: '适用于区块内' }),
            },
            {
              title: $i18n.get({ id: 'deepWholePage', dm: '整页' }),
              value: 'large',
              tip: $i18n.get({ id: 'deepApplicableToTheWhole', dm: '适用于整页' }),
            },
          ]}
          compact={false}
        />
      ),

      supportVariable: true,
    },

    {
      name: 'link',
      title: $i18n.get({ id: 'deepLink', dm: '链接' }),
      display: 'inline',
      setter: (
        <TextSetter
          placeholder={$i18n.get({ id: 'deepPleaseEnterYourAddress', dm: '请输入地址' })}
        />
      ),
      supportVariable: true,
    },

    {
      name: 'linkText',
      title: $i18n.get({ id: 'deepLinkCopy', dm: '链接文案' }),
      display: 'inline',
      setter: (
        <TextSetter placeholder={$i18n.get({ id: 'deepPleaseEnterACopy', dm: '请输入文案' })} />
      ),
      supportVariable: true,
    },

    {
      name: 'renderContent',
      title: $i18n.get({ id: 'deepCustomize', dm: '自定义内容' }),
      display: 'block',
      setter: (
        <ActionSetter
          defaultActionName={'renderContent'}
          defaultCode={$i18n.get({
            id: 'deepFunctionRenderContentRETURNSpan',
            dm: '\nfunction renderContent() {\n  return <span>内容提示</span>;\n}\n      ',
          })}
        />
      ),
    },

    {
      name: 'renderAction',
      title: $i18n.get({ id: 'deepCustomOperation', dm: '自定义操作' }),
      display: 'block',
      setter: (
        <ActionSetter
          defaultActionName={'renderAction'}
          defaultCode={$i18n.get({
            id: 'deepFunctionRendractionReturnButton',
            dm: '\nfunction renderAction() {\n  return <Button>返回首页</Button>;\n}\n      ',
          })}
        />
      ),
    },

    style({
      advanced: true,
    }),

    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      items: [
        uuid('message'),
        ...events([
          {
            name: 'onClose',
            title: $i18n.get({ id: 'deepOncloseClickToClose', dm: 'onClose 点击关闭' }),
            initialValue: `/**
* Message onClose 
*/
function onClose(){
  console.log('onClose');
}`,
          },
        ]),
      ],
    },
  ],
});
