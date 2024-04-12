
import React from 'react';
import classnames from 'classnames';
import { StateBar } from '@ali/deep';
import PropTypes from 'prop-types';
import './view.less';

export default class VcStateBar extends React.Component {
  static displayName = 'StateBar';


  static propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    breath: PropTypes.bool,
  };

  static defaultProps = {
    text: '',
  };

  render() {
    const {
      text, type, breath, className
    } = this.props;

    const _className = classnames('vc-state-bar', className);

    const props = {
      text,
      className: _className,
      type,
      breath,
    };

    return (
      <StateBar {...props} />
    );
  }
}
