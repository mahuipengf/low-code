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
import { tabsLayoutDoc, tabsLayoutItems } from '../common/tipUrls';

function isI18nValue(value) {
  return value && value.type === 'i18n';
}

export default [
  Bundle.createPrototype({
    componentName: 'TabsLayout',
    title: '选项卡',
    icon: Logo,
    docUrl: tabsLayoutDoc,
    category: '布局',
    isInline: false,
    isContainer: true,
    canHovering: true,
    canSelecting: true,
    canDragging: true,
    canDropIn: 'Tab',
    canDropTo: true,
    initialChildren(props) {
      let items = props.getPropValue('items');

      if (items?.value) {
        items = items.value;
      }

      return (items || [...Array(2)]).map(() => ({
        componentName: 'Tab',
        props: { primaryKey: uniqueId(null, 'tab') },
      }));
    },
    snippets: [
      {
        screenshot: 'https://img.alicdn.com/tfs/TB1D0p2u.z1gK0jSZLeXXb9kVXa-112-64.png',
        label: '普通型',
        schema: {
          componentName: 'TabsLayout',
          props: {},
        },
      },
      {
        screenshot: 'https://img.alicdn.com/tfs/TB1C0pZuWL7gK0jSZFBXXXZZpXa-112-64.png',
        label: '胶囊型',
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
        title: '默认激活',
        display: 'none',
        initial(value) {
          if (value) {
            return value;
          }
          const node = this.getNode();
          const children = node.getChildren();
          return children.children && children.children.length ? children.children[0].getPropValue('primaryKey') : undefined;
        }
      },
      {
        name: 'isItemsVariable',
        title: '标签项是绑定变量',
        display: 'none',
        initialValue: false, // this.getProps().getProp('items').useVariable
      },
      {
        name: 'items',
        title: '标签项',
        fieldStyle: 'block',
        tip: {
          url: tabsLayoutItems,
          content: '点击 ? 查看数据格式',
        },
        supportVariable: false,
        setter: <ListSetter
          primaryKey="primaryKey"
          descriptor="title"
          checkField="defaultActived"
          configure={[
            {
              name: 'title',
              title: '名称',
              display: 'inline',
              initial(val, defaultValue) {
                if (!val) {
                  return defaultValue;
                } else if (val.type === 'variable') {
                  return '标签项(变量)';
                }

                return val;
              },
              initialValue: { zh_CN: '标签项', en_US: 'Tabs Layout', type: 'i18n' },
              setter: <I18nSetter/>,
              supportVariable: false,
            },
            {
              name: 'primaryKey',
              title: '项目编号',
              display: 'inline',
              initialValue: function init(val) {
                if (val) return val;
                return uniqueId(null, 'tab');
              },
              setter: <TextSetter readOnly/>,
            },
            {
              name: 'defaultActived',
              title: '默认激活',
              display: 'none',
            },
            {
              name: 'closeable',
              title: '可关闭',
              display: 'inline',
              initialValue: false,
              setter: <BoolSetter/>,
              supportVariable: false,
            },
            {
              name: 'disabled',
              title: '是否禁用',
              display: 'inline',
              initialValue: false,
              setter: <BoolSetter/>,
              supportVariable: false,
            },
            {
              name: 'customKey',
              title: '自定义Key',
              display: 'block',
              setter: <TextSetter/>,
              supportVariable: false,
            }
          ]}
        />,
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
              primaryKey, title, closeable, disabled,
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

          node.mergeChildren((child) => {
            const primaryKey = String(child.getPropValue('primaryKey'));
            if (Object.hasOwnProperty.call(map, primaryKey)) {
              child.setPropValue('title', map[primaryKey].title);
              child.setPropValue('closeable', map[primaryKey].closeable);
              child.setPropValue('disabled', map[primaryKey].disabled);
              delete map[primaryKey];
              return false;
            }
            return true;
          }, () => {
            const items = [];
            for (const primaryKey in map) {
              if (Object.hasOwnProperty.call(map, primaryKey)) {
                items.push({ componentName: 'Tab', props: map[primaryKey] });
              }
            }
            return items;
          }, (child1, child2) => {
            const a = hotValue.findIndex(
              item => String(item.primaryKey) === String(child1.getPropValue('primaryKey')),
            );
            const b = hotValue.findIndex(
              item => String(item.primaryKey) === String(child2.getPropValue('primaryKey')),
            );
            return a - b;
          });
        },
        useVariableChange() {
          const itemsProp = this.getProps().getProp('items');
          if (itemsProp.useVariable) {
            this.getProps().getProp('isItemsVariable').setValue(true, true, false, { disableMutator: true });
          } else {
            this.getProps().getProp('isItemsVariable').setValue(false, true, false, { disableMutator: true });
          }
        },
      },
      {
        name: 'shape',
        title: '形态',
        display: 'inline',
        initialValue: 'pure',
        setter: <ChoiceSetter options={[
          { title: '普通型', value: 'pure' },
          { title: '包裹型', value: 'wrapped' },
          { title: '文本型', value: 'text' },
          { title: '胶囊型', value: 'capsule' },
        ]}
        />,
      },
      {
        name: 'size',
        title: '大小',
        display: 'inline',
        initialValue: 'medium',
        setter: <ChoiceSetter options={[
          { title: '小', value: 'small', tip: '小号尺寸' },
          { title: '中', value: 'medium', tip: '正常尺寸' },
        ]}
        />,
      },
      {
        name: 'contentPadding',
        title: '内容边距',
        tip: '设定内容区的内间距，请输入合法的 CSS padding 值',
        display: 'inline',
        initialValue: '20px 20px',
        setter: <TextSetter placeholder="20px 20px"/>,
      },
      {
        name: 'excessMode',
        title: '选项卡过多时的滑动模式',
        display: 'block',
        initialValue: 'slide',
        setter: <ChoiceSetter options={[
          { title: '滑动', value: 'slide' },
          { title: '下拉', value: 'dropdown' },
        ]}
        />,
      },
      {
        name: 'tabPosition',
        title: '导航选项卡的位置',
        tip: '只适合胶囊型',
        display: 'block',
        initialValue: 'top',
        hidden() {
          return !(this.getProps().getPropValue('shape') === 'wrapped');
        },
        setter: <ChoiceSetter options={[
          { title: '上', value: 'top' },
          { title: '下', value: 'bottom' },
          { title: '左', value: 'left' },
          { title: '右', value: 'right' },
        ]}
        />,
      },
      style({ advanced: true }),
      {
        type: 'group',
        name: 'advance',
        title: '高级',
        display: 'accordion',
        collapsed: true,
        items: [
          uuid('tabsLayout'),
          {
            name: 'unmountInactiveTabs',
            title: '切换销毁',
            display: 'inline',
            initialValue: false,
            setter: <BoolSetter/>,
            supportVariable: false,
          },
          {
            name: 'traceable',
            title: '开启定位',
            display: 'none', // TODO: 待实现
            initialValue: false,
            setter: <BoolSetter/>,
            supportVariable: false,
          },
          {
            name: 'forceRender',
            title: '强制渲染',
            display: 'none', // TODO: 待实现
            initialValue: false,
            setter: <BoolSetter/>,
            supportVariable: false,
          },
          {
            name: 'needBadge',
            title: '开启徽标',
            display: 'inline',
            initialValue: false,
            setter: <BoolSetter/>,
            supportVariable: false,
          },
          {
            name: 'renderBadge',
            title: '徽标渲染',
            display: 'block',
            disabled() {
              return !this.getProps().getPropValue('needBadge')
            },
            setter: <ActionSetter
              defaultActionName="renderBadge"
              defaultCode={`function renderBadge(tabItem) {
  //支持返回jsx，返回false或者null时不显示内容，返回字符串"dot"显示红点
  return 'dot';
}`}/>,
          },
          {
            name: 'tabRender',
            title: '自定义渲染选项卡',
            display: 'none',
            disabled() {
              return this.getProps().getPropValue('needBadge')
            },
            setter: <ActionSetter defaultActionName="renderTabItem"
                                  defaultCode={`function renderTabItem(key, props) {
  return props.title;
}`}/>,
          },
          {
            name: 'extraRender',
            title: '渲染导航栏附加内容',
            display: 'none',
            setter: <ActionSetter defaultActionName="renderTabExtra"
                                  defaultCode={`function renderTabExtra() {
  return 'Extra';
}`}/>,
          },
          ...events([
            {
              name: 'onTabChange', title: 'onChange 选项卡切换', initialValue: `/**
* 选项卡切换时触发
* @param activeIndex
* @param key
*/
function onTabChange(activeIndex, key){
  console.log(activeIndex, key);
}`,
            },
            {
              name: 'onClose', title: 'onClose 选项卡关闭', initialValue: `/**
* 选项卡关闭时触发
* @param key 关闭的选项卡的 key
*/
function onClose(key){
  console.log(key);
}`,
            },
          ], { display: 'none' }),
        ],
      },
    ],
  }),
  Bundle.createPrototype({
    componentName: 'Tab',
    title: '选项',
    icon: TabIcon,
    category: null,
    isInline: false,
    isContainer: true,
    canHovering: false,
    canSelecting: false,
    canDropIn: true,
    canDragging: false,
    canDropTo: 'Tabs',
    configure: [{
      name: 'primaryKey',
      title: '键值',
      display: 'none',
    }, {
      name: 'title',
      title: '名称',
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
    }, {
      name: 'badge',
      title: '角标',
      display: 'none',
    }],
  }),
];
