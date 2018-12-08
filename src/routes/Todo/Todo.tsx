import React, { Component } from 'react';
import styles from './index.module.less';

class Todo extends Component {
  public render() {
    return (
      <div className={styles.todo}>
        <div>Todo</div>
      </div>
    );
  }
}

export default Todo;