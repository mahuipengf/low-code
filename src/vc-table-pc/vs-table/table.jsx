import React, { Component, PropTypes } from 'react';
import { SmartTable } from '@ali/smart-table'
import { components } from '@ali/smart-table-components'
import '@ali/smart-table/locale/zh-CN'
import './table.less';

const defaultConfig = {
  id: 'vs-table-data',
  showIndexField: true,
  allowInsertRow: true,
  allowDeleteRow: true,
  allowSelectRow: true,
  allowInsertField: true,
  allowDeleteField: true,
  allowMoveField: true,
  allowResizeField: true,
  allowEditCell: true,
  showHeaderCellMenu: true,
  allowRenameField: true,
  allowChangeFieldDataType: true,
  allowSingleClickEditCell: true,
  allowSingleClickEditField: true,
};

const style = {
  width: '100%',
  height: '400px'
};

const Table = React.forwardRef((props, ref) => {
  const { defaultValue } = props;
  const config = {
    ...defaultConfig,
    sheets: [defaultValue]
  };
  return (
    <SmartTable
      ref={ref}
      style={style}
      components={components}
      defaultValue={config}
    />
  )
});

export default Table
