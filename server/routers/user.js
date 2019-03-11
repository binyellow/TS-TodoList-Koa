import KoaRouter from 'koa-router';
import { register, login, fetchUserList } from '../controller/user';
const user = new KoaRouter();

user.post('/register', register);
user.post('/login', login);
user.get('/fetchUserList', fetchUserList);

module.exports = user;