import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Collapse } from '@ali/deep';

import './view.less';

class Panel extends React.Component {
  static displayName = 'Panel';

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}


class FusionCollapse extends React.Component {
  static displayName = 'Collapse';

  static defaultProps = {
    componentId: null,
    className: '',
    content: null,
  };

  static propTypes = {
    componentId: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.string,
  };

  render() {
    const {
      className,
      onExpand,
      accordion,
      separated,
      items,
      defaultActiveKey,
      children,
      CONTROL,
      expandedKeys,
    } = this.props;

    const defaultExpandedKeys = [];
    const dataSource = React.Children.map(children, (child, index) => {
      let prop;
      if (items) {
        prop = items[index];
      } else {
        prop = child.props;
      }

      if (prop.defaultActived) {
        defaultExpandedKeys.push(`${index}`);
      }

      return {
        title: prop.title,
        disabled: prop.disabled,
        content: child,
      };
    });

    const collpaseProps = {
      className: classnames('vc-collapse', className, { 'vc-collapse-separated': separated }),
      defaultExpandedKeys,
      onExpand,
      accordion,
      dataSource,
    };

    if (CONTROL) {
      collpaseProps.expandedKeys = Array.isArray(expandedKeys) ? expandedKeys : [];
    }

    return (
      <Collapse {...collpaseProps}>
        {this.panels}
      </Collapse>
    );
  }
}

export default [FusionCollapse, Panel];
