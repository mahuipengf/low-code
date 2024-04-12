import { BoolSetter, NumberSetter, ActionSetter, ChoiceSetter } from '@ali/visualengine-utils';
import { tableTheme } from '../../common/tipUrls';
import $i18n from '../../i18n/index';

export default function (env) {
  return {
    title: $i18n.get({ id: 'deepStyleAndStyle', dm: '风格和样式' }),
    type: 'group',
    display: env === 'design' ? 'accordion' : 'entry',
    collapsed: true,
    items: [
      {
        name: 'theme',
        title: $i18n.get({ id: 'deepTheme', dm: '主题' }),
        display: 'block',
        initialValue: 'split',
        supportVariable: true,
        tip: {
          url: tableTheme,
          content: $i18n.get({ id: 'deepClickToViewThe', dm: '点击查看参数文档' }),
        },

        setter: (
          <ChoiceSetter
            options={[
              { value: 'zebra', title: $i18n.get({ id: 'deepZebra', dm: '斑马纹' }) },
              { value: 'split', title: $i18n.get({ id: 'deepDividingLine', dm: '分割线' }) },
              { value: 'border', title: $i18n.get({ id: 'deepBorderLine', dm: '边框线' }) },
            ]}
          />
        ),
      },

      {
        name: 'size',
        title: 'Size',
        display: 'block',
        initialValue: 'medium',

        setter: (
          <ChoiceSetter
            options={[
              { value: 'small', title: 'Small' },
              { value: 'medium', title: 'Medium' },
            ]}
          />
        ),
      },

      {
        name: 'hasHeader',
        title: $i18n.get({ id: 'deepDisplayHead', dm: '显示表头' }),
        display: 'block',
        tip: $i18n.get({ id: 'deepWhetherTheTableHas', dm: '表格是否具有头部' }),
        initialValue: true,
        supportVariable: true,
        setter: <BoolSetter />,
      },

      {
        name: 'fixedHeader',
        title: $i18n.get({ id: 'deepWhetherTheHeadIs', dm: '表头是否固定' }),
        display: 'block',
        tip: $i18n.get({
          id: 'deepThisPropertyIsUsed',
          dm:
            '该属性配合maxBodyHeight使用，当内容区域的高度超过maxBodyHeight的时候，在内容区域会出现滚动条',
        }),

        initialValue: false,
        supportVariable: true,
        setter: <BoolSetter />,
        hidden: env === 'design' ? true : false,
      },

      {
        name: 'maxBodyHeight',
        title: $i18n.get({ id: 'deepMaximumContentArea', dm: '最大内容区域的高度' }),
        display: 'block',
        tip: $i18n.get({
          id: 'deepWhenFixedheadIsTrue',
          dm: '在fixedHeader为true的时候,超过这个高度会出现滚动条',
        }),
        supportVariable: true,
        hidden() {
          if (env === 'design') {
            return true;
          }
          return !this.getProps().getPropValue('fixedHeader');
        },
        setter: <NumberSetter />,
      },

      {
        name: 'stickyHeader',
        title: $i18n.get({ id: 'deepWhetherTheHeadIs.1', dm: '表头是否是sticky' }),
        display: 'block',
        initialValue: false,
        supportVariable: true,
        setter: <BoolSetter />,
        hidden: env === 'design' ? true : false,
      },

      {
        name: 'offsetTop',
        title: 'offsetTop',
        display: 'block',
        initialValue: 0,
        supportVariable: true,
        setter: <NumberSetter />,
        hidden() {
          if (env === 'design') {
            return true;
          }
          return !this.getProps().getPropValue('stickyHeader');
        },
      },

      {
        name: 'affixContainer',
        title: 'affixContainer',
        tip: '在 stickyHeader 为 true 的时候，生效，设置 sticky 的滚动监听容器',
        display: 'block',
        setter:  <ActionSetter
        defaultCode={`function affixContainer(props) {\n    /*return window;*/\n  }`}
        defaultActionName="affixContainer"
      />,
        hidden() {
          if (env === 'design') {
            return true;
          }
          return !this.getProps().getPropValue('stickyHeader');
        },
      },

      {
        name: 'useVirtual',
        title: $i18n.get({ id: 'deepVirtualScroll', dm: '虚拟滚动' }),
        display: 'block',
        tip: $i18n.get({ id: 'deepWhetherToEnableVirtual', dm: '是否启用虚拟滚动' }),
        initialValue: false,
        supportVariable: true,
        setter: <BoolSetter />,
        hidden: env === 'design' ? true : false,
      },

      {
        name: 'setLoadingComponent',
        title: $i18n.get({ id: 'deepCustomLoadingComponent', dm: '自定义loading组件' }),
        tip: $i18n.get({ id: 'deepWhetherCustomLoadingComponents', dm: '是否自定义Loading组件' }),
        initialValue: false,
        setter: <BoolSetter />,
        hidden: env === 'design' ? true : false,
      },

      {
        name: 'loadingComponent',
        title: $i18n.get({ id: 'deepSetUpLoadingComponents', dm: '设置loading组件' }),
        hidden() {
          if (env === 'design') {
            return true;
          }
          return !this.getProps().getPropValue('setLoadingComponent');
        },
        setter: (
          <ActionSetter
            defaultCode={$i18n.get({
              id: 'deepFunctionRenderloadingComponentPrOPSReturn',
              dm:
                "function renderLoadingComponent(props) {\n    return (\n      <div style={{ position: 'relative' }}>\n        <div style={{\n          position: 'absolute',\n          top: 0,\n          bottom: 0,\n          left: 0,\n          right: 0,\n          display: 'flex',\n          justifyContent: 'center',\n          alignItems: 'center',\n          zIndex: 2,\n          background: 'rgba(255,255,255,0.6)',\n          fontSize: 14,\n        }}>加载中...</div>\n        {props.children}\n      </div>\n    );\n  }",
            })}
            defaultActionName="renderLoadingComponent"
          />
        ),
      },

      {
        name: 'cellProps',
        title: $i18n.get({ id: 'deepUnitSortingMerge', dm: '单元格分割合并' }),
        setter: (
          <ActionSetter
            defaultActionName={'cellProps'}
            defaultCode={$i18n.get({
              id: 'deepTablePCCellPropsParamRowIndex',
              dm:
                "\n  /**\n  * tablePc cellProps\n  * @param rowIndex 行索引\n  * @param colIndex 列索引\n  * @param dataIndex 字段索引\n  * @param record 字段记录\n  */\n  function cellProps(rowIndex, colIndex, dataIndex, record) {\n    // if (rowIndex === 0 && colIndex === 2) {\n    //   return {\n    //     // take 2 cols' space\n    //     colSpan: 2\n    //   };\n    // }\n  }\n        ",
            })}
          />
        ),

        hidden: env === 'design' ? true : false,
      },

      {
        name: 'rowProps',
        title: $i18n.get({ id: 'deepRowAttributeConfiguration', dm: '行属性配置' }),
        setter: (
          <ActionSetter
            defaultActionName={'rowProps'}
            defaultCode={$i18n.get({
              id: 'deepTablePCRowPropsParamRecord',
              dm:
                "\n  /**\n  * tablePc rowProps\n  * @param record 字段记录\n  * @param index  行索引\n  */\n  function rowProps(record, index) {\n    // if (index === 0) {\n    //   return {\n    //     className: 'my-test'\n    //   };\n    // }\n  }\n        ",
            })}
          />
        ),

        hidden: env === 'design' ? true : false,
      },

      {
        name: 'setEmptyContent',
        title: $i18n.get({ id: 'deepCustomEmptyDataRendering', dm: '自定义空数据渲染' }),
        initialValue: false,
        setter: <BoolSetter />,
        hidden: env === 'design' ? true : false,
      },

      {
        name: 'emptyContent',
        title: $i18n.get({ id: 'deepAirDataRendering', dm: '空数据渲染' }),
        hidden() {
          if (env === 'design') {
            return true;
          }
          return !this.getProps().getPropValue('setEmptyContent');
        },
        setter: (
          <ActionSetter
            defaultCode={$i18n.get({
              id: 'deepFunctionRenderemptycontentRETURNDIV',
              dm: 'function renderEmptyContent() {\n    return <div>暂无数据</div>;\n  }',
            })}
            defaultActionName="renderEmptyContent"
          />
        ),
      },
    ],
  };
}
