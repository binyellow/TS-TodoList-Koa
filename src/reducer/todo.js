import { ADD, DELETE } from '../constance/todo';

export function todo(state = {}, action) {
  switch(action.type) {
    case ADD:
      return {
        ...state,
        ...action.payload
      }
    case DELETE:
      return {
        ...state,
        todoList: (state.todoList||[]).filter((item,index)=>action.payload.index!==index)
      }
    default:
      return state;
  }
}
