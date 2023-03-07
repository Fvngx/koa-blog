import koaRouter from 'koa-router';
import ArticleController from '../contoller/ArticleController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const articleRouter = new koaRouter();

articleRouter.use(['/add', '/update/:id', '/del/:id'], AuthMiddleware);

articleRouter.post('/add', ArticleController.add);
articleRouter.post('/update/:id', ArticleController.update);
articleRouter.post('/del/:id', ArticleController.del);
articleRouter.post('/detail/:id', ArticleController.detail);
articleRouter.get('/list', ArticleController.list);
articleRouter.get('/search', ArticleController.search);

export default articleRouter;
