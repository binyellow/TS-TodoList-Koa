import * as React from "react";
import axios from 'axios';
const styles = require('./index.less');
// import './index.less';
// import * as styles from './index.less';
import { hot } from 'react-hot-loader'

export interface HelloProps { name: string; age: number; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Hello extends React.Component<HelloProps, {}> {
  sayAge(age: number) {
    console.log(age);
  }
  clickRequest() {
    axios.get('/user?ID=12345')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    // console.log(styles);
    const { name, age } = this.props;
    return (<div className={styles['test']}>
      Hello name is {name}, I'm <a onClick={(e)=>this.sayAge(age)}>{age}</a> years old！
      <button onClick={this.clickRequest.bind(this)}>发起跨域请求1</button>
    </div>
    );
  }
}
export default hot(module)(Hello)