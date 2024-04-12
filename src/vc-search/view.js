import React from 'react';
import classnames from 'classnames';
import { Search } from '@ali/deep';
import './view.less';

export default class FusionSearch extends React.Component {
  static displayName = 'Search';

  render() {
    const {
      className,
      size,
      type,
      shape,
      placeholder,
      defaultValue,
      searchText,
      dataSource,
      autoFocus,
      onChange,
      onSearch,
      onFilterChange,
      hasClear,
      disabled,
      filter,
      isFilter,
      defaultFilterValue,
    } = this.props;

    const searchProps = {
      size,
      type,
      shape,
      placeholder,
      defaultValue,
      searchText,
      dataSource: dataSource.data,
      autoFocus,
      onChange,
      onSearch,
      onFilterChange,
      hasClear,
      disabled,
      filter: [],
    };

    if (isFilter) {
      searchProps.filter = filter.data,
      searchProps.defaultFilterValue = defaultFilterValue;
    }

    return (
      <Search className={classnames('vc-search', className)} {...searchProps} />
    );
  }
}
