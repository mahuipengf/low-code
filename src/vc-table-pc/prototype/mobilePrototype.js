import { ChoiceSetter, NumberSetter, TextSetter } from '@ali/visualengine-utils';
import $i18n from '../../i18n/index';

export default function (env) {
  return {
    title: $i18n.get({ id: 'deepMobileSideUniqueConfiguration', dm: '移动端特有配置' }),
    type: 'group',
    display: env === 'design' ? 'accordion' : 'entry',
    collapsed: true,
    items: [
      {
        name: 'mobileMode',
        title: $i18n.get({ id: 'deepDisplayStyle', dm: '展示风格' }),
        display: 'inline',
        initialValue: 'normal',
        setter: (
          <ChoiceSetter
            options={[
              { value: 'normal', title: $i18n.get({ id: 'deepDefault', dm: '默认' }) },
              { value: 'card', title: $i18n.get({ id: 'deepCard', dm: '卡片' }) },
            ]}
          />
        ),
      },

      {
        name: 'mobileExpandViewMode',
        title: $i18n.get({ id: 'deepUnfolding', dm: '展开方式' }),
        display: 'inline',
        initialValue: 'normal',
        setter: (
          <ChoiceSetter
            options={[
              {
                value: 'normal',
                title: $i18n.get({ id: 'deepOriginallyLaunched', dm: '原地展开' }),
              },
              { value: 'detail', title: $i18n.get({ id: 'deepDetailsView', dm: '详情视图' }) },
            ]}
          />
        ),
      },

      {
        name: 'mobileDefaultCardColumns',
        title: $i18n.get({ id: 'deepNumberOfDefaultFields', dm: '默认字段数' }),
        display: 'inline',
        disabled() {
          return this.getProps().getPropValue('mobileExpandViewMode') !== 'detail';
        },
        initialValue: '4',
        supportVariable: true,
        setter: <NumberSetter />,
      },

      {
        name: 'mobileActionsStyle',
        title: $i18n.get({ id: 'deepOperatingStyle', dm: '操作风格' }),
        display: 'inline',
        disabled() {
          return this.getProps().getPropValue('mobileExpandViewMode') !== 'detail';
        },
        initialValue: '',
        setter: (
          <ChoiceSetter
            options={[
              { value: '', title: $i18n.get({ id: 'deepDrawer', dm: '抽屉' }) },
              { value: 'button', title: $i18n.get({ id: 'deepButton', dm: '按钮' }) },
            ]}
          />
        ),
      },

      {
        name: 'mobileMargin',
        title: $i18n.get({ id: 'deepDefaultOutsideMargins', dm: '默认外边距' }),
        display: 'inline',
        initialValue: 0,
        supportVariable: true,
        setter: <NumberSetter />,
      },
    ],
  };
}
