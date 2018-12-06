import * as React from "react";
import { Button } from 'antd';
import axios from 'axios';
const styles = require('./index.less');
// import './index.less';
// import * as styles from './index.less';
import { hot } from 'react-hot-loader'

export interface AppProps { name: string; age: number; }

// 'AppProps' describes the shape of props.
// State is never set so we use the '{}' type.

// @hot(module)
class App extends React.Component<AppProps, {requestData: string}> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      requestData: ''
    }
  }
  componentDidMount() {
    console.log('father');
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
      App name is {name}, I'm <a onClick={(e)=>this.sayAge(age)}>{age}</a> years old！
      <Button type="primary" onClick={this.clickRequest.bind(this)}>发起跨域请求</Button>
      <div>{this.state.requestData}</div>
    </div>
    );
  }
}
export default hot(module)(App)