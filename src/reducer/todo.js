import { ADD } from '../constance/todo';

export function todo(state = {}, action) {
  switch(action.type) {
    case ADD:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}
