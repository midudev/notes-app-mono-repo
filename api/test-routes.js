const { app } = require('./index')

console.log(
  app._router.stack
    .filter(route => route.route)
    .map(route => route.route.path)
)
