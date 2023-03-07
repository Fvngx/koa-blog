import Koa from 'koa';
import dotenv from 'dotenv';
dotenv.config();
import db from './db';
db();
import router from './router';

import { Server } from 'http';
import KoaBody from 'koa-body';
import cors from 'koa2-cors';
import AccessLogMiddleware from './middleware/AccessLogMiddleware';
const app = new Koa();

app
  .use(cors())
  .use(
    KoaBody({
      multipart: true,
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // 设置上传文件的上限，默认为2M
      },
    })
  )
  .use(router.routes())
  .use(AccessLogMiddleware);
// .use(router.allowedMethods());

const run = (port: any): Server => {
  return app.listen(port);
};

export default run;
