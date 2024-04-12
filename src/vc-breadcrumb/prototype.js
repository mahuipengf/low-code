import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter,
  ListSetter,
  I18nSetter,
  ChoiceSetter,
  NumberSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
import $i18n from '../i18n/index';
import { breadcrumbDoc } from '../common/tipUrls';
export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepBreadCrumbs', dm: '面包屑' }),
  componentName: 'Breadcrumb',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: breadcrumbDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1SU1HuVT7gK0jSZFpXXaTkpXa-112-64.png',
      label: $i18n.get({ id: 'deepBreadCrumbs', dm: '面包屑' }),
      schema: {
        componentName: 'Breadcrumb',
        props: {},
      },
    },
  ],

  configure: [
    {
      name: 'separator',
      title: $i18n.get({ id: 'deepSeparator', dm: '分隔符' }),
      display: 'inline',
      setter: <TextSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
    },

    {
      name: 'maxNode',
      title: $i18n.get({ id: 'deepMaximumBakery', dm: '面包屑最多显示个数' }),
      tip: $i18n.get({ id: 'deepOverTheBreakIs', dm: '超出会被隐藏' }),
      display: 'block',
      initialValue: 100,
      setter: <NumberSetter />,
    },

    {
      name: 'dataSource',
      title: $i18n.get({ id: 'deepBreadcrum', dm: '面包屑数据' }),
      display: 'block',
      supportVariable: true,
      initialValue: [
        {
          title: {
            zh_CN: '一级链接',
            en_US: 'One level Link',
            type: 'i18n',
          },

          link: 'https://go.alibaba-inc.com/home/',
          target: '_self',
        },

        {
          title: {
            zh_CN: '二级链接',
            en_US: 'One level Link',
            type: 'i18n',
          },

          link: 'https://go.alibaba-inc.com/home/',
          target: '_self',
        },
      ],

      setter: (
        <ListSetter
          descriptor={(item) => (item.getParamValue('title') || {}).zh_CN}
          // 确定是否被选中的字段名称
          checkField={null}
          // 是否能够添加
          addable
          // listSetter 展示方式
          // 弹层编辑 or Slate 多层抽屉式编辑
          display="popup"
          // 是否可以修改 item 的顺序
          draggable
          deletable
          editable
          configure={[
            {
              name: 'title',
              title: $i18n.get({ id: 'deepNavigationText', dm: '导航文字' }),
              // supportVariable: true,
              defaultValue: { zh_CN: '一级链接', en_US: 'One level Link', type: 'i18n' },
              initial(val, defaultValue) {
                if (val && val.type === 'i18n') {
                  return val;
                }
                if (!val) {
                  return defaultValue;
                }
                return { zh_CN: val, en_US: val, type: 'i18n' };
              },
              display: 'inline',
              setter: I18nSetter,
            },
            {
              name: 'link',
              title: $i18n.get({ id: 'deepLinkAddress', dm: '链接地址' }),
              display: 'inline',
              setter: TextSetter,
            },
            {
              name: 'target',
              title: $i18n.get({ id: 'deepLinkType', dm: '链接类型' }),
              display: 'inline',
              initialValue: '_self',
              setter: (
                <ChoiceSetter
                  options={[
                    {
                      value: '_self',
                      text: $i18n.get({ id: 'deepTheCurrentPage', dm: '当前页面' }),
                    },
                    { value: '_blank', text: $i18n.get({ id: 'deepNewPage', dm: '新开页面' }) },
                  ]}
                />
              ),
            },
          ]}
        />
      ),
    },

    style({ advanced: true }),
  ],
});
