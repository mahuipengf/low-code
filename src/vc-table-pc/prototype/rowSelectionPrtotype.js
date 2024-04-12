import {
  TextSetter,
  JsonSetter,
  BoolSetter,
  ChoiceSetter,
  ActionSetter,
} from '@ali/visualengine-utils';
import { runInContext } from 'vm';

export default function(env) {
  return {
    title: '行选择器',
    type: 'group',
    display: env === 'design' ? 'accordion' : 'entry',
    collapsed: true,
    items: [
      {
        name: 'showRowSelector',
        title: '是否显示',
        supportVariable: true,
        display: 'inline',
        initialValue: false,
        setter: <BoolSetter />,
      },
      {
        name: 'rowSelection',
        title: '行选择配置',
        type: 'composite',
        display: 'plain',
        items: [
          {
            name: 'mode',
            title: '类型',
            initialValue: 'multiple',
            display: 'inline',
            supportVariable: true,
            setter: (
              <ChoiceSetter
                options={[
                  { value: 'multiple', title: '复选' },
                  { value: 'single', title: '单选' },
                ]}
              />
            ),
            disabled() {
              return !this.getProps().getPropValue('showRowSelector');
            },
          },
          {
            name: 'selectedRowKeys',
            title: '已选中的行',
            tip: '请传入一个数组，元素为选中行的 primaryKey',
            display: 'block',
            supportVariable: true,
            initialValue: '',
            required: false,
            setter: <JsonSetter />,
            disabled() {
              return !this.getProps().getPropValue('showRowSelector');
            },
            hidden: env === 'design' ? true : false,
          },
          {
            name: 'onChange',
            title: '选择变动回调',
            display: 'accordion',
            setter: <ActionSetter defaultCode={`/**
      * 选择（或取消选择）数据之后的回调
      * @param selectedRowKeys Array 选中行的 key
      * @param records Array 选中行的数据
      */
      function onSelectChange(selectedRowKeys, records) {
        console.log(selectedRowKeys, records);
      }`}
              defaultActionName="onSelectChange"
            />,
            disabled() {
              return !this.getProps().getPropValue('showRowSelector');
            },
            hidden: env === 'design' ? true : false,
          },
          {
            name: 'onSelect',
            title: '单行选择回调',
            display: 'accordion',
            setter: <ActionSetter defaultCode={`/**
      * 选择（或取消选择）数据之后的回调
      * @param selected Boolean 是否选中
      * @param rowData Object 当前操作行
      * @param selectedRows Array 选中的行数据
      */
      function onSelect(selected, rowData, selectedRows) {
        console.log(selected, rowData, selectedRows);
      }`}
              defaultActionName="onSelect"
            />,
            disabled() {
              return !this.getProps().getPropValue('showRowSelector');
            },
            hidden: env === 'design' ? true : false,
          },
          {
            name: 'onSelectAll',
            title: '全部选择回调',
            display: 'accordion',
            setter: <ActionSetter defaultCode={`/**
      * 选择（或取消选择）所有数据之后的回调
      * @param selected Boolean 是否选中
      * @param selectedRows Array 选中的行数据
      */
      function onSelectAll(selected, selectedRows) {
        console.log(selected, selectedRows);
      }`}
              defaultActionName="onSelectAll"
            />,
            disabled() {
              return !this.getProps().getPropValue('showRowSelector');
            },
            hidden: env === 'design' ? true : false,
          },
          {
            name: 'columnProps',
            title: '选择列属性',
            tip: '选择列的列属性，所有 Table.Column 支持的属性都可以使用',
            display: 'accordion',
            setter: <ActionSetter defaultCode={`/**
      * 选择列属性
      */
      function selectionColumnProps() {
        return {};
      }`}
              defaultActionName="selectionColumnProps"
            />,
            disabled() {
              return !this.getProps().getPropValue('showRowSelector');
            },
            hidden: env === 'design' ? true : false,
          },
          {
            name: 'getProps',
            title: '选择器属性',
            display: 'accordion',
            setter: <ActionSetter defaultCode={`/**
      * 选择器属性
      */
      function getSelectorProps(rowData, index) {
        return {};
      }`}
              defaultActionName="selectionTitleProps"
            />,
            disabled() {
              return !this.getProps().getPropValue('showRowSelector');
            },
            hidden: env === 'design' ? true : false,
          },
          {
            name: 'titleProps',
            title: '选择列列标题属性',
            display: 'accordion',
            setter: <ActionSetter defaultCode={`/**
      * 选择列列标题属性
      */
      function selectionTitleProps(rowData, index) {
        return {};
      }`}
              defaultActionName="selectionTitleProps"
            />,
            disabled() {
              return !this.getProps().getPropValue('showRowSelector');
            },
            hidden: env === 'design' ? true : false,
          },
          {
            name: 'titleAddons',
            title: '选择列列标题元素',
            display: 'accordion',
            setter: <ActionSetter defaultCode={`/**
      * 选择列列标题元素
      */
      function selectionTitleAddons(rowData, index) {
        return false;
      }`}
              defaultActionName="selectionTitleAddons"
            />,
            disabled() {
              return !this.getProps().getPropValue('showRowSelector');
            },
            hidden: env === 'design' ? true : false,
          },
        ],
      }
    ],
  }
};
