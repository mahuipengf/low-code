import React from 'react';
import classnames from 'classnames';
import { Timeline } from '@ali/deep';
import './view.less';

export default class FusionTimeline extends React.Component {
  static displayName = 'Timeline';

  render() {
    const {
      className, dataSource, fold,
    } = this.props;

    const _className = classnames(
      'vc-timeline',
      className,
    );

    return (
      <Timeline className={_className} fold={fold}>
        {
          dataSource && dataSource.length > 0
            ? dataSource.map(item => (
              <Timeline.Item
                state={item.state || 'done'}
                icon={item.icon || ''}
                time={item.time || ''}
                title={item.title || ''}
                timeLeft={item.timeLeft || ''}
                content={item.content || ''}
              />
            )) : null
        }
      </Timeline>
    );
  }
}
