import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import { Tree } from '@ali/deep';
import './view.less';

export default class FusionTree extends React.Component {
  static displayName = 'Tree';

  static propTypes = {
    selectedKeys: PropTypes.array,
    checkedKeys: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.objectOf(PropTypes.string),
    ]),
    onSelect: PropTypes.func,
    onCheck: PropTypes.func,
  };

  static getDerivedStateFromProps(props, state) {
    let ret = {};
    if (state && !isEqual(props.selectedKeys, state.selectedKeysCache)) {
      ret = {
        ...ret,
        selectedKeys: props.selectedKeys,
        selectedKeysCache: props.selectedKeys,
      };
    }

    if (state && !isEqual(props.checkedKeys, state.checkedKeysCache)) {
      ret = {
        ...ret,
        checkedKeys: props.checkedKeys,
        checkedKeysCache: props.checkedKeys,
      };
    }

    if (Object.keys(ret).length) {
      return ret;
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedKeys: props.selectedKeys,
      checkedKeys: props.checkedKeys,
      selectedKeysCache: props.selectedKeys,
      checkedKeysCache: props.checkedKeys,
    };
  }

  onSelect = (value, extra) => {
    this.setState({
      selectedKeys: value,
    }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(value, extra);
      }
    });
  }

  onCheck = (value, extra) => {
    this.setState({
      checkedKeys: value,
    }, () => {
      if (this.props.onCheck) {
        this.props.onCheck(value, extra);
      }
    });
  }

  render() {
    const { props, state } = this;
    const treeProps = {
      dataSource: props.dataSource,
      defaultExpandAll: props.defaultExpandAll,
      defaultExpandedKeys: props.defaultExpandedKeys,
      autoExpandParent: props.autoExpandParent,
      multiple: props.multiple,
      checkable: props.checkable,
      checkStrictly: props.checkStrictly,
      checkedStrategy: props.checkedStrategy,
      showLine: props.showLine,
      selectable: props.selectable,
      editable: props.editable,
      draggable: props.draggable,
      processDataSource: props.processDataSource,
      actionPopupContainer: document.getElementsByClassName('next-shell-sub-main')[0],
      // isLabelBlock: props.isLabelBlock,
      // isNodeBlock: props.isNodeBlock,
      checkedKeys: state.checkedKeys,
      selectedKeys: state.selectedKeys,
      onSelect: this.onSelect,
      onCheck: this.onCheck,
      onExpand: props.onExpand,
      onEditFinish: props.onEditFinish,
      onDragStart: props.onDragStart,
      onDragEnter: props.onDragEnter,
      onDragOver: props.onDragOver,
      onDragLeave: props.onDragLeave,
      onDragEnd: props.onDragEnd,
      onDrop: props.onDrop,
      canDrop: props.canDrop,
      onRightClick: props.onRightClick,
    };

    if (typeof props.filterTreeNode === 'function') {
      treeProps.filterTreeNode = props.filterTreeNode;
    }
    if (props.isLoadData) {
      treeProps.loadData = props.loadData;
    }

    if (props.renderChildNodes) {
      treeProps.renderChildNodes = props.renderChildNodes;
    }

    if (props.labelRender) {
      treeProps.labelRender = props.labelRender;
    }

    if (props.expandedKeys && Array.isArray(props.expandedKeys)) {
      treeProps.expandedKeys = props.expandedKeys;
      treeProps.autoExpandParent = false;
    }

    return (
      <div className={classnames('vc-tree', props.className)}>
        <Tree {...treeProps} />
      </div>
    );
  }
}
