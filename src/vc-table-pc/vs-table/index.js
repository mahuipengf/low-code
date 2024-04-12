import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SmartTable from './table';
import { Dialog, Button } from '@ali/vu-uxcore-legao-design';

class TableSetter extends Component {
  static propTypes = {
    prop: PropTypes.object,
    buttonName: PropTypes.string,
  };

  static defautProps = {
    buttonName: '编辑数据',
  };

  static displayName = 'TableSetter';

  constructor(props) {
    super(props);
    this.prop = props.prop;
    this.state = {
      dialogVisible: false,
    };
    this.ref = React.createRef();
  }

  componentWillMount() {
    this.prop = this.props.prop;
    this.willDetach = this.prop.onValueChange(() => this.forceUpdate());
  }

  componentWillUnmount() {
    if (this.willDetach) {
      this.willDetach();
    }
  }

  showDialog() {
    this.setState({
      dialogVisible: true,
    });
  }

  onDialogOK() {
    const { prop } = this.props;
    this.ref.current.getValue().then((value) => {
      prop.setHotValue(value.sheets[0]);
    })
    this.setState({
      dialogVisible: false,
    });
  }

  onDialogCancel() {
    this.setState({
      dialogVisible: false,
    });
  }

  onCopyData() {
    this.ref.current.getValue().then((value) => {
      const rows = value.sheets[0].rows;
      this.ref.current.setRows('vs-table-sheet', Array.from({ length: 10 }, (v, i) => {
        return {
          ...rows[0],
          id: '',
        }
      }));
    })
  }

  onClear() {
    this.ref.current.setRows('vs-table-sheet', []);
  }

  renderDialog() {
    const { buttonName } = this.props;
    const { dialogVisible } = this.state;
    const defaultValue = {
      ...this.props.prop.getHotValue(),
      id: 'vs-table-sheet'
    };
    return (
      <Dialog
        title={buttonName}
        width="1000px"
        visible={dialogVisible}
        keyboard={false}
        onOk={this.onDialogOK.bind(this)}
        onCancel={this.onDialogCancel.bind(this)}
      >
        <div className="vs-table-dialog-toolbar">
          <Button
            size="small"
            type="secondary"
            className="vs-table-dialog-toolbar-button"
            onClick={this.onCopyData.bind(this)}>以第一行数据快速生成 10 行</Button>
          <Button
            size="small"
            type="secondary"
            className="vs-table-dialog-toolbar-button"
            onClick={this.onClear.bind(this)}>清空数据</Button>
        </div>
        <SmartTable defaultValue={defaultValue} ref={this.ref}>
        </SmartTable>
      </Dialog>
    );
  }

  render() {
    const { buttonName } = this.props;
    return (
      <div>
        <button type="button" className="vs-action-button" onClick={this.showDialog.bind(this)}>
          {buttonName}
        </button>
        {this.renderDialog()}
      </div>
    )
  }
}

export default TableSetter;
