import React from 'react';
import PropTypes from 'prop-types';
import { Filter } from '@ali/deep';
import './view.less';

// 判断是否编辑器模式
const validateIsEditorMode = ele => ele.type.displayName === 'Leaf';

const isHiddenChild = (child) => {
  const isEditorMode = validateIsEditorMode(child);
  if (!isEditorMode) {
    return child.props && child.props.behavior === 'HIDDEN';
  }
  return false;
}

const getI18nVal = (item) => {
  if (!item) return '';
  return typeof item === 'string' ? item : item.zh_CN;
}

const getFilterPickItem = pickField => {
  return React.cloneElement(
    pickField,
    {
      _displayType: 'Pickable',
      name: pickField.props && (pickField.props.fieldName || pickField.props.fieldId),
      options: pickField.props && pickField.props.dataSource || []
    }
  )
}

class VCFilter extends React.Component {
  static displayName = 'Filter2';

  static propTypes = {
    componentId: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    config: PropTypes.array,
    context: PropTypes.object,
    showTag: PropTypes.bool,
    onFilterChange: PropTypes.func,
  };

  static childContextTypes = {
    // onFoldChange: PropTypes.func,
    // isFold: PropTypes.bool,
    // needFold: PropTypes.bool,
  }

  static defaultProps = {
    componentId: null,
    style: null,
    children: undefined,
    config: [],
    context: undefined,
    showTag: false,
    onFilterChange: () => { },
  };

  // TODO: remove legacy usage
  static contextTypes = {
    nextDevice: PropTypes.string,
  };

  constructor(props, context) {
    super(props);
    this.state = {
      value: {}
    };
  }

  render() {
    const { className, mobileTitle, children, onSubmit, config, labelAlign, size, labelColSpan, showTag, rowColumn, showBottomLine, onChange, onAdvanceSearchVisibleChange } = this.props;
    let formChildren = [];
    const pickFieldChildren = [];
    const newChildren = React.Children.map(children, child => {
      const otherProps = {};
      // id === key 编辑态逻辑   fieldId === props.fieldName || fieldId === props.fieldId 运行态(兼容)
      const configItem = config.find(item => (item.id === child.key || item.fieldId === child.props.fieldName || item.fieldId === child.props.fieldId));
      if (configItem && configItem.isAdvanced) {
        otherProps.isAdvancedSearch = true;
      }

      if (configItem && configItem.colspan) {
        otherProps.colspan = configItem.colspan;
      }

      if (labelAlign === 'left') {
        otherProps.labelColSpan = labelColSpan;
      }



      return React.cloneElement(
        child,
        {
          ...otherProps,
          labelAlign,
          size
        }
      )
    });
    React.Children.forEach(newChildren, child => {
      // 编辑模式
      const editorModeFormFieldValidate = child.type && child.type.displayName && child.type.displayName === 'Leaf' && child.props.leaf.componentName.endsWith('Field') && !child.props.leaf.componentName.endsWith('PickableField')
      // 运行模式
      const runningModeFormFieldValidate = child.type && child.type.displayName && child.type.displayName.endsWith('Field') && !child.type.displayName.endsWith('PickableField');
      if (editorModeFormFieldValidate || runningModeFormFieldValidate) {
        if (!isHiddenChild(child)) {
          formChildren.push(child);
        }
      } else {
        pickFieldChildren.push(child)
      }
    })

    let pickableItems = React.Children.map(pickFieldChildren, getFilterPickItem);
    if (!showTag) {
      formChildren = newChildren;
      pickableItems = [];
    }
    return <div>
      <Filter value={this.state.value}
        rowColumn = {rowColumn}
        onSubmit={onSubmit}
        showBottomLine={showBottomLine}
        onReset={(value) => {
          const { onReset } = this.props;
          const resetVal = { ...value.formValues, ...value.panelValues };
          this.setState({
            value: resetVal
          });
          onReset && onReset(resetVal);
        }}
        isFormFieldFunc={(item) => {
          let editorModeValidate = item.type.displayName === 'Leaf' && item.props.leaf && item.props.leaf.componentName && item.props.leaf.componentName.endsWith('Field') && !item.props.leaf.componentName.endsWith('PickableField')
          let runningModeValidate = item.type.displayName && item.type.displayName.endsWith('Field') && !item.type.displayName.endsWith('PickableField');
          if (!showTag) {
             editorModeValidate = item.type.displayName === 'Leaf' && item.props.leaf && item.props.leaf.componentName && item.props.leaf.componentName.endsWith('Field');
             runningModeValidate = item.type.displayName && item.type.displayName.endsWith('Field');
          }
          return editorModeValidate || runningModeValidate;
        }}
        onChange={(value) => {
          this.setState({
            value
          });
          if (typeof onChange === 'function') {
            onChange(value);
          }
        }}
        onAdvanceSearchVisibleChange={(visible, value) => {
          if (typeof onAdvanceSearchVisibleChange === 'function') {
            this.setState({
              value,
            });
            onAdvanceSearchVisibleChange(visible, value);
          }
        }}
      >
        <Filter.Form>
          {formChildren}
        </Filter.Form>
        <Filter.Picker>
          {pickableItems}
        </Filter.Picker>
      </Filter>
    </div>
  }
}

export default [
  VCFilter,
];
