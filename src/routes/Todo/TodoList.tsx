import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bind } from 'lodash-decorators';
import * as actions from '../../actions/todo';

interface TodoListProps {
  todoState: any,
  deleteTodo: any
}
class TodoList extends Component<TodoListProps> {
  @Bind()
  public handleDelete(index: number) {
    const { deleteTodo } = this.props;
    deleteTodo({ index });
  }

  public render() {
    const { todoState: { todoList = [] } } = this.props;
    return (
      <div>
        {todoList.map((item: any, index: number)=>(
          <p key={index} onClick={()=>this.handleDelete(index)}>{item.content}</p>
        ))}
      </div>
    )
  }
}
export default connect(
  (state: any)=>({todoState: state.todo}),
  { deleteTodo: actions.deleteTodo }
)(TodoList);
