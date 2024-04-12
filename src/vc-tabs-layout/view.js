import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';
import { Tab, Badge } from '@ali/deep';
import { isIndex, saveIndexToState, getQueryValue } from './util';

import './view.less';

class FusionTabs extends React.Component {
  static displayName = 'TabsLayout';

  static propTypes = {
    fieldId: PropTypes.string,
    unmountInactiveTabs: PropTypes.bool,
    traceable: PropTypes.bool,
    traceCode: PropTypes.string,
    onChange: PropTypes.func,
    lazyLoad: PropTypes.bool
  };

  static getDerivedStateFromProps(props, state) {
    const { items, children } = props;
    const isItemsVariable = props.isItemsVariable || (items && !children);
    if (isItemsVariable && !isEqual(items, state.items)) {
      const ret = {};

      const activedItem = items.filter((item) => item.defaultActived === true).shift();
      if (activedItem) {
        if (state.activeKey !== activedItem.primaryKey) {
          ret.activeKey = activedItem.primaryKey;
        }
      }

      ret.items = items;
      return ret;
    }

    return null;
  }

  constructor(props) {
    super(props);

    let activeKey = props.defaultActiveKey;
    // 如果开启定位，则需要从 url 中解析 tab 初始化值
    if (props.traceable) {
      const activeKeyByTrace = getQueryValue(props.fieldId, props.traceCode);
      if (activeKeyByTrace) {
        const activeItem = (props.items || []).find(item => item.primaryKey === activeKeyByTrace);
        if (activeItem) {
          activeKey = activeKeyByTrace;
        }
      }
    }

    this.state = {
      activeKey,
    };

    this.indexesCache = [];
  }

  renderTitle(title, props) {
    const { renderBadge = () => null } = this.props;
    const badge = renderBadge(props);
    if (!badge) {
      return title;
    }
    if (badge === 'dot') {
      return <Badge dot>{title}</Badge>;
    }
    return <Badge content={badge}>{title}</Badge>;
  }

  renderTabItems() {
    const { items, children } = this.props;
    this.indexesCache = [];
    let tabItems;
    const isItemsVariable = this.props.isItemsVariable || (items && !children);

    if (isItemsVariable) {
      tabItems = items.map((child, index) => {
        const primaryKey = child.primaryKey || `tab${index}`;

        this.indexesCache.push(primaryKey);
        return (
          <Tab.Item
            title={this.renderTitle(child.title, child)}
            key={primaryKey}
            disabled={child.disabled}
            closeable={child.closeable}
          />
        );
      });
    } else {
      const safeChildren = Array.isArray(children) ? children : [children];
      tabItems = safeChildren.map((child, index) => {
        if (!child) {
          return null;
        }
        let childProps;
        if (Array.isArray(items) && items[index]) {
          childProps = items[index];
        } else if (child.props.componentSchema) {
          childProps = child.props.componentSchema.props;
        } else {
          childProps = child.props;
        }

        this.indexesCache.push(childProps.primaryKey);

        return (
          <Tab.Item
            title={this.renderTitle(childProps.title, childProps)}
            key={childProps.primaryKey}
            disabled={childProps.disabled}
            closeable={childProps.closeable}
          >
            {child}
          </Tab.Item>
        );
      });
    }

    return tabItems;
  }

  findItem(activeKey) {
    const { items = [] } = this.props;
    let ret;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (activeKey === item.primaryKey) {
        ret = item;
        break;
      }
    }
    return ret ? { ...ret, customKey: ret.customKey || ret.primaryKey } : null;
  }

  onTabChange = (activeKey) => {
    const { onTabChange, onChange, fieldId, traceable, traceCode } = this.props;

    if (fieldId && traceable) {
      saveIndexToState(fieldId, activeKey, traceCode);
    }
    const changeHandle = onTabChange || onChange;
    this.setState(
      {
        activeKey,
      },
      () => {
        if (isFunction(changeHandle)) {
          const activeIndex = this.indexesCache.indexOf(activeKey) + 1;
          const item = this.findItem(activeKey);
          changeHandle(activeIndex, activeKey, item);
        }
      }
    );
  };

  setActiveKey(key) {
    this.setState({
      activeKey: key
    });
  }

  getActiveKey() {
    return this.state.activeKey;
  }

  render() {
    const {
      className,
      shape,
      size,
      excessMode,
      tabPosition,
      contentPadding,
      unmountInactiveTabs,
      extraRender,
      tabRender,
      onClose,
      items,
      children,
      lazyLoad = true,
    } = this.props;

    const { activeKey } = this.state;

    const tabProps = {
      animation: false,
      shape,
      size,
      activeKey,
      excessMode,
      tabPosition,
      unmountInactiveTabs,
      onClose,
      lazyLoad,
    };
    const isItemsVariable = this.props.isItemsVariable || (items && !children);

    if (contentPadding && !isItemsVariable) {
      tabProps.contentStyle = {
        padding: contentPadding,
      };
    }

    if (isFunction(extraRender)) {
      tabProps.extra = extraRender();
    }

    if (isFunction(tabRender)) {
      tabProps.tabRender = tabRender;
    }

    const _className = classnames('vc-tabs', className);

    return (
      <div className={_className}>
        <Tab onChange={this.onTabChange} {...tabProps}>
          {this.renderTabItems()}
        </Tab>
      </div>
    );
  }
}

class FusionTab extends React.Component {
  static displayName = 'Tab';

  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default [FusionTabs, FusionTab];
