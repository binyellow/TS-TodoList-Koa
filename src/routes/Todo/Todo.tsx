import React, { Component } from 'react';
import { Button, Input, Form } from 'antd';
import { connect } from 'react-redux';
import { Bind } from 'lodash-decorators';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { getResponse } from 'utils/utils';
import notification from 'utils/notification';
import * as actions from '../../actions/todo'; // shadow name problem must to import *
import { add, fetchTodoList } from '../../services/todo';
import TodoList from './TodoList';
import styles from './index.module.less';

interface TodoProps {
  addTodo: any,
  form: any,
  todoState: any,
  userId: number,
}
const FormItem = Form.Item;
// @connect(
//   (state: any)=>state,
//   { addTodo }
// )
class Todo extends Component<TodoProps & RouteComponentProps, {userId: number}> {
  constructor(props: TodoProps & RouteComponentProps) {
    super(props);
    const { userId } = this.props.match.params as TodoProps;
    this.state = {
      userId
    }
  }
  public componentDidMount() {
    const { userId } = this.state;
    const { addTodo } = this.props;
    fetchTodoList({ userId }).then(res=>{
      const result = getResponse(res);
      if(result) {
        addTodo({ todoList: result.content });
      }
    })
  }
  @Bind()
  public handleAdd() {
    const {
      addTodo,
      form: { validateFieldsAndScroll, resetFields },
      todoState: { todoList = [] }
    } = this.props;
    const { userId } = this.state;
    validateFieldsAndScroll((err: any, values: any)=>{
      if(!err) {
        const { content } = values;
        content && addTodo({
          todoList: [
            ...todoList,
            {userId, content, completed: false}
          ]
        });
        add({ userId, content, completed: false }).then(res=>{
          if(res) {
            notification.success();
          }
        })
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
            getFieldDecorator('content',{
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

export default withRouter(connect(
  (state: any)=>({todoState: state.todo}),
  { addTodo: actions.addTodo }
)(Form.create()(Todo)));