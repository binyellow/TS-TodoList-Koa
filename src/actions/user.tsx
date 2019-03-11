import { QUERY } from '../constance/user';

export function updateState(payload: object) {
  return {
    payload,
    type: QUERY,
  }
}
