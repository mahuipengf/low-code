import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { EditableTag } from '@ali/deep';
import './view.less';

const Item = EditableTag.Item;
export default class FusionEditableTag extends React.Component {
  static displayName = 'EditableTag';

  static defaultProps = {
    dataSource: [],
    canAddTags: false,
    isDiyDeleteMsg: false,
    confirmDeleteTitle: '',
    confirmDeleteContent: '',
    onTagItemDelete: () => {},
    onTagItemEdit: () => {},
    onTagItemAdd: () => {},
    onTagItemAddCount: () => {},
  };

  static propTypes = {
    dataSource: PropTypes.array,
    canAddTags: PropTypes.bool,
    isDiyDeleteMsg: PropTypes.bool,
    confirmDeleteTitle: PropTypes.string,
    confirmDeleteContent: PropTypes.string,
    onTagItemDelete: PropTypes.func,
    onTagItemEdit: PropTypes.func,
    onTagItemAdd: PropTypes.func,
    onTagItemAddCount: PropTypes.func,
  };

  constructor(props, context) {
    super(props);

    this.state = {
      dataSource: props.dataSource || []
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.dataSource !== state.dataSource) {
      return {
        dataSource: nextProps.dataSource,
      };
    }
  }

  render() {
    const {
      canAddTags,
      isDiyDeleteMsg,
      confirmDeleteTitle,
      confirmDeleteContent,
      onTagItemDelete,
      onTagItemEdit,
      onTagItemAdd,
      onTagItemAddCount,
      noPadding,
      className,
    } = this.props;
    const _className = classnames('vc-editable-tag', className, {
      'no-padding': noPadding
    });

    const { dataSource, device } = this.state;
    return (
      <div className={_className}>
        <EditableTag {...{ canAddTags, onAdd: onTagItemAdd }}>
          {dataSource.map((item) => {
            const { type, text, ...reset } = item;

            const confirmDelete = isDiyDeleteMsg
              ? { confirmDeleteTitle, confirmDeleteContent }
              : null;

            return (
              <Item
                {...confirmDelete}
                {...reset}
                type={type}
                tag={item}
                onDelete={onTagItemDelete}
                onEdit={onTagItemEdit}
                onAddCount={onTagItemAddCount}
              >
                {text}
              </Item>
            );
          })}
        </EditableTag>
      </div>
    );
  }
}
