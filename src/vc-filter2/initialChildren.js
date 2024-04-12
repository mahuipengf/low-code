const onFilterSubmit = `function onFilterSubmit(){
  // 请将 fieldId 替换为查询组件的 fieldId
  this.$('fieldId').submit(function(data, error) {
    if (data) {
      console.log(data);
      // 往后端提交数据，一般写法如下
      // this.dataSourceMap['xxx'].load(data).then(() => {
      //   this.utils.toast({
      //     type: 'success',
      //     title: '提交成功'
      //   });
      // });
    }
  });
}`;

const onFilterReset = `function onFilterReset(){
  // 请将 fieldId 替换为查询组件的 fieldId
  this.$('fieldId').reset();
}`;
const submitStyle = `:root {
  margin-right: 15px;
}`;

export default [
  {
    componentName: 'TextField',
    props: {
      labelAlign: 'top',
    },
  },
  {
    componentName: 'TextField',
    props: {
      labelAlign: 'top',
    },
  },
  {
    componentName: 'TextField',
    props: {
      labelAlign: 'top',
    },
  },
  {
    componentName: 'TextField',
    props: {
      labelAlign: 'top',
    },
  },
];
