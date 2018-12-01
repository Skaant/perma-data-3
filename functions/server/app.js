const express = require('express')
const routes = require('./routes')
const middlewares = require('./middlewares')
const apiRouter = require('./routes/routers/api')
const contributeRouter = require('./routes/routers/contribute')
const LANGS = require('../utils/refs/langs')
const { contributor } = require('./routes')

const app = express()

app.use('/api', apiRouter(express.Router()))
app.use('/contribute', contributeRouter(express.Router()))

app.get('/contributor', contributor)

const langRouter = express.Router()

app.use(middlewares.lang)

// 1. fill the lang router with every routes
Object.keys(routes).forEach(name => langRouter.route(`/${ name }*`).get(routes[name]))

// 2. associate the lang router to every lang prefix
LANGS.forEach(lang => app.use('/' + lang.toLowerCase(), langRouter))

module.exports = app