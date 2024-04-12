import {
  BoolSetter,
  TextSetter,
  NumberSetter,
  ActionSetter,
  JsonSetter,
} from '@ali/visualengine-utils';
import { tableExpand } from '../../common/tipUrls';
import $i18n from '../../i18n/index';

export default function (env) {
  return {
    title: $i18n.get({ id: 'deepFoldableTreeForm', dm: '可折叠/树形表格' }),
    type: 'group',
    display: env === 'design' ? 'accordion' : 'entry',
    collapsed: true,
    items: [
      {
        name: 'isExpand',
        title: $i18n.get({ id: 'deepEnableFold', dm: '启用折叠' }),
        display: 'inline',
        initialValue: false,
        setter: <BoolSetter />,
      },

      {
        name: 'isTree',
        title: $i18n.get({ id: 'deepEnableTree', dm: '启用树形' }),
        display: 'inline',
        initialValue: false,
        setter: <BoolSetter />,
      },

      {
        name: 'indent',
        title: $i18n.get({ id: 'deepTreeIndent', dm: '树形缩进' }),
        display: 'inline',
        hidden() {
          return !this.getProps().getPropValue('isTree');
        },
        initialValue: 16,
        supportVariable: true,
        setter: <NumberSetter />,
      },

      {
        name: 'hasExpandedRowCtrl',
        title: $i18n.get({ id: 'deepFoldingButton', dm: '折叠按钮' }),
        display: 'inline',
        hidden() {
          return !this.getProps().getPropValue('isExpand');
        },
        initialValue: true,
        supportVariable: true,
        setter: <BoolSetter />,
      },

      {
        name: 'expandedRowIndent',
        title: $i18n.get({ id: 'deepAdditionalRendering', dm: '额外渲染行的缩进' }),
        display: 'block',
        tip: {
          content: 'Array',
          url: tableExpand,
        },

        hidden() {
          return !this.getProps().getPropValue('isExpand');
        },
        initialValue: '[]',
        supportVariable: true,
        setter: <TextSetter />,
      },

      {
        name: 'expandedRowRender',
        title: $i18n.get({ id: 'deepRenderingFunctionOfAdditional', dm: '额外渲染行的渲染函数' }),
        display: 'accordion',
        initialValue: '',
        hidden() {
          return !this.getProps().getPropValue('isExpand');
        },
        setter: (
          <ActionSetter
            defaultCode={$i18n.get({
              id: 'deepAdditionalRenderingFunctionsParam',
              dm:
                "/**\n  * 额外渲染行的渲染函数\n  * @param record Object 展开行的数据\n  * @param index Number 展开行的索引\n  */\n  function expandedRowRender(record, index) {\n    return '请在这里实现展开行的渲染逻辑';\n  }",
            })}
            defaultActionName="expandedRowRender"
          />
        ),
      },

      {
        name: 'getExpandedColProps',
        title: $i18n.get({ id: 'deepSetThePropertiesOf', dm: '设置额外渲染行的属性' }),
        display: 'accordion',
        initialValue: '',
        hidden() {
          return !this.getProps().getPropValue('isExpand');
        },
        initialValue: 'function getExpandedColProps(record, index) {  }',
        setter: (
          <ActionSetter
            defaultCode={$i18n.get({
              id: 'deepSetThePropertiesOf.1',
              dm:
                '/**\n  * 设置额外渲染行的属性\n  * @param record Object 展开行的数据\n  * @param index Number 展开行的索引\n  */\n  function getExpandedColProps(record, index) {\n    return {};\n  }',
            })}
            defaultActionName="getExpandedColProps"
          />
        ),
      },

      {
        name: 'openRowKeys',
        title: $i18n.get({ id: 'deepByDefaultExpansionRendering', dm: '默认展开渲染的行' }),
        tip: $i18n.get({
          id: 'deepPassingOpenRowKeysWillResult',
          dm: '传递了 openRowKeys 会导致展开折叠变为受控模式，务必实现 onRowOpen 事件并负责更新',
        }),
        display: 'accordion',
        initialValue: '',
        hidden() {
          return (
            !this.getProps().getPropValue('isTree') && !this.getProps().getPropValue('isExpand')
          );
        },
        setter: <JsonSetter />,
        supportVariable: true,
      },

      {
        name: 'onRowOpen',
        title: $i18n.get({ id: 'deepExpandEventsTriggered', dm: '展开收起时触发的事件' }),
        display: 'accordion',
        initialValue: '',
        hidden() {
          return (
            !this.getProps().getPropValue('isTree') && !this.getProps().getPropValue('isExpand')
          );
        },
        setter: (
          <ActionSetter
            defaultCode={$i18n.get({
              id: 'deepNodeExpandsCallbackParam',
              dm:
                '/**\n  * 节点展开回调\n  * @param openRowKeys Array 展开的渲染行的key\n  * @param currentRowKey String 当前点击的渲染行的key\n  * @param expanded Boolean 当前点击是展开还是收起\n  * @param currentRecord Object 当前点击额外渲染行的记录\n  */\n  function onRowOpen(openRowKeys, currentRowKey, expanded, currentRecord) {\n    // your code here\n  }',
            })}
            defaultActionName="onRowOpen"
          />
        ),
      },

      /*
    {
      name: 'expandedIndexSimulate',
      title: '折叠索引模拟',
      display: 'block',
      initialValue: false,
      supportVariable: true,
      setter: <BoolSetter />,
    },
    */
    ],
  };
}
