import React from 'react'; /* eslint-disable-line */
import PropTypes from 'prop-types';
import { getCompatibleUrl } from './utils';
import { ImageViewer } from '@ali/deep';
import classnames from 'classnames';

import './view.less';

class Image extends React.Component {
  static displayName = 'Image';

  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
  };

  static defaultProps = {
    onClick: () => {},
    className: '',
    alt: '',
    src: '',
    title: '',
    fit: 'cover',
    autoWidth: false,
    autoHeight: false,
    round: '0',
    roundRadius: '0',
    preview: false,
  };

  static DEFAULT_IMAGE = 'https://img.alicdn.com/tps/TB16TQvOXXXXXbiaFXXXXXXXXXX-120-120.svg';

  onClick(e) {
    const { onClick } = this.props;
    onClick(e);
  }

  render() {
    const {
      alt,
      src,
      className,
      title,
      width,
      height,
      preview,
      autoHeight,
      autoWidth,
      roundRadius,
      round,
      fit,
    } = this.props;
    const rSrc = getCompatibleUrl(src);

    const style = {};
    style.width = `${width}px`;
    style.height = `${height}px`;
    if (autoWidth) {
      style.width = 'auto';
    }
    if (autoHeight) {
      style.height = 'auto';
    }
    style.objectFit = fit;
    style.borderRadius = round === '自定义' ? `${roundRadius}px` : `${round}px`;

    if (preview) {
      const previewProps = {
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        photos: { data: [{ src: rSrc || Image.DEFAULT_IMAGE, title: title }] },
        enableThumbs: false,
        showButton: true,
      };
      return (
        <div className="vc-image-viewer">
          <ImageViewer className={classnames(className)} {...previewProps} />
        </div>
      );
    }

    return (
      <img
        className={`vc-image ${className || ''}`}
        style={style}
        src={rSrc || Image.DEFAULT_IMAGE}
        alt={alt}
        onClick={this.onClick.bind(this)}
        title={title}
      />
    );
  }
}
export default Image;
