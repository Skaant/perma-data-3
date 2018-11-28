const html = require('../html')
const { plant: plantFetcher, lang: langFetcher } = require('../fetchers')
const getHigherRanks = require('./utils/getHigherRanks')

module.exports = (req, res) => {
  const { lang, params } = req
  const plantId = params[0].slice(1)

  plantFetcher(plantId)
    .then(plant => {
      plant.id = plantId
      Promise.all([langFetcher(lang), getHigherRanks(plant)])
        .then(([langs, plant]) => res.send(html({
          name: 'plant',
          lang,
          langs,
          data: {
            plant
          }
        }))
      )
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}