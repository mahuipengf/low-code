import React from 'react';
import classnames from 'classnames';
import { Button, Icon } from '@ali/deep';

import './view.less';

class FusionButton extends React.Component {
  static displayName = 'Button';

  static defaultProps = {
    className: '',
    content: '按钮',
    type: 'primary',
    onClick: () => {},
    style: {},
    size: 'medium',
    disabled: false,
    loading: false,
  };

  getProps(props) {
    const behavior = props.behavior || 'NORMAL';
    return {
      className: classnames('vc-button', props.className, {
        'fn-hide': behavior === 'HIDDEN',
      }),
      type: props.type,
      size: props.size,
      content: props.content,
      onClick: (e) => {
        if (!(props.loading && !props.triggerEventsWhenLoading) && typeof props.onClick === 'function') {
          props.onClick(e);
        }
      },
      disabled: behavior === 'DISABLED' || (props.loading && !props.triggerEventsWhenLoading),
      loading: props.loading,
      baseIcon: props.baseIcon,
      otherIcon: props.otherIcon,
    };
  }

  render() {
    const {
      iconName, content, iconFill, otherIcon, baseIcon, ...props
    } = this.getProps(this.props);
    const ghostArr = props.type.match(/^ghost(.*)/);
    const warningArr = props.type.match(/^warning(.*)/);
    const textArr = props.type.match(/^text(.*)/);
    let ghost = false;
    let warning = false;
    let text = false;
    let type = props.type;
    if (ghostArr) {
      ghost = ghostArr[1].toLowerCase();
      type = '';
    }
    if (warningArr) {
      warning = true;
      type = warningArr[1].toLowerCase();
    }
    if (textArr) {
      text = true;
      type = textArr[1].toLowerCase();
    }
    return (
      <Button {...props} type={type} ghost={ghost} text={text} warning={warning}>
        {
          (otherIcon || baseIcon)
          && (
            <Icon
              type={otherIcon ? otherIcon : baseIcon}
              className={classnames('vc-button-icon', {
                disabled: props.disabled,
              })}
            />
          )
        }
        {content}
      </Button>
    );
  }
}
export default FusionButton;
