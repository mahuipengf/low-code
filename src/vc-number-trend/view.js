
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NumberInfo } from '@ali/deep';
import './view.less';

export default class NumberTrend extends React.Component {
  static displayName = 'NumberTrend';

  static defaultProps = {
    className: '',
  };

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {
      className,
      trend,
      trendLabel,
      trendNumber,
    } = this.props;

    return (
      <NumberInfo.Trend
        className={classnames(
          'vc-number-trend',
          className,
        )}
        trend={trend}
        trendLabel={trendLabel}
        trendNumber={trendNumber}
      />
    );
  }
}
