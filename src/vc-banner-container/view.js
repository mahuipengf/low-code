import React from 'react';
import classnames from 'classnames';
import { Button, BannerContainer } from '@ali/deep';

import './view.less';

class View extends React.Component {
  static displayName = 'BannerContainer';

  render() {
    const {
      className,
      children,
      extra,
      contentWidth,
      containerWidth,
      autoWidth,
      layout,
      useInShell,
      getRefContainer,
    } = this.props;

    const passProps = {
      useInShell: useInShell !== false,
      extra,
      autoWidth,
      layout,
      getRefContainer,
    };
    if (contentWidth && parseInt(contentWidth, 10) > 0) {
      passProps.contentWidth = contentWidth;
    }
    if (containerWidth && parseInt(containerWidth, 10) > 0) {
      passProps.containerWidth = containerWidth;
    }

    const count = React.Children.count(children);

    const _className = classnames(
      `vc-banner-container`,
      className,
    );

    return (<BannerContainer className={_className} {...passProps}>
      {count ? children : <div className="engine-empty" />}
    </BannerContainer>);
  }
}

export default View;
