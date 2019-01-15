const plants = require('./api/plants')
const plantSearch = require('./api/plantSearch')
const biblios = require('./api/biblios')
const userData = require('./api/userData')

module.exports = router => {
  router.route('/plants/search/:key').get(plants.search)
  router.route('/plants').put(plants.add)
  router.route('/plant-search/:keyword').get(plantSearch)
  router.route('/plant-search/:rank/:keyword').get(plantSearch)
  router.route('/biblios').get(biblios)
  router.route('/user-data/:userId').get(userData)
  return router
}