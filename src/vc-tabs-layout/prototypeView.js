import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isString from 'lodash/isString';

import './view.less';
import './prototypeView.less';

class FusionTab extends Component {
  static displayName = 'Tab';

  static propTypes = {
    _leaf: PropTypes.object,
    actived: PropTypes.bool,
    children: PropTypes.node,
  };

  render() {
    const {
      _leaf,
      actived,
      children,
    } = this.props;
    const classname = classnames('next-tabs-tabpane', {
      'engine-empty': actived && _leaf.isEmpty(),
      active: actived,
    });
    return (
      <div className={classname}>
        {children}
      </div>
    );
  }
}

class FusionTabs extends Component {
  static propTypes = {
    items: PropTypes.array,
    // defaultActiveKey: PropTypes.string,
    children: PropTypes.node,
    // flex: PropTypes.bool,
    // type: PropTypes.string,
    style: PropTypes.object,
    componentId: PropTypes.string,
    shape: PropTypes.string,
    tabPosition: PropTypes.string,
    size: PropTypes.string,
  };

  static displayName = 'TabsLayout';

  static getDerivedStateFromProps(nextProps, state) {
    let activeIndex = nextProps.items.findIndex(tab => tab.defaultActived);

    if (activeIndex < 0) {
      activeIndex = 0;
    }

    if (activeIndex !== state.stashIndex) {
      return {
        activeIndex,
        stashIndex: activeIndex,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    let activeIndex = this.props.items.findIndex(tab => tab.defaultActived);

    if (activeIndex < 0) {
      activeIndex = 0;
    }
    this.state = {
      activeIndex,
      stashIndex: activeIndex,
    };
  }

  render() {
    const {
      className,
      items,
      shape,
      tabPosition,
      size,
      children,
      contentPadding = 0,
      isItemsVariable = false,
    } = this.props;

    const tabNav = items.map((tab, i) => {
      const activeClass = this.state.activeIndex === i ? ' active' : '';
      return (
        <li
          key={tab.primaryKey}
          className={`next-tabs-tab ${activeClass}`}
          onClick={() => this.setState({ activeIndex: i })}
        >
          <div className="next-tabs-tab-inner">
            {isString(tab.title) ? tab.title : '标签项(变量)'}
          </div>
        </li>
      );
    });

    const cls = classnames(
      className,
      `next-tabs next-tabs-${shape} next-tabs-${tabPosition} next-${size}`,
      {
        'next-tabs-vertical': tabPosition === 'left' || tabPosition === 'right',
      }
    );
    const tabsBar = (<div className="next-tabs-bar">
      <div className="next-tabs-nav-container">
        <div className="next-tabs-nav-wrap">
          <div className="next-tabs-nav-scroll">
            <ul className="next-tabs-nav">
              {tabNav}
            </ul>
          </div>
        </div>
      </div>
    </div>);

    // TabItems 如果绑定了变量，则不可以设计内容
    if (isItemsVariable) {
      return (<div className={cls}>
        {tabsBar}
      </div>);
    }

    const panels = React.Children.map(
      this.props.children,
      (child, i) => React.cloneElement(child, {
        actived: this.state.activeIndex === i,
      }),
    );
    return (
      <div className={cls}>
        {tabsBar}
        <div className="next-tabs-content">
          <div style={{ padding: contentPadding }}>
            {panels}
          </div>
        </div>
      </div>
    );
  }
}

export default [FusionTabs, FusionTab];
