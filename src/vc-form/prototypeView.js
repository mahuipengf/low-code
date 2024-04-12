import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form } from '@ali/deep';

export default class ProtoView extends Component {
  static displayName = 'Form';

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    _leaf: PropTypes.object,
  };

  render() {
    const { className, children, _leaf } = this.props;
    if (!children || !children.length) {
      const _classNames = classnames('vc-container', {
        className,
        'engine-empty': _leaf.isEmpty(),
      });

      return (
        <div className={_classNames}>{children}</div>
      );
    }

    return (
      <Form
        {...this.props}
      />
    );
  }
}
