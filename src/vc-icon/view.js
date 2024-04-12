import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from '@ali/deep';

export default class FusionIcon extends React.Component {
  static displayName = 'Icon';

  static propTypes = {
    className: PropTypes.string,
    extraClass: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string,
  };

  render() {
    const {
      className,
      extraClass,
      size,
      type,
    } = this.props;

    return (
      <Icon
        className={classnames('vc-icon', {
          [className]: !!className,
          [extraClass]: !!extraClass,
        })}
        size={size}
        type={!type.useType ? type.otherType : type.baseType}
      />
    );
  }
}
