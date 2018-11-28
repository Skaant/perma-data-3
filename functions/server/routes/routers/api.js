const plants = require('./api/plants')

module.exports = router => {
  router.route('/search').get(plants)
  return router
}