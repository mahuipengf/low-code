import { Bundle } from '@ali/visualengine';
import { BoolSetter } from '@ali/visualengine-utils';
import events from '@ali/vu-events-property';
import uuid from '@ali/vu-uuid-property';
import { tableApi, tableDoc } from '../common/tipUrls';
import $i18n from '../i18n/index';
import Icon from './logo.svg';
import actionBarPrototype from './prototype/actionBarPrototype';
import actionColumnsPrototype from './prototype/actionColumnsPrototype';
import columnsPrototype from './prototype/columnsPrototype';
import datasourcePrototype from './prototype/datasourcePrototype';
import expandPrototype from './prototype/expandPrototype';
import mobilePrototype from './prototype/mobilePrototype';
import paginationPrototype from './prototype/paginationPrototype';
import rowSelectionPrototype from './prototype/rowSelectionPrtotype';
import stylePrototype from './prototype/stylePrototype';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepTableTitle', dm: '表格' }),
  componentName: 'TablePc',
  category: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
  icon: Icon,
  docUrl: tableDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ZU1HuVT7gK0jSZFpXXaTkpXa-112-64.png',
      label: $i18n.get({ id: 'deepTableTitle', dm: '表格' }),
      schema: {
        componentName: 'TablePc',
        props: {
          noPadding: true,
        },
      },
    },
  ],

  configure: [
    columnsPrototype,
    datasourcePrototype,
    actionColumnsPrototype(),
    actionBarPrototype(),
    stylePrototype(),
    rowSelectionPrototype(),
    paginationPrototype(),
    expandPrototype(),
    mobilePrototype(),
    {
      name: '__router',
      title: $i18n.get({
        id: 'deepImplicitIncomingTHISUTILS',
        dm: '隐含传入 this.utils.router 供链接跳转使用',
      }),
      display: 'none',
      initialValue: {
        type: 'JSExpression',
        value: 'this.utils.router',
      },
    },

    {
      type: 'group',
      title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
      display: 'accordion',
      collapsed: false,
      tip: {
        content: $i18n.get({ id: 'deepSpecificEventAPI', dm: '具体事件API' }),
        url: tableApi,
      },

      items: [
        uuid('tablePc'),
        ...events([
          {
            name: 'onFetchData',
            title: $i18n.get({
              id: 'deepTriggerWhenSearchingSearch',
              dm: '分页、搜索、排序时触发',
            }),
            initialValue: `/**
* tablePc onFetchData
* @param params.currentPage 当前页码
* @param params.pageSize 每页显示条数
* @param params.searchKey 搜索关键字
* @param params.orderColumn 排序列
* @param params.orderType 排序方式（desc,asc）
* @param params.from 触发来源（order,search,pagination）
*/
function onFetchData(params) {
  // 如果是搜索的话翻页重置到 1
  if (params.from  === 'search') {
    params.currentPage = 1;
  }

  // 如果你需要把表格查询条件保存起来，可以取消下一行注释，并添加一个 params 的变量类型数据源
  // this.setState({ tableParams: params });

  // 如果使用远程接口作为表格数据源，理论上你只需要将下方的“dataSourceName”改为实际的数据源名称即可
  this.dataSourceMap['dataSourceName'].load(params);
}`,
          },

          {
            name: 'onLoadData',
            title: $i18n.get({
              id: 'deepTriggerNotRecommendedBy',
              dm: '分页、搜索、排序时触发(不推荐)',
            }),
            initialValue: `/**
* tablePc onLoadData，推荐使用 onFetchData 回调，参数回调是一个 Object，未来扩展性更好
* @param currentPage 当前页码
* @param pageSize 每页显示条数
* @param searchKey 搜索关键字
* @param orderColumn 排序列
* @param orderType 排序方式（desc,asc）
* @param from 触发来源（order,search,pagination）
*/
function onLoadData(currentPage, pageSize, searchKey, orderColumn, orderType, from) {
  // 如果使用远程接口作为表格数据源，理论上你只需要将下方的“dataSourceName”改为实际的数据源名称即可
  const tableParams = {
    currentPage: from === 'search' ? 1 : currentPage,
    pageSize,
    searchKey,
    orderColumn,
    orderType
  };

  // 如果你需要把表格查询条件保存起来，可以取消下一行注释，并添加一个 tableParams 的变量类型数据源
  // this.setState({ tableParams });
  this.dataSourceMap['dataSourceName'].load(tableParams);
}`,
          },

          {
            name: 'onCellDataChange',
            title: $i18n.get({ id: 'deepTriggerWhenTheAllocation', dm: '编态数据发生变化时触发' }),
            initialValue: `/**
* tablePc onCellDataChange
* @param dataKey 当前变化的字段
* @param value 当前变化的值
* @param rowData 当前变化的行数据
* @param rowIndex 当前变化的行索引
*/
function onCellDataChange(data) {

}`,
          },

          {
            name: 'onRowClick',
            title: $i18n.get({ id: 'deepClickOnTheEvent', dm: '点击表格每一行触发的事件' }),
            initialValue: `/**
* tablePc onRowClick
* @param record 该行所对应的数据
* @param index 该行所对应的序列
* @param evt DOM事件对象
*/
function onRowClick(record, index, evt) {

}`,
          },

          {
            name: 'onRowMouseEnter',
            title: $i18n.get({
              id: 'deepEventsTriggeredDuringThe',
              dm: '悬浮在表格每一行的时候触发的事件',
            }),
            initialValue: `/**
* tablePc onRowMouseEnter
* @param record 该行所对应的数据
* @param index 该行所对应的序列
* @param evt DOM事件对象
*/
function onRowMouseEnter(record, index, evt) {

}`,
          },

          {
            name: 'onRowMouseLeave',
            title: $i18n.get({
              id: 'deepEventsTriggeringWhenYou',
              dm: '离开表格每一行的时候触发的事件',
            }),
            initialValue: `/**
* tablePc onRowMouseLeave
* @param record 该行所对应的数据
* @param index 该行所对应的序列
* @param evt DOM事件对象
*/
function onRowMouseLeave(record, index, evt) {

}`,
          },

          {
            name: 'onResizeChange',
            title: $i18n.get({ id: 'deepEventTriggeredWhenThe', dm: '重设列尺寸的时候触发的事件' }),
            initialValue: `/**
* tablePc onResizeChange
* @param dataIndex 指定重设的字段
* @param value 列宽变动的数值
*/
function onResizeChange(dataIndex, value) {

}`,
          },
        ]),
        {
          name: 'noPadding',
          title: $i18n.get({ id: 'deepHiddenUpsideMargins', dm: '隐藏上下边距' }),
          tip: $i18n.get({
            id: 'deepWhenThereIsAn',
            dm:
              '存在操作栏或分页器时，是否隐藏操作栏或分页器外围的上下边距，通常在外层容器提供了边距时设置',
          }),
          setter: <BoolSetter />,
          initialValue: false,
          supportVariable: true,
        },
        {
          name: 'useStickyLock',
          
          title: $i18n.get({ id: 'deepTableUseStickyLock', dm: '使用新版锁列表格' }),
          tip: $i18n.get({ id: 'deepTableUseStickyLockTip', dm: '新版锁列表格使用 position: sticky 实现锁列，如果默认情况列固定出现一些问题，可以尝试开启这个配置项修复' }),
          setter: <BoolSetter />,
          initialValue: false,
        },
      ],
    },
  ],
});
