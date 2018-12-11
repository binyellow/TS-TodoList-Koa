import KoaRouter from 'koa-router';
import todo from './todo';
import user from './user';

const router = new KoaRouter();
router.use('/todo', todo.routes(), todo.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());

module.exports = router;
