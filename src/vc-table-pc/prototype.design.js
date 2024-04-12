import { Bundle, Env } from '@ali/visualengine';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import Icon from './logo.svg';
import columnsPrototype from './prototype/columnsPrototype';
import paginationPrototype from './prototype/paginationPrototype';
import actionColumnsPrototype from './prototype/actionColumnsPrototype';
import actionBarPrototype from './prototype/actionBarPrototype';
import stylePrototype from './prototype/stylePrototype';
import datasourcePrototype from './prototype/datasourcePrototype';
import rowSelectionPrototype from './prototype/rowSelectionPrtotype';
import treePrototype from './prototype/treePrototype';
import expandPrototype from './prototype/expandPrototype';
import mobilePrototype from './prototype/mobilePrototype';
import { BoolSetter } from '@ali/visualengine-utils';
import TableSetter from './vs-table';
import { tableApi, tableDoc } from '../common/tipUrls';

const isI18n = (value) => {
  return value && value.type === 'i18n';
};

// 表格类型和 smartTable 的映射
const dataTypeMap = {
  'timestamp': 'date',
};
const getSmartTableDataType = (tableDataType) => {
  return dataTypeMap[tableDataType] || 'text';
}
const getTableDataType = (smartTableDataType) => {
  let type = 'text';
  Object.keys(dataTypeMap).some(key => {
    if (dataTypeMap[key] === smartTableDataType) {
      type = key;
      return true;
    }
  });
  return type;
}

const dataFormat = (columns, rows) => {
  return rows.map(row => {
    const result = {};
    Object.keys(row).forEach(key => {
      if (row[key] && typeof row[key] === 'object') {
        result[key] = '';
      } else {
        result[key] = row[key];
      }
    });
    return result;
  })
};

export default Bundle.createPrototype({
  title: '表格',
  componentName: 'TablePc',
  category: '高级',
  icon: Icon,
  docUrl: tableDoc,
  snippets: [
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ZU1HuVT7gK0jSZFpXXaTkpXa-112-64.png',
      label: '普通表格',
      schema: {
        componentName: 'TablePc',
        props: {
          noPadding: true
        },
      },
    },
    {
      screenshot: 'https://img.alicdn.com/tfs/TB1ZU1HuVT7gK0jSZFpXXaTkpXa-112-64.png',
      label: '树形表格',
      schema: {
        componentName: 'TablePc',
        props: {
          noPadding: true,
          isTree: true,
          data: {
            currentPage: 1,
            totalCount: 2,
            data: [
              {
                id: '1',
                email: 'xw@abc.com',
                name: '小王',
                entryDate: 1534942658570,
                salary: 35000,
                children: [
                  {
                    id: '1-1',
                    email: 'xw@abc.com',
                    name: '小王',
                    entryDate: 1534942658570,
                    salary: 25000,
                  },
                  {
                    id: '1-2',
                    email: 'xw@abc.com',
                    name: '小王',
                    entryDate: 1534942658570,
                    salary: 25000,
                  },
                ]
              },
              {
                id: '2',
                email: 'xl@abc.com',
                name: '小李',
                entryDate: 1534942658570,
                salary: 25000,
              },
            ]
          }
        },
      },
    },
  ],
  configure: [
    {
      name: 'columns',
      initialValue: [
        {
          dataKey: 'name',
          title: {
            zh_CN: '姓名',
            en_US: 'Name',
            type: 'i18n',
          },
          width: 100,
          dataType: 'text',
        },
        {
          dataKey: 'email',
          title: {
            zh_CN: '邮箱',
            en_US: 'Email',
            type: 'i18n',
          },
          width: 180,
          dataType: 'text',
        },
        {
          dataKey: 'entryDate',
          title: {
            zh_CN: '入职日期',
            en_US: 'Date',
            type: 'i18n',
          },
          dataType: 'timestamp',
          timeFormatter: 'YYYY-MM-DD',
          width: 180,
        },
        {
          dataKey: 'salary',
          title: {
            zh_CN: '月薪',
            en_US: 'salary',
            type: 'i18n',
          },
          dataType: 'money',
          width: 150,
        },
      ],
      hidden: true,
    },
    {
      name: 'data',
      hidden: true,
      initialValue: {
        currentPage: 1,
        totalCount: 2,
        data: [
          {
            id: '1',
            email: 'xw@abc.com',
            name: '小王',
            entryDate: 1534942658570,
            salary: 35000,
          },
          {
            id: '2',
            email: 'xl@abc.com',
            name: '小李',
            entryDate: 1534942658570,
            salary: 25000,
          },
        ]
      },
    },
    {
      name: '_mockData_',
      title: '表格数据',
      ignore: true,
      setter: <TableSetter buttonName="编辑表格数据"/>,
      initial(value) {
        if (value) {
          return value;
        }
        const locale = Env.getLocale();
        const columns = this.getProps().getPropValue('columns') || [];
        const rows = this.getProps().getPropValue('data') || { data: [] };
        return {
          fields: columns.map(col => ({
            id: col.dataKey,
            name: isI18n(col.title) ? col.title[locale] : col.title,
            dataType: getSmartTableDataType(col.dataType),
          })),
          rows: dataFormat(columns, rows.data),
        };
      },
      mutator(value) {
        const locale = Env.getLocale();
        const columnsOld = this.getProps().getPropValue('columns') || [];
        const columnsOldMap = columnsOld.reduce((p, n) => ((p[n.dataKey] = n), p), {});
        // merge 研发模式下修改
        const columns = value.fields.map((field) => ({
          dataType: getTableDataType(field.dataType),
          ...columnsOldMap[field.id],
          dataKey: field.id,
          title: {
            use: locale,
            [locale]: field.name,
            type: 'i18n'
          },
          width: columnsOldMap[field.id]?.width || field.width,
        }));
        const data = value.rows;

        // 如果是树形表格，每一行默认加入 children，内容为当前行
        const isTree = this.getProps().getPropValue('isTree');
        if (isTree) {
          data.forEach(item => {
            item.children = [
              {
                ...item,
                id: item.id && item.id + '-1',
              },
              {
                ...item,
                id: item.id && item.id + '-2',
              },
            ];
          });
        }
        this.getProps().setPropValue('columns', columns);
        this.getProps().setPropValue('data', {
          data,
          currentPage: 1,
          totalCount: data.length
        });
      },
    },
    // columnsPrototype,
    // datasourcePrototype,
    actionColumnsPrototype('design'),
    actionBarPrototype('design'),
    stylePrototype('design'),
    rowSelectionPrototype('design'),
    paginationPrototype('design'),
    expandPrototype('design'),
    mobilePrototype('design'),
    {
      name: '__router',
      title: '隐含传入 this.utils.router 供链接跳转使用',
      display: 'none',
      initialValue: {
        type: 'JSExpression',
        value: 'this.utils.router',
      },
    },
    {
      type: 'group',
      title: '高级',
      display: 'accordion',
      collapsed: true,
      tip: {
        content: '具体事件API',
        url: tableApi,
      },
      hidden: true,
      items: [
        uuid('tablePc'),
        {
          name: 'noPadding',
          title: '隐藏上下边距',
          tip: '存在操作栏或分页器时，是否隐藏操作栏或分页器外围的上下边距，通常在外层容器提供了边距时设置',
          setter: <BoolSetter />,
          initialValue: false,
          supportVariable: true,
        }
      ],
    },
  ],
});
