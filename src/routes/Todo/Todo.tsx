import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../actions/todo'; // shadow name problem must to import *
import TodoList from './TodoList';
import styles from './index.module.less';

// @connect(
//   (state: any)=>state,
//   { addTodo }
// )
class Todo extends Component<{addTodo: any}, {}> {
  constructor(props: any) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }
  public handleAdd() {
    const { addTodo } = this.props;
    addTodo("a");
  }
  public render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.todo}>
          Todo: <Input/>
          <Button type="primary" icon="plus" onClick={this.handleAdd}>添加</Button>
        </div>
        <TodoList/>
      </div>
    );
  }
}

export default connect(state=>state, { addTodo: actions.addTodo })(Todo);