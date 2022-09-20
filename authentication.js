const Router = require('koa-router')
const jwt = require('./jwt')

const router = new Router({ prefix: '/auth' })

router.post('/', async (ctx) => {
    const requestUsername = ctx.request.body.username
    const requestPassword = ctx.request.body.password

    const user = await ctx.app.User.findOne({ 'username': requestUsername, 'password': requestPassword });
    
    if (user) {
        if (user.username === requestUsername && user.password === requestPassword) {
            ctx.body = {
                token: jwt.issue({
                    user: user
                })
            }
        }
    } else {
        ctx.status = 401
        ctx.body = { error: 'Invalid login or password' }
    }
})

module.exports = router