import { ADD } from '../constance/todo';

export function addTodo(payload) {
  return {
    payload,
    type: ADD,
  }
}
