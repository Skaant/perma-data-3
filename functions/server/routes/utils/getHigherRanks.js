const { plant: plantFetcher } = require('../../fetchers')

module.exports = plant => new Promise((resolve, reject) => {
  let higherRanks = {}

  if (plant.family) {
    higherRanks.family = plantFetcher(plant.family.id)
  }
  if (plant.genus) {
    higherRanks.genus = plantFetcher(plant.genus.id)
  }
  if (plant.species) {
    higherRanks.genus = plantFetcher(plant.species.id)
  }

  const promises = Promise.all(Object.keys(higherRanks)
    .sort((a, b) => a.localeCompare(b))
    .map(key => higherRanks[key]))

  promises.then(values => {
    Object.keys(higherRanks)
      .sort((a, b) => a.localeCompare(b))
      .forEach((key, index) => plant[key] = Object.assign({}, values[index], {
        id: plant[key].id
      }))
    resolve(plant)
  }).catch(err => reject(err))
})