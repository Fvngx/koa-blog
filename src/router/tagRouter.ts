import KoaRouter from 'koa-router';
import TagController from '../contoller/TagController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const tagRouter = new KoaRouter();
tagRouter.use(['/add', '/update/:id', '/del/:id'], AuthMiddleware);

tagRouter.post('/add', TagController.add);
tagRouter.post('/update/:id', TagController.update);
tagRouter.post('/del/:id', TagController.del);
tagRouter.get('/detail/:id', TagController.detail);
tagRouter.get('/list', TagController.list);

export default tagRouter;
