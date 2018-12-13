import request from '../utils/request';

export async function add(params: any) {
  return request(`/todo/add`, {
    method: 'POST',
    data: params,
  })
}

export async function fetchTodoList(params: any) {
  return request(`/todo/fetch`, {
    method: 'GET',
    params,
  })
}