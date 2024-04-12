import React from 'react';
import { Checkbox } from '@ali/deep';
import './view.less';

export default class View extends React.Component {
  static displayName = 'Checkbox';

  render() {
    return <Checkbox {...this.props} />;
  }
}
