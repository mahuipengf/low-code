import React from 'react';
import { Dialog, ConfigProvider } from '@ali/deep';
import isFunction from 'lodash/isFunction';
import uniqueId from 'lodash/uniqueId';

import './view.less';
import { getShellPrefix } from '../common/util';

export default class FusionDialog extends React.Component {
  static displayName = 'Dialog';

  /* 受控模式
  static getDerivedStateFromProps(nextProps, state) {
    const { visible } = nextProps;
    if (visible !== state.visible) {
      return {
        visible,
      };
    }
    return null;
  }
  */

  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible || false,
      container: document.body
    };
  }

  componentDidMount() {
    const prefix = getShellPrefix();
    this.setState({
      container: document.getElementsByClassName(`${prefix}shell-sub-main`)[0] || document.body
    })
  }

  componentWillUnmount() {
    this.resetContainerStyle();
  }


  resetContainerStyle() {
    const { container } = this.state;
    if (container) {
      container.style.overflow = ''
    }
  }

  fixStyle() {
    const { popupOutDialog } = this.props
    if (!popupOutDialog) {
      return
    }
    const { container } = this.state;
    if (container) {
      container.style.overflow = 'hidden'
    }
  }

  onOk = () => {
    if (this.props.onOk) {
      this.props.onOk();
    }
  };

  onCancel = () => {
    const { props } = this;
    const { onCancel = () => { } } = props
    const result = onCancel();
    if (result === false) {
      return
    }
    if (result && result.then) {
      result.then(data => {
        if (data === false || data.length && data[data.length - 1] === false) {
          return
        }
        this.setState({
          visible: false
        })
      })
    } else {
      this.setState({
        visible: false
      })
    }
  };

  onClose = () => {
    const { props } = this;
    const { onClose = () => { } } = props
    const result = onClose();
    if (result === false) {
      return
    }
    if (result && result.then) {
      result.then(data => {
        if (data === false || data.length && data[data.length - 1] === false) {
          return
        }
        this.setState({
          visible: false
        })
      })
    } else {
      this.setState({
        visible: false
      })
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
      if (isFunction(callback)) {
        setTimeout(() => { callback(); }, 100);
      }
    });
  }

  render() {
    const { props } = this;

    const style = {
      position: 'relative'
    };
    const { width, height, popupOutDialog } = props;
    if (width) {
      style.width = width;
    }
    if (height) {
      style.height = height;
    }

    const dialogProps = {
      visible: this.state.visible,
      className: `vc-dialog ${props.className || ''}`,
      title: props.title,
      footer: props.footer,
      footerAlign: props.footerAlign,
      footerActions: props.footerActions.split(','),
      closeable: this.getCloseable(props),
      hasMask: props.hasMask,
      onClose: this.onClose.bind(this),
      onOk: this.onOk.bind(this),
      onCancel: this.onCancel.bind(this),
      afterClose: props.afterClose || (() => { }),
      autoFocus: props.autoFocus,
      shouldUpdatePosition: true,
      overlayProps: {
        container: this.state.container,
        afterOpen: props.afterOpen || (() => { }),
        onOpen: props.onOpen || (() => { })
      }
    };

    if (props.confirmText || props.confirmStyle || props.confirmState) {
      const okProps = {};
      if (props.confirmText) {
        okProps.children = props.confirmText;
      }
      if (props.confirmStyle) {
        if (props.confirmStyle === 'warning') {
          okProps.warning = true;
        }
        if (props.confirmStyle === 'ghostLight') {
          okProps.ghost = 'light';
        }
        if (props.confirmStyle === 'ghostDark') {
          okProps.ghost = 'dark';
        }
      }
      if (props.confirmState === 'DISABLED') {
        okProps.disabled = true;
      }
      if (props.confirmState === 'LOADING') {
        okProps.loading = true;
      }
      dialogProps.okProps = okProps;
    }
    if (props.cancelText) {
      dialogProps.cancelProps = {
        children: props.cancelText,
        ...(props.cancelProps || {})
      };
    }
    const id = `vc-dialog-content-${uniqueId('c')}`
    //移动端默认在外部滚动
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(navigator.userAgent)
    return (
      <Dialog {...dialogProps}>
        {!popupOutDialog && !isMobile ?
          <ConfigProvider popupContainer={() => { return document.getElementById(id) }}>
            <div className="vc-dialog-content" id={id} style={style}>
              {props.children}
            </div>
          </ConfigProvider>
          : <div className="vc-dialog-content" id={id} style={style}>
            {props.children}
          </div>
        }
      </Dialog>
    );
  }
}
