import React from 'react';
import PropTypes from 'prop-types';
import { Balloon } from '@ali/deep';

const Tooltip = Balloon.Tooltip;

class BalloonTrigger extends React.Component {
  static displayName = 'BalloonTrigger';

  static propTypes = {
    componentId: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const {
      className, children, ...props
    } = this.props;
    return (
      <div className={`balloon-trigger ${className}`} {...props}>
        {children}
      </div>
    );
  }
}

class BalloonOverlay extends React.Component {
  static displayName = 'BalloonOverlay';

  static propTypes = {
    componentId: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const { className, children } = this.props;
    return (
      <div className={`balloon-overlay ${className}`}>
        {children}
      </div>
    );
  }
}

class FusionBalloon extends React.Component {
  static displayName = 'Balloon';

  render() {
    const {
      className,
      type,
      closable,
      align,
      defaultVisible,
      triggerType,
      delay,
      afterClose,
      onClose,
      onVisibleChange,
      visible,
      overlayMaxWidth,
      display,
      children,
      content,
      needAdjust,
      fieldId,
    } = this.props;

    // const safeNode = document.getElementsByClassName('next-overlay-wrapper');

    const balloonProps = {
      className,
      type,
      alignEdge: true,
      needAdjust,
      closable,
      align,
      defaultVisible,
      triggerType: triggerType || 'hover',
      delay,
      // safeNode,
      afterClose,
      onClose,
      onVisibleChange,
      popupClassName: `${fieldId}-popup`
    };

    if (this.props.CONTROL) {
      balloonProps.visible = visible;
    }

    let style = {};

    if (Object.hasOwnProperty.call(this.props, 'overlayMaxWidth')) {
      style = {
        maxWidth: overlayMaxWidth,
      };
    }

    return (
      <div style={{ display }}>
        {
          this.props.TYPE === 'balloon'
            ? (
              <Balloon trigger={children[0]} {...balloonProps} style={style}>
                {children[1]}
              </Balloon>
            )
            : (
              <Tooltip trigger={children[0]} {...balloonProps}>
                {content}
              </Tooltip>
            )
        }
      </div>
    );
  }
}

export default [FusionBalloon, BalloonTrigger, BalloonOverlay];
