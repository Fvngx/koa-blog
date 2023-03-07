import KoaRouter from 'koa-router';
import CategoryController from '../contoller/CategoryController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const categoryRouter = new KoaRouter();

categoryRouter.use(['/add', '/update/:id', '/del/:id'], AuthMiddleware);

categoryRouter.post('/add', CategoryController.add);
categoryRouter.post('/update/:id', CategoryController.update);
categoryRouter.post('/del/:id', CategoryController.del);
categoryRouter.get('/detail/:id', CategoryController.detail);
categoryRouter.get('/list', CategoryController.list);

export default categoryRouter;
