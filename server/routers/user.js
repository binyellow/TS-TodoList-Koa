import KoaRouter from 'koa-router';
import { register } from '../controller/user';
const user = new KoaRouter();

user.post('/register', register);

module.exports = user;