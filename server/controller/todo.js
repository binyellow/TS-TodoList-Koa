import todo from '../models/todo';

async function get(ctx, next) {
  const { content } = ctx.query;
  const res = await todo.findOne({content});
  if(res.length!==0) {
    ctx.body = {
      failed: false,
      message: res
    }
  } else {
    ctx.body = {
      failed: true,
      message: 'no content'
    }
  }
}

module.exports = { get }