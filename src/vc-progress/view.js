
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Progress } from '@ali/deep';

export default class FusionProgress extends React.Component {
  static displayName = 'Progress';

  static defaultProps = {
    className: '',
  };

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {
      className,
      size,
      shape,
      percent,
      state,
      progressive,
      hasBorder,
      textRender,
    } = this.props;

    const progressProps = {
      className: classnames('vc-progress', className),
      size,
      shape,
      percent,
      state,
      progressive,
      hasBorder,
      textRender,
    };

    return (
      <Progress {...progressProps} />
    );
  }
}
