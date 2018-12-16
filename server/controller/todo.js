import todo from '../models/todo';
import { successResponse, failedResponse } from '../utils/response';
import { toSafeNumber } from '../utils/utils';

async function add(ctx, next) {
  const { userId, content, completed } = ctx.request.body;
  const res = await todo.create({ userId, content, completed });
  if(res.length!==0) {
    ctx.body = {
      failed: false,
      message: res
    }
  } else {
    ctx.body = {
      failed: true,
      message: '新增失败'
    }
  }
}

async function fetchList(ctx, next) {
  const { userId, current = 0, pageSize = 10 } = toSafeNumber(ctx.query, ['current', 'pageSize']);
  const total = todo.find({ userId });
  console.log(current, pageSize);
  let res = await total.sort({time: -1}).skip((current)*pageSize).limit(pageSize);
  if(res instanceof Array && res.length>=0) {
    ctx.body = successResponse({
      current,
      pageSize,
      total: total.length,
      message: "查询成功",
      content: res,
    });
  } else {
    ctx.body = {
      failed: false,
      message: '无list',
      content: []
    }
  }
}

async function deleteItem(ctx, next) {
  const { _id } = ctx.request.body;
  console.log(_id);
  const res = await todo.findOneAndDelete({ _id }).exec();
  console.log(res);
  if(res) {
    ctx.body = successResponse();
  } else {
    ctx.body = failedResponse();
  }
}

module.exports = { add, fetchList, deleteItem }