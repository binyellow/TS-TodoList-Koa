import todo from '../models/todo';

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
  const { userId } = ctx.query;
  const res = await todo.find({ userId });
  if(res.length!==0) {
    ctx.body = {
      failed: false,
      message: "查询成功",
      content: res
    }
  } else {
    ctx.body = {
      failed: false,
      message: '无list',
      content: []
    }
  }
}

module.exports = { add, fetchList }