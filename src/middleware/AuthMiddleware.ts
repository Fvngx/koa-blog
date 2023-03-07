import { Context, Next } from 'koa';
import { verify } from '../../utils/auth';

function AuthMiddleware(ctx: Context, next: Next) {
  const token = ctx.headers['authorization'];
  if (token !== undefined && token !== '') {
    const { error } = verify(token);
    if (error !== null) {
      ctx.body = {
        msg: error,
        code: 401,
      };
      return;
    } else {
      return next();
    }
  }
  ctx.body = {
    msg: 'authorization 不可为空',
    code: 401,
  };
  return;
}

export default AuthMiddleware;
