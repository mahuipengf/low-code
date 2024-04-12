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
    componentName: 'FilterRow',
    children: [
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
    ],
  },
  {
    componentName: 'FilterRow',
    children: [
      {
        componentName: 'SelectField',
        props: {
          labelAlign: 'top',
          multiple: true,
        },
      },
      {
        componentName: 'FilterEmpty',
      },
      {
        componentName: 'FilterEmpty',
      },
      {
        componentName: 'FilterAction',
        children: [
          {
            componentName: 'Button',
            props: {
              content: {
                type: 'i18n',
                en_US: 'Search',
                zh_CN: '查询',
                use: 'zh_CN',
              },
              __style__: submitStyle,
              onClick: {
                "type": "JSExpression",
                "value": onFilterSubmit,
                "extType": "function",
                "events": [
                  {
                    "name": "onClick",
                    "params": {},
                    "func": {
                      "type": "js",
                      "source": onFilterSubmit,
                      "compiled": onFilterSubmit,
                    }
                  }
                ]
              }
            },
          },
          {
            componentName: 'Button',
            props: {
              content: {
                type: 'i18n',
                en_US: 'Reset',
                zh_CN: '重置',
                use: 'zh_CN',
              },
              type: 'secondary',
              onClick: {
                "type": "JSExpression",
                "value": onFilterReset,
                "extType": "function",
                "events": [
                  {
                    "name": "onClick",
                    "params": {},
                    "func": {
                      "type": "js",
                      "source": onFilterReset,
                      "compiled": onFilterReset,
                    }
                  }
                ]
              }
            },
          },
        ],
      },
    ],
  },
];
