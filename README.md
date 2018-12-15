# TS-TodoList-Koa
用React全家桶和Antd实现前端，Koa+mongoDB实现后端，webpack来打包和发布的TodoList项目

### 计划
- [X] Redux
- [X] Router
- [X] Koa
- [X] 学习mongoDB索引
- [X] 封装接口返回的参数
- [X] 使用nginx实现静态服务，代理请求解决跨域
- [ ] 增加删除和已完成
- [ ] 增加行内编辑、单元格双击编辑和搜索
- [ ] 增加token校验
- [ ] docker,jenkins

### 开发中碰到的一些问题
- [X] 支持css module: 安装react-app-rewire，react-app-rewire-less-with-modules
- [X] tslint: 导入字母顺序问题
    ```js
    "rules": {
      "ordered-imports": false
    },
    ```
- [X] antd的TextArea问题: 
  - 打开: node_modules/antd/lib/input/TextArea.d.ts
  - 头部引用: import ResizeObserver from 'resize-observer-polyfill';
  - 更多详情[link to antd](https://github.com/ant-design/ant-design/issues/13405)
- [X] 按需加载组件: [antd官方文档](https://ant.design/docs/react/use-in-typescript-cn)
- [X] 使用nodemon和babel-cli来编译ES6和热更新, 通过配置nodemon.json来控制热更新需要忽略的文件夹: 
    ```js
    {   
      "ignore": ["lib/*.js", "README"] 
    }
    ```
- [X] implicitly has an 'any' type: 通过安装对应的@types/moduleName来解决这个问题
- [X] redux中connect问题: [decorator and no](https://stackoverflow.com/questions/46861839/typescript-connect-react-redux-decorator-with-stateful-component)
- [X] [params with shadow](https://stackoverflow.com/questions/52968903/shadowed-name-in-typescript-and-react-redux)
- [X] 使用Router时props未定义类型带来的问题: 通过从react-router-dom导入RouteComponentProps
- [X] alias设置路径问题: 之前一直是通过webpack配置，通过实验发现配置tsconfig即可实现路径问题，还可以鼠标点击跳转到对应的文件夹
- [X] react中使用静态方法问题: 首先，提示必须要在构造函数之前；然后要指定方法返回值类型