import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from 'jsonwebtoken';
import config from '../src/config';

function sign(data: any) {
  return jwt.sign(data, config.jwt.secret, { expiresIn: config.jwt.expire });
}

function verify(token: string): {
  admin: JwtPayload | string | null;
  error: TokenExpiredError | JsonWebTokenError | null;
} {
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    return {
      admin: decoded,
      error: null,
    };
  } catch (err) {
    return {
      admin: null,
      error: err as TokenExpiredError | JsonWebTokenError | null,
    };
  }
}

export { sign, verify };
