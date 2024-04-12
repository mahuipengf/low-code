import React from 'react';
import classnames from 'classnames';
import { Step } from '@ali/deep';
import './view.less';

export default class FusionSteps extends React.Component {
  static displayName = 'Steps';

  getItems = (dataSource, renderContent) => {
    if (dataSource && dataSource.length > 0) {
      return dataSource.map((item, index) => {
        const { customSwitcher, customRender } = item
        let content = item.content
        if (renderContent && typeof renderContent === 'function') {
          try {
            content = renderContent(item, index)
          } catch (e) {
            content = item.content
          }
        }
        if (customSwitcher && customRender) {
          try {
            content = customRender(item)
          } catch (e) {
            content = item.content
          }
        }
        return (
          <Step.Item
            title={item.title}
            onClick={this.props.onClick}
            content={content}
            icon={item.icon || ''}
            disabled={item.disabled || false}
            percent={item.percent || ''}
            status={item.status || ''}
            itemRender={item.itemRender || undefined}
          />
        )
      });
    }
  }

  render() {
    const {
      className,
      current,
      shape,
      direction,
      labelPlacement,
      readOnly,
      animation,
      dataSource = [],
      contentRender
    } = this.props;

    const stepProps = {
      current,
      shape,
      direction,
      labelPlacement,
      readOnly,
      animation,
      contentRender
    };

    const shouldWrap = direction === 'horizontal' || shape === 'arrow';
    const _className = classnames('vc-steps', { 'vc-steps-wrap': shouldWrap }, className);

    const step = <Step
      {...stepProps}
      className={shouldWrap ? '' : _className}
      style={(shouldWrap && shape !== 'arrow') ? {
        minWidth: dataSource.length * (labelPlacement === 'vertical' ? 128 : 142)
      } : {}}
    >
      {this.getItems(dataSource, contentRender)}
    </Step>

    return (
      dataSource.length ? (
        shouldWrap ? <div className={_className}>
          {step}
        </div> : step
      ) : null
    );
  }
}
