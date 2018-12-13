import React, { Component } from 'react';
import { Table } from 'antd';
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
    const columns = [
      {
        title: '用户id',
        dataIndex: 'userId',
        width: 250,
      },
      {
        title: '内容',
        dataIndex: 'content',
        width: 250
      },
      {
        title: '是否已完成',
        dataIndex: 'completed',
        width: 150,
        render: (value: boolean) => value ? '是' : '否',
      },
      {
        title: '备忘时间',
        dataIndex: 'time',
        width:150
      }
    ];
    const tableProps = {
      columns,
      rowKey: '_id',
      bordered: true,
      dataSource: todoList
    }
    return (
      <Table {...tableProps}/>
    )
  }
}
export default connect(
  (state: any)=>({todoState: state.todo}),
  { deleteTodo: actions.deleteTodo }
)(TodoList);
