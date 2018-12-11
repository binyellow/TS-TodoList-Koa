import request from '../utils/request';

export async function register(params: any) {
  return request(`/user/register`, {
    method: 'POST',
    data: params,
  })
}