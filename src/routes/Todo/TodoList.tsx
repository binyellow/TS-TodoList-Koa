import React, { Component } from 'react';
import { Table, Button, Badge } from 'antd';
import { connect } from 'react-redux';
import { Bind } from 'lodash-decorators';
import { getResponse, createPagination } from 'utils/utils';
import { renderTimeStamp } from 'utils/render';
import { fetchTodoList, deleteTodo, toggleTodo } from 'service/todo';
import * as actions from '../../actions/todo';
import notification from 'utils/notification';

interface TodoListProps {
  user: any,
  todoState: any,
  updateState: any,
  toggleCompleted: any,
  userId: number,
  onRef: any,
}
interface S {
  loading: boolean;
  selectedRowKeys: string[];
}
interface RecordProps {
  _id: any;
  completed: boolean,
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
    props.onRef(this);
    this.state = {
      loading: true,
      selectedRowKeys: [],
    }
  }
  public componentDidMount() {
    const { userId } = this.props;
    this.handleSearchList({ userId });
  }
  @Bind()
  public handleSearchList(params: object) {
    this.setState({ loading: true });
    const { updateState } = this.props;
    fetchTodoList(params).then(res=>{
      const result = getResponse(res);
      if(result) {
        const { content } = result;
        this.setState({ loading: false });
        updateState({ todoList: content, pagination: createPagination(result) });
        this.handleSetSelectedRowKeys(content);
      }
    })
  }
  @Bind()
  public handleSetSelectedRowKeys(content: any[]) {
    const selectedRowKeys: any[] = [];
    content.forEach((item: { _id: any, completed: boolean })=>{
      if(item.completed) {
        selectedRowKeys.push(item._id);
      }
    })
    console.log(selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  @Bind()
  public handleDelete(record: RecordProps) {
    deleteTodo({_id: record._id}).then(res=>{
      const result = getResponse(res);
      if(result) {
        notification.success();
        const { userId } = this.props;
        this.handleSearchList({ userId });
      }
    })
  }
  @Bind()
  public handleChangeRow(selectedRowKeys: string[], selectedRows: any[]) {
    const { userId, todoState: { todoList = [] } } = this.props;
    // this.setState({ selectedRowKeys });
    // toggleCompleted({ selectedRowKeys });
    const toggleList: object[] = [];
    todoList.forEach((item: RecordProps)=> {
      if(selectedRowKeys.indexOf(item._id) >= 0) {
        if(!item.completed) {
          toggleList.push(item);  // 如果被选中但是先前没完成
        }
      } else if(item.completed) {
        toggleList.push(item);  // 或者之前没被选中 现在是完成
      }
    })
    toggleTodo({ toggleList }).then((res: object)=> {
      const result = getResponse(res);
      if(result) {
        notification.success();
        this.handleSearchList({ userId });
      }
    })
  }
  @Bind()
  public handleChangePage(pagination: { current: number, pageSize: number }) {
    const { updateState, userId } = this.props;
    const { current, pageSize } = pagination;
    this.setState({ loading: true });
    fetchTodoList({ userId, current, pageSize }).then(res=>{
      const result = getResponse(res);
      if(result) {
        updateState({ todoList: result.content, pagination: createPagination(result) });
        this.setState({ loading: false });
      }
    })
  }
  public render() {
    const { loading = false, selectedRowKeys } = this.state;
    const { todoState: { todoList = [], pagination = {} }, user, userId } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleChangeRow,
    }
    const { name } = user.userList.length > 0 && user.userList.find((item: { _id: any })=> item._id === userId);
    const columns = [
      {
        title: '用户名',
        dataIndex: 'userId',
        width: 250,
        render: ()=> <span>{name}</span>,
      },
      {
        title: '内容',
        dataIndex: 'content',
        width: 250,
        render: (val: string, record: RecordProps) =>
          record.completed ? 
            <span style={{textDecoration: 'line-through', color: '#ccc'}}>{val}</span> : 
            val,
      },
      {
        title: '是否已完成',
        dataIndex: 'completed',
        width: 120,
        align: 'center' as 'center',
        render: (value: boolean) => value ? <span><Badge status="success" text="Completed" /></span> : <span><Badge status="processing" text="Processing" /></span>,
      },
      {
        title: '备忘时间',
        dataIndex: 'time',
        width: 250,
        render: renderTimeStamp,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center' as 'center',
        width: 100,
        render: (val: string, record: RecordProps, index: number) =>
          <Button type="danger" onClick={()=>this.handleDelete(record)}>删除</Button>,
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
  (state: any)=>({todoState: state.todo, user: state.user}),
  { updateState: actions.updateState, toggleCompleted: actions.toggleCompleted }
)(TodoList);
