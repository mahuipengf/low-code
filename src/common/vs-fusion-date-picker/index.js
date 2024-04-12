import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { DatePicker } from '@ali/deep';

import './style.less';

const { RangePicker, MonthPicker, YearPicker } = DatePicker;
class DatePickerSetter extends Component {
  static displayName = 'DatePickerSetter';

  componentWillMount() {
    this.prop = this.props.prop;
    this.willDetach = this.prop.onValueChange(() => this.forceUpdate());
  }

  componentWillUnmount() {
    if (this.willDetach) {
      this.willDetach();
    }
  }

  getSetter(props) {
    // const showTime = props.showTime ? { format: 'HH:mm:ss' } : false;
    if (props.type === 'DatePicker') {
      return (
        <DatePicker
          value={this.prop.value || this.prop.initialData}
          showTime={props.showTime}
          hasClear
          onChange={(val) => {
            let value = val;
            if (val && moment.isMoment(val)) {
              value = val.format(props.format);
            }
            this.prop.setHotValue(value);
          }}
        />
      );
    }
    if (props.type === 'YearPicker') {
      return (
        <YearPicker
          value={this.prop.value || this.prop.initialData}
          hasClear
          onChange={(val) => {
            let value = val;
            if (val && moment.isMoment(val)) {
              value = val.format(props.format);
            }
            this.prop.setHotValue(value);
          }}
        />
      );
    }
    if (props.type === 'MonthPicker') {
      return (
        <MonthPicker
          value={this.prop.value || this.prop.initialData}
          hasClear
          onChange={(val) => {
            let value = val;
            if (val && moment.isMoment(val)) {
              value = val.format(props.format);
            }
            this.prop.setHotValue(value);
          }}
        />
      );
    }
    if (props.type === 'RangePicker') {
      return (
        <RangePicker
          value={this.prop.value || this.prop.initialData}
          hasClear
          showTime={props.showTime}
          size="small"
          onChange={(val) => {
            if (val && Array.isArray(val)) {
              let [ v1, v2 ] = val;
              if (v1 && moment.isMoment(v1)) {
                v1 = v1.format(props.format);
              }
              if (v2 && moment.isMoment(v2)) {
                v2 = v2.format(props.format);
              }
              this.prop.setHotValue([v1, v2]);
            } else {
              this.prop.setHotValue('');
            }
          }}
        />
      );
    }
  }

  render() {
    return (
      <div className="vs-date-picker-setter">
        {this.getSetter(this.props)}
      </div>
    );
  }
}

export default DatePickerSetter;
