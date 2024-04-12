import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Cascader } from '@ali/deep';
import reqwest from 'reqwest';

export default class FusionCascader extends React.Component {
  static displayName = 'Cascader';

  static defaultProps = {
    componentId: null,
    content: null,
    className: '',
  };

  static propTypes = {
    componentId: PropTypes.string,
    content: PropTypes.string,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      value: (props.defaultValue || {}).value ? props.defaultValue.value : [],
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.dataType === 'remote') {
      this.ajax(props);
    }
  }

  ajax(props) {
    const params = props.fetchParams || {};
    reqwest({
      url: props.fetchUrl,
      method: props.fetchMethod,
      data: params,
    })
    .then((res) => {
      if (res.success) {
        const data = res.data;
        const dataSource = this.processData(data, props.processData);
        this.setState({
          dataSource,
        });
      } else {
        props.fetchError(res.errorMsg);
      }
    })
    .then((err) => {
      if (err) {
        Message.error(err);
      }
    });
  }

  processData(data, processData) {
    const newData = processData(data);
    return newData;
  }

  getDataSource(props) {
    let dataSource;
    if (props.dataType === 'remote') {
      dataSource = this.state.dataSource;
    } else {
      dataSource = props.dataSource;
    }
    return dataSource;
  }

  onChange = (value) => {
    this.setState({
      value,
    }, () => {
      if (this.props.onChagne) {
        this.props.onChange();
      }
    });
  }

  render() {
    const {
      className,
      expandTriggerType,
      multiple,
      canOnlySelectLeaf,
      canOnlyCheckLeaf,
      checkStrictly,
      onExpand,
      isLoadData,
      loadData,
    } = this.props;

    const cascaderProps = {
      className: classnames('vc-cascader', className),
      dataSource: this.getDataSource(props),
      value: this.state.value,

      expandTriggerType,
      multiple: multiple,
      canOnlySelectLeaf,
      canOnlyCheckLeaf,
      checkStrictly,
      // defaultExpandedValue,
      onChange: this.onChange,
    };

    if (onExpand) {
      cascaderProps.onExpand = onExpand;
    }
    if (isLoadData) {
      cascaderProps.loadData = loadData;
    }

    return (
      <Cascader {...cascaderProps} />
    );
  }
}
