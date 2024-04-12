import React from 'react';
import View from './view';

export default class PageSection extends React.Component {
  static displayName = 'PageSection';

  render() {
    const {
      _leaf, children, ...others
    } = this.props;
    return (
      <View {...others}>
        {_leaf.isEmpty() ? <div className="engine-empty">{children}</div> : children}
      </View>
    );
  }
}
