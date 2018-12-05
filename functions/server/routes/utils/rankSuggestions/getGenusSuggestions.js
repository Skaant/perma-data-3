const { plants: plantsFetcher } = require('../../../fetchers')

module.exports = plant => {
  if (plant.family) {
    return plantsFetcher('genus', {
      id: plant.family.id,
      rank: 'family'
    })
  }
  return plantsFetcher('genus', plant)
}