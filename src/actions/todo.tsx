import { ADD } from '../constance/todo';

export function addTodo(payload: any) {
  return {
    payload,
    type: ADD,
  }
}
