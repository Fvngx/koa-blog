import Router from 'koa-router'

import optimiz from './user/optimiz'

const router = new Router()

router.use('/api', optimiz)

module.exports = router
