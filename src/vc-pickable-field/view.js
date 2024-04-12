import React from 'react';
import { PickableField, Pickable } from '@ali/deep';
import './view.less';

export default class NewPickableField extends PickableField {
  static displayName = 'PickableField';
  constructor(props) {
    super(props);
  }

  render() {
    const { _displayType } = this.props;
    if (_displayType === 'Pickable') {
      return <Pickable {...this.props}  options={this.props.dataSource}  type='default'/>
    }
    return super.render();
  }
}
