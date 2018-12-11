import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { Bind } from 'lodash-decorators';
import styles from './index.module.less';

interface RegisterProps {
  form: any
}
const FormItem = Form.Item;

class Register extends Component<RegisterProps> {
  @Bind()
  public handleRegister() {
    const { form: { validateFields } } = this.props;
    validateFields((err: any,values: any)=>{
      if(!err) {
        axios.post('/user/register', values).then(res=>{
          console.log(res);
        })
      }
    })
  }
  public render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <div className={styles.wrapper}>
        <Form>
          <FormItem label="账号" help>
          {getFieldDecorator('name',{
            rules: [
              {required: true}
            ]
          })(
            <Input/>
          )}
          </FormItem>
          <FormItem label="密码" help>
          {getFieldDecorator('passWord',{
            rules: [
              {required: true}
            ]
          })(
            <Input/>
          )}
          </FormItem>
          <FormItem>
            <Button htmlType="submit" type="primary" onClick={this.handleRegister}>注册</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Register);