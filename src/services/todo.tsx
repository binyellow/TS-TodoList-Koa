import request from '../utils/request';
import { parseParams } from 'utils/utils';

export async function add(params: any) {
  return request(`/todo/add`, {
    method: 'POST',
    data: params,
  })
}

export async function fetchTodoList(params: any) {
  return request(`/todo/fetch`, {
    method: 'GET',
    params: parseParams(params),
  })
}