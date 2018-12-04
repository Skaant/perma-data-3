const content = require('./contribute/content')
const plant = require('./contribute/plant')

module.exports = router => {
  router.route('/content').put(content)
  router.route('/plant').put(plant)
  return router
}