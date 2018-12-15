import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { Bind } from 'lodash-decorators';
import { getResponse, createPagination } from 'utils/utils';
import { renderTimeStamp } from 'utils/render';
import { fetchTodoList } from 'service/todo';
import * as actions from '../../actions/todo';

interface TodoListProps {
  todoState: any,
  deleteTodo: any,
  addTodo: any,
  userId: number,
}
interface S {
  loading: boolean;
}
class TodoList extends Component<TodoListProps, S> {
  // public static getDerivedStateFromProps(props: TodoListProps, state: S): any {
  //   const { loading } = state;
  //   const { loading: nextLoading } = props;
  //   if( !loading && nextLoading !== loading ) {
  //     return {
  //       loading: nextLoading,
  //     }
  //   }
  //   return null;
  // }
  constructor(props: TodoListProps) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  public componentDidMount() {
    const { addTodo, userId } = this.props;
    fetchTodoList({ userId }).then(res=>{
      const result = getResponse(res);
      if(result) {
        this.setState({ loading: false });
        addTodo({ todoList: result.content, pagination: createPagination(result) });
      }
    })
  }
  @Bind()
  public handleDelete(index: number) {
    const { deleteTodo } = this.props;
    deleteTodo({ index });
  }
  @Bind()
  public handleChangePage(pagination: { current: number, pageSize: number }) {
    const { addTodo, userId } = this.props;
    const { current, pageSize } = pagination;
    this.setState({ loading: true });
    fetchTodoList({ userId, current, pageSize }).then(res=>{
      const result = getResponse(res);
      if(result) {
        addTodo({ todoList: result.content, pagination: createPagination(result) });
        this.setState({ loading: false });
      }
    })
  }
  public render() {
    const { loading = false } = this.state;
    const { todoState: { todoList = [], pagination = {} } } = this.props;
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
        width: 120,
        render: (value: boolean) => value ? '是' : '否',
      },
      {
        title: '备忘时间',
        dataIndex: 'time',
        width: 250,
        render: renderTimeStamp,
      }
    ];
    const tableProps = {
      columns,
      loading,
      pagination,
      rowKey: '_id',
      scroll: { y: 400 },
      bordered: true,
      dataSource: todoList,
      onChange: this.handleChangePage,
    }
    return (
      <Table {...tableProps}/>
    )
  }
}
export default connect(
  (state: any)=>({todoState: state.todo}),
  { deleteTodo: actions.deleteTodo, addTodo: actions.addTodo }
)(TodoList);
