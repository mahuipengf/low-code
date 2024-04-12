// 由于 VE 的一些限制，设计器视图采用内联样式降级实现，而不使用 @alifd/layout
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import './view.less';

class Column extends React.Component {
  static displayName = 'Column';

  static propTypes = {
    className: PropTypes.string,
    parentColSpan: PropTypes.number,
    colSpan: PropTypes.number,
    children: PropTypes.node,
    _leaf: PropTypes.object,
  };

  render() {
    const {
      className,
      parentColSpan,
      colSpan,
      children,
      _leaf,
    } = this.props;

    let realColSpan = parentColSpan;
    if (isNumber(colSpan) && colSpan > 0 && colSpan <= 12) {
      realColSpan = colSpan;
    }

    const gridStyle = {
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      display: 'flex',
      position: 'relative',
      gridArea: `span 1 / span ${realColSpan}`,
      minWidth: 'auto',
    };

    const newClassName = classnames(
      `vc-columns-layout-column vc-container`,
      className,
      {
        'engine-empty': _leaf && _leaf.isEmpty(),
      },
    );
    return (
      <div className={newClassName} style={gridStyle}>
        {children}
      </div>
    );
  }
}

class ColumnsLayout extends React.Component {
  static displayName = 'ColumnsLayout';

  static propTypes = {
    className: PropTypes.string,
    layout: PropTypes.string,
    children: PropTypes.node,
    columnGap: PropTypes.oneOf([
      PropTypes.number,
      PropTypes.string,
    ]),
    rowGap: PropTypes.oneOf([
      PropTypes.number,
      PropTypes.string,
    ]),
    /*
    gap: PropTypes.oneOf([
      PropTypes.number,
      PropTypes.string,
    ]),
    */
  };

  render() {
    const {
      className,
      children,
      layout,
      columnGap = 0,
      rowGap = 0,
    } = this.props;

    const layoutArr = (layout || '12').split(':');

    let columns = null;
    // fix children 不为数组时，低代码组件渲染为空
    if (children) {
      columns = React.Children.map(
        children,
        (child, i) => React.cloneElement(child, {
          parentColSpan: layoutArr[i] !== undefined ? parseInt(layoutArr[i], 10) : 1,
        }),
      );
    }

    const newClassName = classnames(
      'vc-columns-layout',
      className,
    );

    const gapValue = `${parseInt(rowGap, 10)}px ${parseInt(columnGap, 10)}px`;
    /*
    if (gap) {
      if (/^\d+$/.test(gap)) {
        gapValue = `${gap}px ${gap}px`;
      } else if (/^\d+px$/i.test(gap)) {
        gapValue = `${gap} ${gap}`;
      } else if (/^\d+ +\d+$/i.test(gap)) {
        const gapArr = gap.split(/ +/);
        gapValue = `${gapArr[0]}px ${gapArr[1]}px`;
      } else if (/^\d+px +\d+px$/i.test(gap)) {
        gapValue = gap;
      }
    }
    */

    const gridStyle = {
      gap: gapValue,
      gridTemplateColumns: 'repeat(12, 1fr)',
      placeItems: 'stretch',
      gridAutoRows: 'auto',
      gridArea: 'span 1 / span 1',
      display: 'grid',
      position: 'relative',
    };

    return (
      <div className={newClassName} style={gridStyle}>
        {columns}
      </div>
    );
  }
}

export default [ColumnsLayout, Column];
