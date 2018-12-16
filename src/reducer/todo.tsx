import { ADD, DELETE, COMPLETED } from '../constance/todo';

interface ActionProps {
  payload: any;
  type: string;
}
interface S {
  pagination: object,
  todoList: any[];
}
const initialState = {
  pagination: {},
  todoList: [],
}
export default function todo(state: S = initialState, action: ActionProps) {
  switch(action.type) {
    case ADD:
      return {
        ...state,
        ...action.payload
      }
    case DELETE:
      return {
        ...state,
        todoList: state.todoList.filter((item: any,index: number)=>action.payload.index!==index)
      }
    case COMPLETED:
      const { todoList } = state;
      const { selectedRowKeys } = action.payload;
      return {
        ...state,
        todoList: todoList.map((item: { _id: any, completed: boolean })=>{
          if(selectedRowKeys.includes(item._id)) {
            return {
              ...item,
              completed: true,
            }
          } else {
            if(item.completed) {
              return {
                ...item,
                completed: false,
              }
            }
            return item;
          }
        })
      }
    default:
      return state;
  }
}
