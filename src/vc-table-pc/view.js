import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DeepTable, Illustration } from '@ali/deep';
import isFunction from 'lodash/isFunction';

import './view.less';

export default class FusionTable extends React.Component {
  static displayName = 'TablePc';

  static propTypes = {
    fieldId: PropTypes.string,
    pageSize: PropTypes.number,
    dataSourceType: PropTypes.string,
    data: PropTypes.object,
    __router: PropTypes.object,
  };

  static defaultProps = {
    actionColumn: [],
  };

  // TODO: remove legacy usage
  static contextTypes = {
    nextDevice: PropTypes.string,
  };

  constructor(props, context) {
    super(props);

    this.tableRef = null;

    this.nextDevice = context && context.nextDevice;

    this.saveTableRef = this.saveTableRef.bind(this);
  }

  saveTableRef = (ref) => {
    if (ref) {
      this.tableRef = ref.getInstance();
    }
  }

  // 数据列配置
  getColumnsConfig(props) {
    const columns = props.columns || [];
    // 兼容多级表头
    if (props.useVarColumns) {
      return columns;
    }
    const getColumn = (item) => {
      let editType = item.dataType;
      if (item.editType) {
        editType = item.editType;
      }

      let editProps;
      if (item.editProps) {
        editProps = item.editProps;
        if (item.renderField) {
          editProps.renderField = item.renderField;
        }
      }
      return {
        title: item.title,
        dataKey: item.dataKey,
        dataType: item.dataType,
        editType: editType,
        float: item.float,
        imageProps: {
          ...item.imageProps|| {},
          onClick: item.imageOnClick
        },
        isGroup: item.isGroup,
        children: item.children,
        imageWrapProps: item.imageWrapProps,
        timeFormatter: item.timeFormatter,
        width: item.width,
        align: item.align,
        lock: item.lock,
        sortable: !!item.sortable,
        hidden: !!item.hidden,
        canEdit: typeof item.canEdit === 'function' ? item.canEdit() : item.canEdit,
        highlight: !!item.highlight,
        message: item.message,
        resizable: !!item.resizable,
        render: item.render,
        titleRender: item.titleRender,
        enumBadgeType: item.enumBadgeType,
        enumData: item.enumData,
        editProps,
      };
    }

    let groups = [];
    // TODO 当前逻辑最多仅支持到 三级表头，待重构
    const newColumns = columns.map((item, i) => {
      if (item.shouldRender === false) return;
      if (!item.isGroup) {
        if (item.groupName) {
          const lastGroup = groups[0];
          if (lastGroup && lastGroup.name == item.groupName && lastGroup.index[1] == i) {
            lastGroup.index[1] = i + 1;
          } else {
            groups.unshift({ name: item.groupName, index: [i, i + 1] });
          }
        }
        return getColumn(item);
      }
      return item.children && item.children.length ? {
        ...item,
        children: item.children.map(i => {
          return getColumn(i)
        })
      } : item
    }).filter(i => !!i);

    groups.forEach(({ name, index }) => {
      const group = {
        title: name,
        isGroup: true
      }
      const children = newColumns.splice(index[0], index[1] - index[0], group);
      group.children = children;
    });

    return newColumns;
  }

  // 渲染无数据填充内容
  renderEmptyContent = (props) => {
    if (!props.setEmptyContent) {
      return null;
    }

    if (!isFunction(props.emptyContent)) {
      return <Illustration size="small" type="empty" content="暂无数据" />;
    }

    const func = props.emptyContent;
    const reactNode = func();
    return reactNode;
  };

  render() {
    const { props } = this;
    const { width, height, theme, className } = props;
    const _className = classnames("vc-table-pc", className);
    const columns = this.getColumnsConfig(props);

    const tableProps = {
      className: _className,
      primaryKey: props.primaryKey || 'id',
      dataSource: props.data,
      loading: props.loading,
      columns,
      theme,
      hasBorder: theme === 'border',
      hasHeader: props.hasHeader,
      isZebra: theme === 'zebra',
      setEmptyContent: props.setEmptyContent,
      emptyContent: this.renderEmptyContent(props),
      fixedHeader: props.fixedHeader,
      stickyHeader: props.stickyHeader,
      useVirtual: props.useVirtual,
      isPagination: props.isPagination,
      showMiniPager: props.showMiniPager,
      actionTitle: props.actionTitle,
      actionWidth: props.actionWidth,
      actionType: props.actionType,
      actionFixed: props.actionFixed,
      actionHidden: props.actionHidden,
      maxWebShownActionCount: props.maxWebShownActionCount,
      actionColumn: props.actionColumn,
      noPadding: props.noPadding,
      useStickyLock: props.useStickyLock,

      mobileMode: props.mobileMode,
      mobileExpandViewMode: props.mobileExpandViewMode,
      mobileDefaultCardColumns: props.mobileDefaultCardColumns,
      mobileActionsStyle: props.mobileActionsStyle,
      mobileMargin: +props.mobileMargin,

      onFetchData: props.onFetchData,
      onLoadData: props.onLoadData,
      onCellDataChange: props.onCellDataChange,
      onRowClick: props.onRowClick,
      onRowMouseEnter: props.onRowMouseEnter,
      onRowMouseLeave: props.onRowMouseLeave,
      onResizeChange: props.onResizeChange,
      onColumnsChange: props.onColumnsChange,
      cellProps: typeof props.cellProps === "function" ? props.cellProps : undefined,
      rowProps: props.rowProps,
      size: props.size,

      // onFilter: this.onFilter,
      // sort: { 'dataIndex': props.sort },
      // scrollToRow: props.scrollToRow,
      // getCellProps: props.getCellProps,
      style: { width, height },
      offsetTop: props.offsetTop,
      affixProps: {
        // container: () => { return document.getElementById('App') }
      }
    };

    // 当配合 shell 使用，或通过局部渲染，无法设置滚动为最外层时，需要手动定义 stickyHeader 下
    // 需要监听的 容器

    if (props.affixContainer && props.affixContainer()) {
      tableProps.affixProps.container = props.affixContainer;
    }

     // HACK，兼容读取全局配置，优先读取 & 覆盖 pageConfig.deepConfig
    const affixProps = window.pageConfig?.deepConfig?.DeepTable?.affixProps;
    if (affixProps) {
      tableProps.affixProps = affixProps;
    }

    if (props.fixedHeader && /^\d+$/.test(props.maxBodyHeight)) {
      tableProps.maxBodyHeight = props.maxBodyHeight;
    }

    if (props.showActionBar) {
      tableProps.showActionBar = props.showActionBar;

      const actionBarContent = [];
      if (Array.isArray(props.actionBar)) {
        props.actionBar.forEach((item) => {
          if (item.option === 'callback') {
            actionBarContent.push(item);
          } else {
            actionBarContent.push({
              title: item.title,
              callback: () => {
                if (this.props.__router) {
                  const params = {};
                  if (item.linkedPage.params && Array.isArray(item.linkedPage.params)) {
                    item.linkedPage.params.forEach((p) => {
                      params[p.key] = p.value;
                    });
                  }
                  this.props.__router.push(
                    item.linkedPage.href,
                    params,
                    item.linkedPage.target === '_blank',
                    item.linkedPage.type === 'url'
                  );
                } else {
                  console.error('No router supplied to table')
                }
              },
              isDisabled: item.isDisabled,
            });
          }
        });
      }
      tableProps.actionBar = actionBarContent;
      tableProps.showLinkBar = props.showLinkBar;
      tableProps.linkBar = props.linkBar;
      tableProps.showSearch = props.showSearch;
      tableProps.searchBarPlaceholder = props.searchBarPlaceholder;
      tableProps.showCustomColumn = props.showCustomColumn;
    }

    if (props.isPagination) {
      if (props.pagination) {
        tableProps.pagination = props.pagination;
      } else {
        // 兼容老版本 Schema
        let pageSizeList = props.pageSizeList.split(',');
        if (pageSizeList.length > 1) {
          pageSizeList = pageSizeList.map(i => parseInt(i, 10));
        }

        tableProps.pagination = {
          size: props.size,
          type: props.type,
          shape: props.shape,
          pageSizeSelector: props.pageSizeSelector,
          pageSizeList,
          pageSizePosition: props.pageSizePosition,
          hideOnlyOnePage: props.hideOnlyOnePage,
          showJump: props.showJump,
          pageSize: props.pageSize,
        };
      }
    }

    if (props.setLoadingComponent && props.loadingComponent) {
      tableProps.loadingComponent = props.loadingComponent;
    }

    if (props.isExpand) {
      tableProps.hasExpandedRowCtrl = props.hasExpandedRowCtrl;
      tableProps.expandedRowRender = props.expandedRowRender;
      tableProps.expandedIndexSimulate = props.expandedIndexSimulate;
      tableProps.getExpandedColProps = props.getExpandedColProps;
      if (props.expandedRowIndent.length >= 5) {
        tableProps.expandedRowIndent = JSON.parse(props.expandedRowIndent);
      }
      if (Array.isArray(props.openRowKeys)) {
        tableProps.openRowKeys = props.openRowKeys;
      }
      if (isFunction(props.onRowOpen)) {
        tableProps.onRowOpen = props.onRowOpen;
      }
    }

    if (props.isTree) {
      tableProps.isTree = true;
      tableProps.indent = props.indent;
      if (Array.isArray(props.openRowKeys)) {
        tableProps.openRowKeys = props.openRowKeys;
      }
      if (isFunction(props.onRowOpen)) {
        tableProps.onRowOpen = props.onRowOpen;
      }
    }
    if (props.showRowSelector) {
      if (props.rowSelection) {
        const {
          selectedRowKeys,
          ...rowSelectionProps
        } = props.rowSelection;
        if (Array.isArray(selectedRowKeys)) {
          rowSelectionProps.selectedRowKeys = selectedRowKeys;
        }

        tableProps.showRowSelector = props.showRowSelector;
        tableProps.rowSelection = rowSelectionProps;
        tableProps.rowSelector = rowSelectionProps.mode === 'multiple' ? 'checkboxSelector' : 'radioSelector'
        tableProps.isRowSelectorDisabled = props.isRowSelectorDisabled;
      } else {
        tableProps.showRowSelector = props.showRowSelector;
        tableProps.onSelect = props.onSelect;
        tableProps.onSelectAll = props.onSelectAll;
        tableProps.isRowSelectorDisabled = props.isRowSelectorDisabled;
        tableProps.rowSelector = props.rowSelector;
      }
    }

    if (props.showCustomBarItem) {
      tableProps.customBarItem = {
        render: props.customBarItemRender,
      };
    }
    return <DeepTable ref={this.saveTableRef} {...tableProps} />;
  }
}
