import React, { forwardRef } from 'react';
import { CascadeSelectField } from '@ali/deep';
import './view.less';

const DeepCascadeSelectField = forwardRef((props, ref) => {
  const { isLoadData, loadData, ...otherProps } = props;

  if (isLoadData) {
    otherProps.loadData = loadData;
  }

  return <CascadeSelectField ref={ref} {...otherProps} />
});

DeepCascadeSelectField.displayName = 'CascadeSelectField';
CascadeSelectField.displayName = 'CascadeSelectField';
DeepCascadeSelectField._typeMark = CascadeSelectField._typeMark;

export default DeepCascadeSelectField;
