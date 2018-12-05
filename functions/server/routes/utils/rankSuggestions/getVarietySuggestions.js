const { plants: plantsFetcher } = require('../../../fetchers')

module.exports = plant => {
  if (plant.species) {
    return plantsFetcher('variety', {
      id: plant.species.id,
      rank: 'species'
    })
  }
  return plantsFetcher('variety', plant)
}