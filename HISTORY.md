## 2.18.22 / 2023-03-27 14:08:26 

* feat: table column 支持 shouldRender 配置 & 去除表单 placeholder 字段的默认值  


## 2.18.21 / 2023-03-18 12:00:34 

* feat: release 2.18.21  


## 2.18.20 / 2023-03-09 17:29:58 

* fix: TabsLayout prototype 与组件实际 api 不一致  


## 2.18.19 / 2023-03-02 15:36:58 

* feat: 进度组件支持自定义文字内容  


## 2.18.18 / 2023-03-01 14:48:11 

* feat: Select 增加一行显示配置  


## 2.18.17 / 2023-02-02 14:17:49 

* feat: 删除 editorField snippet 里的 formatResult 等三个函数的默认值, 适配引擎的新变化  


## 2.18.16 / 2023-01-30 14:44:25 

* feat: vc-filter2 支持 onAdvanceSearchVisibleChange  


## 2.18.15 / 2023-01-19 14:35:49 

* feat: textField 支持 addonTextBefore & addonTextAfter  


## 2.18.14 / 2023-01-10

* fix: drawer 浏览器高度计算发生变化导致多出 1px
* feat: NumberField 支持 stringMode

## 2.18.13 / 2022-11-18 15:44:50 

* feat: 修改语雀链接为钉钉文档  


## 2.18.12 / 2022-11-16 16:48:13 

* feat: Slider 支持 defaultActiveIndex  


## 2.18.11 / 2022-10-25 14:35:53 

* fix: 修复一些 React warning  


## 2.18.10 / 2022-10-24 11:16:07 

* feat: pageSection 支持折叠时不卸载内容  


## 2.18.9 / 2022-10-18 09:56:27 

* feat: TabsLayout 兼容多种表达式结构  


## 2.18.8 / 2022-10-13 17:37:14 

* fix: 链接替换有些引用不对  


## 2.18.7 / 2022-10-13 16:46:12 

* refactor: 所有外链统一管理  


## 2.18.6 / 2022-10-12 10:00:19 

* feat: 明细四个显示属性支持配置变量  


## 2.18.5 / 2022-10-11 10:31:35 

* feat: 明细操作列支持变量绑定 & 修改一些不正确的国际化文案  


## 2.18.4 / 2022-09-20 09:56:20 

* feat: page-section 支持 collapsed 属性  


## 2.18.3

* feat: button onClick 传递 e
* feat: tree 支持 filterTreeNode  配置
* fix: 适配引擎,修复label 联动问题
* fix: 修复 cascade select prototype 中的 typo
* feat: switch 开启和关闭文本支持变量绑定
* feat: select 新增 hiddenSelected 

## 2.18.2 / 2022-08-19 16:34:53 

* feat: 空发版本用于更新底层的 deep-form-helper  


## 2.18.1 / 2022-08-17 14:12:31 

* fix: drawer 寻找 container 错误  


## 2.18.0 / 2022-08-04 15:51:09 

* feat: 跟进 deep 1.41.x  


## 2.17.19 / 2022-08-01 10:02:33 

* feat: filter 的 config item 禁止拖动  


## 2.17.18 / 2022-07-29 20:08:34 

* feat: filter2 支持 onChange  


## 2.17.17 / 2022-07-27 14:22:26 

* feat: 更新 page-section 的引入方式  


## 2.17.16 / 2022-07-26
* fix: drawer 卸载时没有恢复 container style
* feat: drawer 适配 eone-shell
* feat: stateBar 属性支持变量
* feat: crumbs 属性支持变量


## 2.17.15 / 2022-07-22 20:42:39 

* feat: cascadeSelect 支持 valueRender  


## 2.17.14 / 2022-07-22 16:56:12 

* fix: 样式顺序问题  


## 2.17.13 / 2022-07-18

* feat: dialog 适配 eone-shell
* feat: 上传组件增加上传文件夹配置

## 2.17.12 / 2022-07-05 20:31:32 

* feat: CascadeSelect onSearch & fix some i18n key typo  


## 2.17.11 / 2022-07-05 19:05:02 

* feat: TreeSelectField 新属性 tagInline  


## 2.17.10 / 2022-07-05 17:10:52 

* feat: table 新属性 useStickyLock  


## 2.17.9 / 2022-06-28 16:40:25 

* fix: 适配 React16 PropTypes  


## 2.17.8 / 2022-05-06 10:17:39 

* fix:  dialog fixStyle 不关心具体的 container 值  


## 2.17.7 / 2022-04-21

* fix: 获取 pagination 下的子属性写法有误
* feat: page-section 添加 behavior 配置

## 2.17.6 / 2022-04-08

* feat: treeSelect treeDefaultExpandedKeys 支持绑定变量
* feat: treeSelectField hasClear 支持绑定变量
* feat: 修改 imageField formatter 的默认值
* fix: 修复卡片文案
* feat: 图片上传列表类似为 normal 时,支持显示操作图标
* feat: 图片上传显示操作图标时，支持下载图标是否隐藏

## 2.17.5 / 2022-03-24

* feat: calender defaultValue 发生变化时 UI 可以自动更新
* feat: dateField 支持配置 footRender
* docs: 修改 AttachmentField ImageField 的数据文档链接
* fix: 样式丢失问题

## 2.17.4 / 2022-03-08 19:49:27 

* feat: TreeSelect 支持配置 preserveNonExistentValue 参数  


## 2.17.3 / 2022-03-01 10:32:33 

* fix: 修复组件的一些响应式问题  


## 2.17.2 / 2022-02-25 10:04:27 

* refactor: 优化操作列默认callback 显示  


## 2.17.1
* feat: `dropdown/balloon` 支持根据fieldId 生成wrapperClassName,用于样式自定义
* feat: `Tree` 支持配置 labelRender

## 2.17.0

* feat: 跟进 deep 1.40.0
* feat: `Dialog` 支持配置 cancelProps

## 2.16.1

* fix: `Table` 修复 customBarItem 配置无效的问题
* feat: `selectField` 支持 itemRender
* fix: `EditableTag` 相关问题 aone issue https://aone.alibaba-inc.com/v2/project/1078114/req/38331234
* feat: `CitySelectField` 支持配置 dataUrl & useRaw

## 2.16.0 / 2021-12-06 16:41:07 

* feat: 跟进 deep 1.39.0  


## 2.15.32
* feat: pageSection 支持显示折叠按钮

## 2.15.31 / 2021-11-25

* feat: tabs 增加 traceCode 配置

## 2.15.30 / 2021-11-22 10:47:37 

* feat: columns-layout 支持移动端横排  


## 2.15.29 / 2021-11-02 17:04:52 

* feat: vc-steps 支持 item.itemRender 传递  


## 2.15.27 / 2021-11-02 16:16:20 

* feat: balloon content 支持绑定变量  


## 2.15.26 / 2021-11-01 11:31:40 

* feat: vc-filter2 支持显示底部分割线  


## 2.15.25 / 2021-10-12

* feat: tree 增加 renderChildNodes 配置
* fix: drawer 没有 title 的时候关闭按钮不生效

## 2.15.24 / 2021-09-22 11:20:43 

* fix:  由于乐高主题的特殊性，锁定 deep 版本到 y 位 
* feat: 表单通用支持 dataEntryMode


## 2.15.23 / 2021-09-11

* fix: dart sass 1.40.0 引入的 sass 构建问题
* fix: vc-table-pc 绑定 cellProps 再解绑后报错

## 2.15.22 / 2021-09-10 15:05:38 

* fix: prototype.design 少引 $i18n 导致报错  


## 2.15.21

* fix: vc-dialog 手动 reset container style，导致 overlay 自身的 reset 机制失效
* feat: vc-date-field 开放周视图
* feat: vc-employee-field 支持 amdp 模式

## 2.15.20

* fix: vc-city-select-field, vc-number-field, vc-time-field, vc-transfer-field, vc-rate-field value 的 setter 设置不对，没有覆盖默认配置。
* fix: vc-filter2 错误的 subtreeModified 导致 schema 错误
* fix: vc-columns-layout 过滤子节点导致的 subTreeModified 事件

## 2.15.19

* fix: vc-checkbox 设计态样式不生效
* fix: vc-tabs-layout customKey 增加 tip
* fix: vc-balloon 设计态 trigger 内容为空时不显示占位

## 2.15.18 / 2021-07-29 11:35:53 

* fix: deep 依赖  


## 2.15.17 / 2021-07-15 16:17:07 

* fix: 布局组件 device 设置  


## 2.15.16 / 2021-07-07 22:09:59 

* fix: vc-table 多级表头  


## 2.15.15 / 2021-07-02 14:49:20 

* feat: table stickHeader支持 自定义监听滚动容器  


## 2.15.14 / 2021-06-24 19:40:51 

* feat: icon 居右调整  


## 2.15.13 / 2021-06-17 20:01:26 

* fix: tabs & dialog 样式不设置不生效  


## 2.15.12 / 2021-06-11 11:12:35 

* fix: fix done select组件使用  


## 2.15.10 / 2021-05-21 16:52:36 

* fix: fix Column 兼容 引擎7.2.10 版本, child 为 null  


## 2.15.9 / 2021-05-17 16:54:37 

* feat: table 支持 size & tab 支持 traceable  


## 2.15.8 / 2021-05-13 19:06:06 

* fix: tabs-items-variable  


## 2.15.7 / 2021-04-28 17:22:45 

* fix: feat: 表单 upload 新属性配置  


## 2.15.6 / 2021-04-21 17:20:03 

* fix: vc-table打包出错  


## 2.15.5 / 2021-04-20 20:34:13 

* fix: table 通栏 等 fix  


## 2.15.4 / 2021-03-13 18:17:23 

* fix: fix employ hasClear  


## 2.15.3 / 2021-03-12 09:51:14 

* fix: table-field 设置面板报错  


## 2.15.2 / 2021-03-02 10:06:05 

* feat: style2  


## 2.15.0 / 2021-02-23 10:26:50 

* feat:   


## 2.14.4 / 2021-02-03 19:27:03 

* fix: 调整查询命名  


## 2.14.3 / 2021-01-21 16:35:14 

* fix: 修复遗漏card样式问题  


## 2.14.2 / 2021-01-21 11:13:44 

* feat: 开放下拉选择清楚按钮配置  


## 2.14.1 / 2021-01-19 10:41:53 

* feat: 布局组件禁用四角拖拽按钮  


## 2.14.0 / 2021-01-12 17:59:14 

* feat: support for i18n  


## 2.13.4 / 2020-12-24 17:52:00 

* fix: vc-image 组件的webb功能存在问题，暂时禁用  


## 2.13.3 / 2020-12-17 20:51:16 

* fix: 修复扩展配置点击报错  


## 2.13.2 / 2020-12-07 16:32:27 

* feat: editableTag新增noPadding参数  


## 2.13.1 / 2020-12-03 10:50:26 

* fix: 修复评分组件默认值错误  


## 2.13.0 / 2020-12-01 14:32:03 

* feat: TextField新增useI18nInput参数  


## 2.12.12 / 2020-11-19 11:42:22 

* feat: 按钮组单个按钮支持设置隐藏状态（满足变量控制场景）  


## 2.12.11 / 2020-11-18 14:37:34 

* fix: 去除浮动导航组件中存在的主题变量引用  


## 2.12.10 / 2020-11-18 11:30:27 

* fix: 去除float-nav中js里的样式引入  


## 2.12.9 / 2020-11-09 20:11:33 

* fix: filter2 field.toData error  


## 2.12.8 / 2020-10-30 15:21:30 

* fix:   


## 2.12.7 / 2020-10-30 14:29:27 

* feat: 设计师模式下setter优化  


## 2.12.6 / 2020-10-21 19:52:25 

* fix: 查询组件删除bug  


## 2.12.5 / 2020-10-20 11:44:54 

* fix: 修复组件复制时id异常问题  


## 2.12.4 / 2020-10-20 11:43:18 

* fix: 修复初始值异常问题  


## 2.12.3 / 2020-10-20 10:28:30 

* fix: 修复缺省组件在设计态下的链接bug  


## 2.12.2 / 2020-10-16 18:18:43 

* feat: illustration 支持二维码引导模式  


## 2.12.1 / 2020-10-13 16:57:32 

* fix: 修复缺省组件在设计器中存在一个默认link，当点击时会嵌套乐高页面的问题  


## 2.12.0 / 2020-10-13 16:18:47 

* fix: deep升级到1.35  


## 2.11.2 / 2020-10-13 15:10:45 

* fix: 补上@ali/ve-utils依赖  


## 2.11.1 / 2020-09-30 12:33:45 

* fix: 修复radioField中的labeltips变量绑定失效问题  


## 2.11.0 / 2020-09-25 11:30:30 

* feat: 新增设计师模式  


## 2.10.5 / 2020-09-23 11:33:00 

* fix: 修复明细组件下级联多选标题不展示的bug  


## 2.10.4 / 2020-09-21 10:44:45 

* fix: 调整所有i18nSetter的initialValue格式  


## 2.10.3 / 2020-09-18 18:16:12 

* fix: tab默认选中功能有问题，回滚  


## 2.10.2 / 2020-09-18 15:51:15 

* fix:   


## 2.10.1 / 2020-09-18 14:28:33 

* feat: export splitButton  


## 2.10.0 / 2020-09-17 15:57:53 

* feat: tablefield新增按钮位置配置  


## 2.9.3 / 2020-09-16 19:29:28 

* feat: 多行文本支持计数器和最大字符数配置  


## 2.9.2 / 2020-09-15 16:34:41 

* feat: tab支持默认选中配置  


## 2.9.1 / 2020-09-14 10:42:46 

* feat:   


## 2.9.0 / 2020-09-10 20:03:11 

* feat: 新增页面卡片组件；deep更新至1.34.x；  


## 2.8.3 / 2020-09-08 17:40:51 

* feat: deep 升级到1.33.2  


## 2.8.2 / 2020-09-08 15:12:18 

* fix: 修复tab组件在slot模式下的异常  


## 2.8.1 / 2020-09-08 11:40:44 

* feat: 新增级联选择部分属性的变量支持  


## 2.8.0 / 2020-09-07 17:59:35 

* feat: 搜人组件升级；级联组件bugfix  


## 2.7.7 / 2020-09-04 12:22:14 

* fix: 修复搜人组件只读态样式问题  


## 2.7.6 / 2020-09-03 10:00:27 

* fix: tab 修复items变量绑定失效问题  


## 2.7.5 / 2020-09-02 20:54:36 

* feat: add new compponent state-bar  


## 2.7.4 / 2020-09-02 19:25:45 

* feat: select支持参数useDetailValue  


## 2.7.3 / 2020-09-02 15:43:52 

* feat: `TableField`:修复明细组件的校验失效问题；`Filter`：修复异常删除时可能存在的报错现象；`AttachmentField`:只读模式下新增预览和下载按钮  


## 2.7.2 / 2020-09-01 16:27:30 

* feat: cascadeSelectFeild新增loadData参数  


## 2.7.1 / 2020-08-28 15:06:58 

* fix: tab 修复变量模式失效问题；columns修复报错问题  


## 2.7.0 / 2020-08-27 16:04:41 

* feat: - [NumberField] `feat` 新增innerBefore属性支持 - [EditorField] `feat` 新增编辑器中图片上传时配置请求头的能力  


## 2.6.0 / 2020-08-24 17:21:45 

* feat:   


## 2.5.7 / 2020-08-19 17:20:23 

* feat: city-select-filed:支持任意级选择；calendar:修复NAN问题；filter2:修复设计器模式下隐藏表单项会占位的问题  


## 2.5.6 / 2020-08-17 10:17:06 

* feat: drawer新增afterOpen和afterClose回调  


## 2.5.5 / 2020-08-14 18:10:54 

* fix: 单个tab项时无法渲染  


## 2.5.4 / 2020-08-14 10:09:52 

* feat: dialog新增表单自动聚焦开关;cascadeSelectField新增listStyle自定义下拉浮层宽度能力  


## 2.5.3 / 2020-08-13 16:55:38 

* fix: 搜索框双端适配；表单提交默认模板修改  


## 2.5.2 / 2020-08-11 15:37:58 

* feat: 变更filter2中标签隔离开关的默认值  


## 2.5.1 / 2020-08-10 12:08:32 

* fix: events property fix  


## 2.5.0 / 2020-08-07 18:43:54
  
  [vc-shell]: feat 支持新增更多国际化语言切换支持；fix 修复头像大小问题
  [vc-div]：feat 容器支持绑定自定义class
  [vc-table]：feat 表格数据字段支持下钻获取；
  [vc-employee-filed]：fix 自动请求可关闭；
  [vc-image]: feat 支持大小缩放；样式面板配置优化；
  [vc-filter]：change 按钮对齐优化；change 增加过时标签
  [vc-filter2]: new 新增查询组件，将替换vc-filter；
  [vc-slider]: change 移动端展示优化


## 2.4.2 / 2020-07-29 20:48:47 

* fix: 升级deep，修复国际化配置key值冲突问题  


## 2.3.13 / 2020-07-28 15:15:29 

* fix: filter 调整文案；搜人组件修复自动请求配置失效  


## 2.3.12 / 2020-07-21 15:19:36 

* fix: 修复tab被删完items时设计器出现报错的bug  


## 2.3.11 / 2020-07-16 18:39:49 

* feat: 支持国际化配置  


## 2.3.10 / 2020-07-07 17:14:27 

* feat: transfer-field support sortable  


## 2.3.9 / 2020-07-07 16:19:47 

* feat: dialog支持style  


## 2.3.8 / 2020-07-02 15:07:03 

* feat: 新增vc-shell同步发布功能  


## 2.3.7 / 2020-06-23 17:06:56 

* feat: radio & checkbox add new prop iconPosition  


## 2.3.6 / 2020-06-22 21:14:50 

* fix: 级联透出清除按钮  


## 2.3.5 / 2020-06-19 17:38:13 

* fix: tab support defaultActiveKey  


## 2.3.4 / 2020-06-17 13:47:36 

* fix: fix a require bug  


## 2.3.3 / 2020-06-17 13:35:42 

* feat: fix range-field & menu bug in new engine  


## 2.3.2 / 2020-06-11 15:46:49 

* feat: cascade-select add new prop changeOnSelect  


## 2.3.1 / 2020-06-04 14:21:38 

* feat: add new prop onColumnsChange  


## 2.3.0 / 2020-06-02 19:48:35 

* feat: 新增tag组件；新增slider自定义模式；新增单选和多选的移动端drawer适配  


## 2.2.6 / 2020-05-26 20:44:20 

* fix: 大屏幕下dialog无法内部滚动  


## 2.2.5 / 2020-05-22 10:54:06 

* fix: 修复message可被拖入组件的问题  


## 2.2.4 / 2020-05-19 22:40:50 

* fix: override select icon size  


## 2.2.3 / 2020-05-19 16:01:12 

* fix: override select icon size;change default switch width   


## 2.2.2 / 2020-05-15 09:48:20 

* fix: fix editor-field style bug  


## 2.2.0 / 2020-05-08 20:24:32 

* feat: dialog add onOpen & afterOpen callback  


## 2.1.19 / 2020-05-07 21:12:25 

* fix: fix step dataSource  


## 2.1.18 / 2020-05-07 20:26:36 

* fix:   


## 2.1.17 / 2020-05-07 15:07:50 

* fix: fix fusion date picker setter style  


## 2.1.16 / 2020-05-07 14:27:21 

* fix: fix fusion date setter  


## 2.1.15 / 2020-05-05 10:28:28 

* fix: fix a number-field prototype bug  


## 2.1.14 / 2020-05-01 16:05:24 

* fix: fix balloon a bug  


## 2.1.13 / 2020-04-29 17:32:35 

* fix: fix range-field in columns  


## 2.1.12 / 2020-04-28 19:49:52 

* feat: 表格支持列分组  


## 2.1.11 / 2020-04-24 16:45:47 

* feat: update table-field setters  


## 2.1.10 / 2020-04-23 18:38:22 

* feat: update table-field features  


## 2.1.9 / 2020-04-20 15:49:09 

* feat: 日期区间支持快速选择区间配置  


## 2.1.8 / 2020-04-13 14:01:09 

* fix: change labelTipsIcon default value  


## 2.1.7 / 2020-04-10 10:24:14 

* fix: 修复布局组件设计态和预览态间距不一致问题  


## 2.1.6 / 2020-04-09 17:49:32 

* feat: 图片类型数据支持绑定点击事件回调  


## 2.1.5 / 2020-04-09 17:15:44 

* fix: update dialog/drawer show/hide callback logic  


## 2.1.4 / 2020-04-09 14:02:04 

* fix: fix rich editor content style  


## 2.1.3 / 2020-04-08 15:04:45 

* fix: recover vc-deep-exports  


## 2.1.2 / 2020-04-08 14:30:33 

* fix: 修复banner-container在设计模式下autoWidth计算错误问题；新增dialog内部浮层的弹出位置配置；更新几个snippet图标  


## 2.1.1 / 2020-04-07 15:04:10 

* fix: fix table openRowKeys hidden bug  


## 2.1.0 / 2020-04-02 15:10:50 

* feat: setter优化，分栏支持拖拽、删除  


## 2.0.21 / 2020-04-01 19:46:16 

* feat: add props.defaultValue for vc-search  


## 2.0.20 / 2020-03-31 18:58:01 

* fix: update alifd/next version  


## 2.0.19 / 2020-03-31 16:34:47 

* fix: fix dialog & drawer  


## 2.0.18 / 2020-03-31 16:31:17 

* fix: fix dialog & drawer  


## 2.0.17 / 2020-03-30 21:54:28 

* feat: merge master of dialog,drawer changes  


## 2.0.16 / 2020-03-30 15:23:47 

* feat: add form.fieldOptions  


## 2.0.15 / 2020-03-27 21:00:25 

* fix: fix balloon safeNode error  


## 2.0.14 / 2020-03-26 21:13:42 

* feat: add illustration, etc  


## 2.0.13 / 2020-03-26 11:49:26 

* feat: merge master  


## 2.0.12 / 2020-03-21 20:29:45 

* fix: add missing deep components in exports  


## 2.0.11 / 2020-03-18 19:45:13 

* feat: add dialog overlayProps.cache  


## 2.0.10 / 2020-03-17 15:35:22 

* feat: export all deep components  


## 2.0.9 / 2020-03-11 23:01:06 

* fix: update table field  


## 2.0.8 / 2020-03-11 11:50:06 

* fix: update table-field prototype  


## 2.0.7 / 2020-03-11 00:08:35 

* fix: fix table field; merge master about  


## 2.0.6 / 2020-03-10 00:28:02 

* feat: add table field  


## 2.0.5 / 2020-03-04 22:39:59 

* fix: fix days view renderView  


## 2.0.4 / 2020-03-04 15:24:07 

* feat: merge master version 1.2.15  


## 2.0.3 / 2020-03-03 19:59:53 

* feat: add two icon  


## 2.0.2 / 2020-03-03 17:44:40 

* feat: merge button-group fixes  


## 2.0.1 / 2020-02-28 21:37:49 

* feat: add DaysField  


## 2.0.0 / 2020-02-28 11:51:13 

* feat: fileds refactor

## 1.3.4 / 2020-04-08 14:12:47

* fix: 修复dialog中图层弹出位置的配置


## 1.3.3 / 2020-04-08 11:35:09

* feat: 新增Dialog内部浮层弹出位置的配置


## 1.3.2 / 2020-04-08 10:46:36

* fix: 修复vc-filter在移动端时弹出的抽屉顶部被遮挡问题


## 1.3.1 / 2020-04-07 15:30:03

* fix: fix table openRowKeys hidden bug


## 1.3.0 / 2020-04-01 21:48:54

* feat: columns support delete


  ## 1.2.40 / 2020-04-01 19:41:39

* feat: add props.defaultValue for vc-search


  ## 1.2.39 / 2020-04-01 10:25:32

* fix: fix button width in columns


## 1.2.38 / 2020-03-31 18:09:06

* fix:


## 1.2.37 / 2020-03-31 17:40:19

* fix: drawer变更为全屏; next修复PorviderConfig bug

## 1.2.36 / 2020-03-31 16:15:59 

* fix: drawer & dialog bugfix  


## 1.2.35 / 2020-03-30 21:20:33 

* feat: BannerContainer新增uuid；修复Drawer和dialog的定位异常以及滚动错误；修复Calendar片段错误  


## 1.2.34 / 2020-03-27 20:58:55 

* fix: fix balloon safeNode error 


## 1.2.33 / 2020-03-26 20:29:42 

* feat: add new component illustration  


## 1.2.32 / 2020-03-26 19:47:14 

* feat: cascade-select-field support columnsNum  


## 1.2.31 / 2020-03-26 18:09:54 

* feat: radio-field: support customRender  


## 1.2.30 / 2020-03-26 17:17:48 

* fix: drawer & dialog: fix top & scroll bug; paragraph: content supportVariable  


## 1.2.29 / 2020-03-26 11:26:54 

* feat: tab item add new prop `customKey`;table: fix lost emptyContent prop   


## 1.2.28 / 2020-03-19 08:41:23 

* fix: disable reRender in attachment-field inner onChange  


## 1.2.27 / 2020-03-18 18:26:07 

* feat: filter 支持mobileTitle配置  


## 1.2.26 / 2020-03-17 12:06:44 

* feat: change @alife/next to @alifd/next  


## 1.2.25 / 2020-03-16 17:05:12 

* feat: number-field 新增单位；tab修复renderBadge bug  


## 1.2.24 / 2020-03-13 11:16:41 

* feat: tab新增定制徽标能力  


## 1.2.23 / 2020-03-10 23:57:19 

* feat: 表格新增图片渲染类型，移动端支持图文混排、卡片模式选择  


## 1.2.22 / 2020-03-10 20:06:28 

* fix:   


## 1.2.21 / 2020-03-10 17:24:21 

* fix:   


## 1.2.20 / 2020-03-10 17:03:45 

* fix:   


## 1.2.19 / 2020-03-10 15:05:24 

* feat: tabel card selector  


## 1.2.18 / 2020-03-07 15:50:34

* fix: tab onChange lost  


## 1.2.17 / 2020-03-06 14:24:54 

* feat: 语义化规范与调整 


## 1.2.16 / 2020-03-04 22:26:33 

* fix: fix days field renderView  


## 1.2.15 / 2020-03-04 15:08:44 

* feat: tab support onClose and extra, table field support action width  


## 1.2.14 / 2020-03-03 18:32:55 

* feat: 新增2个icon；按钮组新增移动端『更多』能力  


## 1.2.13 / 2020-03-03 11:27:35 

* fix: fix button-group single button style  


## 1.2.12 / 2020-03-02 20:53:14 

* fix:   


## 1.2.11 / 2020-03-01 21:10:09 

* fix: 修复button-group中更多选项内的事件响应丢失问题  


## 1.2.10 / 2020-02-28 21:08:25 

* feat: add DaysField  


## 1.2.9 / 2020-02-28 17:27:33 

* feat: fix tree table callback  


## 1.2.8 / 2020-02-28 17:26:07 

* fix: expand table and tree table  


## 1.2.7 / 2020-02-27 19:05:26 

* feat: drawer support set bottom button  


## 1.2.6 / 2020-02-26 18:18:07 

* fix: 调整表格getCleanRowData实现方法  


## 1.2.5 / 2020-02-26 16:29:09 

* fix: employee 支持dataSource模式  


## 1.2.4 / 2020-02-26 11:13:56 

* fix: 人员搜索url支持变量绑定  


## 1.2.3 / 2020-02-25 16:10:26 

* fix: 修复表格操作列最大操作按钮数和自定义渲染冲突的bug  


## 1.2.2 / 2020-02-24 20:57:01 

* fix:   


## 1.2.1 / 2020-02-24 19:21:19 

* feat: change the card margin in mobile mode  


## 1.2.0 / 2020-02-24 18:54:11 

* feat: button group support button componentId in onClick callback  


## 1.1.60 / 2020-02-24 16:26:55 

* feat: add data-id prop for button group's button  


## 1.1.59 / 2020-02-24 16:04:07 

* feat: step support renderContent; table support cellProps,rowPorps  


## 1.1.58 / 2020-02-21 16:58:30 

* fix: pickable value lost  


## 1.1.57 / 2020-02-21 12:23:11 

* feat: show tab primary key  


## 1.1.56 / 2020-02-20 23:43:29 

* feat: table support openRowKeys  


## 1.1.55 / 2020-02-20 11:55:19 

* fix: button group fix  


## 1.1.54 / 2020-02-20 11:51:01 

* fix:  


## 1.1.53 / 2020-02-19 20:25:19 

* fix:   


## 1.1.52 / 2020-02-19 19:43:30 

* fix:   


## 1.1.51 / 2020-02-19 16:52:20 

* fix: upload support csrf token; button-group fixbug  


## 1.1.50 / 2020-02-18 23:02:32 

* fix: do not force to useVirtual on phone  


## 1.1.49 / 2020-02-18 21:57:04 

* fix: add new component button-group;table add new dataType: link,file,enum;steps support custom render  


## 1.1.48 / 2020-02-14 18:23:14 

* fix: tree mode will close useVirtual  


## 1.1.47 / 2020-02-14 14:18:59 

* fix: card support divider indent  


## 1.1.46 / 2020-02-13 18:32:38 

* feat: change datepicker line height in mobile  


## 1.1.45 / 2020-02-10 19:24:42 

* feat: update number-info  


## 1.1.44 / 2020-02-09 23:24:30 

* fix: reset table-header scrollbar in safari  


## 1.1.43 / 2020-02-09 22:27:35 

* feat: update deep to 1.20.0  


## 1.1.42 / 2020-02-09 19:50:15 

* fix: import banner-container style   


## 1.1.41 / 2020-02-08 13:22:41 

* fix: add key when form loops Children  


## 1.1.40 / 2020-02-05 21:30:14 

* feat: save controlRef for all fields  


## 1.1.39 / 2020-02-05 15:29:23 

* fix: 暂时关闭drawer的offset配置，存在另外问题  


## 1.1.38 / 2020-02-04 21:20:30 

* feat: Optimize the snippets desc  


## 1.1.37 / 2020-02-03 18:52:52 

* fix: remove dependencies crypto  


## 1.1.36 / 2020-02-01 20:19:54 

* fix: cascade date required validator fix  


## 1.1.35 / 2020-01-21 11:21:53 

* feat: add label tips  


## 1.1.34 / 2020-01-18 17:40:59 

* feat: employeeField support onSearch callback  


## 1.1.33 / 2020-01-17 11:39:57 

* fix: button icon vertical align fix  


## 1.1.32 / 2020-01-16 14:03:22 

* fix: drawer offset fix; tree actions button fix;   


## 1.1.31 / 2020-01-15 17:11:41 

* fix: tree actions popupcontainer  


## 1.1.30 / 2020-01-15 16:39:24 

* fix: tree actions bug fix  


## 1.1.29 / 2020-01-15 16:14:36 

* fix: change tree actions callback params  


## 1.1.28 / 2020-01-15 15:38:11 

* fix: change tree actions popupcontiner  


## 1.1.27 / 2020-01-15 15:01:49 

* fix: fix banner-container error  


## 1.1.26 / 2020-01-14 20:49:03 

* fix: field getValue return a deep cloned value; fix icon button style;  


## 1.1.25 / 2020-01-14 17:31:55 

* feat: tree support actions;fix table bug  


## 1.1.24 / 2020-01-13 16:54:01 

* fix: fix tree-select mobile min-height  


## 1.1.23 / 2020-01-10 18:43:56 

* feat: fix table renderFiled   


## 1.1.22 / 2020-01-10 15:00:50 

* fix: drawer & dialog may run outside of shell  


## 1.1.21 / 2020-01-09 22:31:12 

* feat: add richtxt editor  


## 1.1.20 / 2020-01-09 20:16:24 

* fix: drawer support container  


## 1.1.19 / 2020-01-09 09:24:51 

* fix: change prop container position   


## 1.1.18 / 2020-01-08 20:29:39 

* fix: fix filter action is null;  card title support variable   


## 1.1.17 / 2020-01-08 19:19:19 

* fix: fix dropdown scroll error in dialog  


## 1.1.16 / 2020-01-08 12:14:23 

* fix: add default style token for table  


## 1.1.15 / 2020-01-07 20:34:09 

* fix: table test  


## 1.1.14 / 2020-01-07 20:17:44 

* fix: fix table scrollbar style  


## 1.1.13 / 2020-01-06 18:03:27 

* feat: change icon setter  

## 1.1.12 / 2020-01-03 21:48:21 

* fix: tooltip delay fix  


## 1.1.11 / 2020-01-03 14:46:33 

* fix: slider link fix  


## 1.1.10 / 2020-01-02 17:02:10 

* feat: support tree draggable & editable  


## 1.1.9 / 2019-12-31 18:55:49 

* fix: tabs fix  


## 1.1.8 / 2019-12-30 20:36:20 

* fix: form bugfix  


## 1.1.7 / 2019-12-28 13:57:58 

* fix: fix tabs variable  


## 1.1.6 / 2019-12-27 16:57:53 

* feat: add image viewer  


## 1.1.5 / 2019-12-26 21:09:39 

* feat: add checkbox, dropdown, bugfixes  


## 1.1.4 / 2019-12-24 18:35:41 

* fix: css bugfix  


## 1.1.3 / 2019-12-24 18:26:48 

* fix: collapse bugfix  


## 1.1.2 / 2019-12-20 22:26:23 

* fix: dialog submit button  


## 1.1.1 / 2019-12-19 15:30:58 

* fix: deep table bugfix  


## 1.1.0 / 2019-12-18 19:26:16 

* feat: implement new deep table  


## 1.0.14 / 2019-12-06 21:56:59 

* fix: fix image style format bug  


## 1.0.13 / 2019-12-06 17:52:01 

* fix: fix form bugs about: validate apis  


## 1.0.12 / 2019-12-04 19:07:52 

* fix: cascader date picker bug  


## 1.0.11 / 2019-12-04 13:50:04 

* fix: fix form dataSource moment value  


## 1.0.10 / 2019-12-03 21:11:27 

* fix: country locale fix  


## 1.0.9 / 2019-12-03 20:48:33 

* feat: money input, pickable, number-info  


## 1.0.8 / 2019-11-28 19:53:19 

* feat: theme change & i18n  


## 1.0.7 / 2019-11-20 22:33:04 

* fix: fix employee-search style bug  


## 1.0.6 / 2019-11-20 22:02:31 

* fix: $css-prefix lost  


## 1.0.5 / 2019-11-06 14:46:09 

* feat: update page header style, fix icon button, checkbox & radio support html label  


## 1.0.4 / 2019-10-31 14:38:26 

* fix: fix deep version  


## 1.0.3 / 2019-10-31 14:22:40 

* refactor: update deep version  


## 1.0.2 / 2019-10-30 19:49:01 

* feat: update page-header and filter  


## 1.0.1 / 2019-10-24 11:32:10 

* fix: a bug fix  


## 0.2.12 / 2019-10-23 19:08:36 

* fix: bug fixes  


## 0.2.11 / 2019-10-22 17:58:31 

* fix: vc-filter  


## 0.2.10 / 2019-10-22 11:25:40 

* fix: fix drawer & dialog bugs  


## 0.2.9 / 2019-10-22 10:21:02 

* fix: vc-table-field  


## 0.2.8 / 2019-10-21 16:53:41 

* feat: support callback for single field  


## 0.2.7 / 2019-10-21 15:50:38 

* fix: 表单容器 按钮默认事件  


## 0.2.6 / 2019-10-21 14:09:33 

* fix: 表单组件按钮默认值  


## 0.2.5 / 2019-10-18 13:36:16 

* fix: vc-filter  


## 0.2.4 / 2019-10-17 16:15:49 

* fix: float-nav  


## 0.2.3 / 2019-10-17 15:43:05 

* refactor: change deep to 1.7.0  


## 0.2.2 / 2019-10-16 22:24:20 

* fix: vc-float-nav  


## 0.2.1 / 2019-10-16 21:38:08 

* refactor: merge 0.2.0  


## 0.2.0 / 2019-10-16 21:21:06 

* feat: add employee searchg 

## 0.1.93 / 2019-10-16 18:09:25 

* fix:   

## 0.1.92 / 2019-10-16 16:24:26 

* feat: feat: add vc-float-nav  


## 0.1.91 / 2019-10-16 15:53:00 

* fix: vc-table-field & vc-filter  


## 0.1.90 / 2019-10-16 13:51:55 

* fix: vc-table-field & vc-filter  


## 0.1.89 / 2019-10-16 12:58:37 

* fix: vc-table-field  


## 0.1.88 / 2019-10-16 11:50:03 

* fix: vc-table-field  


## 0.1.87 / 2019-10-15 23:10:56 

* fix: fix title bug  


## 0.1.86 / 2019-10-15 22:30:45 

* fix: fix calendar bug  


## 0.1.85 / 2019-10-15 21:24:05 

* fix: fix drawer bugs  


## 0.1.84 / 2019-10-15 20:37:39 

* fix: cascade date fix  


## 0.1.83 / 2019-10-15 20:00:20 

* fix: vc-table-field  


## 0.1.82 / 2019-10-15 18:44:50 

* fix: select bugfix  


## 0.1.81 / 2019-10-15 17:42:07 

* fix: vc-table-field  


## 0.1.80 / 2019-10-15 15:44:32 

* fix: fix placeholder  


## 0.1.79 / 2019-10-15 15:37:25 

* fix: fix renderView  


## 0.1.78 / 2019-10-15 14:24:47 

* fix: update index files  


## 0.1.77 / 2019-10-15 11:11:17 

* fix: vc-filter  


## 0.1.76 / 2019-10-15 10:50:02 

* fix: vc-filter  


## 0.1.75 / 2019-10-14 19:56:49 

* fix: table top actions  


## 0.1.74 / 2019-10-14 16:09:20 

* fix: columns bugfix  


## 0.1.73 / 2019-10-14 15:18:20 

* fix: vc-filter  


## 0.1.72 / 2019-10-14 15:02:26 

* fix: vc-filter  


## 0.1.71 / 2019-10-14 10:14:07 

* fix: vc-filter  


## 0.1.70 / 2019-10-13 21:11:46 

* fix: 分栏修改  


## 0.1.69 / 2019-10-13 13:43:09 

* fix:   


## 0.1.68 / 2019-10-12 18:24:18 

* fix: vc-filter  


## 0.1.67 / 2019-10-12 16:27:39 

* fix: vc-image onClick bug fix  


## 0.1.66 / 2019-10-12 16:23:01 

* fix:   


## 0.1.65 / 2019-10-12 15:50:47 

* fix: vc-filter  


## 0.1.64 / 2019-10-12 15:36:33 

* fix: vc-image events  


## 0.1.63 / 2019-10-12 15:20:29 

* feat: add vc-image  


## 0.1.62 / 2019-10-12 14:24:55 

* fix: change columns layout  


## 0.1.61 / 2019-10-12 14:08:36 

* fix: vc-filter  


## 0.1.60 / 2019-10-11 20:10:18 

* fix: update @ali/vu-style-property  


## 0.1.59 / 2019-10-11 19:23:47 

* fix: update @ali/vu-events-property  


## 0.1.58 / 2019-10-11 18:32:47 

* fix: vc-text-field  


## 0.1.57 / 2019-10-11 15:55:48 

* fix: update pkg depend  


## 0.1.56 / 2019-10-11 13:19:19 

* fix: fix next version  


## 0.1.55 / 2019-10-10 20:17:25 

* fix: fixes #22859781  


## 0.1.54 / 2019-10-10 13:00:42 

* fix: upload bugfix  


## 0.1.53 / 2019-10-10 10:58:07 

* fix:   


## 0.1.52 / 2019-10-10 09:45:35 

* fix: vc-title supportVariable  


## 0.1.51 / 2019-10-09 22:37:24 

* fix: supportVariable  


## 0.1.50 / 2019-10-09 17:12:22 

* fix:   


## 0.1.49 / 2019-10-09 16:59:00 

* fix: add package @ali/visualengine-utils  


## 0.1.48 / 2019-10-09 15:36:28 

* fix: slot 修改  


## 0.1.47 / 2019-10-09 10:36:39 

* feat: dialog:点击close & cancel时默认关闭，除非显式返回false；\n attachent-field & image-field: 去除默认value  


## 0.1.46 / 2019-09-30 21:17:42 

* fix: form field value format  


## 0.1.45 / 2019-09-30 15:30:09 

* feat: add filter  


## 0.1.44 / 2019-09-30 09:39:36 

* fix: change form.getValues to form.getValue  


## 0.1.43 / 2019-09-29 22:50:59 

* fix: defaultValue in vc-table-field  


## 0.1.42 / 2019-09-29 22:18:23 

* fix: vc-table-field in form  


## 0.1.41 / 2019-09-29 16:20:21 

* fix: actionColumn/sortable for vc-table-field  


## 0.1.40 / 2019-09-29 15:38:54 

* fix: fallback dep  


## 0.1.39 / 2019-09-29 15:01:30 

* refactor: change dep to deep  


## 0.1.38 / 2019-09-29 14:53:40 

* fix: fix setValidation  


## 0.1.37 / 2019-09-29 14:42:46 

* fix: vc-table-field  


## 0.1.36 / 2019-09-29 14:18:53 

* fix: Block -> Div  


## 0.1.35 / 2019-09-29 14:13:33 

* fix: fix actionSetter in vc-table-field  


## 0.1.34 / 2019-09-29 11:33:37 

* feat: add setBehavior API  


## 0.1.33 / 2019-09-29 11:23:43 

* fix: features for vc-table-field  


## 0.1.32 / 2019-09-27 17:24:46 

* fix: validation bugfix  


## 0.1.31 / 2019-09-26 15:36:43 

* fix: fix defaultValue in VE  


## 0.1.30 / 2019-09-25 18:24:45 

* fix: vc-radio-field 和 vc-checkbox-field 选项无法添加问题  


## 0.1.29 / 2019-09-25 16:12:47 

* refactor: change behavior struct  


## 0.1.28 / 2019-09-25 14:36:07 

* fix: bug fixes  


## 0.1.27 / 2019-09-24 16:48:28 

* fix: fix bugs  


## 0.1.26 / 2019-09-23 15:19:36 

* fix: fix props problem of balloon, collapse, form  


## 0.1.25 / 2019-09-19 14:13:35 

* fix: formate datetime  


## 0.1.24 / 2019-09-19 13:30:52 

* feat: format datetime  


## 0.1.23 / 2019-09-18 19:32:43 

* fix: drawer bugfix  


## 0.1.22 / 2019-09-18 17:51:15 

* feat: add drawer  


## 0.1.21 / 2019-09-18 11:00:37 

* fix: fix form field validation change  


## 0.1.20 / 2019-09-17 20:45:25 

* fix: fix column child  


## 0.1.19 / 2019-09-17 20:34:45 

* feat: update columns layout  


## 0.1.18 / 2019-09-15 17:59:11 

* feat: update all fields  


## 0.1.17 / 2019-09-15 09:34:47 

* fix: fix pkg main  


## 0.1.16 / 2019-09-13 18:25:44 

* fix: recover columns layout  


## 0.1.15 / 2019-09-13 18:21:49 

* feat: update form apis  


## 0.1.14 / 2019-09-07 16:49:33 

* fix: remove mutableStates  


## 0.1.13 / 2019-09-05 20:06:31 

* fix: fix onChange  


## 0.1.12 / 2019-09-05 09:36:26 

* fix: fix onChange props position  


## 0.1.11 / 2019-09-04 20:14:15 

* fix: add onChange to field init  


## 0.1.10 / 2019-09-04 11:30:12 

* fix: merge code  


## 0.1.9 / 2019-09-04 11:22:09 

* fix: form dataSource change  


## 0.1.8 / 2019-09-03 21:32:44 

* fix: change defaultValue to value  


## 0.1.7 / 2019-09-03 15:25:02 

* fix: events 写法调整  


## 0.1.6 / 2019-09-03 13:08:23 

* fix: field init  


## 0.1.5 / 2019-09-03 11:48:52 

* fix: field init  


## 0.1.4 / 2019-09-03 11:18:21 

* fix: field debug  


## 0.1.3 / 2019-09-03 09:32:54 

* fix: field name  


## 0.1.2 / 2019-09-02 14:17:11 

* feat: update form and field  


## 0.1.1 / 2019-08-30 11:05:54 

* fix: update next version  


## 0.1.0 / 2019-08-20 09:45:35 

* feat: init  


## 1.0.0 / 2019-08-20

 * `feat`: init
