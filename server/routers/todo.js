import KoaRouter from 'koa-router';
import { add, fetchList, deleteItem, toggle } from '../controller/todo';
const todo = new KoaRouter();

todo.post('/add', add);
todo.get('/fetch', fetchList);
todo.del('/delete', deleteItem);
todo.put('/toggle', toggle);

module.exports = todo;