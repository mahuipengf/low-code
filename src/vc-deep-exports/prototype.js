import React from 'react';
import { Bundle } from '@ali/visualengine';
import $i18n from '../i18n/index';

export default Bundle.createPrototype({
  title: $i18n.get({ id: 'deepDEEPLayerComponentExports', dm: 'DEEP 层组件导出供自定义渲染使用' }),
  componentName: 'Deep',
  category: null,
  snippets: [],
  configure: [],
});
