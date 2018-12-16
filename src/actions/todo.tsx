import { ADD, DELETE, COMPLETED } from '../constance/todo';

export function addTodo(payload: object) {
  return {
    payload,
    type: ADD,
  }
}
export function deleteTodo(payload: object) {
  return {
    payload,
    type: DELETE,
  }
}

export function toggleCompleted(payload: any) {
  return {
    payload,
    type: COMPLETED,
  }
}
