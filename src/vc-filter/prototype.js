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

import pickableFieldBundle from './pickablePrototype';
import $i18n from '../i18n/index';
import { filterDoc } from '../common/tipUrls';

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
    const newProps = node.getProps();
    try {
      if (!node.getParent()) {
        node = Exchange.getSelected();
        node.setProps(newProps);
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
  title: $i18n.get({ id: 'deepInquiryNotRecommended', dm: '查询(不推荐)' }),
  componentName: 'Filter',
  category: $i18n.get({ id: 'deepOther', dm: '其他' }),
  icon: Icon,
  docUrl: filterDoc,
  isContainer: true,
  canDropTo(container) {
    const parentsName = getParentsName(container);
    return parentsName.indexOf('Form') === -1 && parentsName.indexOf('Filter') === -1;
  },
  canDropIn(placement) {
    return isComponentFormField(placement);
  },
  didDropIn(dragment) {
    if (isComponentFormField(dragment)) {
      dragment.setPropValue('labelAlign', this.getProps().getPropValue('labelAlign'));
      dragment.setPropValue('style', { maxWidth: '' });
      const node = this.getProps().getNode();
      const children = node.getChildren();
      const { fields, action, rows } = getFieldsFromChildren(children.concat([dragment]));
      const config = this.getProps().getPropValue('config');
      const schema = getSchemaFromFields({
        fields,
        action,
        rows,
        config,
        form: node,
      });

      replaceChild({ node, schema });
    }
  },
  subtreeModified(node) {
    // this 的指向不对，只能用 node
    const children = node.getChildren();
    const { fields, action, rows } = getFieldsFromChildren(children);
    const config = node.getProps().getPropValue('config');
    const schema = getSchemaFromFields({
      fields,
      action,
      rows,
      config,
      form: node,
    });

    replaceChild({ node, schema });
  },
  initialChildren,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1gaZrr.T1gK0jSZFhXXaAtVXa-1048-366.png',
      label: $i18n.get({ id: 'deepQueryWaitingForDiscard', dm: '查询(不推荐)' }),
      schema: {
        componentName: 'Filter',
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
      mutator(value) {
        const node = this.getProps().getNode();
        const children = node.getChildren();
        const { fields, action, rows } = getFieldsFromChildren(children);
        const fieldsMap = getMapFromFields(fields);
        const newFields = value.map((field) => fieldsMap[getId(field)]);
        const schema = getSchemaFromFields({
          fields: newFields,
          action,
          rows,
          config: value,
          form: node,
        });

        replaceChild({ node, schema });
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
              setter: <I18nSetter readOnly />,
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
              name: 'isAdvanced',
              title: $i18n.get({ id: 'deepSetAsAdvancedQuery', dm: '设为高级查询项' }),
              initialValue: false,
              editable: true,
              setter: <BoolSetter />,
              hidden() {
                return this.getParent().getParamValue('isFilter');
              },
            },

            {
              name: 'isFilter',
              title: $i18n.get({ id: 'deepConvertToLabelFilter', dm: '转换为标签筛选' }),
              initialValue: false,
              setter: <BoolSetter />,
              hidden() {
                const componentName = this.getParent().getParamValue('componentName');
                return (
                  ['SelectField', 'CheckboxField', 'FilterPickableField'].indexOf(componentName) ===
                    -1 || this.getParent().getParamValue('isAdvanced')
                );
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

          mutator(value) {
            setChildrenFieldProps(this.getNode(), 'labelAlign', value);
          },
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

        inputWrapper,
        size({
          mutator(value) {
            setChildrenFieldProps(this.getNode(), 'size', value);
          },
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
      title: $i18n.get({ id: 'deepDisplayLabel', dm: '显示标签' }),
      name: 'showTag',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      title: $i18n.get({ id: 'deepMobileButtonTitle', dm: '移动端按钮标题' }),
      tip: $i18n.get({
        id: 'deepTheMobileFilterWill',
        dm: '移动端筛选会被收起为 Drawer 形态，默认显示为一个触发按钮',
      }),
      name: 'mobileTitle',
      initialValue: {
        zh_CN: '数据查询',
        en_US: 'Filter',
        type: 'i18n',
      },

      supportVariable: true,
      setter: <I18nSetter />,
    },

    style({ advanced: true }),
    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: true,
      items: [
        uuid('filter'),
        {
          name: 'allBehavior',
          title: $i18n.get({ id: 'deepScreening', dm: '筛选项显隐' }),
          initialValue: null,
          tip: $i18n.get({ id: 'deepDataFormatIsFieldID', dm: '数据格式为{fieldId: true|false}' }),
          supportVariable: true,
          setter: <JsonSetter />,
        },

        ...events([
          {
            name: 'onFilterChange',
            title: $i18n.get({ id: 'deepWhenScreeningChanges', dm: '筛选发生变化时' }),
            initialValue: `/**
* filter onFilterChange
* @param value: 表单的值
*/
function onFilterChange({value}) {
  console.log('onFilterChange', value);
}`,
          },

          //           {
          //             name: 'onKeyUp',
          //             title: '回车键释放时',
          //             initialValue: `/**
          // * Filter onKeyUp
          // * param event 事件对象
          // */
          // function onKeyUp(ctx, event){
          //   console.log('onKeyUp', event);
          // }`,
          //           },
        ]),
      ],
    },
  ],
});

const rowMutator = (ctx) => {
  const node = ctx.getProps().getNode();
  const filterNode = node.getParent();
  const children = filterNode.getChildren();
  const { fields, action, rows } = getFieldsFromChildren(children);
  const fieldsMap = getMapFromFields(fields);
  const config = filterNode.getPropValue('config');
  const newFields = config.map((field) => fieldsMap[getId(field)]);
  const schema = getSchemaFromFields({
    fields: newFields,
    action,
    rows,
    config,
    form: filterNode,
  });

  replaceChild({ node: filterNode, schema });
};

const columnBundle = Bundle.createPrototype({
  title: $i18n.get({ id: 'deepQueryLine', dm: '查询行' }),
  componentName: 'FilterRow',
  // 高级 | 其他
  category: null,
  isContainer: true,
  canDropIn: false,
  canOperating: false,
  icon: Icon,
  canDragging() {
    return false;
  },
  configure: [
    {
      name: 'columnCount',
      title: $i18n.get({ id: 'deepNumberOfRasterColumns', dm: '栅格栏数' }),
      display: 'inline',
      tip: $i18n.get({ id: 'deepTheNumberOfComponents', dm: '组件数量不能超过栅格栏数' }),
      initialValue: 4,
      setter: (
        <ChoiceSetter
          options={[
            { title: $i18n.get({ id: 'deepFourColumns', dm: '四栏' }), value: 4 },
            { title: $i18n.get({ id: 'deepThreeColumns', dm: '三栏' }), value: 3 },
            { title: $i18n.get({ id: 'deepBin', dm: '二栏' }), value: 2 },
            { title: $i18n.get({ id: 'deepColumn', dm: '一栏' }), value: 1 },
          ]}
        />
      ),

      mutator(value) {
        if (value) {
          rowMutator(this);
        }
      },
    },

    {
      name: 'columnMax',
      title: $i18n.get({ id: 'deepNumberOfComponents', dm: '组件数量' }),
      display: 'inline',
      setter: <NumberSetter max={4} min={0} />,
      initialValue: 4,
      mutator(value) {
        const columnCount = this.getProps().getPropValue('columnCount');
        if (value && (value || 0) <= columnCount) {
          rowMutator(this);
        }
      },
    },
  ],
});

const actionBundle = Bundle.createPrototype({
  title: $i18n.get({ id: 'deepQueryAction', dm: '查询动作' }),
  icon: Icon,
  componentName: 'FilterAction',
  // 高级 | 其他
  category: null,
  isContainer: true,
  canOperating: false,
  canDragging() {
    return false;
  },
  configure: [
    {
      name: 'labelAlign',
      title: $i18n.get({ id: 'deepTitlePosition', dm: '标题位置' }),
      display: 'inline',
      initialValue: 'top',
      supportVariable: true,
      setter() {
        return (
          <ChoiceSetter
            options={[
              {
                title: $i18n.get({ id: 'deepAlignment', dm: '顶对齐' }),
                value: 'left',
                tip: $i18n.get({ id: 'deepAlignment', dm: '顶对齐' }),
              },
              {
                title: $i18n.get({ id: 'deepBottomAlignment', dm: '底对齐' }),
                value: 'top',
                tip: $i18n.get({ id: 'deepBottomAlignment', dm: '底对齐' }),
              },
            ]}
            compact={false}
          />
        );
      },
    },

    {
      name: 'textVAlign',
      display: 'none',
      title: $i18n.get({ id: 'deepButtonAlignment', dm: '按钮对齐方式' }),
      initialValue: 'right',
    },
  ],
});

const emptyBundle = Bundle.createPrototype({
  title: $i18n.get({ id: 'deepQueryPlacement', dm: '查询占位' }),
  componentName: 'FilterEmpty',
  icon: Icon,
  category: null,
  conDropIn: false,
  canDragging() {
    return false;
  },
});

const pickerBundle = Bundle.createPrototype({
  title: $i18n.get({ id: 'deepQueryScreening', dm: '查询筛选' }),
  componentName: 'FilterPicker',
  icon: Icon,
  category: null,
  isContainer: true,
  canOperating: false,
  conDropIn: false,
  canDragging() {
    return false;
  },
});

// const pickableFieldBundle = Bundle.createPrototype({
//   title: '筛选',
//   componentName: 'FilterPickableField',
//   icon: Icon,
//   category: null,
//   isContainer: false,
//   canOperating: false,
//   conDropIn: false,
//   canDragging() {
//     return false;
//   },
//   configure: [
//     formCategory(),
//     label({
//       initialValue: {
//         zh_CN: '筛选',
//         en_US: 'Pickable',
//         type: 'i18n',
//       },
//     }),
//     {
//       name: 'multiple',
//       title: '选择方式',
//       display: 'inline',
//       initialValue: true,
//       setter: (
//         <ChoiceSetter
//           options={[
//             { title: '单选', value: false },
//             { title: '多选', value: true },
//           ]}
//         />
//       ),
//     },
//     {
//       name: 'value',
//       title: '默认值',
//       tip: {
//         content: '点击 ? 查看数据格式。注意：勾中的选项的优先级高于手动输入的默认值',
//       },
//       display: 'inline',
//       initialValue: [],
//       supportVariable: true,
//       setter: <JsonSetter />,
//     },
//     {
//       name: 'labelAlign',
//       title: '标题位置',
//       display: 'inline',
//       initialValue: 'top',
//       supportVariable: true,
//       setter() {
//         return (
//           <ChoiceSetter
//             options={[{
//               title: '左',
//               value: 'left',
//               tip: '左侧',
//             }, {
//               title: '上',
//               value: 'top',
//               tip: '上',
//             }]}
//             compact={false}
//           />
//         );
//       },
//     },
//     {
//       name: 'simpleValueInSingleMode',
//       title: '单选时使用简单值',
//       tip: '单选时，输出和接收的值变成简单的值类型，而非数组，从 [1] 变成 1',
//       display: 'none',
//       initialValue: false,
//       setter: <BoolSetter />,
//     },

//     {
//       name: 'dataSource',
//       display: 'block',
//       title: '选项',
//       tip: {
//         content: '点击 ? 查看对应的数据结构',
//         url:
//           'https://lark.alipay.com/vision/docs/component_data#%E7%AD%9B%E9%80%89%EF%BC%88vc-pickable-field%EF%BC%89',
//       },

//       supportVariable: true,
//       initialValue: [
//         {
//           text: {
//             zh_CN: '选项一',
//             en_US: 'Option 1',
//             type: 'i18n',
//           },

//           value: '1',
//         },
//         {
//           text: {
//             zh_CN: '选项二',
//             en_US: 'Option 2',
//             type: 'i18n',
//           },

//           value: '2',
//         },
//         {
//           text: {
//             zh_CN: '选项三',
//             en_US: 'Option 3',
//             type: 'i18n',
//           },

//           value: '3',
//         },
//       ],

//       setter: <OptionsSetter multiple />,
//     },

//     advanced('pickableField', [
//       {
//         name: 'onChange',
//         title: '值发生变化',
//         initialValue: `/**
// * pickableField onChange
// * @param value array 选中的值
// */
// function onChange({ value } ){
//   console.log(value);
// }`,
//       },
//     ]),
//   ],
// });

export default [
  filterBundle,
  columnBundle,
  actionBundle,
  emptyBundle,
  pickerBundle,
  pickableFieldBundle,
];
