import React from 'react';
import classnames from 'classnames';
import { Slider, Illustration } from '@ali/deep';
import isFunction from 'lodash/isFunction';
import './view.less';

export default class FusionSlider extends React.Component {
  static displayName = 'Slider';

  static defaultProps = {
    slideImageHeight: '300px',
    slideImageWidth: '100%',
  };

  onClick = (item) => {
    if (!item.link) {
      return;
    }

    const link = item.link;
    if (this.props.__router) {
      const params = {};
      if (link.params && Array.isArray(link.params)) {
        link.params.forEach((p) => {
          params[p.key] = p.value;
        });
      }
      this.props.__router.push(
        link.href,
        params,
        link.target === '_blank',
        link.type === 'url'
      );
    } else {
      console.error('No router supplied to slider')
    }
  }

  getItemNodes(images) {
    const { margin, slideImageWidth, slideImageHeight, slideImageHeightAuto } = this.props;
    const newMargin = this.props.type === 'multi' ? `${margin}px` : '';
    const itemNodes = images.map((item, index) => {
      return (
        <div style={{ padding: newMargin }} className="slider-img-wrapper">
          {
            slideImageHeightAuto ?
              <img
                className="slider-image-link-wrapper"
                key={index}
                title={item.title}
                style={{
                  width: slideImageWidth,
                  cursor: item.link ? 'pointer' : 'auto',
                }}
                src={item.src}
                onClick={() => {
                  this.onClick(item);
                }}
              />
            :
            <div
              className="slider-image-link-wrapper"
              key={index}
              title={item.title}
              style={{
                width: slideImageWidth,
                height: slideImageHeight,
                backgroundImage: `url(${item.src})`,
                cursor: item.link ? 'pointer' : 'auto',
              }}
              onClick={() => {
                this.onClick(item);
              }}
            />
          }

        </div>
      );
    });
    return itemNodes;
  }

  getSliderProps(props) {
    const sliderProps = {
      slideDirection: props.slideDirection,
      speed: props.speed,
      lazyLoad: props.lazyLoad,
      animation: props.animation,
      arrows: props.arrows,
      arrowSize: props.arrowSize,
      arrowPosition: props.arrowPosition,
      arrowDirection: props.arrowDirection,
      autoplay: props.autoplay,
      autoplaySpeed: props.autoplaySpeed,
      dots: props.dots,
      dotsDirection: props.dotsDirection,
      triggerType: props.triggerType,
      defaultActiveIndex: props.defaultActiveIndex,
    };
    if (props.type === 'multi') {
      sliderProps.slidesToShow = props.slidesToShow;
      sliderProps.slidesToScroll = props.slidesToScroll;
      sliderProps.focusOnSelect = props.focusOnSelect;
      sliderProps.centerMode = props.centerMode;
    }

    // 设计器模式禁用 lazyLoad
    if (window.VisualEngine) {
      sliderProps.lazyLoad = false;
    }

    return sliderProps;
  }

  onChange = (index) => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(index);
    }
  }

  getDiyItemNodes(diyContents) {
    const fun = this.props.diyContentsRender;
    if (!isFunction(fun)) {
      return <Illustration size="small" type="empty" linkText="" title="" content="暂无数据" />;
    }
    const { margin, slideImageWidth, slideImageHeight } = this.props;
    const newMargin = this.props.type === 'multi' ? `${margin}px` : '';

    return  (diyContents.map((...args) =>
    <div style={{ padding: newMargin }} className="slider-img-wrapper">
      <div className="slider-image-link-wrapper" key={args[1]} style={{
        width: slideImageWidth,
        height: slideImageHeight,
      }}>
      {fun(...args)}
      </div>
    </div>));
  }

  render() {
    const props = this.props;

    const _className = classnames(
      'vc-slider',
      props.className,
    );
    const { isDiy, diyContents } = props;
    return (
      <div className={_className}>
        <Slider onChange={this.onChange} {...this.getSliderProps(props)}>
          {isDiy ? this.getDiyItemNodes(diyContents) : this.getItemNodes(props.images)}
        </Slider>
      </div>
    );
  }
}
