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
  toggleCompleted: any,
  userId: number,
}
interface S {
  loading: boolean;
  selectedRowKeys: string[];
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
      selectedRowKeys: [],
    }
  }
  public componentDidMount() {
    const { addTodo, userId } = this.props;
    fetchTodoList({ userId }).then(res=>{
      const result = getResponse(res);
      if(result) {
        const { content } = result;
        this.setState({ loading: false });
        addTodo({ todoList: content, pagination: createPagination(result) });
        const selectedRowKeys: any[] = [];
        content.forEach((item: { _id: any, completed: boolean })=>{
          if(item.completed) {
            console.log(typeof item._id);
            selectedRowKeys.push(item._id);
          }
        })
        this.setState({ selectedRowKeys });
      }
    })
  }
  @Bind()
  public handleDelete(index: number) {
    const { deleteTodo } = this.props;
    deleteTodo({ index });
  }
  @Bind()
  public handleChangeRow(selectedRowKeys: string[]) {
    const { toggleCompleted } = this.props;
    this.setState({ selectedRowKeys });
    toggleCompleted({selectedRowKeys});
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
    const { loading = false, selectedRowKeys } = this.state;
    const { todoState: { todoList = [], pagination = {} } } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleChangeRow,
    }
    const columns = [
      {
        title: '用户id',
        dataIndex: 'userId',
        width: 250,
      },
      {
        title: '内容',
        dataIndex: 'content',
        width: 250,
        render: (val: string, record: { completed: boolean }) =>
          record.completed ? 
            <span style={{textDecoration: 'line-through', color: '#ccc'}}>{val}</span> : 
            val,
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
      rowSelection,
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
  { deleteTodo: actions.deleteTodo, addTodo: actions.addTodo, toggleCompleted: actions.toggleCompleted }
)(TodoList);
