import React from 'react';
import { PickableField } from '@ali/deep';

export default class View extends React.Component {
  static displayName = 'FilterPickableField'

  render() {
    return <PickableField {...this.props} />;
  }
}