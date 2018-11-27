const express = require('express')
const routes = require('./routes')
const middlewares = require('./middlewares')
const LANGS = require('../utils/refs/langs')

const app = express()
const langRouter = express.Router()

app.use(middlewares.lang)

// 1. fill the lang router with every routes
Object.keys(routes).forEach(name => langRouter.route(`/${ name }*`).get(routes[name]))

// 2. associate the lang router to every lang prefix
LANGS.forEach(lang => app.use('/' + lang.toLowerCase(), langRouter))

module.exports = app