import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PageHeader } from '@ali/deep';

import './view.less';

class View extends React.Component {
  static displayName = 'PageHeader';

  static propTypes = {
    className: PropTypes.string,
    logo: PropTypes.node,
    title: PropTypes.node,
    subTitle: PropTypes.node,
    content: PropTypes.node,
    action: PropTypes.node,
    extraContent: PropTypes.node,
    tab: PropTypes.node,
    context: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      className,
      logo,
      title,
      subTitle,
      content,
      action,
      extraContent,
      tab,
    } = this.props;

    return (<PageHeader
      className={classnames('vc-page-header', className)}
      logo={logo}
      title={title}
      subTitle={subTitle}
      subContent={subTitle}
      tab={tab}
      action={action}
      content={content}
      extraContent={extraContent}
    />);
  }
}

export default View;
