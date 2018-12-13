import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Bind } from 'lodash-decorators';
import { login } from '../../services/user';
import notification from '../../utils/notification';
import { getResponse } from '../../utils/utils';

import styles from './index.module.less';

interface LoginProps {
  form: any
}
const FormItem = Form.Item;

class Login extends Component<LoginProps & RouteComponentProps> {
  @Bind()
  public handleLogin() {
    const { form: { validateFields } } = this.props;
    validateFields((err: object, values: object)=>{
      if(!err) {
        login(values).then(res=>{
          const result = getResponse(res);
          if(result) {
            const { _id } = result.content;
            notification.success();
            const path = {
              pathname: `/todo/${_id}`,
              // state: {
              //   name: 'huangbin',
              //   age: 23
              // },
              // search: 'name=huang&age=23'
            }
            this.props.history.push(path);
          }
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
            <Button htmlType="submit" type="primary" onClick={this.handleLogin}>登录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default withRouter(Form.create()(Login));