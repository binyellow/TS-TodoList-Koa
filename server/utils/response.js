/**
 * 成功返回数据
 * @param {Object} {content, total, current, pageSize}
 * @param content 内容
 * @param total? 总条数
 * @param current? 当前页
 * @param pageSize? 分页大小
 * @returns Object
 */
function successResponse({message, content, total = 10, current = 0, pageSize = 10}) {
  const result = JSON.parse(JSON.stringify({content, total, current, pageSize}));
  return {
    failed: false,
    message: message || '操作成功',
    ...result
  }
}

/**
 * 失败返回数据
 * @param {Object} {content, message}
 * @param content? 内容
 * @param message 消息
 * @returns Object
 */
function failedResponse({content, message}) {
  const result = JSON.parse(JSON.stringify({content, message}));
  return {
    failed: true,
    message,
    ...result
  }
}

module.exports = { successResponse, failedResponse }
