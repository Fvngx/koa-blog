import koaRouter from 'koa-router';
import AdminController from '../contoller/AdminController';
const adminRouter = new koaRouter();

adminRouter.post('/register', AdminController.register);
adminRouter.post('/login', AdminController.login);

export default adminRouter;
