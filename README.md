# vc-deep [![][tnpm-image]][tnpm-url]

DEEP 3.0 的乐高整包，基础组件基于 Fusion Next 封装，进行了多端适配和大量体验优化，同时包含 EIBU 沉淀的通用业务组件。

### 环境准备

**安装 visualengine-devtools**

```sh
tnpm i -g @ali/vdev
```

> 详细文档 <http://gitlab.alibaba-inc.com/vision/visualengine-devtools>

### 常用命令

**启动调试服务器**

```sh
npm run start
```

**构建输出**

```sh
npm run build
 
or

vdev build
```

**发布**

```sh
tnpm run pub
```

**远程 Inject 调试**

```sh
vdev start --inject view | mobile | prototype | utils // 默认为 view，可省略
```


[tnpm-image]: http://web.npm.alibaba-inc.com/badge/v/@ali/vc-deep.svg?style=flat-square
[tnpm-url]: http://web.npm.alibaba-inc.com/package/@ali/vc-deep
