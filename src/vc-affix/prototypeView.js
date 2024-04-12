import React from 'react';
import PropTypes from 'prop-types';
import './prototypeView.less';

class FusionAffix extends React.Component {
  static defaultProps = {
    className: '',
    title: '',
    children: '',
  };

  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.element,
  };

  static displayName = 'Affix';

  render() {
    return (
      <div className={`vc-affix ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

export default FusionAffix;
