const plantSearch = require('./api/plantSearch')
const biblios = require('./api/biblios')

module.exports = router => {
  router.route('/plant-search/:keyword').get(plantSearch)
  router.route('/plant-search/:rank/:keyword').get(plantSearch)
  router.route('/biblios').get(biblios)
  return router
}