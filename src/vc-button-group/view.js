import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StyleSheet from '@ali/vu-style-sheet';
import { ButtonGroup, Button } from '@ali/deep';
import './view.less';


export default class FusionButtonGroup extends React.Component {
  static displayName = 'ButtonGroup';

  static defaultProps = {
    isDesignMode: false,
    componentId: null,
    style: null,
    items: [],
    type: 'primary',
  };

  static propTypes = {
    isDesignMode: PropTypes.bool,
    context: PropTypes.shape({
      getLocale: PropTypes.func,
    }),
    componentId: PropTypes.string,
    style: PropTypes.object,
    items: PropTypes.array,
    separated: PropTypes.bool,
    type: PropTypes.string,
    size: PropTypes.string,
    actionType: PropTypes.string,
    onClick: PropTypes.func,
  };

  isButtonVisible(buttonProps) {
    const { isDesignMode } = this.props;
    return buttonProps.visible || isDesignMode;
  }

  getButtonProps(props = {}, index) {
    const behavior = props.fieldBehavior || 'NORMAL';
    // const className = StyleSheet.invoke(`.${props.componentId}`, props.style, props.className);
    return {
      // componentId: props.componentId,
      className: classnames('vc-button', {
        'fn-hide': behavior === 'HIDDEN'
      }),
      type: props.type,
      size: props.size,
      style: { ...(props.style || {}) },
      content: props.content,
      // iconName: props.iconName,
      // iconFill: props.iconFill,
      onClick: () => {
        if (typeof this.props.onClick === 'function') {
          this.props.onClick({ index, content: props.content, componentId: props.componentId});
        }
      },
      disabled: behavior === 'DISABLED',
      visible: behavior !== 'HIDDEN',
    };
  }

  getButtons(isSeparated , isGhost) {
    const { items } = this.props;

    let buttonProps
    if (items.length === 1) {
      buttonProps = this.getButtonProps(items[0], 0);

      // 不可见
      if (!this.isButtonVisible(buttonProps)) {
        return null;
      }

      const { type } = buttonProps;
      const ghostArr = type.match(/^ghost(.*)/);
      let ghost = false;
      let newType = type;
      if (ghostArr) {
        ghost = true;
        newType = ghostArr[1][0].toLowerCase() + ghostArr[1].slice(1);
      }
      buttonProps.ghost = ghost;
      buttonProps.type = newType;
      return <Button {...buttonProps} ghost={isGhost}>{buttonProps.content}</Button>
    }
    return items.map((item, index) => {
      buttonProps = this.getButtonProps(item, index);

      // 不可见
      if (!this.isButtonVisible(buttonProps)) {
        return null;
      }

      const { type } = buttonProps;
      const ghostArr = type.match(/^ghost(.*)/);
      let ghost = false;
      let newType = type;
      if (ghostArr) {
        ghost = true;
        newType = ghostArr[1][0].toLowerCase() + ghostArr[1].slice(1);
      }
      buttonProps.ghost = ghost;
      buttonProps.type = newType;
      return isSeparated ? (
        <Button {...buttonProps} key={index}>
          {buttonProps.content}
        </Button>
      ) : (
        <Button {...buttonProps} ghost={isGhost} key={index}>
          {buttonProps.content}
        </Button>);
    }).filter(v => v);
  }

  getLocale() {
    if (this.props.context) {
      return this.props.context.getLocale();
    }
    if (typeof window !== 'undefined' && window.VisualEngine) {
      return window.VisualEngine.Env.getLocale();
    }
    return 'zh_CN';
  }

  render() {
    const {
      componentId, style, separated, type, actionType, size, maxLength, items,
    } = this.props;
    const ghostArr = type.match(/^ghost(.*)/);
    let ghost = false;
    let newType = type;
    if (ghostArr) {
      ghost = true;
      newType = ghostArr[1][0].toLowerCase() + ghostArr[1].slice(1);
    }

    const _className = classnames(
      'vc-button-group',
      StyleSheet.invoke(`.${componentId}`, style),
      { 'is-empty': items.length === 0 },
    );
    const groupProps = {
      className: _className,
      separated,
      ghost,
      type: newType,
      size,
      actionType,
      maxLength,
    };
    return (
      <ButtonGroup {...groupProps}>
        {this.getButtons(separated, ghost)}
      </ButtonGroup>
    );
  }
}
