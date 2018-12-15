import { notification } from 'antd';
import { PAGE_SIZE_OPTIONS } from 'constance/utils';

interface ResponseProps {
  current: number;
  pageSize: number;
  total: number;
}
function getResponse(response: any) {
  if (response && response.data.failed === true) {
    notification.error({
      message: '请求错误',
      description: response.data.message,
    });
  } else {
    return response.data;
  }
}

function createPagination(response: ResponseProps) {
  if(response) {
    return {
      showSizeChanger: true,
      pageSizeOptions: [...PAGE_SIZE_OPTIONS],
      current: response.current + 1,
      pageSize: response.pageSize,
      total: response.total,
      showTotal: (total: number, range: any) => `显示 ${range[0]} - ${range[1]} 共 ${total} 条`
    }
  }
  return {}
}

function parseParams(params: ResponseProps) {
  const { current = 1, pageSize = 10, ...other } = params;
  return {
    current: current - 1,
    pageSize,
    ...other,
  }
}

export { getResponse, createPagination, parseParams }