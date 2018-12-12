import request from '../utils/request';

export async function register(params: any) {
  return request(`/user/register`, {
    method: 'POST',
    data: params,
  })
}

export async function login(params: any) {
  return request(`/user/login`, {
    method: 'POST',
    data: params,
  })
}