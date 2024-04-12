import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './proto.less';

export default class FusionDropdown extends React.Component {
  static displayName = 'Dropdown';

  static defaultProps = {
    componentId: null,
    className: '',
    content: null,
  };

  static propTypes = {
    componentId: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.string,
  };

  render() {
    const {
      className,
      trigger,
      children,
      _leaf,
    } = this.props;

    return (<div
      className={classnames(
        'vc-dropdown',
        className,
        {
          'trigger-empty': _leaf && _leaf.isEmpty(),
        },
      )}
    >
      {children}
    </div>);
  }
}
