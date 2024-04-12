import {
  TextSetter,
  ActionSetter,
  BoolSetter,
  I18nSetter,
  NumberSetter,
  ChoiceSetter,
  ListSetter,
  SelectSetter,
  JsonSetter,
} from '@ali/visualengine-utils';
import { tableColumn, tableFilter, tableResize } from '../../common/tipUrls';
import $i18n from '../../i18n/index';

const getDescriptor = (name) => name;

export default {
  name: 'columns',
  title: $i18n.get({ id: 'deepDataColumn', dm: '数据列' }),
  tip: {
    content: $i18n.get({ id: 'deepClickViewDataFormat', dm: '点击 ? 查看数据格式' }),
    url: tableColumn,
  },

  initialValue: [
    {
      dataKey: 'name',
      title: {
        zh_CN: '姓名',
        en_US: 'Name',
        type: 'i18n',
      },

      width: 100,
      dataType: 'text',
    },

    {
      dataKey: 'entryDate',
      title: {
        zh_CN: '入职日期',
        en_US: 'Date',
        type: 'i18n',
      },

      dataType: 'timestamp',
      timeFormatter: 'YYYY-MM-DD',
      width: 180,
    },

    {
      dataKey: 'contractDate',
      title: {
        zh_CN: '合同日期',
        en_US: 'contractDate',
        type: 'i18n',
      },

      dataType: 'cascadeTimestamp',
      timeFormatter: 'YYYY-MM-DD',
      width: 200,
    },

    {
      dataKey: 'salary',
      title: {
        zh_CN: '月薪',
        en_US: 'salary',
        type: 'i18n',
      },

      dataType: 'money',
      width: 150,
    },
  ],

  required: false,
  display: 'accordion',
  setter: (
    <ListSetter
      descriptor={getDescriptor('title')}
      checkField={null}
      display="drawer"
      configure={[
        {
          name: 'title',
          title: $i18n.get({ id: 'deepTitle', dm: '标题' }),
          display: 'inline',
          initialValue: {
            zh_CN: '姓名',
            en_US: 'Name',
            type: 'i18n',
          },

          editable: true,
          setter: <I18nSetter />,
          supportVariable: true,
        },

        {
          name: 'dataKey',
          title: $i18n.get({ id: 'deepDataField', dm: '数据字段' }),
          display: 'inline',
          initialValue: 'name',
          editable: true,
          setter: <TextSetter />,
          supportVariable: true,
        },

        {
          name: 'dataType',
          title: $i18n.get({ id: 'deepTypeOfData', dm: '数据类型' }),
          display: 'inline',
          initialValue: 'text',
          setter: (
            <SelectSetter
              options={[
                { value: 'text', title: $i18n.get({ id: 'deepText', dm: '文本' }) },
                { value: 'link', title: $i18n.get({ id: 'deepLink', dm: '链接' }) },
                { value: 'file', title: $i18n.get({ id: 'deepAnnex', dm: '附件' }) },
                { value: 'image', title: $i18n.get({ id: 'deepImage', dm: '图片' }) },
                {
                  value: 'timestamp',
                  title: $i18n.get({
                    id: 'deepTimeOnlyForTimestamp',
                    dm: '时间（只适用于时间戳）',
                  }),
                },
                {
                  value: 'cascadeTimestamp',
                  title: $i18n.get({
                    id: 'deepTimeIntervalOnlyFor',
                    dm: '时间区间（只适用于时间戳）',
                  }),
                },
                { value: 'employee', title: $i18n.get({ id: 'deepEmployee', dm: '员工' }) },
                { value: 'money', title: $i18n.get({ id: 'deepAmount', dm: '金额' }) },
                { value: 'moneyRange', title: $i18n.get({ id: 'deepOverRange', dm: '金额区间' }) },
                { value: 'enum', title: $i18n.get({ id: 'deepEnumerate', dm: '枚举' }) },
                { value: 'custom', title: $i18n.get({ id: 'deepCustomize', dm: '自定义' }) },
              ]}
            />
          ),

          supportVariable: true,
        },

        {
          name: 'float',
          title: $i18n.get({
            id: 'deepImageFloatOnlyMobile',
            dm: '图片浮动(仅移动端卡片模式生效)',
          }),
          display: 'block',
          initialValue: '',
          setter: (
            <ChoiceSetter
              options={[
                { value: '', title: $i18n.get({ id: 'deepNotFloat', dm: '不浮动' }) },
                { value: 'left', title: '居左浮动' },
                { value: 'right', title: $i18n.get({ id: 'deepFloating', dm: '居右浮动' }) },
              ]}
            />
          ),

          supportVariable: true,
          disabled() {
            return this.parent.getParam('dataType').toData() !== 'image';
          },
        },

        {
          name: 'imageProps',
          title: $i18n.get({ id: 'deepPictureStyle', dm: '图片样式' }),
          display: 'block',
          setter: <JsonSetter />,
          disabled() {
            return this.parent.getParam('dataType').toData() !== 'image';
          },
        },

        {
          name: 'imageWrapProps',
          title: $i18n.get({ id: 'deepPictureContainerStyle', dm: '图片容器样式' }),
          display: 'block',
          setter: <JsonSetter />,
          disabled() {
            return this.parent.getParam('dataType').toData() !== 'image';
          },
        },

        {
          name: 'imageOnClick',
          title: $i18n.get({ id: 'deepPictureClickCallback', dm: '图片点击回调' }),
          display: 'block',
          setter: (
            <ActionSetter
              defaultActionName={'imageOnClick'}
              defaultCode={`
function onClick(e, column) {
  console.log(1213)
}
          `}
            />
          ),
          disabled() {
            return this.parent.getParam('dataType').toData() !== 'image';
          },
        },

        {
          name: 'enumBadgeType',
          title: $i18n.get({ id: 'deepEnumerationStyle', dm: '枚举样式' }),
          display: 'inline',
          tip: $i18n.get({
            id: 'deepTextColorByEnumeration',
            dm: '文字颜色由枚举数据的 color 决定，可选值 grey green black blue red orange',
          }),
          setter: (
            <SelectSetter
              options={[
                { value: '', title: $i18n.get({ id: 'deepPleaseChoose', dm: '请选择' }) },
                { value: 'color', title: $i18n.get({ id: 'deepTextColor', dm: '文字颜色' }) },
                {
                  value: 'background',
                  title: $i18n.get({ id: 'deepBackgroundColor', dm: '背景颜色' }),
                },
              ]}
            />
          ),

          initialValue: 'background',
          supportVariable: true,
          disabled() {
            return this.parent.getParam('dataType').toData() !== 'enum';
          },
        },

        {
          name: 'enumData',
          title: $i18n.get({ id: 'deepEnumerateData', dm: '枚举数据' }),
          display: 'inline',
          setter: <JsonSetter />,
          initialValue: [
            {
              text: $i18n.get({ id: 'deepNormal', dm: '正常' }),
              value: '1',
              color: 'blue',
            },

            {
              text: $i18n.get({ id: 'deepAbnormal', dm: '异常' }),
              value: '-1',
              color: 'red',
            },

            {
              text: $i18n.get({ id: 'deepUnknown', dm: '未知' }),
              value: '0',
              color: 'grey',
            },
          ],

          supportVariable: true,
          disabled() {
            return this.parent.getParam('dataType').toData() !== 'enum';
          },
        },

        {
          name: 'editType',
          title: $i18n.get({ id: 'deepEditingFormat', dm: '编辑格式' }),
          display: 'inline',
          initialValue: 'text',
          setter: (
            <SelectSetter
              options={[
                { value: 'text', title: $i18n.get({ id: 'deepText', dm: '文本' }) },
                { value: 'select', title: $i18n.get({ id: 'deepDropDown', dm: '下拉选择' }) },
                { value: 'radio', title: $i18n.get({ id: 'deepRadio', dm: '单选' }) },
                { value: 'date', title: $i18n.get({ id: 'deepTimeChoice', dm: '时间选择' }) },
                {
                  value: 'dateRange',
                  title: $i18n.get({ id: 'deepTimeIntervalSelection', dm: '时间区间选择' }),
                },
                { value: 'employee', title: $i18n.get({ id: 'deepEmployee', dm: '员工' }) },
                { value: 'custom', title: $i18n.get({ id: 'deepCustomize', dm: '自定义' }) },
              ]}
            />
          ),

          supportVariable: true,
        },

        {
          name: 'timeFormatter',
          title: $i18n.get({ id: 'deepTimeFormat', dm: '时间格式' }),
          display: 'inline',
          initialValue: 'YYYY-MM-DD HH:mm:ss',
          disabled() {
            const type = this.parent.getParam('dataType').toData();
            return type !== 'timestamp' && type !== 'cascadeTimestamp';
          },
          setter: (
            <SelectSetter
              options={[
                {
                  value: 'YYYY-MM-DD HH:mm:ss',
                  title: $i18n.get({ id: 'deepYearMonthDayScore', dm: '年-月-日 时:分:秒' }),
                },
                {
                  value: 'YYYY-MM-DD HH:mm',
                  title: $i18n.get({ id: 'deepYearMonthDayDivision', dm: '年-月-日 时:分' }),
                },
                {
                  value: 'YYYY-MM-DD',
                  title: $i18n.get({ id: 'deepYearMonthDay', dm: '年-月-日' }),
                },
                { value: 'YYYY-MM', title: $i18n.get({ id: 'deepYears', dm: '年-月' }) },
                { value: 'YYYY', title: $i18n.get({ id: 'deepYear', dm: '年' }) },
              ]}
            />
          ),

          supportVariable: true,
        },

        {
          name: 'width',
          title: $i18n.get({ id: 'deepWidth', dm: '宽度' }),
          display: 'inline',
          initialValue: 200,
          setter: (
            <NumberSetter
              units={[
                {
                  type: 'px',
                  list: true,
                },
                {
                  type: '%',
                  list: true,
                },
              ]}
            />
          ),

          supportVariable: true,
        },

        {
          name: 'align',
          title: $i18n.get({ id: 'deepAlignment', dm: '对齐方式' }),
          display: 'inline',
          initialValue: 'left',
          setter: (
            <ChoiceSetter
              options={[
                { value: 'left', title: $i18n.get({ id: 'deepResolve', dm: '居左' }) },
                { value: 'center', title: $i18n.get({ id: 'deepCenter', dm: '居中' }) },
                { value: 'right', title: $i18n.get({ id: 'deepLive', dm: '居右' }) },
              ]}
            />
          ),

          supportVariable: true,
        },

        {
          name: 'lock',
          title: $i18n.get({ id: 'deepColumnFixation', dm: '列固定' }),
          display: 'inline',
          initialValue: 'none',
          setter: (
            <ChoiceSetter
              options={[
                { value: 'none', title: $i18n.get({ id: 'deepNo', dm: '无' }) },
                { value: 'left', title: $i18n.get({ id: 'deepLeft', dm: '左' }) },
                { value: 'right', title: $i18n.get({ id: 'deepRight', dm: '右' }) },
              ]}
            />
          ),

          supportVariable: true,
        },

        {
          name: 'groupName',
          title: $i18n.get({ id: 'deepGroupTitle', dm: '分组标题' }),
          display: 'inline',
          initialValue: {
            zh_CN: '',
            en_US: '',
            type: 'i18n',
          },

          setter: <I18nSetter />,
          supportVariable: true,
        },

        {
          name: 'message',
          title: $i18n.get({ id: 'deepUserPrompt', dm: '用户提示' }),
          display: 'inline',
          initialValue: {
            zh_CN: '',
            en_US: '',
            type: 'i18n',
          },

          setter: <I18nSetter />,
          supportVariable: true,
        },

        {
          name: 'sortable',
          title: $i18n.get({ id: 'deepSort', dm: '显示排序' }),
          display: 'inline',
          initialValue: false,
          setter: <BoolSetter />,
          supportVariable: true,
        },

        {
          name: 'highlight',
          title: $i18n.get({ id: 'deepHighlight', dm: '突出显示' }),
          tip: $i18n.get({ id: 'deepOnlyMobileCardMode', dm: '仅移动端卡片模式下有效' }),
          display: 'inline',
          initialValue: false,
          setter: <BoolSetter />,
          supportVariable: true,
        },

        {
          name: 'hidden',
          title: $i18n.get({ id: 'deepWhetherHidden', dm: '是否隐藏' }),
          display: 'inline',
          initialValue: false,
          setter: <BoolSetter />,
          supportVariable: true,
        },

        {
          name: 'shouldRender',
          title: $i18n.get({ id: 'deepTableColumnShouldRender', dm: '是否渲染' }),
          tip: $i18n.get({
            id: 'deepTableColumnShouldRenderTip',
            dm: '和隐藏不同，此项置为 false 时该列配置将视为不存在，用于一些动态化列配置场景',
          }),
          display: 'inline',
          initialValue: true,
          setter: <BoolSetter />,
          supportVariable: true,
        },

        {
          name: 'resizable',
          title: $i18n.get({ id: 'deepColumnsWidthAdjustment', dm: '列宽调整' }),
          display: 'inline',
          initialValue: false,
          tip: {
            content: $i18n.get({
              id: 'deepEventsThatAreTriggered',
              dm: '必须与 宽度 重设列尺寸的时候触发的事件 搭配使用，详情请点击查看',
            }),
            url: tableResize,
          },

          setter: <BoolSetter />,
          supportVariable: true,
        },

        {
          name: 'titleRender',
          title: $i18n.get({ id: 'deepTitleCustomRendering', dm: '标题定制渲染' }),
          display: 'accordion',
          setter: (
            <ActionSetter
              defaultCode={$i18n.get({
                id: 'deepTableColumnsTitleCustom',
                dm: '/**\n * 表格列标题自定义渲染\n * @param title 标题\n */\nfunction renderTitle(title) {\n  return <span>{title}</span>;\n}',
              })}
              defaultActionName="renderTitle"
            />
          ),
        },

        {
          name: 'render',
          title: $i18n.get({ id: 'deepContentCustomRendering', dm: '内容定制渲染' }),
          display: 'accordion',
          setter: (
            <ActionSetter
              defaultCode={$i18n.get({
                id: 'deepTableColumnCustomRendering',
                dm: '/**\n * 表格列自定义渲染\n * @param value 当前列的数据\n * @param index 当前行所在的行号\n * @param rowData 当前行的数据\n */\nfunction renderCell(value, index, rowData) {\n  return <span>{value}</span>;\n}',
              })}
              defaultActionName="renderCell"
            />
          ),

          hidden() {
            const dataType = this.parent.getParam('dataType').toData();
            return dataType !== 'custom';
          },
        },

        {
          name: 'canEdit',
          title: $i18n.get({ id: 'deepCanYouEdit', dm: '是否可以编辑' }),
          display: 'block',
          supportVariable: true,
          setter: (
            <ActionSetter
              defaultCode={$i18n.get({
                id: 'deepDoYouEditParam',
                dm: '/**\n * 表格列是否可以编辑\n * @param rowData 当前行的数据\n */\nfunction cellCanEdit(rowData) {\n  return <span>{value}</span>;\n}',
              })}
              defaultActionName="cellCanEdit"
            />
          ),
        },

        {
          name: 'renderField',
          title: $i18n.get({ id: 'deepEditingCustomRendering', dm: '编辑态定制渲染' }),
          display: 'accordion',
          setter: (
            <ActionSetter
              defaultCode={$i18n.get({
                id: 'deepTableColumnEditingState',
                dm: '/**\n * 表格列编辑态自定义渲染\n * @param props 表单属性\n * @param value 当前 Cell 的值\n * @param rowData 当前行的数据\n */\nfunction renderCell(props, value, rowData) {\n  return <input defaultValue={value} {...props} />;\n}',
              })}
              defaultActionName="renderField"
            />
          ),
        },

        {
          name: 'editProps',
          title: $i18n.get({ id: 'deepEditConfiguration', dm: '编辑配置' }),
          display: 'accordion',
          initialValue: {
            placeholder: '',
            rules: [],
          },

          setter: <JsonSetter />,
        },

        {
          name: 'filters',
          title: $i18n.get({ id: 'deepGenerateAFilteringMenu', dm: '生成过滤的菜单' }),
          display: 'accordion',
          tip: {
            content: $i18n.get({
              id: 'deepTheFormatIsJSON',
              dm: '格式为json[{"label":"xxx", "value":"xxx"}],详情点击查看',
            }),
            url: tableFilter,
          },

          supportVariable: true,
          initialValue: '',
          setter: <TextSetter row={2} />,
        },

        {
          name: 'filterMode',
          title: $i18n.get({ id: 'deepFilterMode', dm: '过滤模式' }),
          display: 'block',
          initialValue: 'multiple',
          supportVariable: true,
          setter: (
            <ChoiceSetter
              options={[
                { value: 'multiple', title: $i18n.get({ id: 'deepMultipleChoice', dm: '多选' }) },
                { value: 'single', title: $i18n.get({ id: 'deepRadio', dm: '单选' }) },
              ]}
            />
          ),
        },
      ]}
    />
  ),

  supportVariable: true,
};
