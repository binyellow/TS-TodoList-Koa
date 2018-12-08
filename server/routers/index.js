import KoaRouter from 'koa-router';
import todo from './todo';

const router = new KoaRouter();
router.use('/todo', todo.routes(), todo.allowedMethods());

module.exports = router;
