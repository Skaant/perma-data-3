const extract = require('./contribute/extract')
const plant = require('./contribute/plant')

module.exports = router => {
  router.route('/extract').put(extract)
  router.route('/plant').put(plant)
  return router
}