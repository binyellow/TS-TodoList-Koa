import axios from 'axios';
import { notification } from 'antd';

notification.config({
  placement: 'bottomRight',
});

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const errorText = response.statusText;
  const error = new Error(errorText);
  // error.name = response.status;
  // error.response = response;
  throw error;
}

export default function request(url: string, options: any) {
  const newOptions = { responseType: 'json', ...options };
  // newOptions.body = JSON.stringify(newOptions.body);
  return axios({
    url,
    ...newOptions
  })
    .then(checkStatus)
    .then(response => {
      if (response.status === 204) {
        return {};
      }
      if (newOptions.responseType === 'blob') {
        return response.blob();
      }
      return response;
    })
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        // removeAccessToken();
        window.location.href = "localhost:3000";
        return;
      }

      notification.error({
        message: `请求错误 ${status}`,
        description: e.message,
      });
    });
}