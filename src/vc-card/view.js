import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Card } from '@ali/deep';
import './view.less';

class FusionCard extends React.Component {
  static displayName = 'Card';

  static defaultProps = {
    componentId: null,
    content: null,
    title: null,
    subTitle: null,
    className: '',
  };

  static propTypes = {
    componentId: PropTypes.string,
    content: PropTypes.string,
    title: PropTypes.node,
    subTitle: PropTypes.node,
    showTitleBullet: PropTypes.bool,
    showHeadDivider: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const {
      contentHeight,
      className,
      title,
      subTitle,
      showTitleBullet,
      showHeadDivider,
      dividerNoInset,
      extra,
      children,
    } = this.props;
    return (
      <Card
        key={contentHeight === 'auto' || contentHeight === '' ? 'auto' : 'fixed'}
        className={classnames('vc-card', className, {
          'divider-no-indent': dividerNoInset
        })}
        title={title}
        subTitle={subTitle}
        showTitleBullet={showTitleBullet}
        showHeadDivider={showHeadDivider}
        contentHeight={contentHeight || 'auto'}
        extra={extra}
      >
        {children}
      </Card>
    );
  }
}

const generateChildProto = ({ componentName }) => {
  class Child extends React.Component {
    static displayName = componentName;

    static propTypes = {
      children: PropTypes.node,
    }

    static defaultProps = {
      children: undefined,
    }

    render() {
      const { children } = this.props;
      return (
        <div className={classnames({
          [`vc-fusion-card-${componentName}`]: true,
          'engine-empty': !children || !children.length,
        })}
        >
          {children}
        </div>
      );
    }
  }
  return Child;
};

export default [
  FusionCard,
  ...[
    { componentName: 'CardContent' },
  ].map(options => generateChildProto(options)),
];
