# TS-TodoList-Koa
todolist with TS Koa MongoDB Webpack

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
- [X] asy import the Component: [antd official document](https://ant.design/docs/react/use-in-typescript-cn)
- [X] nodemon and babel-cli to translate ES6 to lower version and hot replace, use nodemon.json to config the ignore about hot watch file: 
    ```js
    {   
      "ignore": ["lib/*.js", "README"] 
    }
    ```
- [X] implicitly has an 'any' type: to install @types/moduleName to resolve this problem
- [X] connect problem: [decorator and no](https://stackoverflow.com/questions/46861839/typescript-connect-react-redux-decorator-with-stateful-component)