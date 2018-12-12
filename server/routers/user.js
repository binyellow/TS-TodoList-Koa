import KoaRouter from 'koa-router';
import { register, login } from '../controller/user';
const user = new KoaRouter();

user.post('/register', register);
user.post('/login', login);

module.exports = user;