import {
  TextSetter,
  BoolSetter,
  NumberSetter,
  ChoiceSetter,
  SelectSetter,
  JsonSetter,
} from '@ali/visualengine-utils';
import $i18n from '../../i18n/index';

export default function (env) {
  return {
    title: $i18n.get({ id: 'deepPageSetting', dm: '分页设置' }),
    type: 'group',
    display: env === 'design' ? 'accordion' : 'entry',
    collapsed: true,
    items: [
      {
        name: 'isPagination',
        title: $i18n.get({ id: 'deepUsePagination', dm: '使用分页' }),
        display: 'inline',
        initialValue: true,
        supportVariable: true,
        setter: <BoolSetter />,
      },

      {
        name: 'pagination',
        title: $i18n.get({ id: 'deepPageSetting', dm: '分页设置' }),
        type: 'composite',
        display: 'plain',
        items: [
          {
            name: 'paginationPosition',
            title: $i18n.get({ id: 'deepPageLocation', dm: '分页位置' }),
            display: 'inline',
            disabled() {
              return !this.getProps().getPropValue('isPagination');
            },
            initialValue: 'right',
            setter: (
              <ChoiceSetter
                options={[
                  { value: 'left', title: $i18n.get({ id: 'deepLeftSide', dm: '左侧' }) },
                  { value: 'right', title: $i18n.get({ id: 'deepRight', dm: '右侧' }) },
                ]}
              />
            ),
          },

          {
            name: 'size',
            title: $i18n.get({ id: 'deepSplitSize', dm: '分页尺寸' }),
            display: 'inline',
            initialValue: 'medium',
            disabled() {
              return !this.getProps().getPropValue('isPagination');
            },
            setter: (
              <ChoiceSetter
                options={[
                  { value: 'small', title: $i18n.get({ id: 'deepSmall', dm: '小' }) },
                  { value: 'medium', title: $i18n.get({ id: 'deepIn', dm: '中' }) },
                  { value: 'large', title: $i18n.get({ id: 'deepBig', dm: '大' }) },
                ]}
              />
            ),
          },

          {
            name: 'type',
            title: $i18n.get({ id: 'deepPatementType', dm: '分页类型' }),
            display: 'inline',
            initialValue: 'normal',
            disabled() {
              return !this.getProps().getPropValue('isPagination');
            },
            setter: (
              <ChoiceSetter
                options={[
                  { value: 'normal', title: 'normal' },
                  { value: 'simple', title: 'simple' },
                  { value: 'mini', title: 'mini' },
                ]}
              />
            ),
          },

          {
            name: 'shape',
            title: $i18n.get({ id: 'deepAdvanceBackFetterButton', dm: '前进后退按钮样式' }),
            display: 'block',
            initialValue: 'arrow-only',
            disabled() {
              return !this.getProps().getPropValue('isPagination');
            },
            setter: (
              <SelectSetter
                options={[
                  { value: 'normal', title: $i18n.get({ id: 'deepWriting', dm: '文字' }) },
                  { value: 'arrow-only', title: $i18n.get({ id: 'deepArrow', dm: '箭头' }) },
                  {
                    value: 'arrow-prev-only',
                    title: $i18n.get({
                      id: 'deepForwardArrowBackWriting',
                      dm: '前进箭头，后退文字',
                    }),
                  },
                  {
                    value: 'no-border',
                    title: $i18n.get({ id: 'deepBorderlessArrow', dm: '无边框箭头' }),
                  },
                ]}
              />
            ),
          },

          {
            name: 'pageSizeSelector',
            title: $i18n.get({ id: 'deepPageDisplaySelectorType', dm: '每页显示选择器类型' }),
            display: 'block',
            initialValue: false,
            disabled() {
              return !this.getProps().getPropValue('isPagination');
            },
            setter: (
              <ChoiceSetter
                options={[
                  { value: false, title: $i18n.get({ id: 'deepDoNotShow', dm: '不显示' }) },
                  { value: 'filter', title: 'filter' },
                  { value: 'dropdown', title: 'dropdown' },
                ]}
              />
            ),
          },

          {
            name: 'pageSizeList',
            title: $i18n.get({ id: 'deepOptionalValueOfThe', dm: '每页显示选择器可选值' }),
            display: 'block',
            initialValue: [5, 10, 20],
            disabled() {
              return (
                !this.getProps().getPropValue('isPagination') ||
                this.getProps().getPropValue('pagination.pageSizeSelector') === false
              );
            },
            setter: <JsonSetter />,
            hidden: env === 'design' ? true : false,
          },

          {
            name: 'pageSize',
            title: 'pageSize',
            display: 'block',
            initialValue: 10,
            disabled() {
              return !this.getProps().getPropValue('isPagination');
            },
            setter: <NumberSetter />,
            supportVariable: true,
          },

          {
            name: 'pageSizePosition',
            title: $i18n.get({ id: 'deepTheLocationOfThe', dm: '每页显示选择器在组件中的位置' }),
            display: 'block',
            initialValue: 'end',
            disabled() {
              return (
                !this.getProps().getPropValue('isPagination') ||
                this.getProps().getPropValue('pagination.pageSizeSelector') === false
              );
            },
            setter: (
              <ChoiceSetter
                options={[
                  { value: 'start', title: 'start' },
                  { value: 'end', title: 'end' },
                ]}
              />
            ),
          },

          {
            name: 'pageShowCount',
            title: $i18n.get({ id: 'deepPageCodeDisplayQuantity', dm: '页码显示数量' }),
            display: 'block',
            initialValue: 5,
            disabled() {
              return !this.getProps().getPropValue('isPagination');
            },
            setter: <NumberSetter />,
          },

          {
            name: 'hideOnlyOnePage',
            title: $i18n.get({ id: 'deepWhenTheNumberOf', dm: '当分页数为1时，是否隐藏分页器' }),
            display: 'block',
            initialValue: false,
            disabled() {
              return !this.getProps().getPropValue('isPagination');
            },
            setter: <BoolSetter />,
          },

          {
            name: 'showJump',
            title: $i18n.get({ id: 'deepDisplayJumpInputBox', dm: '显示跳转输入框与按钮' }),
            tip: $i18n.get({ id: 'deepPagingTypeIsNORMAL', dm: '分页类型为normal时起作用' }),
            disabled() {
              return (
                !this.getProps().getPropValue('isPagination') ||
                this.getProps().getPropValue('pagination.type') !== 'normal'
              );
            },
            initialValue: true,
            display: 'block',
            setter: <BoolSetter />,
          },

          {
            name: 'showMiniPager',
            title: $i18n.get({ id: 'deepWhetherToDisplayMini', dm: '是否显示顶部的迷你分页' }),
            tip: $i18n.get({ id: 'deepRenderingOnlyForPC', dm: '仅对 PC 端渲染有效' }),
            initialValue: false,
            display: 'block',
            setter: <BoolSetter />,
            disabled() {
              return !this.getProps().getPropValue('isPagination');
            },
          },
        ],
      },
    ],
  };
}
