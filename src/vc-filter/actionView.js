import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Icon } from '@ali/deep';
import i18n from './i18n';

class OtherField extends Form.Item {
  renderField() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default class FilterAction extends React.Component {
  static displayName = 'FilterAction';

  static propTypes = {
    children: PropTypes.node,
    labelAlign: PropTypes.string,
    context: PropTypes.object,
    textVAlign: PropTypes.string,
  };

  static contextTypes = {
    onFoldChange: PropTypes.func,
    isFold: PropTypes.bool,
    needFold: PropTypes.bool,
  }

  static defaultProps = {
    children: undefined,
    labelAlign: undefined,
    context: undefined,
    textVAlign: undefined,
  };


  getLocale() {
    const { context } = this.props;
    if (context) {
      return context.getLocale();
    }
    return 'zh_CN';
  }

  renderExpandTrigger() {
    const { isFold, onFoldChange } = this.context;
    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
      <a role="presentation" className="vc-filter-expand-trigger" onClick={onFoldChange}>
        {i18n[this.getLocale()][isFold ? 'unfold' : 'fold']}
        <Icon
          type="arrow-up"
          size="xs"
          className={classnames('vc-filter-expand-trigger-icon', {
            fold: isFold,
          })}
        />
      </a>
    );
    /* eslint-enable jsx-a11y/anchor-is-valid */
  }

  render() {
    const {
      children,
      labelAlign,
      textVAlign,
    } = this.props;
    const { needFold } = this.context;
    const fieldProps = {
      labelAlign: labelAlign,
      className: classnames(
        'vc-filter-action',
        {
          left: textVAlign === 'left',
          center: textVAlign === 'center',
        },
      ),
      standalone: true,
      label: labelAlign === 'top' ? <br /> : false,
    };

    return (
      <OtherField {...fieldProps}>
        {children}
        {needFold ? this.renderExpandTrigger() : null}
      </OtherField>
    );
  }
}
