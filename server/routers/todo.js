import KoaRouter from 'koa-router';
import { add, fetchList, deleteItem } from '../controller/todo';
const todo = new KoaRouter();

todo.post('/add', add);
todo.get('/fetch', fetchList);
todo.del('/delete', deleteItem);

module.exports = todo;