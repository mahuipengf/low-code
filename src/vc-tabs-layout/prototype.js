import React from 'react';
import { Bundle, Env } from '@ali/visualengine';
import {
  ListSetter,
  BoolSetter,
  I18nSetter,
  ChoiceSetter,
  TextSetter,
  ActionSetter,
} from '@ali/visualengine-utils';
import { uniqueId } from '@ali/ve-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import events from '@ali/vu-events-property';
import Logo from './logo.svg';
import TabIcon from './tab.svg';
import $i18n from '../i18n/index';
import { tabsLayoutDoc, tabsLayoutItems } from '../common/tipUrls';

function isI18nValue(value) {
  return value && value.type === 'i18n';
}

export default [
  Bundle.createPrototype({
    componentName: 'TabsLayout',
    title: $i18n.get({ id: 'deepTab', dm: '选项卡' }),
    icon: Logo,
    docUrl: tabsLayoutDoc,
    category: $i18n.get({ id: 'deepLayout', dm: '布局' }),
    isInline: false,
    isContainer: true,
    canHovering: true,
    canSelecting: true,
    canDragging: true,
    canDropIn: 'Tab',
    canDropTo: true,
    initialChildren(props) {
      let items = props.getPropValue('items');

      if (items?.type === 'JSExpression') {
        items = items.mock;
      } else if (items?.type === 'variable') {
        items = items.value;
      }
      // 默认初始化时，初始化 2 个 tab
      // FIX 当复制操作时，根据 items 数据初始化 tab https://aone.alibaba-inc.com/req/34681620
      return (items || [...Array(2)]).map(() => ({
        componentName: 'Tab',
        props: { primaryKey: uniqueId(null, 'tab') },
      }));
    },

    snippets: [
      {
        screenshot: 'https://img.alicdn.com/tfs/TB1D0p2u.z1gK0jSZLeXXb9kVXa-112-64.png',
        label: $i18n.get({ id: 'deepNormalType', dm: '普通型' }),
        schema: {
          componentName: 'TabsLayout',
          props: {},
        },
      },

      {
        screenshot: 'https://img.alicdn.com/tfs/TB1C0pZuWL7gK0jSZFBXXXZZpXa-112-64.png',
        label: $i18n.get({ id: 'deepCapsuleType', dm: '胶囊型' }),
        schema: {
          componentName: 'TabsLayout',
          props: {
            shape: 'capsule',
          },
        },
      },
    ],

    configure: [
      {
        name: 'defaultActiveKey',
        title: $i18n.get({ id: 'deepDefaultActivation', dm: '默认激活' }),
        display: 'none',
        initial(value) {
          if (value) {
            return value;
          }
          const node = this.getNode();
          const children = node.getChildren();
          return children.children && children.children.length
            ? children.children[0].getPropValue('primaryKey')
            : undefined;
        },
      },

      {
        name: 'isItemsVariable',
        title: $i18n.get({ id: 'deepTheTabItemIs', dm: '标签项是绑定变量' }),
        display: 'none',
        initialValue: false, // this.getProps().getProp('items').useVariable
      },
      {
        name: 'items',
        title: $i18n.get({ id: 'deepTagItem', dm: '标签项' }),
        fieldStyle: 'block',
        tip: {
          url: tabsLayoutItems,
          content: $i18n.get({ id: 'deepClickViewDataFormat', dm: '点击 ? 查看数据格式' }),
        },

        supportVariable: true,
        setter: (
          <ListSetter
            primaryKey="primaryKey"
            descriptor="title"
            checkField="defaultActived"
            configure={[
              {
                name: 'title',
                title: $i18n.get({ id: 'deepName', dm: '名称' }),
                display: 'inline',
                initial(val, defaultValue) {
                  if (!val) {
                    return defaultValue;
                  } else if (val.type === 'variable') {
                    return $i18n.get({ id: 'deepLabelItemVariable', dm: '标签项(变量)' });
                  }

                  return val;
                },
                initialValue: { zh_CN: '标签项', en_US: 'Tabs Layout', type: 'i18n' },
                setter: <I18nSetter />,
                supportVariable: true,
              },

              {
                name: 'primaryKey',
                title: $i18n.get({ id: 'deepItemNumber', dm: '项目编号' }),
                display: 'inline',
                initialValue: function init(val) {
                  if (val) return val;
                  return uniqueId(null, 'tab');
                },
                setter: <TextSetter readOnly />,
              },

              {
                name: 'defaultActived',
                title: $i18n.get({ id: 'deepDefaultActivation', dm: '默认激活' }),
                display: 'none',
              },

              {
                name: 'closeable',
                title: $i18n.get({ id: 'deepCanBeClosed', dm: '可关闭' }),
                display: 'inline',
                initialValue: false,
                setter: <BoolSetter />,
                supportVariable: true,
              },

              {
                name: 'disabled',
                title: $i18n.get({ id: 'deepIsItDisabled', dm: '是否禁用' }),
                display: 'inline',
                initialValue: false,
                setter: <BoolSetter />,
                supportVariable: true,
              },

              {
                name: 'customKey',
                title: $i18n.get({ id: 'deepCustomKey', dm: '自定义Key' }),
                tip: $i18n.get({ id: 'deepTabsCustomKeyTip', dm: '会作为 onChange 的第三个参数的一个 key(customKey) 传给用户' }),
                display: 'block',
                setter: <TextSetter />,
                supportVariable: true,
              },
            ]}
          />
        ),

        accessor(value) {
          if (value) {
            return value;
          }
          const node = this.getNode();
          const children = node.getChildren();
          const defaultActiveKey = String(node.getPropValue('defaultActiveKey'));
          return children.map((child) => {
            const primaryKey = String(child.getPropValue('primaryKey'));
            const title = child.getPropValue('title');
            const closeable = child.getPropValue('closeable');
            const disabled = child.getPropValue('disabled');
            const data = {
              primaryKey,
              title,
              closeable,
              disabled,
            };

            if (primaryKey === defaultActiveKey) {
              data.defaultActived = true;
            }
            return data;
          });
        },
        mutator(value, hotValue) {
          const node = this.getNode();
          const defaultActiveProp = node.getProp('defaultActiveKey');
          const map = {};
          if (!Array.isArray(value)) {
            value = [];
          }
          let defaultActiveKey = '';
          value.forEach((item) => {
            const tabitem = Object.assign({}, item);
            map[item.primaryKey] = tabitem;
            if (tabitem.defaultActived) {
              defaultActiveKey = String(tabitem.primaryKey);
            }
            delete tabitem.defaultActived;
          });
          defaultActiveProp.setValue(defaultActiveKey);

          node.mergeChildren(
            (child) => {
              const primaryKey = String(child.getPropValue('primaryKey'));
              if (Object.hasOwnProperty.call(map, primaryKey)) {
                child.setPropValue('title', map[primaryKey].title);
                child.setPropValue('closeable', map[primaryKey].closeable);
                child.setPropValue('disabled', map[primaryKey].disabled);
                delete map[primaryKey];
                return false;
              }
              return true;
            },
            () => {
              const items = [];
              for (const primaryKey in map) {
                if (Object.hasOwnProperty.call(map, primaryKey)) {
                  items.push({ componentName: 'Tab', props: map[primaryKey] });
                }
              }
              return items;
            },
            (child1, child2) => {
              const a = hotValue.findIndex(
                (item) => String(item.primaryKey) === String(child1.getPropValue('primaryKey'))
              );

              const b = hotValue.findIndex(
                (item) => String(item.primaryKey) === String(child2.getPropValue('primaryKey'))
              );

              return a - b;
            }
          );
        },
        useVariableChange() {
          const itemsProp = this.getProps().getProp('items');
          if (itemsProp.useVariable) {
            this.getProps()
              .getProp('isItemsVariable')
              .setValue(true, true, false, { disableMutator: true });
          } else {
            this.getProps()
              .getProp('isItemsVariable')
              .setValue(false, true, false, { disableMutator: true });
          }
        },
      },

      {
        name: 'shape',
        title: $i18n.get({ id: 'deepForm', dm: '形态' }),
        display: 'inline',
        initialValue: 'pure',
        setter: (
          <ChoiceSetter
            options={[
              { title: $i18n.get({ id: 'deepNormalType', dm: '普通型' }), value: 'pure' },
              { title: $i18n.get({ id: 'deepWrapping', dm: '包裹型' }), value: 'wrapped' },
              { title: $i18n.get({ id: 'deepTextType', dm: '文本型' }), value: 'text' },
              { title: $i18n.get({ id: 'deepCapsuleType', dm: '胶囊型' }), value: 'capsule' },
            ]}
          />
        ),
      },

      {
        name: 'size',
        title: $i18n.get({ id: 'deepSize', dm: '大小' }),
        display: 'inline',
        initialValue: 'medium',
        setter: (
          <ChoiceSetter
            options={[
              {
                title: $i18n.get({ id: 'deepSmall', dm: '小' }),
                value: 'small',
                tip: $i18n.get({ id: 'deepSmallSize', dm: '小号尺寸' }),
              },
              {
                title: $i18n.get({ id: 'deepIn', dm: '中' }),
                value: 'medium',
                tip: $i18n.get({ id: 'deepNormalSize', dm: '正常尺寸' }),
              },
            ]}
          />
        ),
      },

      {
        name: 'contentPadding',
        title: $i18n.get({ id: 'deepContentMargin', dm: '内容边距' }),
        tip: $i18n.get({
          id: 'deepSetTheInnerSpacing',
          dm: '设定内容区的内间距，请输入合法的 CSS padding 值',
        }),
        display: 'inline',
        initialValue: '20px 20px',
        setter: <TextSetter placeholder="20px 20px" />,
      },

      {
        name: 'excessMode',
        title: $i18n.get({ id: 'deepTabsTooMuchSliding', dm: '选项卡过多时的滑动模式' }),
        display: 'block',
        initialValue: 'slide',
        setter: (
          <ChoiceSetter
            options={[
              { title: $i18n.get({ id: 'deepSlide', dm: '滑动' }), value: 'slide' },
              { title: $i18n.get({ id: 'deepDropDown', dm: '下拉' }), value: 'dropdown' },
            ]}
          />
        ),
      },

      {
        name: 'tabPosition',
        title: $i18n.get({ id: 'deepNavigationTabLocation', dm: '导航选项卡的位置' }),
        tip: $i18n.get({ id: 'deepOnlySuitableForCapsule', dm: '只适合胶囊型' }),
        display: 'block',
        initialValue: 'top',
        hidden() {
          return !(this.getProps().getPropValue('shape') === 'wrapped');
        },
        setter: (
          <ChoiceSetter
            options={[
              { title: $i18n.get({ id: 'deepOn', dm: '上' }), value: 'top' },
              { title: $i18n.get({ id: 'deepUnder', dm: '下' }), value: 'bottom' },
              { title: $i18n.get({ id: 'deepLeft', dm: '左' }), value: 'left' },
              { title: $i18n.get({ id: 'deepRight', dm: '右' }), value: 'right' },
            ]}
          />
        ),
      },

      style({ advanced: true }),
      {
        type: 'group',
        name: 'advance',
        title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
        display: 'accordion',
        items: [
          uuid('tabsLayout'),
          {
            name: 'lazyLoad',
            title: $i18n.get({ id: 'deepLazyLoading', dm: '懒加载' }),
            display: 'inline',
            initialValue: true,
            setter: <BoolSetter />,
            supportVariable: true,
          },
          {
            name: 'unmountInactiveTabs',
            title: $i18n.get({ id: 'deepSwitchDestruction', dm: '切换销毁' }),
            display: 'inline',
            initialValue: false,
            setter: <BoolSetter />,
            supportVariable: true,
          },
          {
            name: 'traceable',
            title: $i18n.get({ id: 'deepOpenPositioning', dm: '开启定位' }),
            display: 'inline', // TODO: 待实现
            initialValue: false,
            setter: <BoolSetter />,
            supportVariable: true,
          },
          {
            name: 'traceCode',
            title: $i18n.get({ id: 'deepTabsTraceCode', dm: '定位标识' }),
            tip: $i18n.get({
              id: 'deepTabsTraceCodeTip',
              dm: '默认情况下，用于标识定位的名字为 __tab_index_${fieldId}，用户可根据需要自己指定，注意不要和其他 tab 冲突',
            }),
            display: 'inline',
            setter: <TextSetter />,
            supportVariable: true,
            disabled() {
              return !this.getProps().getPropValue('traceable');
            },
          },
          {
            name: 'forceRender',
            title: $i18n.get({ id: 'deepForceRendering', dm: '强制渲染' }),
            display: 'none', // TODO: 待实现
            initialValue: false,
            setter: <BoolSetter />,
            supportVariable: true,
          },

          {
            name: 'needBadge',
            title: $i18n.get({ id: 'deepOpenLogo', dm: '开启徽标' }),
            display: 'inline',
            initialValue: false,
            setter: <BoolSetter />,
            supportVariable: true,
          },

          {
            name: 'renderBadge',
            title: $i18n.get({ id: 'deepRenderingOfLogo', dm: '徽标渲染' }),
            display: 'block',
            disabled() {
              return !this.getProps().getPropValue('needBadge');
            },
            setter: (
              <ActionSetter
                defaultActionName="renderBadge"
                defaultCode={$i18n.get({
                  id: 'deepFunctionRenderbadgeTabItemSupport',
                  dm:
                    'function renderBadge(tabItem) {\n  //支持返回jsx，返回false或者null时不显示内容，返回字符串"dot"显示红点\n  return \'dot\';\n}',
                })}
              />
            ),
          },

          {
            name: 'tabRender',
            title: $i18n.get({ id: 'deepCustomRenderingTab', dm: '自定义渲染选项卡' }),
            display: 'block',
            disabled() {
              return this.getProps().getPropValue('needBadge');
            },
            setter: (
              <ActionSetter
                defaultActionName="renderTabItem"
                defaultCode={`function renderTabItem(key, props) {
  return props.title;
}`}
              />
            ),
          },

          {
            name: 'extraRender',
            title: $i18n.get({
              id: 'deepRenderingNavigationBarAttached',
              dm: '渲染导航栏附加内容',
            }),
            display: 'block',
            setter: (
              <ActionSetter
                defaultActionName="renderTabExtra"
                defaultCode={`function renderTabExtra() {
  return 'Extra';
}`}
              />
            ),
          },

          ...events([
            {
              name: 'onTabChange',
              title: $i18n.get({ id: 'deepOnchangeTabSwitch', dm: 'onChange 选项卡切换' }),
              initialValue: `/**
* 选项卡切换时触发
* @param activeIndex
* @param key
*/
function onTabChange(activeIndex, key){
  console.log(activeIndex, key);
}`,
            },

            {
              name: 'onClose',
              title: $i18n.get({ id: 'deepOnCloseTabIsClosed', dm: 'onClose 选项卡关闭' }),
              initialValue: `/**
* 选项卡关闭时触发
* @param key 关闭的选项卡的 key
*/
function onClose(key){
  console.log(key);
}`,
            },
          ]),
        ],
      },
    ],
  }),

  Bundle.createPrototype({
    componentName: 'Tab',
    title: $i18n.get({ id: 'deepOption', dm: '选项' }),
    icon: TabIcon,
    category: null,
    isInline: false,
    isContainer: true,
    canHovering: false,
    canSelecting: false,
    canDropIn: true,
    canDragging: false,
    canDropTo: 'Tabs',
    configure: [
      {
        name: 'primaryKey',
        title: $i18n.get({ id: 'deepKeyValue', dm: '键值' }),
        display: 'none',
      },
      {
        name: 'title',
        title: $i18n.get({ id: 'deepName', dm: '名称' }),
        display: 'none',
        defaultValue: { zh_CN: '标签项', en_US: 'Tab Item', type: 'i18n' },
        initial(val, defaultValue) {
          const locale = Env.getLocale();
          const useLocale = Env.supports && Env.supports('i18nPane') ? locale : null;
          if (val == null || val === defaultValue) {
            val = defaultValue;
          }
          if (isI18nValue(val)) {
            return { ...val, use: useLocale };
          }
          return {
            type: 'i18n',
            [locale]: val,
            use: useLocale,
          };
        },
      },
      {
        name: 'badge',
        title: $i18n.get({ id: 'deepSubscript', dm: '角标' }),
        display: 'none',
      },
    ],
  }),
];
