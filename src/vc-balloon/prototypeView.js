import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisualEngine from '@ali/visualengine';
import './proto.less';
import { Balloon as DeepBallon } from '@ali/deep';

const Tooltip = DeepBallon.Tooltip;

class BalloonTrigger extends Component {
  static displayName = 'BalloonTrigger';

  static propTypes = {
    componentId: PropTypes.string,
    children: PropTypes.node,
    onUpdate: PropTypes.func,
  };

  componentDidUpdate() {
    const { onUpdate } = this.props;
    if (onUpdate) {
      onUpdate();
    }
  }

  render() {
    const {
      componentId,
      className,
      children,
      _leaf,
    } = this.props;

    return (
      <div className={`vc-balloon-trigger ${className}`}>
        {!_leaf.isEmpty() ? (
          <div className={`${componentId}`}>
            {children}
          </div>
        ) : (
          <div className="vc-balloon-trigger-empty" />
        )}
      </div>
    );
  }
}

class BalloonOverlay extends Component {
  static displayName = 'BalloonOverlay';

  static propTypes = {
    componentId: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
    title: PropTypes.string,
    onUpdate: PropTypes.func,
  };

  componentDidUpdate() {
    if (this.props.onUpdate) {
      this.props.onUpdate();
    }
  }

  render() {
    const {
      componentId,
      style,
      children,
      balloonOverlayVisible,
      TYPE,
      _leaf,
    } = this.props;

    if (VisualEngine.Env.supports('subview') && !balloonOverlayVisible || TYPE !== 'balloon') {
      return null;
    }
    return (
      <div className="vc-balloon-overlay kuma-balloon-inner">
        <div className="vc-balloon-content">
          <div className={`${componentId}`}>{children}</div>
          {_leaf.isEmpty() && (
            <div className="engine-empty" />
          )}
        </div>
        <div className="vc-balloon-arrow" />
      </div>
    );
  }
}

class Balloon extends Component {
  static displayName = 'Balloon';

  static defaultProps = {
    componentId: null,
    align: 't',
    display: 'inline-block',
  };

  static propTypes = {
    componentId: PropTypes.string,
    children: PropTypes.node,
    align: PropTypes.string,
    display: PropTypes.string,
    balloonOverlayVisible: PropTypes.bool,
    overlayMaxWidth: PropTypes.string,
  };

  componentDidMount() {
    const page = VisualEngine.Pages.currentPage || VisualEngine.Pages.pages[0];
    if (!page) {
      return;
    }
    const root = page.getRoot();
    this.willDetch = [
      root.onChildrenChange(() => {
        setTimeout(() => {
          this.updatePosition();
        });
      }),
    ];
    this.updatePosition();
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  componentWillUnmount() {
    if (this.willDetch) {
      this.willDetch.forEach((off) => {
        off();
      });
    }
  }

  // 获取相对位置
  getRelativePosition(rect, relativeRect) {
    return {
      x: rect.x - relativeRect.x,
      y: rect.y - relativeRect.y,
      top: rect.top - relativeRect.y,
      bottom: rect.bottom - relativeRect.y,
      left: rect.left - relativeRect.x,
      right: rect.right - relativeRect.x,
      width: rect.width,
      height: rect.height,
    };
  }

  getTopPosition(balloonOverlayRect, balloonTriggerRect) {
    if (balloonTriggerRect.top < balloonOverlayRect.height) {
      return this.getBottomPosition(balloonOverlayRect, balloonTriggerRect);
    }

    const position = {
      overlay: {
        left: -(balloonOverlayRect.width - balloonTriggerRect.width) / 2,
        bottom: balloonTriggerRect.height,
      },
      arrow: {},
      placementClassName: 'vc-balloon-placement-t',
    };
    const balloonOverlayDomLeft = balloonTriggerRect.left + position.overlay.left;
    if (balloonOverlayDomLeft < 0) {
      position.overlay.left = -balloonTriggerRect.left;
      position.arrow.left = balloonTriggerRect.width / 2 + balloonTriggerRect.left;
    }

    return position;
  }

  getBottomPosition(balloonOverlayRect, balloonTriggerRect) {
    const position = {
      overlay: {
        left: -(balloonOverlayRect.width - balloonTriggerRect.width) / 2,
        top: balloonTriggerRect.height,
      },
      arrow: {},
      placementClassName: 'vc-balloon-placement-b',
    };

    const balloonOverlayDomLeft = balloonTriggerRect.left + position.overlay.left;
    if (balloonOverlayDomLeft < 0) {
      position.overlay.left = -balloonTriggerRect.left;
      position.arrow.left = balloonTriggerRect.width / 2 + balloonTriggerRect.left;
    }

    return position;
  }

  getLeftPosition(balloonOverlayRect, balloonTriggerRect, rootRect) {
    if (balloonTriggerRect.left < balloonOverlayRect.width) {
      return this.getRightPosition(balloonOverlayRect, balloonTriggerRect, rootRect);
    }

    const position = {
      overlay: {
        left: -(balloonOverlayRect.width),
        top: -(balloonOverlayRect.height - balloonTriggerRect.height) / 2,
      },
      arrow: {},
      placementClassName: 'vc-balloon-placement-l',
    };

    const balloonOverlayDomTop = balloonTriggerRect.top + position.overlay.top;
    if (balloonOverlayDomTop < 0) {
      position.overlay.top = -balloonTriggerRect.top;
      position.arrow.top = balloonTriggerRect.height / 2 + balloonTriggerRect.top;
    }

    return position;
  }

  getRightPosition(balloonOverlayRect, balloonTriggerRect, rootRect) {
    if (rootRect.width - balloonTriggerRect.right < balloonOverlayRect.width
      && balloonTriggerRect.left > balloonOverlayRect.width) {
      return this.getLeftPosition(balloonOverlayRect, balloonTriggerRect, rootRect);
    }

    const position = {
      overlay: {
        left: balloonTriggerRect.width,
        top: -(balloonOverlayRect.height - balloonTriggerRect.height) / 2,
      },
      arrow: {},
      placementClassName: 'vc-balloon-placement-r',
    };

    const balloonOverlayDomTop = balloonTriggerRect.top + position.overlay.top;
    if (balloonOverlayDomTop < 0) {
      position.overlay.top = -balloonTriggerRect.top;
      position.arrow.top = balloonTriggerRect.height / 2 + balloonTriggerRect.top;
    }

    return position;
  }

  // 更新balloonOverlay的位置
  updatePosition() {
    if (!VisualEngine.Env.supports('subview')) {
      return;
    }

    const { balloonOverlayVisible, align, overlayMaxWidth } = this.props;
    if (!balloonOverlayVisible) {
      return;
    }
    if (!this.balloonOverlayDom || !this.balloonTriggerDom) {
      return;
    }
    const page = VisualEngine.Pages.currentPage || VisualEngine.Pages.pages[0];
    if (!page) {
      return;
    }
    const rootRect = page.getRoot().getRect();
    const balloonOverlayRect = this.getRelativePosition(this.balloonOverlayDom.getBoundingClientRect(),
      rootRect);
    const balloonTriggerRect = this.getRelativePosition(this.balloonTriggerDom.getBoundingClientRect(),
      rootRect);

    let position;

    switch (align) {
      case 't':
      case 'tl':
      case 'tr':
        position = this.getTopPosition(balloonOverlayRect, balloonTriggerRect);
        break;
      case 'b':
      case 'bl':
      case 'br':
        position = this.getBottomPosition(balloonOverlayRect, balloonTriggerRect);
        break;
      case 'l':
      case 'lt':
      case 'lb':
        position = this.getLeftPosition(balloonOverlayRect, balloonTriggerRect, rootRect);
        break;
      case 'r':
      case 'rt':
      case 'rb':
        position = this.getRightPosition(balloonOverlayRect, balloonTriggerRect, rootRect);
        break;
      default:
        position = this.getTopPosition(balloonOverlayRect, balloonTriggerRect);
        break;
    }

    this.balloonOverlayDom.style.cssText = `
      ${position.overlay.top === undefined ? '' : `top:${position.overlay.top}px;`}
      ${position.overlay.bottom === undefined ? '' : `bottom:${position.overlay.bottom}px;`}
      ${position.overlay.left === undefined ? '' : `left:${position.overlay.left}px;`}
      ${position.overlay.right === undefined ? '' : `right:${position.overlay.right}px;`}
      ${overlayMaxWidth === undefined ? '' : `max-width:${overlayMaxWidth};`}
    `;
    this.balloonDom.className = `vc-balloon-view vc-balloon-view-subview ${position.placementClassName || ''}`;
    this.balloonOverlayDom.getElementsByClassName('vc-balloon-arrow')[0].style.cssText = `
      ${position.arrow.top === undefined ? '' : `top:${position.arrow.top}px;`}
      ${position.arrow.left === undefined ? '' : `left:${position.arrow.left}px;`}`;
  }

  render() {
    const {
      componentId, children, align, display, ...props
    } = this.props;

    const TYPE = this.props.TYPE;

    if (VisualEngine.Env.supports('subview')) {
      const _children = React.Children.map(children, (child, i) => React.cloneElement(child, {
        ...props,
        onUpdate: this.updatePosition.bind(this),
        ref: (r) => {
          if (i === 1) {
            this.balloonOverlayDom = ReactDOM.findDOMNode(r);
          } else {
            this.balloonTriggerDom = ReactDOM.findDOMNode(r);
          }
        },
      })) || [];

      return (
        <div
          id={componentId}
          ref={(r) => {
            this.balloonDom = r;
          }}
          className="vc-balloon-view vc-balloon-view-subview"
          style={{ display }}
        >
          {_children}
        </div>
      );
    }

    const _children = React.Children.map(children, child => React.cloneElement(child, { ...props })) || [];
    const a1 = ['r', 'rt', 'rb', 'l', 'lt', 'lb'];
    const a2 = ['b', 'bl', 'br', 'r', 'rt', 'rb'];
    const getDisplay = () => {
      if (~a1.indexOf(align)) {
        return 'inline-block';
      }
      return 'block';
    };

    const getView = () => {
      const trigger = <div style={{ display: getDisplay() }}>{_children[0]}</div>;
      const overlay = <div style={{ display: getDisplay() }}>{_children[1]}</div>;

      // tooltip 视图
      if (TYPE !== 'balloon') {
        return trigger;
      }
      if (~a2.indexOf(align)) {
        return [trigger, overlay];
      }
      return [overlay, trigger];
    };

    return (
      <div
        id={componentId}
        className={`vc-balloon-view vc-balloon-placement-${align}`}
        style={{ display }}
      >
        {getView()}
      </div>
    );
  }
}

class MobileBalloon extends React.Component {
  render() {
    return <div className="engine-hidden-component">此组件暂不支持移动端</div>;
  }
}

Balloon.Mobile = MobileBalloon;

export default [Balloon, BalloonTrigger, BalloonOverlay];
