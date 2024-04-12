
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NumberInfo } from '@ali/deep';
import './view.less';

export default class View extends React.Component {
  static displayName = 'NumberInfo';

  static defaultProps = {
    className: '',
  };

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {
      className,
      title,
      align,
      number,
      unit,
      trendPosition,
      trend,
      trendLabel,
      trendNumber,
      tips,
      tipsTrigger,
      tipsProps,
    } = this.props;

    return (
      <NumberInfo
        className={classnames(
          'vc-number-info',
          className,
        )}
        title={title}
        align={align}
        number={number}
        unit={unit}
        trendPosition={trendPosition}
        trend={trend}
        trendLabel={trendLabel}
        trendNumber={trendNumber}
        tips={tips}
        tipsTrigger={tipsTrigger}
        tipsProps={tipsProps}
      />
    );
  }
}
