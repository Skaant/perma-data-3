const plants = require('./api/plants')
const extracts = require('./api/extracts')
const userData = require('./api/userData')

module.exports = router => {
  router.route('/plants/search/:key').get(plants.search)
  router.route('/plants').put(plants.add)

  router.route('/extracts/search/:key').get(extracts.search)
  router.route('/extracts/subs/:id').get(extracts.subs)
  router.route('/extracts').put(extracts.add)

  router.route('/user-data/:userId').get(userData)
  return router
}