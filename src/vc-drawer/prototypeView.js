import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ali/deep';
import './proto.less';

class FusionDrawer extends React.Component {
  static displayName = 'Drawer';

  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    placement: PropTypes.string,
    children: PropTypes.element,
  };

  static defaultProps = {
    className: '',
    title: '',
    placement: 'right',
    children: '',
  };

  render() {
    const {
      className,
      title,
      placement,
      footer,
      footerActions,
      footerAlign,
      confirmStyle,
      confirmState,
      confirmText,
      cancelText,
      children,
      _leaf,
    } = this.props;

    const confirmProps = {
      type: 'primary',
      onClick: this.onOk,
    };
    if (confirmStyle === 'warning') {
      confirmProps.warning = true;
    } else if (confirmStyle === 'ghostLight') {
      confirmProps.ghost = 'light';
    } else if (confirmStyle === 'ghostDark') {
      confirmProps.ghost = 'dark';
    }
    if (confirmState === 'DISABLED') {
      confirmProps.disabled = true;
    } else if (confirmState === 'LOADING') {
      confirmProps.loading = true;
    }

    let finalConfirmText = confirmText || '确定';
    let finalCancelText = cancelText || '取消';
    let footerJsx = null;
    if (footerActions === 'ok,cancel') {
      footerJsx = [
        <Button {...confirmProps}>{finalConfirmText}</Button>,
        <Button onClick={this.onCancel}>{finalCancelText}</Button>,
      ];
    } else if (footerActions === 'cancel,ok') {
      footerJsx = [
        <Button onClick={this.onCancel}>{finalCancelText}</Button>,
        <Button {...confirmProps}>{finalConfirmText}</Button>,
      ];
    } else if (footerActions === 'ok') {
      footerJsx = <Button {...confirmProps}>{finalConfirmText}</Button>;
    } else {
      footerJsx = <Button onClick={this.onCancel}>{finalCancelText}</Button>;
    }

    let { width, height } = this.props;
    width = width || '520px';
    height = !height ? undefined : height;
    if (typeof height === 'number') {
      height += 'px';
    }
    if (typeof width === 'number') {
      width += 'px';
    }

    const style = {};
    if (placement === 'right' || placement === 'left') {
      style.width = width;
      style.top = 0;
      style.bottom = 0;
      if (placement === 'right') {
        style.right = 0;
      } else {
        style.left = 0;
      }
    }

    if (placement === 'top' || placement === 'bottom') {
      style.height = height || '160px';
      style.right = 0;
      style.left = 0;
      if (placement === 'top') {
        style.top = 0;
      } else {
        style.bottom = 0;
      }
    }

    const containerStyle = {
      height: footer ? 'calc(100% - 100px)' : 'calc(100% - 44px)',
    };

    const drawer = (
      <div className={`vc-drawer ${className}`} style={style}>
        <div className="vc-drawer-title">
          {title}
          <span className="vc-drawer-close">
            x
          </span>
        </div>
        <div className="vc-drawer-container" style={containerStyle}>
          {children}
          {_leaf.isEmpty() && (
            <div className="vc-drawer-container-empty">
              拖拽组件到此区域
            </div>
          )}
        </div>
        {footer ? (
          <div className={`vc-drawer-footer ${footerAlign}`}>
            {footerJsx}
          </div>
        ) : null}
      </div>
    );
    return (
      <div>
        <div className="vc-drawer-wrap">
          {drawer}
        </div>
      </div>
    );
  }
}

export default FusionDrawer;
