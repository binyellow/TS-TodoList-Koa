import { notification } from 'antd';

export function getResponse(response: any) {
  if (response && response.data.failed === true) {
    notification.error({
      message: '请求错误',
      description: response.data.message,
    });
  } else {
    return response.data;
  }
}