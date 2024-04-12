import {
  TextSetter,
  BoolSetter,
  I18nSetter,
  NumberSetter,
  ChoiceSetter,
  ListSetter,
  LinkSetter,
  SelectSetter,
  ActionSetter,
} from '@ali/visualengine-utils';
import { tableColumn } from '../../common/tipUrls';
import $i18n from '../../i18n/index';

export default function (env) {
  return {
    title: $i18n.get({ id: 'deepOperate', dm: '操作列' }),
    type: 'group',
    display: env === 'design' ? 'accordion' : 'entry',
    collapsed: true,
    items: [
      {
        name: 'actionTitle',
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
        name: 'actionWidth',
        title: $i18n.get({ id: 'deepWidth', dm: '宽度' }),
        display: 'inline',
        tip: {
          url: tableColumn,
          content: $i18n.get({
            id: 'deepWhenTheWidthIs',
            dm: '宽度为0时按照数量自动计算宽度（有一定偏差）',
          }),
        },

        supportVariable: true,
        initialValue: 0,
        setter: (
          <NumberSetter
            units={[
              {
                type: 'px',
                list: true,
              },

              {
                type: '%',
                list: true,
              },
            ]}
          />
        ),
      },

      {
        name: 'actionType',
        title: $i18n.get({ id: 'deepButtonType', dm: '按钮类型' }),
        display: 'inline',
        initialValue: 'link',
        supportVariable: true,
        tip: {
          url: tableColumn,
          content: $i18n.get({ id: 'deepClickToViewThe', dm: '点击查看参数文档' }),
        },

        setter: (
          <ChoiceSetter
            options={[
              { value: 'link', title: $i18n.get({ id: 'deepLink', dm: '链接' }) },
              { value: 'button', title: $i18n.get({ id: 'deepButton', dm: '按钮' }) },
            ]}
          />
        ),
      },

      {
        name: 'actionFixed',
        title: $i18n.get({ id: 'deepColumnFixation', dm: '列固定' }),
        display: 'inline',
        initialValue: 'none',
        supportVariable: true,
        tip: {
          url: tableColumn,
          content: $i18n.get({ id: 'deepClickToViewThe', dm: '点击查看参数文档' }),
        },

        setter: (
          <ChoiceSetter
            options={[
              { value: 'none', title: $i18n.get({ id: 'deepNo', dm: '无' }) },
              { value: 'left', title: $i18n.get({ id: 'deepLeft', dm: '左' }) },
              { value: 'right', title: $i18n.get({ id: 'deepRight', dm: '右' }) },
            ]}
          />
        ),
      },

      {
        name: 'actionHidden',
        title: $i18n.get({ id: 'deepWhetherHidden', dm: '是否隐藏' }),
        display: 'inline',
        initialValue: false,
        setter: <BoolSetter />,
        supportVariable: true,
      },

      {
        name: 'maxWebShownActionCount',
        title: $i18n.get({ id: 'deepMaximumDisplayQuantity', dm: '最大展示数量' }),
        display: 'block',
        initialValue: 3,
        supportVariable: true,
        setter: <NumberSetter />,
      },

      {
        name: 'actionColumn',
        title: $i18n.get({ id: 'deepOperate.1', dm: '操作项' }),
        display: 'accordion',
        collapsed: false,
        initialValue: [
          {
            title: {
              type: 'i18n',
              zh_CN: '详情',
              en_US: 'Detail',
            },

            option: 'callback',
          },
        ],

        setter: (
          <ListSetter
            display={env === 'design' ? 'block' : 'entry'}
            checkField={null}
            configure={[
              {
                name: 'title',
                title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
                supportVariable: true,
                initialValue: {
                  type: 'i18n',
                  zh_CN: '操作',
                  en_US: 'action',
                },

                setter: <I18nSetter />,
              },

              {
                name: 'mode',
                title: $i18n.get({ id: 'deepShowInEditingStatus', dm: '在编辑状态显示' }),
                supportVariable: true,
                initialValue: 'VIEW',
                setter: (
                  <ChoiceSetter
                    options={[
                      {
                        value: 'VIEW',
                        title: $i18n.get({ id: 'deepExhibitionState', dm: '展示态' }),
                      },
                      { value: 'EDIT', title: $i18n.get({ id: 'deepEdit', dm: '编辑态' }) },
                    ]}
                  />
                ),

                hidden: env === 'design' ? true : false,
              },

              {
                name: 'device',
                title: $i18n.get({ id: 'deepDisplayAtASpecific', dm: '在特定端显示' }),
                supportVariable: true,
                initialValue: '',
                setter: (
                  <ChoiceSetter
                    options={[
                      { value: '', title: $i18n.get({ id: 'deepUnlimited', dm: '无限制' }) },
                      { value: 'desktop', title: 'PC' },
                      { value: 'phone', title: $i18n.get({ id: 'deepMovingEnd', dm: '移动端' }) },
                    ]}
                  />
                ),

                hidden: env === 'design' ? true : false,
              },

              {
                name: 'option',
                title: $i18n.get({ id: 'deepOperating', dm: '操作' }),
                display: 'none',
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
                hidden() {
                  if (env === 'design') {
                    return true;
                  }
                  return this.parent.getParam('option').toData() !== 'link';
                },
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
                      { value: 'edit', title: $i18n.get({ id: 'deepEdit.1', dm: '编辑' }) },
                    ]}
                  />
                ),

                hidden() {
                  if (env === 'design') {
                    return true;
                  }
                  return this.parent.getParam('option').toData() !== 'link';
                },
              },

              {
                name: 'callback',
                title: $i18n.get({ id: 'deepCallback', dm: '回调函数' }),
                setter: (
                  <ActionSetter
                    defaultCode={`function onActionClick(rowData) {
  console.log(rowData);
}`}
                    defaultActionName="onActionClick"
                  />
                ),

                hidden() {
                  if (env === 'design') {
                    return true;
                  }
                  return this.parent.getParam('option').toData() !== 'callback';
                },
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
                    defaultCode={$i18n.get({
                      id: 'deepFunctionActionRenderTitleRowdata',
                      dm:
                        'function actionRender(title, rowData) {\n    return title;  // return false 则不显示 \n  }',
                    })}
                    defaultActionName="actionRender"
                  />
                ),

                hidden: env === 'design' ? true : false,
              },
            ]}
          />
        ),
      },
    ],
  };
}
