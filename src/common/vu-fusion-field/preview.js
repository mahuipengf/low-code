import React from 'react';
import PropTypes from 'prop-types';

export default class Preview extends React.Component {
  render() {
    const {
      children,
    } = this.props;

    return <span className="vc-form-item-view">{children}</span>;
  }
}