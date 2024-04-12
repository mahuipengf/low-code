import React from 'react';
import { Breadcrumb } from '@ali/deep';
import './view.less';

export default class FusionBreadcrumb extends React.Component {
  static displayName = 'Breadcrumb';

  render() {
    const {
      className,
      maxNode,
      separator,
      dataSource,
    } = this.props;

    const breadcrumbProps = {
      className,
      maxNode,
      separator,
    };

    return (
      <Breadcrumb {...breadcrumbProps}>
        {
          (dataSource || []).map((item, index) => (
            item.link
              ? <Breadcrumb.Item key={index} link={item.link} target={item.target}>{item.title}</Breadcrumb.Item>
              : <Breadcrumb.Item key={index}>{item.title}</Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
    );
  }
}
