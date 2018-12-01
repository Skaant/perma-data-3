const content = require('./contribute/content')

module.exports = router => {
  router.route('/content').put(content)
  return router
}