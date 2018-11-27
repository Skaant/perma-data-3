const routes = require('../routes')
const LANGS = require('../../utils/refs/langs')

module.exports = (req, res, next) => {
  const lang = req.path.split('/')[1]
  req.lang = lang
  next()
}