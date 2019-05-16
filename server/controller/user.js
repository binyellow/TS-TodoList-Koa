import user from '../models/user';
import { successResponse, failedResponse } from '../utils/response';
import jsonwebtoken from 'jsonwebtoken';

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
      ctx.body = successResponse({
        message: "登录成功!",
        content: passRes,
        token: jsonwebtoken.sign({
          data: name,
          exp: Math.floor(Date.now() / 1000) + (60),
        }, 'huangbin')
      });
    } else {
      ctx.body = failedResponse({ message: "密码不正确!" });
    }
  } else {
    ctx.body = failedResponse({ message: '账号不存在!' });
  }
}

async function fetchUserList(ctx, next) {
  const content = await user.find();
  if(content) {
    ctx.body = {
      failed: false,
      message: '查询成功',
      content
    }
  } else {
    ctx.body = {
      failed: true,
      message: '无list',
      content: []
    }
  }
}
module.exports = { register, login, fetchUserList }