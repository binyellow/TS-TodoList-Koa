import React, { Component } from 'react';
import { Button, Input } from 'antd';
import TodoList from './TodoList';
import styles from './index.module.less';

class Todo extends Component {
  public render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.todo}>
          Todo: <Input/>
          <Button type="primary" icon="plus">添加</Button>
        </div>
        <TodoList/>
      </div>
    );
  }
}

export default Todo;