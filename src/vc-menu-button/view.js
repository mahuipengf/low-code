import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MenuButton, Icon } from '@ali/deep';
import './view.less';

const { Item } = MenuButton;
export default class FusionMenuButton extends React.Component {
  static displayName = 'MenuButton';

  static defaultProps = {
    className: '',
    content: '菜单按钮',
  };

  static propTypes = {
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedKeys: props.selectedKeys,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.selectedKeys !== state.selectedKeys) {
      return {
        selectedKeys: nextProps.selectedKeys,
      };
    }
  }

  getItems = (props) => {
    const items = props.dataSource.data;
    let itemNodes;

    if (items.length > 0) {
      itemNodes = items.map(item => (
        <Item key={item.text} disabled={item.disabled || false}>
          { item.icon ? <Icon style={{ marginRight: '5px' }} type={item.icon} /> : null }
          {item.text}
        </Item>
      ));
    }

    return itemNodes;
  }

  getLabel = (props) => {
    if (props.baseIcon || props.otherIcon) {
      return (
        <div style={{ display: 'inline-block' }}>
          <Icon size={props.iconSize} className="label-icon" type={props.otherIcon || props.baseIcon} />
          {props.label}
        </div>
      );
    }
    return props.label;
  }

  onItemClick = (selectedKeys) => {
    if (this.props.selectMode === 'single') {
      this.setState({
        selectedKeys: selectedKeys.split(','),
      });
    } else if (this.props.selectMode === 'multiple') {
      const index = this.state.selectedKeys.findIndex(i => i === selectedKeys);
      if (index === -1) {
        this.state.selectedKeys.push(selectedKeys);
        this.setState({
          selectedKeys: this.state.selectedKeys,
        });
      } else {
        this.state.selectedKeys.splice(index, 1);
        this.setState({
          selectedKeys: this.state.selectedKeys,
        });
      }
    }
  }

  onSelect = (selectedKeys) => {
    this.props.onSelect(selectedKeys);
  }

  render() {
    const {
      className,
      size,
      type,
      popupTriggerType,
      autoWidth,
      onItemClick,
      onVisibleChange,
      shape,
      isSelect,
      selectMode,
    } = this.props;

    const menuBtnProps = {
      className: classnames('vc-menu-button', className),
      label: this.getLabel(this.props),
      size,
      type,
      popupTriggerType,
      autoWidth,
      onItemClick: this.onItemClick,
      onVisibleChange,
      menuProps: { isSelectIconRight:true },
    };
    if (shape === 'text') {
      menuBtnProps.text = true;
    }
    if (shape === 'warning') {
      menuBtnProps.warning = true;
    }
    if (shape === 'dark' || shape === 'light') {
      menuBtnProps.ghost = shape;
    }
    if (isSelect) {
      menuBtnProps.selectedKeys = this.state.selectedKeys;
      menuBtnProps.selectMode = selectMode;
      menuBtnProps.onSelect = this.onSelect;
    }
    return (
      <MenuButton {...menuBtnProps}>
        {this.getItems(this.props)}
      </MenuButton>
    );
  }
}
