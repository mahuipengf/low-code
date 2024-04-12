import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Paragraph } from '@ali/deep';
import './view.less';

export default class FusionParagraph extends React.Component {
  static displayName = 'Paragraph';

  static defaultProps = {
    content: null,
  };

  static propTypes = {
    content: PropTypes.string,
  };

  render() {
    const {
      className,
      content,
      size,
      type,
    } = this.props;

    return (
      <Paragraph
        className={classnames(
          'vc-paragraph',
          className,
        )}
        type={type}
        size={size}
      >
        {content}
      </Paragraph>
    );
  }
}
