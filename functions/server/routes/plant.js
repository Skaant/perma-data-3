const html = require('../html')
const { plant: plantFetcher, lang: langFetcher, extracts: extractsFetcher } = require('../fetchers')
const getHigherRanks = require('./utils/getHigherRanks')

module.exports = (req, res) => {
  const { lang, params } = req
  const plantId = params[0].slice(1)

  plantFetcher(plantId)
    .then(plant => {
      plant.id = plantId
      Promise.all([langFetcher(lang), getHigherRanks(plant), extractsFetcher(lang, plantId)])
        .then(([langs, higherRanks, extracts]) => res.send(html('plant', {
          lang,
          langs,
          data: {
            plant: Object.assign({}, plant, higherRanks),
            extracts
          }
        }))
      )
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}