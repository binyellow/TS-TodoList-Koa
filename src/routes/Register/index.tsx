import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import styles from './index.module.less';

interface RegisterProps {
  form: any
}
const FormItem = Form.Item;

class Register extends Component<RegisterProps> {
  public render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <div className={styles.wrapper}>
        <Form>
          <FormItem label="账号">
          {getFieldDecorator('name')(
            <Input/>
          )}
          </FormItem>
          <FormItem label="密码">
          {getFieldDecorator('password')(
            <Input/>
          )}
          </FormItem>
          <FormItem>
            <Button htmlType="submit" type="primary">注册</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Register);