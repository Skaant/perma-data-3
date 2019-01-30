const plants = require('./api/plants')
const userData = require('./api/users')
const extracts = require('./api/extracts')
const datas = require('./api/datas')
const inventories = require('./api/inventories')

module.exports = router => {
  router.route('/plants/search/:lang/:key').get(plants.search)
  router.route('/plants').put(plants.add)

  router.route('/extracts/search/:key').get(extracts.search)
  router.route('/extracts/subs/:id').get(extracts.subs)
  router.route('/extracts').put(extracts.add)

  router.route('/datas').put(datas.add)

  router.route('/users/:userId').get(userData.get)

  router.route('/inventories/:userId').get(inventories.get)
  router.route('/inventories/plant/:userId').post(inventories.addPlant)
  router.route('/inventories/plant/:userId').delete(inventories.deletePlant)
  return router
}