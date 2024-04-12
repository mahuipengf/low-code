// import React from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import { MenuButton, Icon } from '@ali/deep';
// import './view.less';

// const { Item } = MenuButton;
// export default class FusionMenuButton extends React.Component {
//   static displayName = 'MenuButton';

//   static defaultProps = {
//     componentId: null,
//     content: null,
//   };

//   static propTypes = {
//     componentId:PropTypes.string,
//     content: PropTypes.string,
//   };

//   constructor(props) {
//     super(props);

//     this.state = {
//       selectedKeys: props.selectedKeys,
//     };
//   }

//   static getDerivedStateFromProps(nextProps, state) {
//     if (nextProps.selectedKeys !== state.selectedKeys) {
//       return {
//         selectedKeys: nextProps.selectedKeys,
//       }
//     }
//     return null;
//   }

//   getItems = (props) => {
//     const items = props.dataSource.data;
//     let itemNodes;

//     if (items.length > 0) {
//       itemNodes = items.map(item => (
//         <Item key={item.text} disabled={item.disabled || false}>
//           {item.icon ? <Icon style={{ marginRight: '5px' }} type={item.icon} /> : null}
//           {item.text}
//         </Item>
//       ));
//     }

//     return itemNodes;
//   }

//   getLabel = (props) => {
//     if (props.baseIcon || props.otherIcon) {
//       return (
//         <div style={{ display: 'inline-block' }}>
//           <Icon size={props.iconSize} className="label-icon" type={props.otherIcon || props.baseIcon} />
//           {props.label}
//         </div>
//       );
//     }
//     return props.label;
//   }

//   onItemClick = (selectedKeys) => {
//     if (this.props.selectMode === 'single') {
//       this.setState({
//         selectedKeys: selectedKeys.split(','),
//       });
//     } else if (this.props.selectMode === 'multiple') {
//       const index = this.state.selectedKeys.findIndex(i => i === selectedKeys);
//       if (index === -1) {
//         this.state.selectedKeys.push(selectedKeys);
//         this.setState({
//           selectedKeys: this.state.selectedKeys,
//         });
//       } else {
//         this.state.selectedKeys.splice(index, 1);
//         this.setState({
//           selectedKeys: this.state.selectedKeys,
//         });
//       }
//     }
//   }

//   render() {
//     const {
//       className,
//       size,
//       type,
//       popupTriggerType,
//       autoWidth,
//       shape,
//       isSelect,
//       selectMode,
//     } = this.props;

//     const menuBtnProps = {
//       className: classnames('vc-menu-button', className),
//       label: this.getLabel(this.props),
//       size,
//       PropTypes,
//       popupTriggerType,
//       autoWidth,
//       type,
//     };
//     if (shape === 'text') {
//       menuBtnProps.text = true;
//     }
//     if (shape === 'warning') {
//       menuBtnProps.warning = true;
//     }
//     if (shape === 'dark' || shape === 'light') {
//       menuBtnProps.ghost = shape;
//     }
//     if (isSelect) {
//       menuBtnProps.selectedKeys = this.state.selectedKeys;
//       menuBtnProps.selectMode = selectMode;
//     }
//     return (
//       <MenuButton {...menuBtnProps}>
//         {this.getItems(this.props)}
//       </MenuButton>
//     );
//   }
// }

import View from './view';

export default View;
