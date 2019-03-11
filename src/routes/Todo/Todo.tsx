import React, { Component } from 'react';
import { Button, Input, Form } from 'antd';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { Bind } from 'lodash-decorators';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { fetchUserList } from 'service/user';
import { getResponse } from 'utils/utils';
import notification from 'utils/notification';
import * as actions from '../../actions/todo'; // shadow name problem must to import *
import * as userActions from '../../actions/user';
import { add } from '../../services/todo';
import TodoList from './TodoList';
import styles from './index.module.less';

interface TodoProps {
  updateState: any,
  updateUser: any,
  form: any,
  todoState: any,
  userId: number,
}
interface S {
  userId: number;
  listDom: any;
}
const FormItem = Form.Item;
// @connect(
//   (state: any)=>state,
//   { updateState }
// )
class Todo extends Component<TodoProps & RouteComponentProps, S> {
  constructor(props: TodoProps & RouteComponentProps) {
    super(props);
    const { userId } = this.props.match.params as TodoProps;
    this.state = {
      userId,
      listDom: undefined,
    }
  }
  public componentDidMount() {
    const { updateUser } = this.props;
    fetchUserList({}).then(res=>{
      const result = getResponse(res);
      if(result) {
        updateUser({ userList: result.content });
      }
    })
  }
  @Bind()
  public handleAdd() {
    const {
      updateState,
      form: { validateFieldsAndScroll, resetFields },
      todoState: { todoList = [] }
    } = this.props;
    const { userId, listDom } = this.state;
    validateFieldsAndScroll((err: any, values: any)=>{
      if(!err) {
        const { content } = values;
        content && updateState({
          todoList: [
            { userId, content, completed: false, time: Date.now(), _id: uuid() },
            ...todoList
          ]
        });
        add({ userId, content, completed: false }).then(res=>{
          if(res) {
            notification.success();
            listDom && listDom.handleSearchList({ userId });
          }
        })
        resetFields();
      }
    })
  }

  @Bind()
  public handleRef(node: any) {
    this.setState({
      listDom: node
    })
  }
  public render() {
    const { userId } = this.state;
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
        <TodoList userId={userId} onRef={this.handleRef}/>
      </div>
    );
  }
}

export default withRouter(connect(
  (state: any)=>({todoState: state.todo}),
  { updateState: actions.updateState, updateUser: userActions.updateState }
)(Form.create()(Todo)));