const html = require('../html/html')
const { plant: plantFetcher, lang: langFetcher, extracts: extractsFetcher } = require('../fetchers')
const getHigherRanks = require('./utils/getHigherRanks')
const getRankSuggestions = require('./utils/getRankSuggestions')

module.exports = (req, res) => {
  const { lang, params } = req
  const plantId = params[0].slice(1)

  plantFetcher(plantId)
    .then(plant => {
      plant.id = plantId
      global.db.collection('plants').doc(plantId)
        .update({
          count: plant.count ? (plant.count + 1): 1
        })
        .catch(err => console.log(err))
      Promise.all([langFetcher(lang), getHigherRanks(plant),
          getRankSuggestions(plant), extractsFetcher(lang, plantId)])
        .then(([langs, higherRanks, rankSuggestions, extracts]) => res.send(html('plant', {
            lang,
            langs,
            title: `${ plant.names[lang] } (${ lang.toUpperCase() }, ${ plant.id }) -`,
            pageSubTitle: langs.misc.plants,
            data: {
              plant: Object.assign({}, plant, higherRanks, {
                suggestions: rankSuggestions
              }),
              extracts
            }
        }))
      )
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}