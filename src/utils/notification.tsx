import { notification } from 'antd';

interface ParamsProps {
  message: string
  description: string
  // [key: string]: any
}
/**
 * 操作成功通知提示
 * @function success
 * @param {object} params - 默认属性
 * @param {?string} [params.message=操作成功] - 提示信息
 * @param {?string} [params.description] - 详细描述
 */
function success(params?: ParamsProps) {
  const { message = "操作成功", description = "", ...others } = params || {};
  notification.success({
    message,
    description,
    duration: 2,
    ...others,
  });
}

// /**
//  * 操作失败通知提示
//  * @function error
//  * @param {object} params - 默认属性
//  * @param {?string} [params.message=操作失败] - 提示信息
//  * @param {?string} [params.description] - 详细描述
//  */
// function error({ message:string = "操作失败", description: string = "", ...others: any }) {
//   notification.error({
//     message: message,
//     description,
//     duration: 2,
//     ...others,
//   });
// }

// /**
//  * 操作异常通知提示
//  * @function warning
//  * @param {object} params - 默认属性
//  * @param {?string} [params.message=操作异常] - 提示信息
//  * @param {?string} [params.description] - 详细描述
//  */
// function warning({ message: string, description: string, ...others: any }) {
//   notification.warning({
//     message: message || "操作异常",
//     description,
//     duration: 2,
//     ...others,
//   });
// }

// /**
//  * 操作信息通知提示
//  * @function info
//  * @param {object} config - 默认属性
//  * @param {?string} [params.message] - 提示信息
//  * @param {?string} [params.description] - 详细描述
//  */
// function info({ message: string, description: string, ...others: any }) {
//   notification.info({
//     message,
//     description,
//     duration: 2,
//     ...others,
//   });
// }

export default {
  success,
  // error,
  // warning,
  // info,
};
