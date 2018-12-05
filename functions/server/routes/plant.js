const html = require('../html')
const { plant: plantFetcher, lang: langFetcher, extracts: extractsFetcher } = require('../fetchers')
const getHigherRanks = require('./utils/getHigherRanks')
const getRankSuggestions = require('./utils/getRankSuggestions')

module.exports = (req, res) => {
  const { lang, params } = req
  const plantId = params[0].slice(1)

  plantFetcher(plantId)
    .then(plant => {
      plant.id = plantId
      Promise.all([langFetcher(lang), getHigherRanks(plant),
          getRankSuggestions(plant), extractsFetcher(lang, plantId)])
        .then(([langs, higherRanks, rankSuggestions, extracts]) => {
          console.log(higherRanks, rankSuggestions)
          return res.send(html('plant', {
            lang,
            langs,
            data: {
              plant: Object.assign({}, plant, higherRanks, {
                suggestions: rankSuggestions
              }),
              extracts
            }
          }))
        }
      )
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}