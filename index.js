require('dotenv').config()
require('./mongo')

const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
const express = require("express")
const app = express()
//const cors = require('cors')
//const logger=require('./loggerMiddleware')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
//permite a todos los servidores hacer peticiones a este servidor
//app.use(cors())
//  para crear por post
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')

//  para que el servidor pueda leer json
app.use(express.json())
app.use('/imagenes',express.static('imagenes'))
Sentry.init({
  dsn: "https://55d6f3acc72242e996089fe25f80e1f9@o4504566835183616.ingest.sentry.io/4504616532574208",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.get('/', (request, response) => {
  console.log(request.ip)
  console.log(request.ips)
  console.log(request.originalUrl)
  response.send('<h1>Hello World!</h1>')
})
//  para crear por post notas
app.use('/api/notes', notesRouter)
//  para crear por post usuarios
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

//  para manejar errores
app.use(notFound)
app.use(Sentry.Handlers.errorHandler());
app.use(handleErrors)
//
//  const port = 3001;
const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
//  console.log(`Server running on port ${port}`)
