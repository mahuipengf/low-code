import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './prototypeView.less';

class Panel extends Component {
  static displayName = 'Panel';

  static propTypes = {
    actived: PropTypes.bool,
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;
    const classname = classnames('next-collapse-panel-content-item', {
      // 'next-collapse-panel-expanded': actived,
    });
    return <div className={classname}>{children}</div>;
  }
}

class FusionCollapse extends Component {
  static propTypes = {
    items: PropTypes.array,
    children: PropTypes.node,
    style: PropTypes.object,
  };

  static displayName = 'Collapse';

  render() {
    const items = this.props.items;
    return (
      <div className={classnames('next-collapse vc-fusion-collapse')}>
        {React.Children.map(this.props.children, (child, i) => (
          <div className="next-collapse-panel next-collapse-panel-expanded vc-fusion-collapse-item" key={i}>
            <div className="next-collapse-panel-title">
              <i className="next-icon next-icon-arrow-up next-medium next-collapse-panel-icon" />
              {items[i].title}
            </div>
            <div className="next-collapse-panel-content">
              {child}
            </div>
          </div>
        ))}
      </div>
    );
  }
}


export default [FusionCollapse, Panel];
