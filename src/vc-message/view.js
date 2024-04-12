
import React from 'react';
import classnames from 'classnames';
import isFunction from 'lodash/isFunction';
import { Message } from '@ali/deep';
import './view.less';

export default class FusionMessage extends React.Component {
  static displayName = 'Message';

  constructor(props) {
    super(props);

    this.state = {
      innerVisible: props.defaultVisible,
    };

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.setState({
      innerVisible: false,
    }, () => {
      if (isFunction(this.props.onClose)) {
        this.props.onClose();
      }
    });
  }

  render() {
    const {
      className,
      title,
      size,
      type,
      shape,
      iconType,
      closeable,
      animation,
      onClose,
      afterClose,
      content,
    } = this.props;

    const messageProps = {
      className: classnames('vc-message', className),
      title,
      size,
      type,
      shape,
      closeable,
      animation,
      afterClose,
      iconType: !iconType.useType ? iconType.otherType : iconType.baseType,
    };

    if (closeable) {
      messageProps.onClose = this.onClose;
      messageProps.visible = this.state.innerVisible;
    } else {
      messageProps.visible = this.props.visible;
    }

    // 设计器模式始终显示
    if (window.VisualEngine) {
      messageProps.visible = true;
    }

    return (
      <Message {...messageProps}>
        {content}
      </Message>
    );
  }
}
