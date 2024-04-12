import React from 'react';
import classnames from 'classnames';
import { Button, Icon } from '@ali/deep';
import PropTypes from 'prop-types';
import './proto.less';

class View extends React.Component {
  static displayName = 'TableField';

  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.string,
    layout: PropTypes.string,
    theme: PropTypes.string,
    addButtonText: PropTypes.string,
    showIndex: PropTypes.bool,
    showTableHead: PropTypes.bool,
    showSortable: PropTypes.bool,
    delButtonText: PropTypes.string,
    importButton: PropTypes.string,
  };

  static defaultProps = {
    label: '',
    children: '',
    layout: 'TILED',
    theme: 'split',
    addButtonText: '新增一项',
    showIndex: true,
    showTableHead: true,
    showSortable: true,
    delButtonText: '删除',
    importButton: '',
  };

  renderButtons = (position) => {
    const { addButtonBehavior, addButtonPosition, addButtonText } = this.props;

    if(addButtonPosition === position) {
      return addButtonBehavior !== 'HIDDEN' ?
            (<div className="vc-table-field-addons">
              <Button
                className="vc-add-button"
                type="secondary"
                size="small"
                disabled={addButtonBehavior === 'DISABLED'}
              >
                {addButtonText}
              </Button>
            </div>) :
            null
    }
    else  {
      return null;
    }
  }

  renderDefaultLayout() {
    const {
      className,
      layout,
      label,
      showActions,
      delButtonText,
      actionColumn,
      children,
      _leaf,
    } = this.props;

    return (
      <div
        className={classnames(
          'vc-table-field-pc',
          layout === 'HORIZONTAL' ? 'vc-table-field-pc-horizontal' : 'vc-table-field-pc-veritical',
          className,
        )}
      >
        <div className="vc-table-field-title">
          {label}
          {showActions ?
            (<span className="vc-table-delete vc-table-delete-disabled">
              {delButtonText || '删除'}
            </span>) :
            null
          }
          {
            actionColumn && actionColumn.length > 0 ? (
              actionColumn.slice(0).reverse().map(({ title }) => {
                return (<span className="vc-table-action">
                  {title}
                </span>);
              })
            ) : null
          }
        </div>
        {this.renderButtons('top')}
        <div className="vc-table-field-content">
          {_leaf.isEmpty() ? (
            <div className="vc-table-empty">
              {window.VisualEngine.Env.getLocale() === 'zh_CN'
                ? '请将组件拖到此区域(可拖入多个组件)'
                : 'Please send components to this area'}
            </div>
          ) : (
            <div className="vc-table-field-children">
              {children}
            </div>
          )}
          {this.renderButtons('bottom')}
          {/* {
            addButtonBehavior !== 'HIDDEN' ?
            (<div className="vc-table-field-addons">
              <Button
                className="vc-add-button"
                type="secondary"
                size="small"
                disabled={addButtonBehavior === 'DISABLED'}
              >
                {addButtonText}
              </Button>
            </div>) :
            null
          } */}
        </div>
      </div>
    );
  }

  renderTableLayout() {
    const {
      className,
      label,
      layout,
      theme,
      showIndex,
      showTableHead,
      showSortable,
      showActions,
      addButtonText,
      addButtonBehavior,
      delButtonText,
      moveUp,
      moveDown,
      actions,
      actionsColumnWidth,
      children,
      _leaf,
    } = this.props;

    const actionColumnStyle = {
      width: 'auto',
    };
    if (actionsColumnWidth) {
      actionColumnStyle.width = actionsColumnWidth;
    }
    if (showSortable) {
      actionColumnStyle.width = 140;
    }

    return (
      <div
        className={classnames(
          'vc-table-field-pc',
          'vc-table-field-pc-table-layout',
          `vc-table-field-pc-table-layout-${theme}`,
          !showTableHead ? 'vc-table-field-pc-table-layout-nohead' : '',
          layout === 'HORIZONTAL' ? 'vc-table-field-pc-horizontal' : 'vc-table-field-pc-veritical',
          className,
        )}
      >
        {label ? (
          <div className="vc-table-field-title">
            {label}
          </div>
        ) : null}
        <div className={classnames('vc-table-field-content', label ? 'with-label' : '')}>
          { this.renderButtons('top') }
          {_leaf.isEmpty() ? (
            <div className="vc-table-empty">
              {window.VisualEngine.Env.getLocale() === 'zh_CN'
                ? '请将组件拖到此区域(可拖入多个组件)'
                : 'Please send components to this area'}
            </div>
          ) : (
            <div className="vc-table-field-children">
              {/* 显示序号 */}
              {showIndex && children && children.length > 0 ? (
                <div className="next-form-item vc-table-field-table-index-col">
                  <div className="next-form-item-label" />
                  <div className="next-form-item-control">
                    <div className="vc-table-field-table-index-content">
                      1
                    </div>
                  </div>
                </div>
              ) : null}
              {children}
              {(showActions && children && children.length > 0) ? (
                <div className="next-form-item vc-table-field-table-actions-col" style={actionColumnStyle}>
                  <div className="next-form-item-label">
                    <span className="label-content">
                      {window.VisualEngine.Env.getLocale() === 'zh_CN' ? '操作' : 'Actions'}
                    </span>
                  </div>
                  <div className="next-form-item-control">
                    {
                      actions && actions.length > 0 ? (
                        actions.map(({ content }) => {
                          return (<div className="vc-table-field-table-actions-content">
                            {content}
                          </div>);
                        })
                      ) : null
                    }
                    <div className="vc-table-field-table-actions-content">
                      {delButtonText || '删除'}
                    </div>
                    {
                      showSortable ? (
                        <div className="vc-table-field-table-actions-content">
                          {moveUp}
                        </div>
                      ) : null
                    }
                    {
                      showSortable ? (
                        <div className="vc-table-field-table-actions-content">
                          {moveDown}
                        </div>
                      ) : null
                    }
                  </div>
                </div>
              ) : null}
            </div>
          )}
          { this.renderButtons('bottom') }
        </div>
      </div>
    );
  }

  render() {
    const { layout } = this.props;
    return layout !== 'TABLE' ? this.renderDefaultLayout() : this.renderTableLayout();
  }
}

export default View;
