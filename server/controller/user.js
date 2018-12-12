import user from '../models/user';

async function register(ctx, next) {
  const { name } = ctx.request.body;
  const res = await user.findOne({ name });
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

async function login(ctx) {
  const { name, passWord } = ctx.request.body;
  const res = await user.findOne({ name });
  if(res) {
    const passRes = await user.findOne({ name, passWord });
    if(passRes) {
      ctx.body = {
        failed: false,
        message: "登录成功!",
        content: passRes,
      }
    } else {
      ctx.body = {
        failed: true,
        message: "密码不正确!"
      }
    }
  } else {
    ctx.body = {
      failed: true,
      message: '账号不存在!'
    }
  }
}
module.exports = { register, login }