import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Grid } from '@ali/deep';

const { Row, Col } = Grid;

export default class FilterRow extends React.Component {
  static displayName = 'FilterRow';

  static propTypes = {
    children: PropTypes.node,
    columnCount: PropTypes.number,
  };

  static defaultProps = {
    children: undefined,
    columnCount: 4,
  };

  // TODO: remove legacy usage
  static contextTypes = {
    nextDevice: PropTypes.string,
  };

  constructor(props, context) {
    super(props);

    this.nextDevice = context && context.nextDevice;
  }

  componentDidMount() {
    this.saveColumnCount();
  }

  componentDidUpdate() {
    this.saveColumnCount();
  }

  saveColumnCount() {
    const { columnCount } = this.props;
    if (columnCount) {
      this.lastColumnCount = columnCount;
    }
  }

  render() {
    const { children, columnCount } = this.props;
    const _className = classnames(
      'vc-filter-row',
    );

    const childrenCount = React.Children.count(children);

    if (childrenCount) {
      if (this.nextDevice === 'phone') {
        return (
          <div className="vc-filter-row-phone">
            {React.Children.map(children, (child, index) => (
                <div className="vc-filter-col-phone">
                  {child}
                </div>
            ))}
          </div>
        );
      }

      return (
        <div className="vc-filter-row">
          <Row>
            {React.Children.map(children, (child, index) => (
              <Col
                className={classnames('vc-filter-col', {
                  last: index === childrenCount - 1,
                  first: index === 0,
                })}
                key={child.key}
                span={24 / (columnCount || this.lastColumnCount)}
              >
                {child}
              </Col>
            ))}
          </Row>
        </div>
      );
    }

    return null;
  }
}
