import {Appender} from 'log4js'

interface SerProp {
  port: string
}

interface DBProp {
  db_host: string
  db_name: string
  db_user:string
  db_port:string
  db_pass:string
}

interface LogProp {
  appenders: {
    [name: string]: Appender
  }
  categories: {
    [name: string]: {
      appenders: string[];
      level: string;
      enableCallStack?: boolean | undefined;
  };
  }
}

interface JwtProp {
  secret: string
  expire: string
}

interface ConfProp {
  server: SerProp
  db: DBProp
  log: LogProp
  jwt: JwtProp
}

const config:ConfProp = {
  server: {
    port: process.env.SERVER_PORT || ''
  },
  db: {
    db_host: process.env.DB_HOST || '',
    db_name: process.env.DB_NAME || '',
    db_user: process.env.DB_USER || '',
    db_port: process.env.DB_PORT || '',
    db_pass: process.env.DB_PASSWORD || '',
  },
  log: {
    appenders: {
      cheese: {type: 'file', filename: 'logs/cheese.log'},
      access: {type: 'file', filename: 'logs/access.log'},
      db: {type: 'file', filename: 'logs/db.log'},
    },
    categories: {
      default: {appenders: ['cheese'], level: 'info'},
      access: {appenders: ['access'], level: 'info'},
      db: {appenders: ['db'], level: 'info'},
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expire: process.env.JWT_EXPIRE || '',
  },
}

export default config