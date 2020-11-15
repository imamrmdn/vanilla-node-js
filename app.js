const http = require('http')
const routes = require('./routes')

/*
 * @param {routes} [createServer]
 * from func requestHandler [routes.js]
 */

const server = http.createServer(routes.handler);


server.listen(8080, 'localhost')