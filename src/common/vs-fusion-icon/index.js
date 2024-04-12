import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@ali/deep';
import { Panes } from '@ali/visualengine';
import { icons } from './config';

import './style.less';

class IconsList extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    selected: PropTypes.string,
  };

  render() {
    const selectItem = (name) => {
      this.props.onSelect(name);
    };
    return (
      <div className="vs-icon-list">
        {
          icons.map(item => (
            <Icon
              key={item}
              type={item}
              className={classNames('vs-icon-list-item', {
                'vs-selected': this.props.selected === item,
              })}
              onClick={() => selectItem(item)}
              data-target="stageback"
              data-tip={item}
              data-dir="top"
            />
          ))
        }
      </div>
    );
  }
}

class FusionIconSetter extends Component {
  static propTypes = {
    prop: PropTypes.object,
  };

  static displayName = 'IconSetter';

  componentWillMount() {
    this.prop = this.props.prop;
    this.willDetach = this.prop.onValueChange(() => this.forceUpdate());
    this.stageId = Panes.add({
      type: 'stage',
      title: '选择图标',
      content: () => (
        <IconsList
          selected={this.prop.getHotValue()}
          onSelect={name => this.prop.setHotValue(name)}
        />
      ),
    });
  }

  componentWillUnmount() {
    if (this.willDetach) {
      this.willDetach();
    }
  }

  delIcon(e) {
    e.preventDefault();
    e.stopPropagation();
    this.prop.setHotValue('');
  }

  render() {
    const iconName = this.prop.getHotValue();
    return (
      <div className="vs-icon" data-stage-target={this.stageId} data-target={this.stageId}>
        <div className="vs-icon-blank">
          <Icon
            type={iconName && icons.includes(iconName) ? iconName : 'smile'}
            size="medium"
            className="vs-icon-selected"
          />
          <span className="vs-icon-text">{iconName || '请选择'}</span>
        </div>
        {
          iconName && icons.includes(iconName)
              && <Icon type="close" size="xxs" data-tip="清空" onClick={e => this.delIcon(e)} className="vs-icon-del" />
        }
        <Icon type="arrow-right" size="xs" className="vs-icon-entry" />
      </div>
    );
  }
}


export default FusionIconSetter;
