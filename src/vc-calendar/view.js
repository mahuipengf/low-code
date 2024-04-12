import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Calendar } from '@ali/deep';
import moment from 'moment';

import './view.less';

export default class FusionCalendar extends React.Component {
  static displayName = 'Calendar';

  static defaultProps = {
    componentId: null,
    className: '',
    content: null,
  };

  static propTypes = {
    componentId: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.string,
  };

  static getDerivedStateFromProps(props, state) {
    const { defaultDate } = props;
    const { preValue } = state;
    if (defaultDate !== preValue) {
      return {
        value: props.defaultDate,
        preValue: props.defaultDate,
      };
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultDate,
      preValue: props.defaultDate,
    }
  }

  render() {
    const {
      className,
      language,
      shape,
      showOtherMonth,
      defaultDate,
      defaultMonth,
      disabledDate,
      dateCellRender,
      monthCellRender,
      onSelect,
      onVisibleMonthChange,
      onModeChange = () => { },
    } = this.props;

    moment.locale(language);

    const calendarProps = {
      className: classnames('vc-calendar', className),
      shape,
      showOtherMonth,
      value: moment(this.state.value),
      defaultVisibleMonth: moment(defaultMonth),
      disabledDate,
      dateCellRender,
      monthCellRender,
      onSelect: (value) => {
        const val = moment.isMoment(value) ? value.format('YYYY-MM-DD') : value;
        this.setState({
          value: val,
        });
        if (onSelect) {
          onSelect(val);
        }
      },
      onVisibleMonthChange: (value, reason) => {
        if (onVisibleMonthChange) {
          const val = moment.isMoment(value) ? value.format('YYYY-MM') : value;
          onVisibleMonthChange(val, reason);
        }
      },
      onModeChange,
    };

    return (
      <Calendar {...calendarProps} />
    );
  }
}
