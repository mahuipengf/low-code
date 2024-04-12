import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StyleSheet from '@ali/vu-style-sheet';
import Anchor, {Link} from './biz-anchor';
import './view.less';

export default class FloatNav extends React.Component {
  // displayName 必须与 prototype 里的 componentName 相同
  // 且与包名有对应的转换关系，关系为去除vc, - 转驼峰
  // 例如：包名 @ali/vc-text-field 对应的 displayName 为 TextField
  static displayName = 'FloatNav';

  static defaultProps = {
    offsetTop: 20,
    offsetRight: 20,
    width: 260,
    height: 370,
    categoryConfig: null,
    className: null,
  };

  static propTypes = {
    offsetTop: PropTypes.number,
    offsetRight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    categoryConfig: PropTypes.object,
    className: PropTypes.string,
  };

  genLink(item) {
    return (
      <Link href={`#${item.anchor}`} title={item.title}>
        {item.children && item.children.length > 0 ? item.children.map(i=>this.genLink(i)) : ""}
      </Link>
    )
  }

  genAnchor() {
    const { categoryConfig } = this.props;
    return (
      <Anchor>
        {categoryConfig.map((item => this.genLink(item)))}
      </Anchor>
    )
  }
  render() {
    const { offsetRight, offsetTop, width, height, className} = this.props;
    const _className = classnames(
      'vc-float-nav',
      className,
    );

    return (
      <div className={_className} style={{width,height,position: 'fixed', top: `${offsetTop}px`, right: `${offsetRight}px`}}>
        {this.genAnchor()}
      </div>
    );
  }
}
