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
const cors = require('koa2-cors')
import router from './routers/index';
const app = new Koa();

connect();
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3001, ()=>console.log('listen on 3001'));