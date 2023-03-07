import koaRouter from 'koa-router';
import adminRouter from './adminRouter';
import articleRouter from './articleRouter';
import categoryRouter from './categoryRouter';
import tagRouter from './tagRouter';

const router = new koaRouter();

router.use('/admin', adminRouter.routes());
router.use('/article', articleRouter.routes());
router.use('/category', categoryRouter.routes());
router.use('/tag', tagRouter.routes());

export default router;
