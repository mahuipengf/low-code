import React from 'react'
import View from './view';

export default class PrototypeView extends React.Component {
  static displayName = 'BannerContainer'
  render() {
    const {...rest} = this.props;
    return <View {...rest} useInShell={false} autoWidth={false} />
  }
};
