const Koa = require('koa')
const serve = require('koa-static')
const routes = require('./routes')
const storage = require('./storage')
const populate = require('./populate')

const app = new Koa()

app.use(serve('./../client/public'))
app.use(routes)

storage.connectAndMigrate((connection) => {
  app.context.db = connection

  populate(connection)

  app.listen(8080, () => {
    console.log("App is listening on :8080")
  })
})