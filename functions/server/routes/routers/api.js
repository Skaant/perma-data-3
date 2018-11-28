const extracts = require('./api/extracts')

module.exports = router => {
  router.route('/extracts/:plant_id').get(extracts)
  return router
}