import * as React from "react";
import App from './App';

export default class Child extends App {
  // constructor(props: any) {
  //   super(props);
  // }
  componentDidMount() {
    console.log('child');
  }
  sayName(name: string) {
    console.log(name);
  }
  render() {
    // console.log(styles);
    return (<div>
      Child
      <button>年龄</button>
    </div>
    );
  }
}