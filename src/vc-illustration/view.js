import React from 'react';
import { Illustration } from '@ali/deep';
import classnames from 'classnames'

export default class FusionIllustration extends React.Component {
  static displayName = 'Illustration';

  render() {
    const {
      className,
      title,
      content,
      type,
      size,
      link,
      linkText,
      renderAction,
      renderContent,
      qrCodeUrl
    } = this.props;

    const illustrationProps = {
      title,
      content: renderContent ? renderContent() : content,
      type,
      size,
      link,
      linkText,
      qrCodeUrl,
      action: renderAction ? renderAction() : null
    };

    return (
      <div className={`${classnames(className, 'vc-illustration')}`}>
        <Illustration {...illustrationProps} />
      </div>
    );
  }
}

