import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  TextSetter, ListSetter, I18nSetter, ChoiceSetter, NumberSetter,
} from '@ali/visualengine-utils';
import style from '@ali/vu-style-property';
import Icon from './logo.svg';
import { breadcrumbDoc } from '../common/tipUrls';

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
export default Bundle.createPrototype({
  title: '面包屑',
  componentName: 'Breadcrumb',
  category: '高级',
  icon: Icon,
  docUrl: breadcrumbDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1SU1HuVT7gK0jSZFpXXaTkpXa-112-64.png',
      label: '面包屑',
      schema: {
        componentName: 'Breadcrumb',
        props: {},
      },
    },
  ],
  configure: [
    {
      name: 'separator',
      title: '分隔符',
      display: 'inline',
      setter: <TextSetter placeholder="请输入" />,
    },
    {
      name: 'maxNode',
      title: '面包屑最多显示个数',
      tip: '超出会被隐藏',
      display: 'block',
      initialValue: 100,
      setter: <NumberSetter />,
    },
    {
      name: 'dataSource',
      title: '面包屑数据',
      display: 'block',
      initialValue: [
        {
          title: {
            zh_CN: '一级链接', en_US: 'One level Link', type: 'i18n',
          },
          link: 'https://go.alibaba-inc.com/home/',
          target: '_self',
        },
        {
          title: {
            zh_CN: '二级链接', en_US: 'One level Link', type: 'i18n',
          },
          link: 'https://go.alibaba-inc.com/home/',
          target: '_self',
        },
      ],
      setter: <ListSetter
        descriptor={item => (item.getParamValue('title') || {}).zh_CN}
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
        configure={[{
          name: 'title',
          title: '导航文字',
          // supportVariable: false,
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
        }, {
          name: 'link',
          title: '链接地址',
          display: 'inline',
          setter: TextSetter,
        }, {
          name: 'target',
          title: '链接类型',
          display: 'inline',
          initialValue: '_self',
          setter: (<ChoiceSetter
            options={[{ value: '_self', text: '当前页面' }, { value: '_blank', text: '新开页面' }]}
          />),
        }]}
      />,
    },
    style({ advanced: true }),
  ],
});
