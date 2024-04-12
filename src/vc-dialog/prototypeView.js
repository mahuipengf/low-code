import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ali/deep';
import './proto.less';

class FusionDialog extends React.Component {
  static displayName = 'Dialog';

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
  };

  static defaultProps = {
    title: '',
    children: '',
  };

  render() {
    const { props } = this;
    const { _leaf, confirmText, confirmStyle, confirmState, cancelText } = props;

    const okProps = {};
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

    const arr = [];
    if (props.footerActions === 'ok,cancel') {
      arr.push(
        <Button type="primary" {...okProps}>
          {confirmText || '确定'}
        </Button>,
      );
      arr.push(
        <Button type="normal" {...props.cancelProps}>
          {cancelText || '取消'}
        </Button>,
      );
    } else if (props.footerActions === 'cancel,ok') {
      arr.push(
        <Button type="normal" {...props.cancelProps}>
          {cancelText || '取消'}
        </Button>,
      );
      arr.push(
        <Button type="primary" {...okProps}>
          {confirmText || '确定'}
        </Button>,
      );
    } else if (props.footerActions === 'ok') {
      arr.push(
        <Button type="primary" {...okProps}>
          {confirmText || '确定'}
        </Button>,
      );
    } else {
      arr.push(
        <Button type="normal" {...props.cancelProps}>
          {cancelText || '取消'}
        </Button>,
      );
    }

    const className = `vc-fusion-dialog vc-dialog ${props.className}`;

    let { width, height } = this.props;
    width = width || '520px';
    height = !height ? undefined : height;
    if (typeof height === 'number') {
      height += 'px';
    }
    if (typeof width === 'number') {
      width += 'px';
    }

    const maxHeight = _leaf.getRoot().getRect().height - 115 - 20;

    const dialog = (
      <div className={className}>
        <div className="vc-dialog-title">
          {props.title}
          <span className="vc-dialog-close">
            x
          </span>
        </div>
        <div className="vc-dialog-container" style={{ width, height, maxHeight }}>
          {props.children}
          {_leaf.isEmpty() && (
            <div className="vc-dialog-container-empty">
              {window.VisualEngine.Env.getLocale() === 'zh_CN'
                ? '拖拽组件到此区域'
                : 'Please send components to this area'}
            </div>
          )}
        </div>
        {props.footer ? (
          <div className={`vc-dialog-footer ${props.footerAlign ?? ''}`}>
            {arr}
          </div>
        ) : null}
      </div>
    );
    return (
      <div>
        <div className="vc-dialog-wrap">
          {dialog}
        </div>
      </div>
    );
  }
}

export default FusionDialog;
