import user from '../models/user';

async function register(ctx, next) {
  const { name } = ctx.request.body;
  console.log(name);
  const res = await user.findOne({name});
  console.log(res);
  if(res) {
    ctx.body = {
      failed: true,
      message: "用户名已存在"
    }
  } else {
    const add = await user.create(ctx.request.body);
    console.log(add);
    ctx.body = {
      failed: false,
      message: "注册成功"
    }
  }
}
module.exports = { register }