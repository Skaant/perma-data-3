const html = require('../html')
const { plant: plantFetcher } = require('../fetchers')
const getHigherRanks = require('./utils/getHigherRanks')

module.exports = (req, res) => {
  const { lang, params } = req
  const plantId = params[0].slice(1)

  plantFetcher(plantId)
    .then(plant => {
      plant.id = plantId
      getHigherRanks(plant)
        .then(plant => {
          res.send(html({
            name: 'plant',
            lang,
            data: { plant }
          }))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}