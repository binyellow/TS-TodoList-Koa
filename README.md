写英文md是我想学英语, 如果不习惯中式英文, [中文md点这里](https://github.com/binyellow/TS-TodoList-Koa/tree/develop-zh)
# TS-TodoList-Koa
todolist with TS Koa MongoDB Webpack

### plan
- [x] Redux
- [x] Router
- [x] Koa
- [x] learn mongoDB index
- [x] encapsulated return params
- [x] nginx to agency the local request
- [x] add delete and toggle completed
- [ ] add editRow,Cell. add Search
- [x] register and login with token
- [ ] docker,jenkins

### Some problem in the progress
- [x] less-loader support css modules: react-app-rewire-less-with-modules
- [x] tslint: import order problem
    ```js
    "rules": {
      "ordered-imports": false
    },
    ```
- [x] antd problem about input>TextArea: 
  - Open: node_modules/antd/lib/input/TextArea.d.ts
  - Insert import: import ResizeObserver from 'resize-observer-polyfill';
  - [link to antd](https://github.com/ant-design/ant-design/issues/13405)
- [x] asy import the Component: [antd official document](https://ant.design/docs/react/use-in-typescript-cn)
- [x] nodemon and babel-cli to translate ES6 to lower version and hot replace, use nodemon.json to config the ignore about hot watch file: 
    ```js
    {   
      "ignore": ["lib/*.js", "README"] 
    }
    ```
- [x] implicitly has an 'any' type: to install @types/moduleName to resolve this problem
- [x] connect problem: [decorator and no](https://stackoverflow.com/questions/46861839/typescript-connect-react-redux-decorator-with-stateful-component)
- [x] [params with shadow](https://stackoverflow.com/questions/52968903/shadowed-name-in-typescript-and-react-redux)
- [x] Router props problem: import RouteComponentProps from react-router-dom to define the Component's props
- [x] alias problem: Resolve alias issues by adding a path configuration in tsconfig
- [x] static function problem: first, is should be put before constructor; second, specific the type of the method return values