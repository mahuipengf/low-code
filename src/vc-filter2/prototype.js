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

import { isComponentFormField } from '../common/formFieldUtils';
import $i18n from '../i18n/index';
import { filter2Doc } from '../common/tipUrls';

const inputWrapper = {
  ...wrapperColSpan({ title: $i18n.get({ id: 'deepQueryBox', dm: '查询框' }) }),
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
    const page = Pages.getCurrentPage();
    // const newProps = node.getProps();
    try {
      if (!node.getParent()) {
        // node = Exchange.getSelected();
        // node.setProps(newProps);
        console.warn(
          $i18n.get({ id: 'deepExecutiveExceptionUnableTo', dm: '执行异常，无法选中父节点' })
        );
        return;
      }
      // 避免生成新的 fieldId
      utils.disableUniqueIdChecker('fieldId');
      node.getParent().replaceChild(
        node,
        { ...node.toData(), children: schema },
        // 避免生成新的 nodeId
        { reserveSchemaNodeId: true }
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
  title: $i18n.get({ id: 'deepInquire', dm: '查询' }),
  componentName: 'Filter2',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
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
  //     fields,
  //     action,
  //     rows,
  //     config,
  //     form: node,
  //   });

  //   replaceChild({ node, schema });
  // },
  initialChildren,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1gaZrr.T1gK0jSZFhXXaAtVXa-1048-366.png',
      label: $i18n.get({ id: 'deepInquiryRecommended', dm: '查询' }),
      schema: {
        componentName: 'Filter2',
        props: {},
      },
    },
  ],

  configure: [
    {
      name: 'config',
      title: $i18n.get({ id: 'deepFilter', dm: '筛选项配置' }),
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
            if (
              oldConfig.componentName !== newConfig.componentName &&
              oldConfig.componentName !== 'FilterPickableField'
            ) {
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
          draggable={false}
          editable
          descriptor={(item) => {
            const locale = Env.getLocale();
            const title = (item.getParamValue('title') || {})[locale];
            const isAdvanced = item.getParamValue('isAdvanced');
            const isFilter = item.getParamValue('isFilter');
            const localeMap = {
              zh_CN: {
                advanced: $i18n.get({ id: 'deepAdvancedSearch', dm: '(高级查询)' }),
                filter: $i18n.get({ id: 'deepFilter.1', dm: '(筛选)' }),
              },

              en_US: {
                advanced: ' (Advanced)',
                filter: ' (filter)',
              },
            };

            const surfix =
              isAdvanced || isFilter ? localeMap[locale][isAdvanced ? 'advanced' : 'filter'] : '';
            return `${title}${surfix}`;
          }}
          configure={[
            {
              name: 'title',
              title: $i18n.get({ id: 'deepName', dm: '名称' }),
              setter: <I18nSetter />,
              editable: true,
              // disabled: true,
              // hidden() {
              //   return true;
              // },
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
              title: $i18n.get({ id: 'deepSummit', dm: '跨列数量' }),
              initialValue: 1,
              editable: true,
              setter: <TextSetter />,
              hidden() {
                return this.getParent().getParamValue('isFilter');
              },
            },

            {
              name: 'isAdvanced',
              title: $i18n.get({ id: 'deepIsThereASenior', dm: '是否高级查询' }),
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
      title: $i18n.get({ id: 'deepBulkSettings', dm: '批量设置' }),
      type: 'group',
      display: 'accordion',
      items: [
        {
          name: 'labelAlign',
          title: $i18n.get({ id: 'deepTitlePosition', dm: '标题位置' }),
          display: 'inline',
          initialValue: 'top',
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
      title: $i18n.get({ id: 'deepEachRace', dm: '每行列数' }),
      name: 'rowColumn',
      initialValue: 3,
      setter: <NumberSetter />,
    },

    {
      title: $i18n.get({ id: 'deepTagIsolationMode', dm: '标签隔离模式' }),
      tip: $i18n.get({
        id: 'deepWhenTurnedOnThe',
        dm: '开启时，拖入的Pickable会自动另起单独的区域来呈现',
      }),
      name: 'showTag',
      initialValue: true,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      title: $i18n.get({ id: 'deepFilterShowBottomLine', dm: '显示底部隔离线' }),
      name: 'showBottomLine',
      initialValue: true,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('filter'),
        ...events([
          {
            name: 'onSubmit',
            title: $i18n.get({ id: 'deepTriggeringEventsWhenSubmitting', dm: '提交时触发的事件' }),
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
            title: $i18n.get({ id: 'deepResetButtonClickTo', dm: '重置按钮点击触发的事件' }),
            initialValue: `/**
* filter onFilterReset
* @param value: 表单的值
*/
function onFilterRest(values) {
  console.log('onFilterReset', values);
}`,
          },
          {
            name: 'onChange',
            title: $i18n.get({ id: 'deepValueChanges', dm: '值发生变化' }),
            initialValue: `/**
* filter onChange
* @param value: 表单的值
*/
function onChange(values) {
  console.log('onChange', values);
}`,
          },
          {
            name: 'onAdvanceSearchVisibleChange',
            title: $i18n.get({ id: 'deepAdvanceSearchVisibleChange', dm: '高级搜索展开收起时的事件' }),
            initialValue: `/**
* filter onAdvanceSearchVisibleChange
* @param visible: 高级搜索是否可见
* @param value: 表单的值
*/
function onAdvanceSearchVisibleChange(visible, values) {
  console.log('onAdvanceSearchVisibleChange', visible, values);
}`,
          },
        ]),
      ],
    },
  ],
});

export default [filterBundle];
