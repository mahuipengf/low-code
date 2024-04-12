import { Exchange, Pages, utils } from '@ali/visualengine';
import React from 'react';
import { Bundle, Env } from '@ali/visualengine';
import {
  NumberSetter,
  ListSetter,
  BoolSetter,
  I18nSetter,
  TextSetter,
  ChoiceSetter,
  JsonSetter,
  OptionsSetter,
} from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import {
  size,
  label,
  advanced,
  formCategory,
  labelColSpan,
  wrapperColSpan,
} from '../common/vu-fusion-field-property';
import Icon from './logo.svg';
import events from '@ali/vu-events-property';

import {
  setChildrenFieldProps,
  getParentsName,
  getFieldsFromChildren,
  getMapFromFields,
  getSchemaFromFields,
  getId,
  getNodeProp,
  ID_NAME,
  FIELD_ID_NAME,
} from './util';

import initialChildren from './initialChildren';

import {
  isComponentFormField,
} from '../common/formFieldUtils';
import { filter2Doc } from '../common/tipUrls';


const inputWrapper = {
  ...wrapperColSpan({ title: '查询框' }),
  display: 'inline',
  mutator(value) {
    setChildrenFieldProps(this.getNode(), 'wrapperColSpan', value);
  },
  disabled() {
    return this.getProps().getPropValue('labelAlign') === 'top';
  },
};


let timer;

const replaceChild = ({ node, schema }) => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  timer = setTimeout(() => {
    // 避免生成新的 fieldId
    utils.disableUniqueIdChecker('fieldId');
    const page = Pages.getCurrentPage();
    // const newProps = node.getProps();
    try {
      if (!node.getParent()) {
        // node = Exchange.getSelected();
        // node.setProps(newProps);
        console.warn('执行异常，无法选中父节点')
        return
      }
      node.getParent().replaceChild(
        node,
        { ...node.toData(), children: schema },
        // 避免生成新的 nodeId
        { reserveSchemaNodeId: true },
      );
      // 因为 nodeId 都没有变化，所以页面不会重新渲染，手动调用 page 渲染。
      page.refresh();
      utils.enableUniqueIdChecker('fieldId');
    } catch (e) {
      utils.enableUniqueIdChecker('fieldId');
    }
  }, 100);
};

// 原型配置请参考：https://lark.alipay.com/vision/docs/prototype
const filterBundle = Bundle.createPrototype({
  title: '查询',
  componentName: 'Filter2',
  category: '高级',
  icon: Icon,
  docUrl: filter2Doc,
  isContainer: true,
  canDropTo(container) {
    const parentsName = getParentsName(container);
    return parentsName.indexOf('Form') === -1 && parentsName.indexOf('Filter2') === -1;
  },
  canDropIn(placement) {
    return isComponentFormField(placement);
  },
  // subtreeModified(node) {
  //   // this 的指向不对，只能用 node
  //   const children = node.getChildren();
  //   const { fields, action, rows } = getFieldsFromChildren(children);
  //   const config = node.getProps().getPropValue('config');
  //   const schema = getSchemaFromFields({
  //     fields, action, rows, config, form: node,
  //   });
  //   replaceChild({ node, schema });
  // },
  initialChildren,
  snippets: [
    {
      screenshot: "https://img.alicdn.com/tfs/TB1gaZrr.T1gK0jSZFhXXaAtVXa-1048-366.png",
      label: "查询2",
      schema: {
        componentName: "Filter2",
        props: {},
      }
    }
  ],
  configure: [
    {
      name: 'config',
      title: '筛选项配置',
      isDynamicProp: true,
      accessor(val = []) {
        const oldConfigMap = {};
        val.forEach((item) => {
          oldConfigMap[getId(item)] = {
            isAdvanced: item.isAdvanced,
            colspan: item.colspan,
            isFilter: item.isFilter,
            componentName: item.componentName,
            prevComponentName: item.prevComponentName,
          };
        });
        const node = this.getProps().getNode();
        const children = node.getChildren();
        const { fields } = getFieldsFromChildren(children);
        const schema = fields.map((field) => {
          const oldConfig = oldConfigMap[getId(field)];
          const newConfig = {
            title: field.getPropValue('label'),
            [ID_NAME]: getId(field),
            [FIELD_ID_NAME]: getNodeProp(field, FIELD_ID_NAME),
            componentName: field.componentName,
          };
          if (oldConfig) {
            newConfig.isAdvanced = oldConfig.isAdvanced;
            newConfig.colspan = oldConfig.colspan;
            newConfig.isFilter = oldConfig.isFilter;
            newConfig.prevComponentName = oldConfig.prevComponentName;
            if (oldConfig.componentName !== newConfig.componentName && oldConfig.componentName !== 'FilterPickableField') {
              newConfig.prevComponentName = oldConfig.componentName;
            }
          }
          return newConfig;
        });
        return schema;
      },
      setter: (
        <ListSetter
          checkField={null}
          addable={false}
          deletable={false}
          editable
          descriptor={(item) => {
            const locale = Env.getLocale();
            const title = (item.getParamValue('title') || {})[locale];
            const isAdvanced = item.getParamValue('isAdvanced');
            const isFilter = item.getParamValue('isFilter');
            const localeMap = {
              zh_CN: {
                advanced: ' (高级查询)',
                filter: ' (筛选)',
              },
              en_US: {
                advanced: ' (Advanced)',
                filter: ' (filter)',
              },
            };
            const surfix = (isAdvanced || isFilter) ? localeMap[locale][isAdvanced ? 'advanced' : 'filter'] : '';
            return `${title}${surfix}`;
          }}
          configure={[
            {
              name: 'title',
              title: '名称',
              setter: <I18nSetter/>,
              editable: true,
              disabled: true,
              hidden() {
                return true;
              },
            },
            {
              name: ID_NAME,
              setter: <TextSetter />,
              hidden() {
                return true;
              },
            },
            {
              name: FIELD_ID_NAME,
              setter: <TextSetter />,
              hidden() {
                return true;
              },
            },
            {
              name: 'componentName',
              setter: <TextSetter />,
              hidden() {
                return true;
              },
            },
            {
              name: 'prevComponentName',
              setter: <TextSetter />,
              hidden() {
                return true;
              },
            },
            {
              name: 'colspan',
              title: '跨列数量',
              initialValue: 1,
              editable: true,
              setter: <TextSetter />,
              hidden() {
                return this.getParent().getParamValue('isFilter');
              },
            },
            {
              name: 'isAdvanced',
              title: '是否高级查询',
              initialValue: false,
              editable: true,
              setter: <BoolSetter />,
              hidden() {
                return this.getParent().getParamValue('isFilter');
              },
            },
          ]}
        />
      ),
    },
    {
      title: '批量设置',
      type: 'group',
      display: 'accordion',
      items: [
        {
          name: 'labelAlign',
          title: '标题位置',
          display: 'inline',
          initialValue: 'top',
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
          // mutator(value) {
          //   setChildrenFieldProps(this.getNode(), 'labelAlign', value);
          // },
        },
        labelColSpan({
          display: 'inline',
          mutator(value) {
            setChildrenFieldProps(this.getNode(), 'labelColSpan', value);
          },
          disabled() {
            return this.getProps().getPropValue('labelAlign') === 'top';
          },
          supportVariable: false,
        }),
        size({
          // mutator(value) {
          //   setChildrenFieldProps(this.getNode(), 'size', value);
          // },
          supportVariable: false,
        }),
      ],
    },
    {
      name: 'createForm',
      initialValue: true,
      hidden: true,
    },
    {
      title: '每行列数',
      name: 'rowColumn',
      initialValue: 3,
      setter: <NumberSetter />,
    },
    {
      title: '标签隔离模式',
      tip: '开启时，拖入的Pickable会自动另起单独的区域来呈现',
      name: 'showTag',
      initialValue: true,
      supportVariable: false,
      setter: <BoolSetter />,
    },
    style({ advanced: true }),
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('filter'),
        ...events([
          {
            name: 'onSubmit',
            title: '提交时触发的事件',
            initialValue: `/**
* filter onFilterSubmit
* @param value: 表单的值
*/
function onFilterSubmit(values) {
  console.log('onFilterSubmit', values);
}`,
          },
          {
            name: 'onReset',
            title: '重置按钮点击触发的事件',
            initialValue: `/**
* filter onFilterReset
* @param value: 表单的值
*/
function onFilterRest(values) {
  console.log('onFilterReset', values);
}`,
          },
        ], { display: 'none' }),
      ],
    }],
});


export default [
  filterBundle
];
