
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Affix } from '@ali/deep';
import './view.less';

export default class FusionAffix extends React.Component {
  static displayName = 'Affix';

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
      offsetBottom,
      onAffix,
      offsetTop,
      children,
    } = this.props;

    return (
      <Affix
        offsetBottom={offsetBottom}
        offsetTop={offsetTop}
        onAffix={onAffix}
        className={classnames(
          'vc-affix',
          className,
        )}
      >
        {children}
      </Affix>
    );
  }
}
