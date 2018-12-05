const { plants: plantsFetcher } = require('../../../fetchers')

module.exports = plant => {
  if (plant.genus) {
    return plantsFetcher('species', {
      id: plant.genus.id,
      rank: 'genus'
    })
  }
  return plantsFetcher('species', plant)
}