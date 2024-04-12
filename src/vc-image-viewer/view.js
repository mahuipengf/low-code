import React from 'react'; /* eslint-disable-line */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ImageViewer } from '@ali/deep';

import './view.less';

class View extends React.Component {
  static displayName = 'ImageViewer';

  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const {
      className,
      photos,
      height,
      width,
      ...restProps
    } = this.props;
    
    restProps.photos = {
      data: photos,
    };
    if (height) {
      restProps.height = parseInt(height, 10);
    }
    if (width) {
      restProps.width = parseInt(width, 10);
    }

    return (<div className="vc-image-viewer">
      <ImageViewer className={classnames(className)} {...restProps} />
    </div>);
  }
}
export default View;
