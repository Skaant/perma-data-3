const extract = require('./contribute/extract')

module.exports = router => {
  router.route('/extract').put(extract)
  return router
}