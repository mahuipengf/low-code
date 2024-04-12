const onSubmit = `function onSubmit(){
  // 请将 fieldId 替换为表单容器的 fieldId
  this.$('fieldId').submit((data, error) => {
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

const onReset = `function onReset(){
  // 请将 fieldId 替换为表单容器的 fieldId
  this.$('fieldId').reset();
}`;

const submitStyle = `:root {
  margin-right: 15px;
}`;

export const getPcChild = () => [
  {
    componentName: 'TextField',
    props: {
      labelAlign: 'top',
    },
  },
  {
    componentName: 'SelectField',
    props: {
      labelAlign: 'top',
    },
  },
  {
    componentName: 'Div',
    props: {
      isFormButtonBox: true,
    },
    children: [
      {
        componentName: 'Button',
        props: {
          content: {
            type: 'i18n',
            en_US: 'Ok',
            zh_CN: '提交',
          },
          __style__: submitStyle,
          onClick: {
            "type": "JSExpression",
            "value": onSubmit,
            "extType": "function",
            "events": [
              {
                "name": "onClick",
                "params": {},
                "func": {
                  "type": "js",
                  "source": onSubmit,
                  "compiled": onSubmit,
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
          },
          type: 'secondary',
          onClick: {
            "type": "JSExpression",
            "value": onReset,
            "extType": "function",
            "events": [
              {
                "name": "onClick",
                "params": {},
                "func": {
                  "type": "js",
                  "source": onReset,
                  "compiled": onReset,
                }
              }
            ]
          }
        },
      },
    ],
  },
];
