import { QUERY } from '../constance/user';

interface ActionProps {
  payload: any;
  type: string;
}
interface S {
  userList: any[];
}
const initialState = {
  userList: [],
}
export default function user(state: S = initialState, action: ActionProps) {
  switch(action.type) {
    case QUERY:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}
