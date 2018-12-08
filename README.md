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