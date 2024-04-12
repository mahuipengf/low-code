import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './view.less';

export default class Title extends Component {
  static displayName = 'Title';

  static propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    noDecoration: PropTypes.bool,
    anchor: PropTypes.string,
  };

  static defaultProps = {
    noDecoration: false,
    anchor: null,
  };

  componentDidMount() {
    this.locate();
  }

  locate() {
    const { anchor } = this.props;
    const hash = (window.location.hash || '').replace('#', '');
    if (!hash || hash !== anchor) {
      return;
    }
    const element = document.getElementById(anchor);
    if (!element) {
      return;
    }
    window.location.hash = '';
    setTimeout(() => {
      window.location.hash = `#${anchor}`;
    }, 300);
  }

  render() {
    const {
      className, type, text, noDecoration, anchor,
    } = this.props;

    return (
      <div
        className={classnames('vc-title', className, {
          [`vc-title-${type}`]: true,
          'vc-title-no-decoration': noDecoration,
        })}
      >
        <span id={anchor}>
          {text}
        </span>
        {anchor ? (
          <a className="vc-title-anchor" href={`#${anchor}`}>
            #
          </a>
        ) : null}
      </div>
    );
  }
}
