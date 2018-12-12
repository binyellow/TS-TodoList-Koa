# TS-TodoList-Koa
todolist with TS Koa MongoDB Webpack

### plan
- [X] Redux
- [X] Router
- [X] Koa
- [ ] nginx to agency the local request
- [ ] register adn login with token
- [ ] docker,jenkins

### Some problem in the progress
- [X] less-loader support css modules: react-app-rewire-less-with-modules
- [X] tslint: import order problem
    ```js
    "rules": {
      "ordered-imports": false
    },
    ```
- [X] antd problem about input>TextArea: 
  - Open: node_modules/antd/lib/input/TextArea.d.ts
  - Insert import: import ResizeObserver from 'resize-observer-polyfill';
  - [link to antd](https://github.com/ant-design/ant-design/issues/13405)
- [X] asy import the Component: [antd official document](https://ant.design/docs/react/use-in-typescript-cn)
- [X] nodemon and babel-cli to translate ES6 to lower version and hot replace, use nodemon.json to config the ignore about hot watch file: 
    ```js
    {   
      "ignore": ["lib/*.js", "README"] 
    }
    ```
- [X] implicitly has an 'any' type: to install @types/moduleName to resolve this problem
- [X] connect problem: [decorator and no](https://stackoverflow.com/questions/46861839/typescript-connect-react-redux-decorator-with-stateful-component)
- [X] [params with shadow](https://stackoverflow.com/questions/52968903/shadowed-name-in-typescript-and-react-redux)