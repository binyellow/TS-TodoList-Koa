import { ADD, DELETE } from '../constance/todo';

export function addTodo(payload: any) {
  return {
    payload,
    type: ADD,
  }
}
export function deleteTodo(payload: any) {
  return {
    payload,
    type: DELETE,
  }
}
