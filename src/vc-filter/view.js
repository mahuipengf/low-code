import React from 'react';
import ReactDom from 'react-dom'
import classnames from 'classnames';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { Tag, Field, Drawer, Icon, PickableField, ConfigProvider } from '@ali/deep';
import moment from 'moment';
import { transValidationRules, isComponentFormField } from '../common/formFieldUtils';
import Row from './rowView';
import Action from './actionView';
import Empty from './emptyView';
import Picker from './PickerView';
// import PickableField from './PickableFieldView';
import './view.less';
import { getSchemaFromFields, getId, FIELD_ID_NAME, getNodeProp } from './util';

const { Group: TagGroup } = Tag;

class Filter extends React.Component {
  static displayName = 'Filter';

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
    onFoldChange: PropTypes.func,
    isFold: PropTypes.bool,
    needFold: PropTypes.bool,
  }

  static defaultProps = {
    componentId: null,
    style: null,
    children: undefined,
    config: [],
    context: undefined,
    showTag: false,
    onFilterChange: () => {},
  };

  // TODO: remove legacy usage
  static contextTypes = {
    nextDevice: PropTypes.string,
  };

  constructor(props, context) {
    super(props);

    this.state = {
      isFold: this.isViewMode(),
      tags: [],
      offset: [0, 0],
      drawerVisible: false,
    };
    this.field = new Field(this, {
      onChange: () => {
        this.handleChange();
      }
    });
    this.actionView = null;
    this.fieldsMeta = {};
    this.showDrawer = this.showDrawer.bind(this);
    this.hideDrawer = this.hideDrawer.bind(this);

    this.nextDevice = context && context.nextDevice;
  }

  componentDidMount() {
    setTimeout(() => {
      this.formValue = this._innerGetValue();
    }, 100);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isFold } = this.state;
    if (prevState.isFold !== isFold) {
      this.formValue && this.field.setValues(this.formValue);
    }
  }

  componentWillUnmount() {
    if (this.tagsTimer) {
      clearTimeout(this.tagsTimer);
      this.tagsTimer = null;
    }
  }

  getChildContext() {
    const { isFold } = this.state;
    const { config } = this.props;
    return {
      isFold,
      needFold: !!config.filter(item => item.isAdvanced).length,
      onFoldChange: this.handleFoldChange,
    };
  }
  fixStyle() {
    const inShell = document.querySelector('.deep-shell.vc-shell')
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(navigator.userAgent)
    const container = document.getElementsByClassName('next-shell-sub-main')[0]
    this.setState({
      offset: [0, inShell ? isMobile ? 48 : 52 : 0],
      container:  container || document.body,
    })
    if (container) {
      container.style.overflow = 'hidden'
    }
    setTimeout(() => {
      const drawer = ReactDom.findDOMNode(this.drawer)
      const dialogDom = drawer.querySelector('.vc-drawer')
      const height = window.innerHeight
      if (inShell && dialogDom) {
        dialogDom.style.height = `${height - (isMobile ? 48 : 52)}px`
      }
    }, 100)
  }

  handleChange(fromFilter) {
    this.formValue = this._innerGetValue();
    this.processTags(fromFilter);
  }

  submit(...args) {
    if ((args.length === 1 && isFunction(args[0])) || args.length === 2) {
      const names = args.length === 1 ? undefined : args[0];
      const callback = args.length === 1 ? args[0] : args[1];
      if (isFunction(callback)) {
        return this.field.validate(names, (errors, values) => {
          if (errors) {
            callback(null, errors);
          } else {
            if (this.actionView) {
              this.hideDrawer();
            }

            callback(this.getValue(names, values), null);
          }
        });
      }
    }

    console.error('调用 Filter.submit 参数错误，期待参数 <names?: [], callback?: function>');
  }

  reset() {
    this.setState({
      tags: [],
    }, () => {
      this.field.reset();
      if (this.formFields) {
        this.formFields.forEach((field) => {
          field.reset();
        });
      }
    });
  }

  // 单独供内部试用的 getValue，区别是否在移动端关闭 Drawer
  _innerGetValue() {
    return this.field.getValues();
  }

  getValue(names) {
    // 手机端在确定时同时关闭抽屉视图
    if (this.actionView) {
      this.hideDrawer();
    }

    const values = this.field.getValues(names);
    Object.keys(values).forEach((key) => {
      if (this.fieldsMeta[key]) {
        const meta = this.fieldsMeta[key];
        if (meta.componentName === 'DateField') {
          if (values[key] && moment.isMoment(values[key])) {
            let ov = values[key];
            if (meta.returnType === 'string') {
              values[key] = ov.format(meta.format || 'YYYY-MM-DD');
            } else if (meta.returnType === 'timestamp') {
              values[key] = ov.valueOf();
            } else {
              values[key] = ov;
            }
          }
        } else if (meta.componentName === 'CascadeDateField') {
          if (Array.isArray(values[key])) {
            const [ v1, v2 ] = values[key];
            if (moment.isMoment(v1) && moment.isMoment(v2)) {
              if (meta.returnType === 'string') {
                values[key] = [ v1.format(meta.format || 'YYYY-MM-DD'), v2.format(meta.format || 'YYYY-MM-DD')];
              } else if (meta.returnType === 'timestamp') {
                values[key] = [ v1.valueOf(), v2.valueOf() ];
              } else {
                values[key] = [ v1, v2 ];
              }
            }
          }
        }
      }
    });

    return values;
  }

  setValue(values) {
    return this.field.setValues(values);
  }

  handleFoldChange = () => {
    this.setState((prevState) => {
      return {
        isFold: !prevState.isFold,
      };
    });
  }

  showDrawer() {
    this.setState({
      drawerVisible: true,
    }, () => {
      this.fixStyle()
    });
  }

  hideDrawer() {
    this.setState({
      drawerVisible: false,
    }, () => {
      const container = document.getElementsByClassName('next-shell-sub-main')[0]
      if (container) {
        container.style.overflow = ''
      }
    });
  }

  processTags(fromFilter) {
    if (this.tagsTimer) {
      clearTimeout(this.tagsTimer);
      this.tagsTimer = null;
    }

    this.tagsTimer = setTimeout(() => {
      const formValue = this._innerGetValue();
      const { onFilterChange, showTag, children } = this.props;

      this.formValue = formValue;
      this.fieldsMeta = {};

      if (fromFilter && onFilterChange) {
        onFilterChange({
          value: formValue,
        });
      }

      if (showTag) {
        const fieldContextMap = {};

        React.Children.forEach(children, (child) => {
          if (child.props.children) {
            React.Children.forEach(child.props.children, (item) => {
              let fieldId = getNodeProp(item, FIELD_ID_NAME);

              if (isComponentFormField(item)) {
                fieldContextMap[fieldId] = {
                  fieldId,
                  componentName: item.type.displayName,
                  label: item.props.label,
                  options: item.props.dataSource,
                  format: item.props.format,
                  returnType: item.props.returnType,
                };

                const name = item.props.fieldName || item.props.fieldId;
                this.fieldsMeta[name] = fieldContextMap[fieldId];
              }
            });
          }
        });

        const tags = [];

        for (let key in formValue) {
          const fieldContext = fieldContextMap[key];
          if (fieldContext && formValue[key] !== undefined) {
            const itemData = {
              value: formValue[key],
              ...fieldContext,
            };

            if (fieldContext.componentName === 'DateField') {
              if (itemData.value) {
                const momentValue = moment.isMoment(itemData.value) ? itemData.value : moment(itemData.value);
                itemData.value = momentValue.isValid() ? momentValue.format(fieldContext.format || 'YYYY-MM-DD') : '';
              }
            } else if (fieldContext.componentName === 'CascadeDateField') {
              let itemValue = '';
              if (Array.isArray(itemData.value)) {
                const [ v1, v2 ] = itemData.value;
                if (v1 && v2) {
                  const m1 = moment.isMoment(v1) ? v1 : moment(v1);
                  const m2 = moment.isMoment(v2) ? v2 : moment(v2);
                  const format = fieldContext.format || 'YYYY-MM-DD';
                  if (m1.isValid() && m2.isValid()) {
                    itemValue = `${m1.format(format)} ~ ${m2.format(format)}`;
                  }
                }
              }

              itemData.value = itemValue;
            }

            tags.push(itemData);
          }
        }

        this.setState({ tags });
      }
    }, 200);
  }

  isViewMode() {
    return true;
  }

  renderTag() {
    const { showTag } = this.props;
    if (!showTag) {
      return null;
    }

    const { tags } = this.state;
    if (tags && tags.length) {
      return (
        <TagGroup addTags={false} className="vc-filter-tag">
          {tags.map((item) => {
            if (item.value && item.label) {
              let text = item.value;
              if (typeof text === 'object') {
                if (Array.isArray(text)) {
                  text = text.map((v) => {
                    if (v !== null && (typeof v === 'object')) {
                      return (v.value || v.label);
                    }
                    if (item.options) {
                      const optionsMap = {};
                      item.options.forEach((option) => {
                        optionsMap[option.value] = option.text;
                      });
                      return optionsMap[v];
                    }
                    return v;
                  }).join(', ');
                } else {
                  text = JSON.stringify(text);
                }
              } else if (item.options) {
                const optionsMap = {};
                item.options.forEach((option) => {
                  optionsMap[option.value] = option.text;
                });
                text = optionsMap[text] || text;
              }
              if (text) {
                return (
                  <Tag type="primary" size="small">
                    {`${item.label}: ${text}`}
                  </Tag>
                );
              }
              return null;
            }
            return null;
          })}
        </TagGroup>
      );
    }
    return null;
  }

  renderView() {
    const {
      children,
      config,
    } = this.props;

    const {
      isFold
    } = this.state;

    let fields = [];
    const rows = [];

    this.formFields = [];

    let action = null;
    React.Children.forEach(children, (child) => {
      if (child.props.children) {
        if (child.type.displayName === 'FilterRow') {
          rows.push(child);
        }
        React.Children.forEach(child.props.children, (item) => {
          if (isComponentFormField(item)) {
            fields.push(item);
          } else if (item.type.displayName === 'FilterAction') {
            action = item;
          }
        });
      }
    });

    const advancedFieldIds = config.filter(item => item.isAdvanced).map(item => getId(item)).concat(
      config.filter(item => item.isAdvanced && item[FIELD_ID_NAME]).map(item => item[FIELD_ID_NAME])
    );
    fields = fields.filter(field => !field.props.behavior || field.props.behavior !== 'HIDDEN');
    if (isFold) {
      fields = fields.filter(field => advancedFieldIds.indexOf(getId(field)) === -1 && advancedFieldIds.indexOf(getNodeProp(field, FIELD_ID_NAME)) === -1);
    }
    const schema = getSchemaFromFields({ fields, action, config, rows, fromView: true });
    /* eslint-disable react/no-array-index-key */
    return schema.map((row, index) => {
      if (row.componentName === 'FilterRow') {
        return (
          <Row key={index} {...row.props}>
            {row.children.map(child => {
              if (child.componentName === 'FilterEmpty') {
                return <Empty/>
              } else if (isComponentFormField(child)) {
                const {
                  onChange,
                } = child.props;

                return React.cloneElement(child, {
                  onChange: (ctx) => {
                    onChange && onChange(ctx);
                    this.handleChange(true);
                  },
                  ref: (c) => {
                    if (c) {
                      this.formFields.push(c.getInstance());
                    }
                  },
                  field: this.field,
                });
              } else {
                // 如果是手机端，把 ActionView 换一个位置渲染
                if (child.type && child.type.displayName === 'FilterAction' && this.nextDevice === 'phone') {
                  this.actionView = child;
                  return null;
                } else {
                  return child;
                }
              }
            })}
          </Row>
        );
      } else if (row.componentName === 'FilterPicker') {
        return (
          <Picker>
            {row.children.map(child => {
              const props = child.props;
              const { onChange, value } = props;

              delete props.value;

              const pickableProps = {
                ...props,
                defaultValue: value,
                onChange: (value) => {
                  onChange && onChange(value);
                  this.handleChange(true);
                },
                field: this.field,
              };

              return <PickableField {...pickableProps} />
            })}
          </Picker>
        );
      }
      return null;
    });
    /* eslint-enable react/no-array-index-key */
  }

  render() {
    const { className, mobileTitle, children } = this.props;

    const _className = classnames(
      'vc-filter',
      className,
      {
        'vc-filter-phone': this.nextDevice === 'phone',
      }
    );

    if (this.nextDevice === 'phone') {
      const containerStyle = {
        overflow: 'auto',
        height: 'calc(100% - 65px)',
      };
      return (
        <div className={_className}>
          <div className="vc-filter-phone-view">
            <div className="vc-filter-phone-trigger" onClick={this.showDrawer}>
            <span>{mobileTitle || '数据查询'}</span>
              <Icon type="filter" size="small" />
            </div>
            <div className="vc-filter-phone-tags">
              {this.renderTag()}
            </div>
          </div>
          <Drawer
            ref={(c)=> {this.drawer = c}}
            className="vc-drawer vc-drawer-for-filter"
            visible={this.state.drawerVisible}
            width="100%"
            title={'数据查询'}
            closeable={true}
            container={this.state.container}
            offset={this.state.offset}
            onClose={this.hideDrawer}
            onCancel={this.hideDrawer}
          >
            <div className="vc-drawer-container" style={containerStyle}>
              {!this.isViewMode() ? children : this.renderView()}
              {this.renderTag()}
            </div>
            <div className={`vc-drawer-footer right`}>
              {this.actionView}
            </div>
          </Drawer>
        </div>
      );
    }

    return (
      <div className={_className}>
        {!this.isViewMode() ? children : this.renderView()}
        {this.renderTag()}
      </div>
    );
  }
}

export default [
  Filter,
  Row,
  Action,
  Empty,
  Picker,
  PickableField,
];
