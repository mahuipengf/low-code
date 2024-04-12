import React, { cloneElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import { Grid, Box } from '@alifd/layout';
import { ConfigProvider } from '@ali/deep';
import './view.less';

//TODO: read device from context
// const device = navigator.userAgent.includes('Mobile') ? 'phone' : 'desktop';

class Column extends React.Component {
  static displayName = 'Column';

  static propTypes = {
    className: PropTypes.string,
    colSpan: PropTypes.number,
    children: PropTypes.node,
  };

  render() {
    const {
      className,
      colSpan,
      children,
      style, // 将 Grid 传给 Column 的 style 透传给 Box
    } = this.props;

    return (
      <Box colSpan={colSpan} className={className} style={style}>
        {children}
      </Box>
    );
  }
}

class ColumnsLayout extends React.Component {
  static displayName = 'ColumnsLayout';

  static propTypes = {
    className: PropTypes.string,
    layout: PropTypes.string,
    columnGap: PropTypes.oneOf([
      PropTypes.number,
      PropTypes.string,
    ]),
    rowGap: PropTypes.oneOf([
      PropTypes.number,
      PropTypes.string,
    ]),
    children: PropTypes.node,
  };

  render() {
    const {
      className,
      layout,
      columnGap = 0,
      rowGap = 0,
      children,
      display,
    } = this.props;

    let gapValue = `${parseInt(rowGap, 10)}px ${parseInt(columnGap, 10)}px`;
    /*
    let gapValue = [parseInt(rowGap, 10), parseInt(columnGap, 10)];
    if (gap) {
      if (/^\d+(px)?$/.test(gap)) {
        gapValue = parseInt(gap, 10);
      } else if (/^\d+(px)? +\d+(px)?$/i.test(gap)) {
        const gapArr = gap.split(/ +/);
        gapValue = [parseInt(gapArr[0], 10), parseInt(gapArr[1], 10)];
      }
    }
    */

    const layoutArr = (layout || '12').split(':');

    let columns = null;
    if (children) {
      columns = React.Children.map(
        children,
        (child, i) => {
          if (!child) return;

          const childColSpan = child.props.colSpan;
          let realColSpan = layoutArr[i] !== undefined ? parseInt(layoutArr[i], 10) : 1;
          if (isNumber(childColSpan) && childColSpan > 0 && childColSpan <= 12) {
            realColSpan = childColSpan;
          }

          const content = child.props.children;
          const _className = classnames(
            `vc-columns-layout-column vc-container`,
            child.props.className,
            {
              'engine-empty': !content,
            },
          );

          return cloneElement(child, { colSpan: realColSpan, className: _className });
        },
      );
    }

    const _className = classnames(
      'vc-columns-layout',
      className,
    );

    return (
      <ConfigProvider.Consumer>
        {
          (context) => {
            // display 为 HORIZONTAL 时，则一直按照横向排列的方式来处理
            const device = display === 'HORIZONTAL' ? 'desktop' : context.device;
            return (<Grid device={device || 'desktop'} className={_className} style={{ gap: gapValue, gridGap: gapValue }}>
              {columns}
            </Grid>)
          }

        }
      </ConfigProvider.Consumer>
    );
  }
}

export default [ColumnsLayout, Column];
