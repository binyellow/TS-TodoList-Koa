import * as React from "react";
import { Button } from 'antd';
import axios from 'axios';
const styles = require('./index.less');
// import './index.less';
// import * as styles from './index.less';
import { hot } from 'react-hot-loader'

export interface HelloProps { name: string; age: number; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Hello extends React.Component<HelloProps, {}> {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     requestData: ''
  //   }
  // }
  state = {
    requestData: ''
  }
  sayAge(age: number) {
    console.log(age);
  }
  clickRequest() {
    const that = this;
    axios.get('/test/user?ID=12345')
    .then(function (response) {
      console.log(response);
      that.setState({requestData: response.data})
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
      <Button type="primary" onClick={this.clickRequest.bind(this)}>发起跨域请求111111111112222222</Button>
      <div>{this.state.requestData}</div>
    </div>
    );
  }
}
export default hot(module)(Hello)