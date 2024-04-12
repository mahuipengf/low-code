import React from 'react';
import {
  I18nSetter,
  ChoiceSetter,
  NumberSetter,
  ActionSetter,
  EditorSetter,
  JsonSetter,
  BoolSetter,
} from '@ali/visualengine-utils';
import {
  fieldName,
  validation as _validation,
  defaultValue as _defaultValue,
  formCategory as _formCategory,
} from '@ali/vu-field-property';
import uuid from '@ali/vu-uuid-property';
import events from '@ali/vu-events-property';
import IconSetter from '../vs-fusion-icon/index';
import $i18n from '../../i18n/index';
import * as tipUrls from '../tipUrls';

export function label(options = {}) {
  return {
    name: 'label',
    title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
    display: 'inline',
    initialValue: {
      zh_CN: '标题',
      en_US: 'label',
      type: 'i18n',
    },
    setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
    supportVariable: true,
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function labelAlign(options = {}) {
  return {
    name: 'labelAlign',
    title: $i18n.get({ id: 'deepTitlePosition', dm: '标题位置' }),
    display: 'inline',
    supportVariable: true,
    initialValue: 'top',
    setter: (
      <ChoiceSetter
        options={[
          {
            title: $i18n.get({ id: 'deepLeft', dm: '左' }),
            value: 'left',
          },

          {
            title: $i18n.get({ id: 'deepOn', dm: '上' }),
            value: 'top',
          },

          {
            title: $i18n.get({ id: 'deepInternal', dm: '内部' }),
            value: 'inset',
          },
        ]}
        compact={false}
      />
    ),
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function labelTextAlign(options = {}) {
  return {
    name: 'labelTextAlign',
    title: $i18n.get({ id: 'deepTitleAlignment', dm: '标题对齐' }),
    display: 'inline',
    initialValue: 'right',
    supportVariable: true,
    hidden() {
      return this.getProps().getPropValue('labelAlign') !== 'left';
    },
    setter: (
      <ChoiceSetter
        options={[
          {
            title: $i18n.get({ id: 'deepLeft', dm: '左' }),
            value: 'left',
          },

          {
            title: $i18n.get({ id: 'deepRight', dm: '右' }),
            value: 'right',
          },
        ]}
        compact={false}
      />
    ),
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function placeholder(options = {}) {
  return {
    name: 'placeholder',
    title: $i18n.get({ id: 'deepPlaceholderTips', dm: '占位提示' }),
    display: 'inline',
    supportVariable: true,
    /** 这里不使用 i18n 的默认值的原因，是因为这里配置了默认值后，反而不好利用组件自带的国际化文案，
     * placeholder 不同于其他字段，通常手动修改的情况较少 */
    initialValue: '',
    setter: <I18nSetter placeholder={$i18n.get({ id: 'deepPleaseEnter', dm: '请输入' })} />,
    ...options,
  };
}

export function tips(options = {}) {
  const config = {
    toolbar1: 'bold | forecolor | link | variable',
  };

  return {
    name: 'tips',
    title: $i18n.get({ id: 'deepDescription', dm: '描述信息' }),
    display: 'inline',
    supportVariable: true,
    initialValue: {
      zh_CN: '',
      en_US: '',
      type: 'i18n',
    },
    setter: (
      <EditorSetter
        title={$i18n.get({ id: 'deepEditingDescription', dm: '编辑描述' })}
        config={config}
      />
    ),
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function size(options = {}) {
  return {
    name: 'size',
    title: $i18n.get({ id: 'deepSize.1', dm: '尺寸' }),
    display: 'inline',
    initialValue: 'medium',
    supportVariable: true,
    setter: (
      <ChoiceSetter
        options={[
          {
            title: $i18n.get({ id: 'deepSmall', dm: '小' }),
            value: 'small',
            tip: $i18n.get({ id: 'deepSmallSize', dm: '小号尺寸' }),
          },

          {
            title: $i18n.get({ id: 'deepIn', dm: '中' }),
            value: 'medium',
            tip: $i18n.get({ id: 'deepNormalSize', dm: '正常尺寸' }),
          },

          {
            title: $i18n.get({ id: 'deepBig', dm: '大' }),
            value: 'large',
            tip: $i18n.get({ id: 'deepLargeSize', dm: '大号尺寸' }),
          },
        ]}
        compact={false}
      />
    ),

    ...options,
  };
}

export function labelTipsType(options = {}, showCustomType = true) {
  const typeOptionValues = [
    {
      title: $i18n.get({ id: 'deepNo', dm: '无' }),
      value: 'none',
    },

    {
      title: $i18n.get({ id: 'deepText', dm: '文本' }),
      value: 'text',
    },
  ];

  if (showCustomType === true) {
    typeOptionValues.push({
      title: $i18n.get({ id: 'deepCustomize', dm: '自定义' }),
      value: 'render',
    });
  }

  return {
    name: 'labelTipsTypes',
    title: $i18n.get({ id: 'deepTitlePrompt', dm: '标题提示' }),
    display: 'inline',
    initialValue: 'none',
    setter: <ChoiceSetter options={typeOptionValues} compact={false} />,
    supportVariable: true,
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function labelTips(options = {}) {
  return {
    name: 'labelTips',
    title: $i18n.get({ id: 'deepTitlePrompt', dm: '标题提示' }),
    display: 'none',
    initialValue: '',
    ignore() {
      return !this.getValue();
    },
    accessor() {
      const type = this.getProps().getProp('labelTipsTypes').getValue();
      if (type === 'text') {
        return this.getProps().getProp('labelTipsText').getValue();
      } else if (type === 'render') {
        return this.getProps().getProp('labelTipsRender').getValue();
      } else if (type && type.type === 'JSExpression') {
        return type;
      }
      return '';
    },
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function labelTipsIcon(options = {}) {
  return {
    name: 'labelTipsIcon',
    title: $i18n.get({ id: 'deepTipsIcon', dm: '提示图标' }),
    display: 'inline',
    initialValue: '',
    hidden() {
      return this.getProps().getPropValue('labelTipsTypes') === 'none';
    },
    setter: <IconSetter />,
    supportVariable: true,
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function labelTipsText(options = {}) {
  return {
    name: 'labelTipsText',
    title: $i18n.get({ id: 'deepTipContent', dm: '提示内容' }),
    display: 'inline',
    initialValue: {
      type: 'i18n',
      zh_CN: '',
      en_US: '',
    },
    hidden() {
      return this.getProps().getPropValue('labelTipsTypes') !== 'text';
    },
    setter: <I18nSetter />,
    supportVariable: true,
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function labelTipsRender(options = {}) {
  return {
    name: 'labelTipsRender',
    title: $i18n.get({ id: 'deepTipContent', dm: '提示内容' }),
    display: 'inline',
    hidden() {
      return this.getProps().getPropValue('labelTipsTypes') !== 'render';
    },
    setter: (
      <ActionSetter
        defaultActionName="renderLabelTips"
        defaultCode={$i18n.get({
          id: 'deepFunctionRenderlabeltipsPrOPSReturn',
          dm: "function renderLabelTips(props) {\n  return '提示信息';\n}",
        })}
      />
    ),
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function iconSize() {
  return {
    name: 'iconSize',
    title: $i18n.get({ id: 'deepIconSize', dm: '图标大小' }),
    display: 'block',
    initialValue: 'medium',
    setter: (
      <ChoiceSetter
        options={[
          {
            title: 'xxs',
            value: 'xxs',
            tip: 'xxs',
          },

          {
            title: 'xs',
            value: 'xs',
            tip: 'xs',
          },

          {
            title: 'small',
            value: 'small',
            tip: 'small',
          },

          {
            title: 'medium',
            value: 'medium',
            tip: 'medium',
          },

          {
            title: 'large',
            value: 'large',
            tip: 'large',
          },

          {
            title: 'xl',
            value: 'xl',
            tip: 'xl',
          },

          {
            title: 'xxl',
            value: 'xxl',
            tip: 'xxl',
          },

          {
            title: 'xxxl',
            value: 'xxxl',
            tip: 'xxxl',
          },
        ]}
        compact={false}
      />
    ),
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
  };
}

export function labelColSpan(options = {}) {
  return {
    name: 'labelColSpan',
    title: $i18n.get({ id: 'deepTitleWidth', dm: '标题宽度' }),
    display: 'inline',
    tip: $i18n.get({ id: 'deepGeneration', dm: '1代表1/24' }),
    supportVariable: true,
    initialValue: 4,
    hidden() {
      return this.getProps().getPropValue('labelAlign') !== 'left';
    },
    setter: <NumberSetter />,
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function labelColOffset(options = {}) {
  return {
    name: 'labelColOffset',
    title: $i18n.get({ id: 'deepTitleOffset', dm: '标题偏移' }),
    display: 'inline',
    tip: $i18n.get({ id: 'deepGeneration', dm: '1代表1/24' }),
    initialValue: 0,
    supportVariable: true,
    hidden() {
      return this.getProps().getPropValue('labelAlign') !== 'left';
    },
    setter: <NumberSetter />,
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function wrapperColSpan(options = {}) {
  return {
    name: 'wrapperColSpan',
    title: $i18n.get({ id: 'deepContentWidth', dm: '内容宽度' }),
    display: 'inline',
    tip: $i18n.get({ id: 'deepGeneration', dm: '1代表1/24' }),
    initialValue: 0,
    supportVariable: true,
    hidden() {
      return this.getProps().getPropValue('labelAlign') === 'top';
    },
    setter: <NumberSetter />,
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function wrapperColOffset(options = {}) {
  return {
    name: 'wrapperColOffset',
    title: $i18n.get({ id: 'deepContentOffset', dm: '内容偏移' }),
    display: 'inline',
    tip: $i18n.get({ id: 'deepGeneration', dm: '1代表1/24' }),
    initialValue: 0,
    supportVariable: true,
    hidden() {
      return this.getProps().getPropValue('labelAlign') === 'top';
    },
    setter: <NumberSetter />,
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
    ...options,
  };
}

export function behavior(options = {}) {
  return {
    name: 'behavior',
    title: $i18n.get({ id: 'deepStatus', dm: '状态' }),
    display: 'inline',
    initialValue: 'NORMAL',
    supportVariable: true,
    tip: {
      content: $i18n.get({ id: 'deepClickToViewEnumeration', dm: '点击查看枚举值及api' }),
      url: tipUrls.behavior,
    },

    setter: (
      <ChoiceSetter
        options={[
          {
            title: $i18n.get({ id: 'deepOrdinary', dm: '普通' }),
            value: 'NORMAL',
          },

          {
            title: $i18n.get({ id: 'deepDisable', dm: '禁用' }),
            value: 'DISABLED',
          },

          {
            title: $i18n.get({ id: 'deepReadOnly', dm: '只读' }),
            value: 'READONLY',
          },

          {
            title: $i18n.get({ id: 'deepHide', dm: '隐藏' }),
            value: 'HIDDEN',
          },
        ]}
      />
    ),

    ...options,
  };
}

export function renderView(options = {}) {
  return {
    name: 'renderView',
    title: $i18n.get({ id: 'deepCustomRenderingReadite', dm: '定制渲染只读态' }),
    display: 'block',
    setter: (
      <ActionSetter
        defaultActionName="renderView"
        defaultCode={`function renderView(value, props) {
  return value;
}`}
      />
    ),
    ...options,
  };
}

export function advanced(uuidPrefix, eventsName, options = {}) {
  const items = [
    uuid(uuidPrefix),
    fieldName({
      disabled() {
        return this.getProps().getPropValue('dataEntryMode');
      },
    }),
    {
      name: 'dataEntryMode',
      title: '纯输入型组件模式',
      display:  window.pageConfig?.enableFieldDataEntryMode ? 'block' : 'none',
      initialValue: window.pageConfig?.fieldDataEntryMode || false,
      setter: <BoolSetter />,
    },
    renderView(),
    ...events(eventsName)];
  return {
    title: $i18n.get({ id: 'deepAdvanced', dm: '高级' }),
    type: 'group',
    display: 'accordion',
    collapsed: false,
    items,
    ...options,
  };
}

export function defaultValue(options = {}) {
  return {
    name: 'value',
    title: $i18n.get({ id: 'deepDefaults', dm: '默认值' }),
    display: 'inline',
    initialValue: '',
    supportVariable: true,
    setter: (
      <I18nSetter
        multiline={3}
        rows={3}
        placeholder={$i18n.get({ id: 'deepPleaseEnterTheDefault', dm: '请输入默认值' })}
      />
    ),
    ...options,
  };
}

// 这个属性暂时没在 Field 上开放，Field 单独使用默认自动校验，后续又需求可以开放这个选项
export function autoValidate(options = {}) {
  return {
    name: 'autoValidate',
    title: $i18n.get({ id: 'deepAutomaticVerification', dm: '自动校验' }),
    display: 'inline',
    tip: $i18n.get({
      id: 'deepWhenYouModifyThe',
      dm: '是否修改数据的时候就自动触发校验, 设为 false 后只能通过 validate() 来触发校验',
    }),
    initialValue: true,
    setter: <BoolSetter />,
    ...options,
  };
}

export function formCategory(type = '') {
  if (type === 'mediator') {
    return {
      name: '__useMediator',
      display: 'none',
      initialValue: 'value',
    };
  }

  return _formCategory();
}

export function validation(...args) {
  const result = _validation(...args);
  return {
    ...result,
    disabled() {
      return this.getProps().getPropValue('dataEntryMode');
    },
  }
}
