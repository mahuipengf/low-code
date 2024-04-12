import React from 'react';
import { Bundle } from '@ali/visualengine';
import {
  I18nSetter,
  NumberSetter,
  JsonSetter,
  ChoiceSetter,
  BoolSetter,
  ListSetter,
  ActionSetter,
  ValidationSetter,
} from '@ali/visualengine-utils';
import {
  label,
  behavior,
  formCategory,
  labelAlign,
  labelColSpan,
  labelColOffset,
  wrapperColSpan,
  wrapperColOffset,
  labelTextAlign,
  tips,
  labelTipsType,
  labelTipsIcon,
  labelTips,
  labelTipsText,
  labelTipsRender,
  validation,
  advanced,
} from '../common/vu-fusion-field-property';
import Logo from './logo.svg';

// 允许拖入明细组件中的非表单组件列表
import $i18n from '../i18n/index';
import { tableFieldDoc, tableFieldValue } from '../common/tipUrls';
const NOT_FORMFIELD_DROP_IN_LIST = ['ColumnsLayout'];

// 不允许拖入明细组件中的表单组件列表
const FORMFIELD_NOT_DROP_IN_LIST = ['TableField', 'Form', 'SearchField', 'InstanceField'];

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepDetail', dm: '明细' }),
  componentName: 'TableField',
  category: $i18n.get({ id: 'deepForm', dm: '表单' }),
  icon: Logo,
  docUrl: tableFieldDoc,
  isContainer: true,
  canDragging: true,
  canDropIn(placement) {
    const componentName = placement.getComponentName();
    if (NOT_FORMFIELD_DROP_IN_LIST.indexOf(componentName) > -1) {
      return true;
    }
    if (FORMFIELD_NOT_DROP_IN_LIST.indexOf(componentName) > -1) {
      return false;
    }
    if (
      placement.getCategory &&
      placement.getCategory() !== $i18n.get({ id: 'deepForm', dm: '表单' })
    ) {
      return false;
    }
    if (
      placement.getPrototype &&
      placement.getPrototype().getCategory() !== $i18n.get({ id: 'deepForm', dm: '表单' })
    ) {
      return false;
    }
    return true;
  },
  didDropIn(dragment) {
    dragment.setPropValue('isCustomStore', true);
    if (this.getProps().getPropValue('representation') === 'TABLE') {
      dragment.getPrototype().options.isInline = true;
    }
  },
  didDropOut(dragment) {
    dragment.setPropValue('isCustomStore', false);
    dragment.getPrototype().options.isInline = false;
  },
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1nYqOuW61gK0jSZFlXXXDKFXa-112-64.png',
      label: $i18n.get({ id: 'deepDetail', dm: '明细' }),
      schema: {
        componentName: 'TableField',
        props: {},
      },
    },
  ],

  configure: [
    formCategory(),
    formCategory('mediator'), // 受控处理标记
    label({
      supportVariable: true,
      initialValue: {
        zh_CN: '明细',
        en_US: 'Table Field',
        type: 'i18n',
      },
    }),

    {
      name: 'value',
      title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
      display: 'inline',
      supportVariable: true,
      initialValue: [],
      tip: {
        content: $i18n.get({
          id: 'deepPleaseFillInThe',
          dm: '请在代码编辑器中填写默认值, 具体格式请点击当前链接',
        }),
        url: tableFieldValue,
      },

      setter: <JsonSetter />,
    },

    labelAlign(),
    labelColSpan(),
    labelColOffset(),
    wrapperColSpan(),
    wrapperColOffset(),
    labelTextAlign(),
    tips(),
    behavior(),
    labelTipsType(),
    labelTipsIcon(),
    labelTips(),
    labelTipsText(),
    labelTipsRender(),
    // {{ 兼容旧版属性，只保留申明，不显示 Start
    { name: 'representation', display: 'none', ignore: true },
    { name: 'buttonName', display: 'none', ignore: true },
    { name: 'buttonBehavior', display: 'none', ignore: true },
    { name: 'deleteButtonName', display: 'none', ignore: true },
    { name: 'moveUpButtonName', display: 'none', ignore: true },
    { name: 'moveDownButtonName', display: 'none', ignore: true },
    { name: 'listNum', display: 'none', ignore: true },
    { name: 'listMinNum', display: 'none', ignore: true },
    // 兼容旧版属性，只保留申明，不显示 End }}
    {
      name: 'layout',
      title: $i18n.get({ id: 'deepArrangement', dm: '排列方式' }),
      tip: $i18n.get({ id: 'deepTableModeIsOnly', dm: '表格方式只在 PC 模式下有效' }),
      display: 'inline',
      initialValue: 'TILED',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            {
              tip: $i18n.get({ id: 'deepTileMode', dm: '平铺方式' }),
              title: $i18n.get({ id: 'deepTileMode', dm: '平铺方式' }),
              value: 'TILED',
            },

            {
              tip: $i18n.get({ id: 'deepForm.2', dm: '表格方式' }),
              title: $i18n.get({ id: 'deepForm.2', dm: '表格方式' }),
              value: 'TABLE',
            },
          ]}
        />
      ),

      initial(value) {
        if (['TABLE', 'TILED'].indexOf(value) !== -1) {
          return value;
        }

        const oldValue = this.getProps().getPropValue('representation');
        if (oldValue) {
          return oldValue;
        }

        return 'TILED';
      },
    },

    {
      name: 'theme',
      title: $i18n.get({ id: 'deepTheme', dm: '主题' }),
      tip: $i18n.get({ id: 'deepEffectiveOnlyInThe', dm: '只在 PC 表格方式下有效' }),
      display: 'inline',
      initialValue: 'split',
      supportVariable: true,
      setter: (
        <ChoiceSetter
          options={[
            { value: 'zebra', title: $i18n.get({ id: 'deepZebra', dm: '斑马纹' }) },
            { value: 'split', title: $i18n.get({ id: 'deepDividingLine', dm: '分割线' }) },
            { value: 'border', title: $i18n.get({ id: 'deepBorderLine', dm: '边框线' }) },
          ]}
        />
      ),

      hidden() {
        return this.getProps().getPropValue('layout') !== 'TABLE';
      },
    },

    {
      name: 'showIndex',
      title: $i18n.get({ id: 'deepSequenceNumberDisplay', dm: '显示序号' }),
      display: 'inline',
      initialValue: true,
      supportVariable: true,
      setter: <BoolSetter />,
    },

    {
      name: 'showTableHead',
      title: $i18n.get({ id: 'deepDisplayHead', dm: '显示表头' }),
      tip: $i18n.get({ id: 'deepEffectiveOnlyInThe', dm: '只在 PC 表格方式下有效' }),
      display: 'inline',
      initialValue: true,
      supportVariable: true,
      setter: <BoolSetter />,
      hidden() {
        return this.getProps().getPropValue('layout') !== 'TABLE';
      },
    },

    {
      name: 'showSortable',
      title: $i18n.get({ id: 'deepSort', dm: '显示排序' }),
      tip: $i18n.get({ id: 'deepEffectiveOnlyInThe', dm: '只在 PC 表格方式下有效' }),
      display: 'inline',
      supportVariable: true,
      initialValue: false,
      setter: <BoolSetter />,
    },

    {
      name: 'showActions',
      title: $i18n.get({ id: 'deepDisplayOperation', dm: '显示操作' }),
      tip: $i18n.get({ id: 'deepRemoveAfterTurningOff', dm: '关闭后删除、排序均不再显示' }),
      display: 'inline',
      supportVariable: true,
      initialValue: true,
      setter: <BoolSetter />,
    },

    {
      name: 'addButtonPosition',
      title: $i18n.get({ id: 'deepButtonLocation', dm: '按钮位置' }),
      display: 'inline',
      initialValue: 'bottom',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepBottom', dm: '底部' }),
              value: 'bottom',
            },

            {
              title: $i18n.get({ id: 'deepTop', dm: '顶部' }),
              value: 'top',
            },
          ]}
        />
      ),
    },

    {
      name: 'addButtonText',
      title: $i18n.get({ id: 'deepButtonName', dm: '按钮名称' }),
      display: 'inline',
      initialValue: {
        zh_CN: '新增一项',
        en_US: 'Add item',
        type: 'i18n',
      },

      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
      initial(value) {
        if (value) {
          return value;
        }

        const oldValue = this.getProps().getPropValue('buttonName');
        if (oldValue) {
          return oldValue;
        }

        return $i18n.get({ id: 'deepAddOne', dm: '新增一项' });
      },
    },

    {
      name: 'addButtonBehavior',
      title: $i18n.get({ id: 'deepButtonStatus', dm: '按钮状态' }),
      tip: $i18n.get({ id: 'deepAddedButtonSOperational', dm: '新增按钮的可操作状态' }),
      display: 'inline',
      initialValue: 'NORMAL',
      setter: (
        <ChoiceSetter
          options={[
            {
              title: $i18n.get({ id: 'deepOrdinary', dm: '普通' }),
              value: 'NORMAL',
            },

            {
              title: $i18n.get({ id: 'deepDisable', dm: '禁用' }),
              value: 'DISABLED',
            },

            {
              title: $i18n.get({ id: 'deepHide', dm: '隐藏' }),
              value: 'HIDDEN',
            },
          ]}
        />
      ),

      supportVariable: true,
      initial(value) {
        if (value) {
          return value;
        }

        const oldValue = this.getProps().getPropValue('buttonBehavior');
        if (oldValue) {
          return oldValue;
        }

        return 'NORMAL';
      },
    },

    {
      name: 'delButtonText',
      title: $i18n.get({ id: 'deepDeleteButton', dm: '删除按钮' }),
      tip: $i18n.get({ id: 'deepDeleteButton.1', dm: '删除按钮文案' }),
      display: 'inline',
      initialValue: {
        zh_CN: '删除',
        en_US: 'Remove',
        type: 'i18n',
      },

      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
      initial(value) {
        if (value) {
          return value;
        }

        const oldValue = this.getProps().getPropValue('deleteButtonName');
        if (oldValue) {
          return oldValue;
        }

        return $i18n.get({ id: 'deepDelete', dm: '删除' });
      },
    },

    {
      name: 'moveUp',
      title: $i18n.get({ id: 'deepMoveButton', dm: '上移按钮' }),
      tip: $i18n.get({ id: 'deepUploadButton', dm: '上移按钮文案' }),
      display: 'inline',
      initialValue: {
        zh_CN: '上移',
        en_US: 'Up',
        type: 'i18n',
      },

      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
      supportVariable: true,
      hidden() {
        return !this.getProps().getPropValue('showSortable');
      },
      initial(value) {
        if (value) {
          return value;
        }

        const oldValue = this.getProps().getPropValue('moveUpButtonName');
        if (oldValue) {
          return oldValue;
        }

        return $i18n.get({ id: 'deepMoveUp', dm: '上移' });
      },
    },

    {
      name: 'moveDown',
      title: $i18n.get({ id: 'deepDownButton', dm: '下移按钮' }),
      tip: $i18n.get({ id: 'deepDownButton.1', dm: '下移按钮文案' }),
      display: 'inline',
      initialValue: {
        zh_CN: '下移',
        en_US: 'Down',
        type: 'i18n',
      },

      setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,

      supportVariable: true,
      hidden() {
        return !this.getProps().getPropValue('showSortable');
      },
      initial(value) {
        if (value) {
          return value;
        }

        const oldValue = this.getProps().getPropValue('moveDownButtonName');
        if (oldValue) {
          return oldValue;
        }

        return $i18n.get({ id: 'deepMoveDown', dm: '下移' });
      },
    },

    {
      name: 'maxItems',
      title: $i18n.get({ id: 'deepMaximumNumber', dm: '最大条数' }),
      display: 'inline',
      setter: <NumberSetter min={0} />,
    },

    {
      name: 'minItems',
      title: $i18n.get({ id: 'deepMinimumNumber', dm: '最小条数' }),
      display: 'inline',
      initialValue: 1,
      setter: <NumberSetter min={0} />,
    },

    {
      name: 'actionsColumnWidth',
      title: $i18n.get({ id: 'deepOperatingWidth', dm: '操作宽度' }),
      display: 'inline',
      initialValue: 70,
      setter: (
        <NumberSetter
          min={0}
          units={[
            {
              type: 'px',
              list: true,
            },
          ]}
        />
      ),
    },

    {
      name: 'actions',
      title: $i18n.get({ id: 'deepOperate', dm: '操作列' }),
      tip: $i18n.get({ id: 'deepTableFieldActionsTip', dm: '仅 PC 端支持, 操作列默认是最后一列' }),
      display: 'accordion',
      collapsed: false,
      initialValue: [],
      supportVariable: true,
      setter: (
        <ListSetter
          display="entry"
          checkField={null}
          configure={[
            {
              name: 'content',
              title: $i18n.get({ id: 'deepName', dm: '名称' }),
              initialValue: {
                type: 'i18n',
                zh_CN: '操作',
                en_US: 'action',
              },

              setter: <I18nSetter />,
            },

            {
              name: 'callback',
              title: $i18n.get({ id: 'deepCallback', dm: '回调函数' }),
              setter: (
                <ActionSetter
                  defaultCode={`function onActionClick({ index, groupId, itemValue, actionKey }) {
  console.log(actionKey);
}`}
                  defaultActionName="onActionClick"
                />
              ),
            },

            {
              name: 'render',
              title: $i18n.get({ id: 'deepCustomRendering', dm: '定制渲染' }),
              tip: $i18n.get({
                id: 'deepWhenReturningFalseThis',
                dm: '返回 false 时，该操作不可见',
              }),
              setter: (
                <ActionSetter
                  defaultCode={`function onActionRender({ index, groupId, itemValue, actionKey }) {
  return title;
}`}
                  defaultActionName="onActionRender"
                />
              ),
            },
          ]}
        />
      ),
    },

    {
      title: $i18n.get({ id: 'deepExtensionConfiguration', dm: '扩展配置' }),
      type: 'group',
      display: 'entry',
      // 引擎暂不支持  entry + tip
      // tip: $i18n.get({
      //   id: 'deepVariousButtonsStatusCustom',
      //   dm: '各种按钮状态、自定义渲染回调等配置项',
      // }),
      items: [
        {
          name: 'addButtonProps',
          title: $i18n.get({ id: 'deepAddButtonExtensionAttribute', dm: '添加按钮扩展属性' }),
          tips: $i18n.get({
            id: 'deepSupportSomeOfThe',
            dm: '支持部分 Button 组件的属性，具体参考 Button 文档',
          }),
          display: 'block',
          setter: <JsonSetter />,
          supportVariable: true,
        },
        {
          name: 'showDeleteConfirm',
          title: $i18n.get({ id: 'deepWhetherToTurnOn', dm: '是否开启删除二次确认' }),
          display: 'block',
          initialValue: true,
          setter: <BoolSetter />,
          supportVariable: true,
        },
        {
          name: 'actionsMaxShown',
          title: $i18n.get({ id: 'deepAutomaticTracing', dm: '行操作大于 n 个后自动收起' }),
          tips: $i18n.get({
            id: 'deepWhenTheNumberOf',
            dm: '当行操作 actions 的个数超过配置个数后，会自动折叠为下拉菜单',
          }),
          display: 'block',
          initialValue: 3,
          setter: <NumberSetter />,
          supportVariable: true,
        },
        {
          name: 'showErrorDetail',
          title: $i18n.get({ id: 'deepErrorDetailDisplay', dm: '错误明细显示个数' }),
          tips: $i18n.get({
            id: 'deepDefineTheNumberOf',
            dm: '定义子表单域校验错误信息的显示个数，默认是 3 个，设置为 0 时不显示错误明细',
          }),
          display: 'block',
          initialValue: 3,
          setter: <NumberSetter />,
          supportVariable: true,
        },
        {
          name: 'delButtonBehavior',
          title: $i18n.get({ id: 'deepDeleteOperationStatus', dm: '删除操作状态' }),
          display: 'block',
          setter: (
            <ActionSetter
              defaultActionName="tfDelButtonBehavior"
              defaultCode={`function tfDelButtonBehavior({ groupId, index, itemValue, total }) {
  return 'NORMAL';
}`}
            />
          ),
        },
        {
          name: 'itemBehavior',
          title: $i18n.get({ id: 'deepSubformState', dm: '子表单状态' }),
          display: 'block',
          setter: (
            <ActionSetter
              defaultActionName="tfItemBehavior"
              defaultCode={`function tfItemBehavior({ groupId, index, itemValue }) {
  return 'NORMAL';
}`}
            />
          ),
        },
        {
          name: 'fieldBehavior',
          title: $i18n.get({ id: 'deepSubsheetSingleFieldStatus', dm: '子表单域状态' }),
          display: 'block',
          setter: (
            <ActionSetter
              defaultActionName="tfFieldBehavior"
              defaultCode={`function tfFieldBehavior({ groupId, index, itemValue, fieldName }) {
  return 'NORMAL';
}`}
            />
          ),
        },
        {
          name: 'errorRender',
          title: $i18n.get({ id: 'deepErrorMessageCustomRendering', dm: '错误信息自定义渲染' }),
          display: 'block',
          setter: (
            <ActionSetter
              defaultActionName="tfErrorRender"
              defaultCode={$i18n.get({
                id: 'deepFunctionTFERRRENDERERRORSReturn',
                dm: "function tfErrorRender(errors) {\n  return '输入错误';\n}",
              })}
            />
          ),
        },

        {
          name: 'extraButtons',
          title: $i18n.get({ id: 'deepBottomExtensionButton', dm: '底部扩展按钮' }),
          tips: $i18n.get({
            id: 'deepTheExtendedButtonWill',
            dm: '扩展按钮会显示在底部新增按钮的右侧',
          }),
          display: 'block',
          supportVariable: true,
          setter: (
            <ActionSetter
              defaultActionName="tfExtraButtons"
              defaultCode={$i18n.get({
                id: 'deepFunctionTFextrabuttonsValueBehavior',
                dm:
                  'function tfExtraButtons({ value, behavior }) {\n  return (<Deep.Button size="small" onClick={() => { console.log(\'执行导入\'); }}>\n    导入\n  </Deep.Button>);\n}',
              })}
            />
          ),
        },
      ],
    },

    validation({
      setter: <ValidationSetter supports={['required']} />,
    }),

    advanced('tableField', [
      {
        name: 'onChange',
        title: $i18n.get({ id: 'deepONCHANGETableValueChange', dm: 'onChange 表单值变化' }),
        initialValue: `/**
* TableField onChange
*/
function onChange({ value, extra }){
  console.log(value, extra);
}`,
      },

      {
        name: 'beforeAddClick',
        title: $i18n.get({
          id: 'deepBeForeAddClickAddsACallback',
          dm: 'beforeAddClick 添加回调执行前',
        }),
        initialValue: `/**
* TableField beforeAddClick
*/
function beforeAddClick(){
  console.log('添加回调执行前');
}`,
      },

      {
        name: 'onAddClick',
        title: $i18n.get({ id: 'deepOnaddClickClickToAdd', dm: 'onAddClick 点击添加' }),
        initialValue: `/**
* TableField onAddClick
*/
function onAddClick(newGroupId){
  console.log('点击添加');
}`,
      },

      {
        name: 'beforeDelClick',
        title: $i18n.get({
          id: 'deepBeforDelClickDeletesCallbackExecution',
          dm: 'beforeDelClick 删除回调执行前',
        }),
        initialValue: `/**
* TableField beforeDelClick
*/
function beforeDelClick(groupId, item){
  console.log('删除回调执行前');
}`,
      },

      {
        name: 'onDelClick',
        title: $i18n.get({ id: 'deepOnDelClickClickToDelete', dm: 'onDelClick 点击删除' }),
        initialValue: `/**
* TableField onDelClick
* @param groupId 被删除的ID
* @param removedItem 被删除的项数据
*/
function onDelClick(groupId, removedItem){
  console.log(groupId, removedItem);
}`,
      },
    ]),
  ],
});
