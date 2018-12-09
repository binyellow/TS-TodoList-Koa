import React, { Component } from 'react';
import { Button, Input, Form } from 'antd';
import { connect } from 'react-redux';
import { Bind } from 'lodash-decorators';
import * as actions from '../../actions/todo'; // shadow name problem must to import *
import TodoList from './TodoList';
import styles from './index.module.less';

interface TodoProps {
  addTodo: any,
  form: any,
  todoState: any
}
const FormItem = Form.Item;
// @connect(
//   (state: any)=>state,
//   { addTodo }
// )
class Todo extends Component<TodoProps, {}> {
  @Bind()
  public handleAdd() {
    const {
      addTodo,
      form: { validateFieldsAndScroll, resetFields },
      todoState: { todoList = [] }
    } = this.props;
    validateFieldsAndScroll((err: any, values: any)=>{
      if(!err) {
        const { todo } = values;
        todo&&addTodo({
          todoList: [
            ...todoList,
            {content: todo, completed: false}
          ]
        });
        resetFields();
      }
    })
  }
  public render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.wrapper}>
        <Form className={styles.todo}>
          <FormItem label="Todo" help>
          {
            getFieldDecorator('todo',{
              rules: [
                {required: true}
              ]
            })(
              <Input/>
            )
          }
          </FormItem>
          <Button type="primary" htmlType="submit" icon="plus" onClick={this.handleAdd}>添加</Button>
        </Form>
        <TodoList/>
      </div>
    );
  }
}

export default connect(
  (state: any)=>({todoState: state.todo}),
  { addTodo: actions.addTodo }
)(Form.create()(Todo));