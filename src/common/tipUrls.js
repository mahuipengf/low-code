// 所有外链的集合，防止以后有新的外链修改等情况

const defaultUrls = {
  attachmentValue: 'https://go.alibaba-inc.com/help3/vc-attachment-field#data',
  selectValue: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?corpId=dingd8e1123006514592&utm_medium=im_card&iframeQuery=utm_medium%3Dim_card%26anchorId%3Dlam5f1bb07nnxu8gmfvr%26utm_source%3Dim&utm_source=im',
  selectDoc: 'https://go.alibaba-inc.com/help3/vc-select-field',
  selectDataSource: 'https://alidocs.dingtalk.com/i/nodes/OmLa2Gg0l5BW73MQdBjwWvQAdYbnKEek',
  tagDataSource: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam5j4vsjjxu9m8bsw',
  imageFieldValue: 'https://go.alibaba-inc.com/help3/vc-image-field#data',
  imageFieldDoc: 'https://go.alibaba-inc.com/help3/vc-image-field',
  imageFieldUrl: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam5k7pgw2ui7tqy0aa',
  moneyCurrencyOptions: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam5mm1hwy76vo55vi',
  moneyValue: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam5n16ctoika1tkk1b',
  behavior: 'https://go.alibaba-inc.com/help3/API#setBehavior',
  attachmentDoc: 'https://go.alibaba-inc.com/help3/vc-attachment-field',
  balloonDoc: 'https://go.alibaba-inc.com/help3/vc-balloon',
  breadcrumbDoc: 'https://go.alibaba-inc.com/help3/vc-breadcrumb',
  buttonDoc: 'https://go.alibaba-inc.com/help3/vc-button',
  buttonGroupDoc: 'http://gitlab.alibaba-inc.com/vision-components/vc-button-group/blob/master/README.md',
  calendarDoc: 'https://go.alibaba-inc.com/help3/vc-calendar',
  calendarDateCellRender: 'https://fusion-demo.alibaba-inc.com/demos/next/calendar#calendar-2',
  calendarMonthCellRender: 'https://fusion-demo.alibaba-inc.com/demos/next/calendar#calendar-2',
  calendarDisableDate: 'https://fusion-demo.alibaba-inc.com/demos/next/calendar#calendar-4',
  cardDoc: 'https://go.alibaba-inc.com/help3/vc-card',
  cascadeDateDoc: 'https://go.alibaba-inc.com/help3/vc-cascade-date-field',
  cascadeDateDisabledDate: 'http://fusion-demo.alibaba-inc.com/demos/next/date-picker#demo-api',
  cascadeSelectDoc: 'https://go.alibaba-inc.com/help3/vc-cascade-select-field',
  cascadeSelectIsLoadData: 'https://fusion-demo.alibaba-inc.com/demos/next/cascader#cascader-2',
  cascaderDoc: 'http://gitlab.alibaba-inc.com/vision-components/vc-fusion-cascader/blob/master/README.md',
  cascaderDataSource: 'https://fusion-demo.alibaba-inc.com/demos/next/cascader-select',
  cascaderValue: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam5serbzhgmts9psva',
  checkboxDoc: 'https://go.alibaba-inc.com/help3/vc-checkbox-field',
  citySelectValue: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam5serbzhgmts9psva',
  citySelectData: 'https://done.alibaba-inc.com/dsm/deep/components/detail/%40ali%2Fdeep-city-select-field?themeid=97&tabActiveKey=component',
  collapseDoc: 'https://go.alibaba-inc.com/help3/vc-collapse',
  columnsLayoutDoc: 'https://go.alibaba-inc.com/help3/vc-columns-layout',
  dateDoc: 'https://go.alibaba-inc.com/help3/vc-date-field',
  daysDoc: 'https://go.alibaba-inc.com/help3/vc-days-field',
  dialogDoc: 'https://go.alibaba-inc.com/help3/vc-dialog',
  drawerDoc: 'https://go.alibaba-inc.com/help3/vc-drawer',
  overlayAlign: 'https://done.alibaba-inc.com/dsm/deep/components/detail/overlay?themeid=97&tabActiveKey=component#align-container',
  editableTagDoc: 'http://gitlab.alibaba-inc.com/vision-components/vc-editable-tag/blob/master/README.md',
  editorDoc: 'https://go.alibaba-inc.com/help3/vc-editor-field',
  editorUploadConfig: 'https://github.com/uxcore/uxcore-tinymce#图片上传配置',
  employeeDoc: 'https://go.alibaba-inc.com/help3/vc-employee-field',
  employeeUrl: 'https://alidocs.dingtalk.com/i/nodes/4Pko7gla1mAWRe4RXE7K8Bxz5qZY9Q6j',
  employeeAmdpMode: 'https://mc-fusion.alibaba-inc.com/unpkg/@ali/deep-employee-search@2.2.1/build/index.html?theme=@alife/theme-97@1.23.1#user-content-amdp-%E6%A8%A1%E5%BC%8F',
  filterDataSource: 'https://alidocs.dingtalk.com/i/nodes/OmLa2Gg0l5BW73MQdBjwWvQAdYbnKEek',
  filterDoc: 'https://go.alibaba-inc.com/help3/vc-filter',
  filter2Doc: 'https://go.alibaba-inc.com/help3/vc-filter',
  floatNavDoc: 'http://gitlab.alibaba-inc.com/vision-components/vc-fusion-float-nav/blob/master/README.md',
  formDoc: 'https://go.alibaba-inc.com/help3/vc-form',
  formDataSource: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam5yjrq7bn3387hfhc',
  fieldApi: 'https://done.alibaba-inc.com/dsm/deep/components/detail/field?themeid=97&tabActiveKey=component#demo-api',
  illustrationDoc: 'https://go.alibaba-inc.com/help3/vc-illustration',
  menuDoc: 'https://go.alibaba-inc.com/help3/vc-menu',
  menuDataSource: 'https://fusion.alibaba-inc.com/dsm/pc/components/detail/menu?themeid=40463',
  messageDoc: 'https://go.alibaba-inc.com/help3/vc-message',
  numberDoc: 'https://go.alibaba-inc.com/help3/vc-number-field',
  paginationDoc: 'https://go.alibaba-inc.com/help3/vc-pagination',
  pickableDataSource: 'https://alidocs.dingtalk.com/i/nodes/OmLa2Gg0l5BW73MQdBjwWvQAdYbnKEek',
  progressDoc: 'https://go.alibaba-inc.com/help3/vc-progress',
  radioDoc: 'https://go.alibaba-inc.com/help3/vc-radio-field',
  radioDataSource: 'https://alidocs.dingtalk.com/i/nodes/OmLa2Gg0l5BW73MQdBjwWvQAdYbnKEek',
  rangeMarks: 'https://done.alibaba-inc.com/dsm/deep/components/detail/range?themeid=97&tabActiveKey=component#marks-container',
  rangeFixedWidth: 'https://done.alibaba-inc.com/dsm/deep/components/detail/range?themeid=97&tabActiveKey=component#control-container',
  rateDoc: 'https://go.alibaba-inc.com/help3/vc-rate-field',
  richTextDoc: 'https://go.alibaba-inc.com/help3/vc-rich-text',
  searchDoc: 'https://go.alibaba-inc.com/help3/vc-search',
  sliderDoc: 'https://go.alibaba-inc.com/help3/vc-slider',
  sliderImages: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam61n22p2f6agqhead',
  stateBarDoc: 'https://go.alibaba-inc.com/help3/vc-state-bar',
  stepsDoc: 'https://go.alibaba-inc.com/help3/vc-steps',
  stepsDataSource: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam6561ipvtypnnitdn',
  switchDoc: 'https://go.alibaba-inc.com/help3/vc-switch-field',
  tableFieldDoc: 'https://go.alibaba-inc.com/help3/vc-table-field',
  tableFieldValue: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam66t3z3s392zaic05',
  tableDoc: 'https://go.alibaba-inc.com/help3/vc-table',
  tableApi: 'https://done.alibaba-inc.com/dsm/deep/components/detail/table?themeid=97&tabActiveKey=component#demo-api',
  tableColumn: 'https://alidocs.dingtalk.com/i/nodes/QjXmLRyz4G5VGRYNrvl0WZpaD19v6NK2?iframeQuery=anchorId%3Dlam69zmevnjg25h5z1',
  tableResize: 'https://done.alibaba-inc.com/dsm/deep/components/detail/table?themeid=97&tabActiveKey=component#resize-container',
  tableFilter: 'https://done.alibaba-inc.com/dsm/deep/components/detail/table?themeid=97&tabActiveKey=component#filterSort-container',
  tableExpand: 'https://done.alibaba-inc.com/dsm/deep/components/detail/table?themeid=97&tabActiveKey=component#expanded-container',
  tableTheme: 'https://alidocs.dingtalk.com/i/nodes/QjXmLRyz4G5VGRYNrvl0WZpaD19v6NK2?iframeQuery=anchorId%3Dlam6af08bb6nm1jgyi',
  tabsLayoutDoc: 'https://go.alibaba-inc.com/help3/vc-tabs-layout',
  tabsLayoutItems: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam6bukrgwjn210bndv',
  textFieldDoc: 'https://go.alibaba-inc.com/help3/vc-text-field',
  timeDoc: 'https://go.alibaba-inc.com/help3/vc-time-field',
  timeDisabled: 'https://done.alibaba-inc.com/dsm/deep/components/detail/timepicker?themeid=97&tabActiveKey=component#disabled-container',
  timelineDoc: 'https://go.alibaba-inc.com/help3/vc-timeline',
  timelineDataSource: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam6f2vmgxfrll9z0oj',
  titleDoc: 'https://go.alibaba-inc.com/help3/vc-title',
  anchor: 'https://yuque.antfin-inc.com/legao/help/irw48k',
  transferDoc: 'https://go.alibaba-inc.com/help3/vc-transfer-field',
  treeDoc: 'https://go.alibaba-inc.com/help3/vc-tree',
  treeDraggable: 'https://done.alibaba-inc.com/dsm/deep/components/detail/tree?themeid=97&tabActiveKey=component#draggable-container',
  treeIsLoadData: 'https://done.alibaba-inc.com/dsm/deep/components/detail/tree?themeid=97&tabActiveKey=component#dynamic-container',
  treeSelectDoc: 'https://go.alibaba-inc.com/help3/vc-tree-select-field',
  treeSelectDataSource: 'https://alidocs.dingtalk.com/i/nodes/qXomz1wAyjKVXOjxqlPPW3Y9pRBx5OrE?iframeQuery=anchorId%3Dlam6l5id5hzfq577ue',
}

module.exports = defaultUrls;
