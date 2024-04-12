import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Menu, Message, Tag } from '@ali/deep';
import reqwest from 'reqwest';
import './view.less';

const { SubMenu, Item, Divider } = Menu;
export default class FusionMenu extends React.Component {
  static displayName = 'Menu';

  static defaultProps = {
    className: '',
  };

  static propTypes = {
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      defaultOpenKeys: [],
      defaultSelectedKeys: [],
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.dataType === 'remote') {
      this.ajax(props);
    }
  }

  ajax(props) {
    const params = props.fetchParams || {};
    reqwest({
      url: props.fetchUrl,
      method: props.fetchMethod,
      data: params,
    })
      .then((res) => {
        if (res.success) {
          const data = res.data;
          const dataSource = this.processData(data, props.processData);
          this.setState({
            dataSource: dataSource.menu,
            defaultOpenKeys: dataSource.defaultOpenKeys || [],
            defaultSelectedKeys: dataSource.defaultSelectedKeys || ['key1'],
          });
        } else {
          const errorFun = props.fetchError;
          errorFun(res.errorMsg);
        }
      })
      .then((err) => {
        if (err) {
          Message.error(err);
        }
      });
  }

  processData(data, processData) {
    const newData = processData(data);
    return newData;
  }

  getDataSource(props) {
    let dataSource;
    let defaultOpenKeys;
    let defaultSelectedKeys;
    if (props.dataType === 'remote') {
      dataSource = this.state.dataSource;
      defaultSelectedKeys = this.state.defaultSelectedKeys;
      defaultOpenKeys = this.state.defaultOpenKeys;
    } else {
      dataSource = props.dataSource.menu;
      defaultSelectedKeys = props.dataSource.defaultSelectedKeys;
      defaultOpenKeys = props.dataSource.defaultOpenKeys;
    }
    return { dataSource, defaultOpenKeys, defaultSelectedKeys };
  }



  getLabel(item) {
    const {
      label,
      tag = {}
    } = item;

    const {
      text = '',
      // blue/green/orange/red
      type = 'primary',
      color = 'blue',
      className,
      ...TagProps
    } = tag;

    return (
      <Fragment>
        {label}
        {text ? (
          <Tag
            size="small"
            className={classnames('vc-menu-item-tag', className)}
            type={type}
            color={color}
            {...TagProps}
            >
            {text}
          </Tag>
        ) : null}
      </Fragment>
    )
  }

  getMenuItems(menusData) {
    if (!menusData) {
      return [];
    }
    return menusData
      .map((item, index) => {
        return this.getSubMenuOrItem(item, index);
      });
  }

  getSubMenuOrItem(item) {
    if (item.children && item.children.some(child => child.key)) {
      const childrenItems = this.getMenuItems(item.children);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu key={item.key} label={this.getLabel(item)} disabled={item.disabled || false}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    }
    if (item.isDivider) {
      return <Divider />;
    }
    return (
      <Item key={item.key} disabled={item.disabled || false}>
        {this.getLabel(item)}
      </Item>
    );
  }

  render() {
    const {
      className,
      mode,
      triggerType,
      popupAlign,
      selectMode,
      onItemClick,
      onSelect,
      direction,
      footer,
      header,
      isSelectIconRight = true // 调整 icon 居右
    } = this.props;

    const { dataSource, defaultOpenKeys, defaultSelectedKeys } = this.getDataSource(this.props);

    const menuProps = {
      defaultOpenKeys,
      defaultSelectedKeys,
      mode,
      triggerType,
      popupAlign,
      selectMode,
      onItemClick,
      onSelect,
      autoFocus: true,
      direction,
      footer,
      header,
      isSelectIconRight,
    };

    return (
      <div className={classnames('vc-menu', className)}>
        <Menu {...menuProps}>
          {this.getMenuItems(dataSource)}
        </Menu>
      </div>
    );
  }
}
