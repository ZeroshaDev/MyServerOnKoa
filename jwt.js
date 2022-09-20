const jwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')

const SECRET = 'test'
const jwtInstance = jwt({ secret: SECRET })
const jwtExpDate = '1h'

let JWTErrorHandler = (ctx, next) => {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401
            ctx.body = {
                'error': 'Not authorized'
            }
        } else {
            throw err
        }
    })
}

module.exports.jwt = () => jwtInstance
module.exports.errorHandler = () => JWTErrorHandler
module.exports.issue = (payload) => {
    return jsonwebtoken.sign({ payload }, SECRET, { expiresIn: jwtExpDate })
}