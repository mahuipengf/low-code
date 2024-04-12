import React from 'react';
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import uniqueId from 'lodash/uniqueId';
import { Drawer, Button, ConfigProvider } from '@ali/deep';

import './view.less';
import { getShellPrefix } from '../common/util';

export default class FusionDrawer extends React.Component {
  static displayName = 'Drawer';

  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible || false,
      container: document.body,
      offset: [0, 0],
      // height: '100%'
    };

    this.onOk = this.onOk.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentWillUnmount() {
    this.resetContainerStyle();
  }

  resetContainerStyle() {
    const container = document.getElementsByClassName(`${getShellPrefix()}shell-sub-main`)[0] || document.body;
    if (container) {
      container.style.overflow = ''
    }
  }

  fixStyle() {
    const inShell = document.querySelector('.deep-shell.vc-shell')
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(navigator.userAgent)
    const container = document.getElementsByClassName(`${getShellPrefix()}shell-sub-main`)[0]
    this.setState({
      offset: [0, inShell ? isMobile ? 48 : 0 : 0],
      container: container || document.body,
    })
    if (container) {
      container.style.overflow = 'hidden'
    }
    isMobile && setTimeout(() => {
      const dialog = ReactDom.findDOMNode(this.dialog)
      const dialogDom = dialog.querySelector('.vc-drawer')
      const height = window.innerHeight
      if (inShell && dialogDom) {
        dialogDom.style.height = `${height - 48}px`
      }
    }, 100)

  }
  onOk = () => {
    if (this.props.onOk) {
      this.props.onOk(() => {
        this.hide();
      });
    }
  };

  onCancel = () => {
    const { onCancel = () => { } } = this.props;
    const result = onCancel();
    if (result === false) {
      return;
    }

    if (result && result.then) {
      result.then(data => {
        if (data === false || data.length && data[data.length - 1] === false) {
          return;
        }
        this.hide();
      });
    } else {
      this.hide();
    }
  };

  onClose = () => {
    const { onClose = () => { } } = this.props;
    const result = onClose();
    if (result === false) {
      return;
    }
    if (result && result.then) {
      result.then(data => {
        if (data === false || data.length && data[data.length - 1] === false) {
          return;
        }
        this.hide();
      });
    } else {
      this.hide();
    }
  };

  getCloseable = (props) => {
    let closeable;
    if (Array.isArray(props.closeable)) {
      props.closeable.push('close');
      closeable = props.closeable.join(',');
    } else {
      closeable = `${props.closeable},close`;
    }
    return closeable;
  };

  show(callback) {
    this.setState({
      visible: true,
    }, () => {
      this.fixStyle()
      if (isFunction(callback)) {
        setTimeout(() => { callback(); }, 100);
      }
    });
  }

  hide(callback) {
    this.setState({
      visible: false,
    }, () => {
      this.resetContainerStyle();
      if (isFunction(callback)) {
        setTimeout(() => { callback(); }, 100);
      }
    });
  }

  render() {
    const {
      className,
      title,
      footer,
      footerAlign,
      footerActions,
      confirmStyle,
      confirmState,
      confirmText,
      cancelText,
      hasMask,
      placement,
      children,
      afterClose,
      afterOpen
    } = this.props;
    let {
      width,
      height,
    } = this.props;
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(navigator.userAgent)
    if (placement === 'left' || placement === 'right') {
      if (!width) {
        width = isMobile ? '100%' : 520;
      }
    }
    if (placement === 'top' || placement === 'bottom') {
      if (!height) {
        height = 160;
      }
    }
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

    const drawerProps = {
      visible: this.state.visible,
      className: `vc-drawer ${className}`,
      title,
      footer,
      footerAlign,
      footerActions: footerActions.split(','),
      closeable: this.getCloseable(this.props),
      hasMask,
      onClose: this.onClose,
      onOk: this.onOk,
      onCancel: this.onCancel,
      placement,
      offset: this.state.offset,
      container: this.state.container,
    };
    if (afterOpen) {
      drawerProps.afterOpen = afterOpen
    }

    if (afterClose) {
      drawerProps.afterClose = afterClose
    }

    if (width) {
      drawerProps.width = width
    }

    if (height) {
      drawerProps.height = height
    }

    const containerStyle = {
      height: footer ? 'calc(100% - 60px)' : '100%',
    };
    const id = `vc-drawer-content-${uniqueId('d')}`
    return (
      <Drawer {...drawerProps} ref={(c) => { this.dialog = c }}>
        {
          <ConfigProvider popupContainer={() => {
            return document.body
          }}>
            <div className="vc-drawer-container" id={id} style={containerStyle}>
              {children}
            </div>
          </ConfigProvider>
        }
        {footer ? (
          <div className={`vc-drawer-footer ${footerAlign}`}>
            {footerJsx}
          </div>
        ) : null}
      </Drawer>
    );
  }
}
