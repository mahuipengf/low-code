import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Dropdown, Menu, Icon } from '@ali/deep';
import './view.less';

export default class FusionDropdown extends React.Component {
  static displayName = 'Dropdown';

  static defaultProps = {
    className: '',
  };

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {
      className,
      dataSource,
      triggerType,
      align,
      offset,
      autoFocus,
      hasMask,
      cache,
      disabled,
      onItemClick,
      children,
      fieldId,
    } = this.props;

    const trigger = (<div
      className={classnames(
        'vc-dropdown',
        className,
      )}
    >
      {children}
    </div>);

    return (
      <Dropdown
        wrapperClassName={`vc-dropdown-wrapper ${fieldId}-wrapper`}
        trigger={trigger}
        triggerType={triggerType}
        disabled={disabled}
        align={align}
        offset={offset}
        autoFocus={autoFocus}
        hasMask={hasMask}
        cache={cache}
      >
        <Menu onItemClick={onItemClick}>
          {
            dataSource && Array.isArray(dataSource) && dataSource.length > 0
              ? dataSource.map((i, index) => (
                <Menu.Item key={i.key || index} disabled={i.disabled}>
                  {i.icon ? <Icon className="dropdown-item-icon" type={i.icon} /> : null}
                  <span>{i.label}</span>
                </Menu.Item>
              )) : null
          }
        </Menu>
      </Dropdown>
    );
  }
}
