import * as React from "react";
const styles = require('./index.less');
// import './index.less';
// import * as styles from './index.less';
// import { hot } from 'react-hot-loader' 热更新

export interface HelloProps { name: string; age: number; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class Hello extends React.Component<HelloProps, {}> {
  sayAge(age: number) {
    console.log(age);
  }
  render() {
    // console.log(styles);
    const { name, age } = this.props;
    return (<div className={styles['test']}>
      Hello name is {name}, I'm <a onClick={(e)=>this.sayAge(age)}>{age}</a> years old！
    </div>
    );
  }
}
// export default hot(module)(Hello)