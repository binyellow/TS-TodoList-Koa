/*
 * server root file
 * @date: 2018-12-05
 * @author: HB <bin.huang02@hand-china.com>
 * @version: 0.0.1
 * @copyright Copyright (c) 2018, Hand
 */

import Koa from 'koa';
import connect from './db/connect';
import Todo from './models/todo';
const app = new Koa();

connect();

const test = async () => {
  const todo = new Todo({
    content: 'test',
    completed: false,
  })
  const res = await todo.save();
  console.log(res);
}
const main = ctx => {
  test();
  ctx.response.body = 'Hello World';
};

app.use(main);
app.listen(3000, ()=>console.log('listen on 3000'));