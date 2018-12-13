import KoaRouter from 'koa-router';
import { add, fetchList } from '../controller/todo';
const todo = new KoaRouter();

todo.post('/add', add);
todo.get('/fetch', fetchList);

module.exports = todo;