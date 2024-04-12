import {
  BoolSetter,
  I18nSetter,
  ListSetter,
  ActionSetter,
  ChoiceSetter,
  LinkSetter,
  SelectSetter,
} from '@ali/visualengine-utils';
import $i18n from '../../i18n/index';

const getDescriptor = (name) => name;

export default function (env) {
  return {
    title: $i18n.get({ id: 'deepTopOperation', dm: '顶部操作' }),
    type: 'group',
    display: env === 'design' ? 'accordion' : 'entry',
    collapsed: true,
    items: [
      {
        name: 'showActionBar',
        title: $i18n.get({ id: 'deepDisplayOperationStrip', dm: '显示操作条' }),
        initialValue: true,
        supportVariable: true,
        setter: <BoolSetter />,
      },

      {
        name: 'actionBar',
        title: $i18n.get({ id: 'deepProcedure', dm: '操作条' }),
        initialValue: [
          {
            title: {
              zh_CN: '操作1',
              en_US: 'Action 1',
              type: 'i18n',
            },

            option: 'callback',
          },

          {
            title: {
              zh_CN: '操作2',
              en_US: 'Action 2',
              type: 'i18n',
            },

            option: 'callback',
          },
        ],

        display: 'accordion',
        setter: (
          <ListSetter
            display={env === 'design' ? 'block' : 'entry'}
            checkField={null}
            descriptor={getDescriptor('title')}
            configure={[
              {
                name: 'title',
                title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
                display: 'inline',
                supportVariable: true,
                initialValue: {
                  zh_CN: '操作',
                  en_US: 'Action',
                  type: 'i18n',
                },

                setter: <I18nSetter />,
              },

              {
                name: 'option',
                title: $i18n.get({ id: 'deepOperating', dm: '操作' }),
                display: 'inline',
                initialValue: 'callback',
                setter: (
                  <ChoiceSetter
                    options={[
                      {
                        value: 'callback',
                        title: $i18n.get({ id: 'deepCallback', dm: '回调函数' }),
                      },
                      { value: 'link', title: $i18n.get({ id: 'deepPageJump', dm: '页面跳转' }) },
                    ]}
                  />
                ),

                hidden: env === 'design' ? true : false,
              },

              {
                name: 'linkedPage',
                title: $i18n.get({ id: 'deepRelatedPageSelection', dm: '关联页面选择' }),
                setter: <LinkSetter />,
                disabled() {
                  return this.parent.getParam('option').toData() !== 'link';
                },
                hidden: env === 'design' ? true : false,
              },

              {
                name: 'pageMode',
                title: $i18n.get({ id: 'deepRelatedPageStatus', dm: '关联页面状态' }),
                initialValue: '',
                setter: (
                  <SelectSetter
                    options={[
                      { value: '', title: $i18n.get({ id: 'deepPleaseChoose', dm: '请选择' }) },
                      { value: 'view', title: $i18n.get({ id: 'deepPreview', dm: '预览' }) },
                      { value: 'add', title: $i18n.get({ id: 'deepIncrease', dm: '增加' }) },
                      { value: 'edit', title: $i18n.get({ id: 'deepEdit', dm: '编辑' }) },
                    ]}
                  />
                ),

                disabled() {
                  return this.parent.getParam('option').toData() !== 'link';
                },
                hidden: env === 'design' ? true : false,
              },

              {
                name: 'callback',
                title: $i18n.get({ id: 'deepCallback.2', dm: '回调' }),
                display: 'accordion',
                setter: (
                  <ActionSetter
                    defaultCode={`function onActionBarItemClick() {
  
  }`}
                    defaultActionName="onActionBarItemClick"
                  />
                ),

                disabled() {
                  return this.parent.getParam('option').toData() !== 'callback';
                },
                hidden: env === 'design' ? true : false,
              },

              {
                name: 'isDisabled',
                title: $i18n.get({ id: 'deepIsItDisabled', dm: '是否禁用' }),
                display: 'accordion',
                tip: $i18n.get({ id: 'deepOnlyPreviewIsEffective', dm: '只有预览态有效果' }),
                setter: (
                  <ActionSetter
                    defaultCode={`function isActionBarItemDisabled() {
    return false;
  }`}
                    defaultActionName="isActionBarItemDisabled"
                  />
                ),

                hidden: env === 'design' ? true : false,
              },
            ]}
          />
        ),

        disabled() {
          return !this.getProps().getPropValue('showActionBar');
        },
      },

      {
        name: 'showLinkBar',
        title: $i18n.get({ id: 'deepShowOuterChain', dm: '显示外链条' }),
        initialValue: true,
        supportVariable: true,
        setter: <BoolSetter />,
        disabled() {
          return !this.getProps().getPropValue('showActionBar');
        },
      },

      {
        name: 'linkBar',
        title: $i18n.get({ id: 'deepOuterChainOperator', dm: '外链操作条' }),
        initialValue: [],
        display: 'accordion',
        setter: (
          <ListSetter
            display="entry"
            descriptor={getDescriptor('title')}
            configure={[
              {
                name: 'title',
                title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
                display: 'inline',
                supportVariable: true,
                initialValue: {
                  zh_CN: '外链操作',
                  en_US: 'Link',
                  type: 'i18n',
                },

                setter: <I18nSetter />,
              },

              {
                name: 'callback',
                title: $i18n.get({ id: 'deepCallback.2', dm: '回调' }),
                display: 'accordion',
                initialValue: '',
                setter: (
                  <ActionSetter
                    defaultCode={`function onActionBarLinkClick() {
  
  }`}
                    defaultActionName="onActionBarLinkClick"
                  />
                ),
              },
            ]}
          />
        ),

        disabled() {
          return (
            !this.getProps().getPropValue('showActionBar') ||
            !this.getProps().getPropValue('showLinkBar')
          );
        },
      },

      {
        name: 'showSearch',
        title: $i18n.get({ id: 'deepShowSearchBars', dm: '显示搜索条' }),
        initialValue: true,
        display: 'block',
        setter: <BoolSetter rows={1} />,
        supportVariable: true,
        disabled() {
          return !this.getProps().getPropValue('showActionBar');
        },
      },

      {
        name: 'searchBarPlaceholder',
        title: $i18n.get({ id: 'deepSearchBarPlaceholders', dm: '搜索条占位符' }),
        initialValue: {
          zh_CN: '请搜索',
          en_US: 'Please Input',
          type: 'i18n',
        },

        display: 'block',
        disabled() {
          return (
            !this.getProps().getPropValue('showActionBar') ||
            !this.getProps().getPropValue('showSearch')
          );
        },
        setter: <I18nSetter />,
        supportVariable: true,
      },

      {
        name: 'showCustomColumn',
        title: $i18n.get({ id: 'deepDisplayColumnFilter', dm: '显示列筛选器' }),
        initialValue: false,
        display: 'block',
        setter: <BoolSetter rows={1} />,
        supportVariable: true,
        disabled() {
          return !this.getProps().getPropValue('showActionBar');
        },
      },

      {
        name: 'onColumnsChange',
        title: $i18n.get({ id: 'deepColumnScreeningCallback', dm: '列筛选回调' }),
        display: 'block',
        hidden: env === 'design' ? true : false,
        disabled() {
          return (
            !this.getProps().getPropValue('showActionBar') ||
            !this.getProps().getPropValue('showCustomColumn')
          );
        },
        setter: (
          <ActionSetter
            defaultCode={$i18n.get({
              id: 'deepColumnsNewColumnsFunction',
              dm:
                '\n  /**\n   * columns 新的columns\n   */\n  function onColumnsChange(columns) {\n    console.log(columns)\n  }',
            })}
            defaultActionName="onColumnsChange"
          />
        ),
      },

      {
        name: 'showCustomBarItem',
        title: $i18n.get({ id: 'deepWhetherToDisplayA', dm: '是否显示自定义区域' }),
        display: 'block',
        initialValue: false,
        supportVariable: true,
        setter: <BoolSetter />,
        disabled() {
          return !this.getProps().getPropValue('showActionBar');
        },
        hidden: env === 'design' ? true : false,
      },

      {
        name: 'customBarItemRender',
        title: $i18n.get({ id: 'deepCustomAreaRendering', dm: '自定义区域渲染' }),
        display: 'block',
        supportVariable: true,
        hidden() {
          if (env === 'design') {
            return true;
          }
          return (
            !this.getProps().getPropValue('showActionBar') ||
            !this.getProps().getPropValue('showCustomBarItem')
          );
        },
        setter: (
          <ActionSetter
            defaultCode={`function customBarItemRender() {
  
  }`}
            defaultActionName="customBarItemRender"
          />
        ),
      },

      // {
      //   name: 'onColumnPick',
      //   title: '列筛选器回调',
      //   initialValue: 'function({ columns, ctx }) {}',
      //   display: 'block',
      //   setter: <CodeSetter />,
      //   disabled() {
      //     return !this.getProps().getPropValue('showColumnPicker');
      //   },
      // },
      // {
      //   name: 'showColumnPickerCheckAll',
      //   title: '列筛选支持全选',
      //   initialValue: false,
      //   display: 'block',
      //   setter: <BoolSetter />,
      //   disabled() {
      //     return !this.getProps().getPropValue('showColumnPicker');
      //   },
      // },
    ],
  };
}
