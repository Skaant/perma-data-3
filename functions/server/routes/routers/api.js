const plantSearch = require('./api/plantSearch')

module.exports = router => {
  router.route('/plant-search/:keyword').get(plantSearch)
  router.route('/plant-search/:rank/:keyword').get(plantSearch)
  return router
}