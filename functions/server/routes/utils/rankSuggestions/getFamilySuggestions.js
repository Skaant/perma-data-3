const { plants: plantsFetcher } = require('../../../fetchers')

module.exports = plant => {
  return plantsFetcher('family')
}