import KoaRouter from 'koa-router';
import { get } from '../controller/todo';
const todo = new KoaRouter();

todo.get('/test', get);

module.exports = todo;