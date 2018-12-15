import user from '../models/user';
import { successResponse, failedResponse } from '../utils/response';

async function register(ctx, next) {
  const { name } = ctx.request.body;
  const res = await user.findOne({ name });
  if(res) {
    ctx.body = failedResponse({message: '用户名已存在', content: res});
  } else {
    const add = await user.create(ctx.request.body);
    ctx.body = successResponse({message: "注册成功", content: res});
  }
}

async function login(ctx) {
  const { name, passWord } = ctx.request.body;
  const res = await user.findOne({ name });
  if(res) {
    const passRes = await user.findOne({ name, passWord });
    if(passRes) {
      ctx.body = successResponse({ message: "登录成功!", content: passRes });
    } else {
      ctx.body = failedResponse({ message: "密码不正确!" });
    }
  } else {
    ctx.body = failedResponse({ message: '账号不存在!' });
  }
}
module.exports = { register, login }