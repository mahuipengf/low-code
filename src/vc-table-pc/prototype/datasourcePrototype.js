import { TextSetter, JsonSetter, BoolSetter, ChoiceSetter } from '@ali/visualengine-utils';
import { tableDoc } from '../../common/tipUrls';
import $i18n from '../../i18n/index';

export default {
  title: $i18n.get({ id: 'deepDataSource', dm: '数据源' }),
  type: 'group',
  display: 'plain',
  items: [
    {
      name: 'dataSourceType',
      title: $i18n.get({ id: 'deepDataSourceType', dm: '数据源类型' }),
      display: 'none',
      initialValue: 'data',
      setter: (
        <ChoiceSetter
          options={[
            { value: 'data', title: 'data' },
            { value: 'url', title: 'url' },
          ]}
        />
      ),
    },

    {
      name: 'data',
      title: $i18n.get({ id: 'deepDataSource', dm: '数据源' }),
      display: 'block',
      tip: {
        content: $i18n.get({ id: 'deepClickViewDataFormat', dm: '点击 ? 查看数据格式' }),
        url: tableDoc,
      },

      hidden() {
        return this.getProps().getPropValue('dataSourceType') !== 'data';
      },
      supportVariable: true,
      initialValue: {
        currentPage: 1,
        totalCount: 2,
        data: [
          {
            id: '1',
            email: 'xw@abc.com',
            name: $i18n.get({ id: 'deepXiaoWang', dm: '小王' }),
            type: '1',
            entryDate: 1534942658570,
            contractDate: {
              start: 1534942658570,
              end: 1534944858570,
            },

            salary: 35000,
            moneyRange: {
              lower: 108,
              upper: 944,
            },

            children: [
              {
                id: '11',
                email: 'xw@abc.com',
                name: $i18n.get({ id: 'deepXiaoWang.1', dm: '小王1' }),
                entryDate: 1534942658570,
                contractDate: {
                  start: 1534942658570,
                  end: 1534944858570,
                },

                salary: 35000,
                moneyRange: {
                  lower: 108,
                  upper: 944,
                },
              },

              {
                id: '111',
                email: 'xw@abc.com',
                name: $i18n.get({ id: 'deepXiaoWang.2', dm: '小王2' }),
                entryDate: 1534942658570,
                contractDate: {
                  start: 1534942658570,
                  end: 1534944858570,
                },

                salary: 35000,
                moneyRange: {
                  lower: 108,
                  upper: 944,
                },
              },
            ],
          },

          {
            id: '2',
            email: 'xl@abc.com',
            name: $i18n.get({ id: 'deepXiaoLi', dm: '小李' }),
            type: '-1',
            entryDate: 1534942658570,
            contractDate: {
              start: 1534942658570,
              end: 1534944858570,
            },

            salary: 25000,
            moneyRange: {
              lower: 214,
              upper: 1077,
            },
          },
        ],
      },

      required: false,
      setter: <JsonSetter />,
    },

    {
      name: 'primaryKey',
      title: $i18n.get({ id: 'deepDataPrimaryKey', dm: '数据主键' }),
      supportVariable: true,
      display: 'inline',
      initialValue: 'id',
      tip: {
        content: $i18n.get({
          id: 'deepTheDataPrimaryKey',
          dm:
            '数据主键用于区分数据中不同的行，对行选择和行编辑功能非常重要，不同的行主键值不可重复，一般采用数据库中自增 ID 字段',
        }),
      },

      setter: <TextSetter />,
    },

    {
      name: 'loading',
      title: $i18n.get({ id: 'deepLoadState', dm: '加载状态' }),
      supportVariable: true,
      display: 'inline',
      initialValue: false,
      tip: {
        content: $i18n.get({
          id: 'deepThisPropertyMustBe',
          dm: '这个属性请务必通过绑定变量的方式使用，在 onLoadData/onFetchData 中根据请求状态设值',
        }),
      },

      setter: <BoolSetter />,
    },

    // {
    //   name: 'fetchUrl',
    //   title: '数据源（url）',
    //   tip: '远程url地址',
    //   hidden() {
    //     return this.getProps().getPropValue('dataSourceType') !== 'url';
    //   },
    //   initialValue: 'https://mocks.alibaba-inc.com/mock/AIP/path/namespace/voName/list.json',
    //   required: false,
    //   display: 'block',
    //   setter: <TextSetter multiline rows={4} />,
    //   supportVariable: true,
    // },
    // {
    //   name: 'fetchMethod',
    //   title: '请求方式',
    //   display: 'block',
    //   initialValue: 'GET',
    //   hidden() {
    //     return this.getProps().getPropValue('dataSourceType') !== 'url';
    //   },
    //   setter: (
    //     <ChoiceSetter
    //       options={[{ value: 'GET', title: 'GET' }, { value: 'POST', title: 'POST' }]}
    //     />
    //   ),
    // },
    // {
    //   name: 'fetchParams',
    //   title: '请求携带的参数',
    //   initialValue: {},
    //   required: false,
    //   display: 'accordion',
    //   collapsed: false,
    //   hidden() {
    //     return this.getProps().getPropValue('dataSourceType') !== 'url';
    //   },
    //   setter: <JsonSetter />,
    //   supportVariable: true,
    // },
    // {
    //   name: 'beforeFetch',
    //   title: '请求参数处理',
    //   initialValue: 'function beforeFetch(data, ctx, from, vcState) { return data; }',
    //   tip: '如果在这里使用了 ctx，设计器中看到的，可能与预想不符，请以预览效果为准',
    //   hidden() {
    //     return this.getProps().getPropValue('dataSourceType') !== 'url';
    //   },
    //   required: false,
    //   display: 'accordion',
    //   collapsed: false,
    //   setter: <CodeSetter mode="javascript" wrapEnabled />,
    // },
    // {
    //   name: 'fitResponse',
    //   title: '返回数据预处理',
    //   initialValue:
    //     'function fitResponse(data, ctx, vcState) {\n'
    //     + '  return {\n'
    //     + '    content: data.content,\n'
    //     + '    success: ("success" in data) ? data.success : !data.hasError,\n'
    //     + '    error: { message: data.content || data.errors }\n'
    //     + '  };\n'
    //     + '}',
    //   tip: '如果在这里使用了 ctx，设计器中看到的，可能与预想不符，请以预览效果为准',
    //   required: false,
    //   display: 'accordion',
    //   hidden() {
    //     return this.getProps().getPropValue('dataSourceType') !== 'url';
    //   },
    //   collapsed: false,
    //   setter: <CodeSetter mode="javascript" wrapEnabled />,
    // },
    // {
    //   name: 'processData',
    //   title: '返回数据处理',
    //   initialValue: 'function processData(data, ctx, vcState) { return data; }',
    //   tip: '如果在这里使用了 ctx，设计器中看到的，可能与预想不符，请以预览效果为准',
    //   required: false,
    //   display: 'accordion',
    //   collapsed: false,
    //   hidden() {
    //     return this.getProps().getPropValue('dataSourceType') !== 'url';
    //   },
    //   setter: <CodeSetter mode="javascript" wrapEnabled />,
    // },
    // {
    //   name: 'fetchError',
    //   title: '请求出错处理',
    //   initialValue:
    //     'function onFetchError(err, ctx, vcState) {\n  if (err) {\n   ctx.fn.toast({type: "error", title: err}) \n  }\n}',
    //   display: 'accordion',
    //   collapsed: false,
    //   hidden() {
    //     return this.getProps().getPropValue('dataSourceType') !== 'url';
    //   },
    //   setter: <CodeSetter mode="javascript" wrapEnabled />,
    // },
  ],
};
