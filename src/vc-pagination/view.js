import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Pagination } from '@ali/deep';
import './view.less';

export default class FusionPagination extends React.Component {
  static displayName = 'Pagination';

  static defaultProps = {
    className: '',
  };

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {
      className,
      onChange,
      size,
      type,
      shape,
      pageSizeSelector,
      pageSizePosition,
      hideOnlyOnePage,
      showJump,
      current,
      pageSize,
      total,
      onPageSizeChange,
    } = this.props;

    let pageSizeList = this.props.pageSizeList.split(',');
    if (pageSizeList.length > 1) {
      pageSizeList = pageSizeList.map(i => parseInt(i, 10));
    }
    const paginationProps = {
      className: classnames('vc-pagination', className),
      onChange,
      size,
      type,
      shape,
      pageSizeSelector,
      pageSizeList,
      pageSizePosition,
      hideOnlyOnePage,
      showJump,
      current,
      pageSize,
      total,
      onPageSizeChange,
    };

    return (
      <Pagination
        {...paginationProps}
      />
    );
  }
}
