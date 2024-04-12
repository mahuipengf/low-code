import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../common/richText.less';
import './view.less';

class FusionRichText extends Component {
  static displayName = 'RichText';

  static propTypes = {
    className: PropTypes.string,
    content: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    content: '',
  };

  render() {
    const {
      content,
      className,
    } = this.props;

    return (
      <div className={`vc-rich-text ${className || ''}`}>
        <div
          className="mce-content-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>);
  }
}

export default FusionRichText;
