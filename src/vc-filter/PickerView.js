import React from 'react';
import PropTypes from 'prop-types';

export default class FilterPicker extends React.Component {
  static displayName = 'FilterPicker'

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children } = this.props;
    return (
      <div className="vc-filter-picker">
        {children}
      </div>
    );
  }
}
