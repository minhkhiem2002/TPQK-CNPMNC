const UserRouter = require('./UserRouter')
const RequestRouter = require('./RequestRouter')
const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/request', RequestRouter)
}

module.exports = routes;