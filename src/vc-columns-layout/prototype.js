import React from 'react';
import { Bundle, VisualEngine } from '@ali/visualengine';
import { ColumnsLayoutSetter, ColumnsGapSetter, ChoiceSetter } from '@ali/visualengine-utils';
import uuid from '@ali/vu-uuid-property';
import style from '@ali/vu-style-property';
import Icon from './icon';
import Logo from './logo.svg';
import ColumnSvg from './column.svg';
import HorizonIcon from './svgs/horizontal.svg';
import VerticalIcon from './svgs/vertical.svg';
import $i18n from '../i18n/index';
import { columnsLayoutDoc } from '../common/tipUrls';

let eachWidth; // 分栏组件 1/12 的宽度
let nodeIndex; // 当前栏是第几个，从0开始
let startLayout; // 初始的分栏比例，数组格式
let startRect; // 初始的 rect

const mergeChildren = (node, size) => {
  node.mergeChildren(
    (child, index) => index >= size,
    (children) => {
      let l = children.length;
      const items = [];
      while (l++ < size) {
        items.push({ componentName: 'Column' });
      }
      return items;
    },
    null
  );
};

const getNewLayout = (oldLayout, removeIndex) => {
  if (!oldLayout) return;
  let layouts = oldLayout.split(':');
  const removeItem = layouts[removeIndex];
  if (removeIndex === 0) {
    layouts[1] = +layouts[1] + +removeItem;
    return layouts.splice(1).join(':');
  } else if (removeIndex === layouts.length - 1) {
    let preSize = +layouts[removeIndex - 1] + +removeItem;
    if (preSize <= 12) {
      layouts[removeIndex - 1] = preSize;
    }
    layouts.splice(removeIndex, 1);
    return layouts.join(':');
  } else {
    let preSize = +layouts[removeIndex - 1] + +removeItem;
    let nextSize = +layouts[removeIndex + 1] + +removeItem;
    if (preSize <= 12) {
      layouts[removeIndex - 1] = preSize;
    } else if (nextSize <= 12) {
      layouts[removeIndex + 1] = nextSize;
    }
    layouts.splice(removeIndex, 1);
    return layouts.join(':');
  }
};

export default [
  Bundle.createPrototype({
    title: $i18n.get({ id: 'deepLayoutContainer', dm: '布局容器' }),
    componentName: 'ColumnsLayout',
    category: $i18n.get({ id: 'deepLayout', dm: '布局' }),
    docUrl: columnsLayoutDoc,
    icon: Logo,
    isContainer: true,
    canHovering: true,
    canSelecting: true,
    canDropIn: false,
    canDragging: true,
    canDropTo: true,
    subtreeModified(node, options = {}) {
      const { type, removeIndex, isSubDeleting } = options;
      if (type === 'remove' && this.componentName === 'Column' && !isSubDeleting) {
        const { children } = node;
        const props = node.getProps();
        if (!children.length) {
          node.parent.removeChild(node);
        } else if (children.length === 1) {
          props.setPropValue('layout', '12');
        } else {
          props.setPropValue(
            'layout',
            getNewLayout(props.getPropValue('layout') || '6:6', removeIndex)
          );
        }
      }
    },
    initialChildren(props) {
      const layout = props.getProp('layout').getDefaultValue();
      if (!layout) {
        return [];
      }
      const c = layout.split(':').length;
      const children = [];
      for (let i = 0; i < c; i++) {
        children.push({ componentName: 'Column' });
      }
      return children;
    },
    snippets: [
      {
        screenshot: 'https://img.alicdn.com/tfs/TB1BgObx5_1gK0jSZFqXXcpaXXa-112-64.png',
        label: '1 + 2',
        schema: {
          componentName: 'ColumnsLayout',
          props: {
            layout: '12:9:3',
            columnGap: '16px',
            rowGap: '16px',
          },

          children: [
            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },
          ],
        },
      },

      {
        screenshot: 'https://img.alicdn.com/tfs/TB1glaexYj1gK0jSZFuXXcrHpXa-112-64.png',
        label: '1 + 3',
        schema: {
          componentName: 'ColumnsLayout',
          props: {
            layout: '12:4:4:4',
            columnGap: '16px',
            rowGap: '16px',
          },

          children: [
            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },
          ],
        },
      },

      {
        screenshot: 'https://img.alicdn.com/tfs/TB1cb9ex1H2gK0jSZJnXXaT1FXa-112-64.png',
        label: $i18n.get({ id: 'deepMixed', dm: '混 合' }),
        schema: {
          componentName: 'ColumnsLayout',
          props: {
            layout: '8:4:4:4:4',
            columnGap: '16px',
            rowGap: '16px',
          },

          children: [
            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },
          ],
        },
      },

      {
        screenshot: 'https://img.alicdn.com/tfs/TB1y5RLyO_1gK0jSZFqXXcpaXXa-112-40.png',
        label: $i18n.get({ id: 'deepSinglebar', dm: '单栏' }),
        schema: {
          componentName: 'ColumnsLayout',
          props: {
            layout: '12',
            columnGap: '16px',
            rowGap: '16px',
          },

          children: [
            {
              componentName: 'Column',
              props: {},
              children: [],
            },
          ],
        },
      },

      {
        screenshot: 'https://img.alicdn.com/tfs/TB1Sw4MyKL2gK0jSZFmXXc7iXXa-112-40.png',
        label: $i18n.get({ id: 'deepTwoColumns', dm: '两栏' }),
        schema: {
          componentName: 'ColumnsLayout',
          props: {
            columnGap: '16px',
            rowGap: '16px',
          },

          children: [
            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },
          ],
        },
      },

      {
        screenshot: 'https://img.alicdn.com/tfs/TB1uq4LyQY2gK0jSZFgXXc5OFXa-112-40.png',
        label: $i18n.get({ id: 'deepThreeColumns', dm: '三栏' }),
        schema: {
          componentName: 'ColumnsLayout',
          props: {
            layout: '4:4:4',
            columnGap: '16px',
            rowGap: '16px',
          },

          children: [
            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },
          ],
        },
      },

      {
        screenshot: 'https://img.alicdn.com/tfs/TB1mpEjyQL0gK0jSZFtXXXQCXXa-112-40.png',
        label: $i18n.get({ id: 'deepFourColumns', dm: '四栏' }),
        schema: {
          componentName: 'ColumnsLayout',
          props: {
            layout: '3:3:3:3',
            columnGap: '16px',
            rowGap: '16px',
          },

          children: [
            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },
          ],
        },
      },

      {
        screenshot: 'https://img.alicdn.com/tfs/TB1x_RMyQT2gK0jSZPcXXcKkpXa-112-40.png',
        label: $i18n.get({ id: 'deepOneThreeColumns', dm: '1:3分栏' }),
        schema: {
          componentName: 'ColumnsLayout',
          props: {
            layout: '3:9',
            columnGap: '16px',
            rowGap: '16px',
          },

          children: [
            {
              componentName: 'Column',
              props: {},
              children: [],
            },

            {
              componentName: 'Column',
              props: {},
              children: [],
            },
          ],
        },
      },
    ],

    configure: [
      {
        type: 'group',
        title: $i18n.get({ id: 'deepLayout', dm: '布局' }),
        display: 'block',
        items: [
          {
            name: 'layout',
            display: 'plain',
            defaultValue: '6:6',
            mutator(value) {
              if (!value) return;
              const node = this.getNode();
              const nl = value.split(':').length;
              mergeChildren(node, nl);
            },
            setter: <ColumnsLayoutSetter />,
          },

          {
            name: 'columnGap',
            display: 'plain',
            tip: $i18n.get({ id: 'deepSetTheSpacingBetween', dm: '设置分栏相邻列之间的间距' }),
            defaultValue: 0,
            setter: <ColumnsGapSetter />,
          },

          {
            name: 'rowGap',
            display: 'plain',
            tip: $i18n.get({
              id: 'deepInTheSceneOf',
              dm: '在多行分栏的场景下，设置分栏相邻行之间的间距',
            }),
            defaultValue: 0,
            setter: <ColumnsGapSetter />,
          },
        ],
      },

      {
        name: 'display',
        title: $i18n.get({ id: 'columnsLayoutMobileArrangement', dm: '移动端排列方式' }),
        display: 'block',
        defaultValue: 'VERTICAL',
        setter: (
          <ChoiceSetter
            compact={false}
            options={[
              { value: 'VERTICAL', title: <VerticalIcon width={30} height={30} /> },
              { value: 'HORIZONTAL', title: <HorizonIcon width={30} height={30} /> },
            ]}
          />
        ),
      },

      style({
        advanced: true,
      }),

      {
        type: 'group',
        name: 'advance',
        title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
        display: 'accordion',
        collapsed: true,
        items: [uuid('columnsLayout')],
      },
    ],
  }),

  Bundle.createPrototype({
    title: $i18n.get({ id: 'deepLayout', dm: '布局' }),
    icon: ColumnSvg,
    componentName: 'Column',
    category: null,
    isInline: false,
    isContainer: true,
    canHovering: true,
    canSelecting: true,
    canDropIn: true,
    canDragging: false,
    canOperating: true,
    canDropTo: false,
    // 是否可以缩放
    canResizing(node, triggerDirection) {
      // 上下不允许缩放
      if (
        triggerDirection === 'n' ||
        triggerDirection === 's' ||
        triggerDirection === 'wn' ||
        triggerDirection === 'ws' ||
        triggerDirection === 'en' ||
        triggerDirection === 'es'
      ) {
        return false;
      }
      const currentNodeIndex = node.getIndex();
      const parent = node.getParent();
      if (!parent) {
        return false;
      }
      let layout = parent.getPropValue('layout');
      if (!layout) return false;
      layout = layout.split(':').map((item) => parseInt(item, 10));

      let layoutSum = 0;
      // 每行的第一个
      const rowStartIndex = [0];
      layout.forEach((item, index) => {
        layoutSum += item;
        if (layoutSum % 12 === 0 && index + 1 < layout.length) {
          rowStartIndex.push(index + 1);
        }
      });

      if (rowStartIndex.indexOf(currentNodeIndex) >= 0 && triggerDirection === 'w') {
        return false;
      }
      if (
        (rowStartIndex.indexOf(currentNodeIndex + 1) >= 0 ||
          currentNodeIndex === layout.length - 1) &&
        triggerDirection === 'e'
      ) {
        return false;
      }
      return true;
    },
    onResizeStart(e, triggerDirection, node) {
      nodeIndex = node.getIndex();
      startLayout = node.getParent().getPropValue('layout');
      if (!startLayout) {
        return;
      }
      startLayout = startLayout.split(':').map((item) => parseInt(item, 10));
      startRect = node.getRect();
      eachWidth = startRect.width / startLayout[nodeIndex];
    },
    onResize(e, triggerDirection, node, moveX) {
      let moveColumn = Math.round(moveX / eachWidth);
      const layout = [...startLayout];
      if (triggerDirection === 'e') {
        if (moveColumn > 0) {
          moveColumn = Math.min(moveColumn, layout[nodeIndex + 1] - 1);
        } else {
          moveColumn = -Math.min(-moveColumn, layout[nodeIndex] - 1);
        }
        layout[nodeIndex] += moveColumn;
        layout[nodeIndex + 1] -= moveColumn;
      } else {
        if (moveColumn > 0) {
          moveColumn = Math.min(moveColumn, layout[nodeIndex] - 1);
        } else {
          moveColumn = -Math.min(-moveColumn, layout[nodeIndex - 1] - 1);
        }
        layout[nodeIndex] -= moveColumn;
        layout[nodeIndex - 1] += moveColumn;
      }
      node.getParent().setPropValue('layout', layout.join(':'));
    },
    initialChildren: null,
    configure: [
      // {
      //   name: 'colSpan',
      //   title: '宽度(分栏占单元格数量)',
      //   tip: '默认从分栏容器的布局配置项中读取，配置后会覆盖的分栏容器的布局配置',
      //   defaultValue: '',
      //   setter: <NumberSetter placeholder="请输入数字 1~12" />,
      // },
      uuid('column'),
      style({
        advanced: true,
      }),
    ],
  }),
];
