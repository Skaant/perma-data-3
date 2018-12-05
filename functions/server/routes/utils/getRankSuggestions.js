const { plants: plantsFetcher } = require('../../fetchers')
const getFamilySuggestions = require('./rankSuggestions/getFamilySuggestions')
const getGenusSuggestions = require('./rankSuggestions/getGenusSuggestions')
const getSpeciesSuggestions = require('./rankSuggestions/getSpeciesSuggestions')
const getVarietySuggestions = require('./rankSuggestions/getVarietySuggestions')

module.exports = plant => new Promise((resolve, reject) => {
  let suggestions = {}

  suggestions.family = getFamilySuggestions(plant)
  suggestions.genus = getGenusSuggestions(plant)
  suggestions.species = getSpeciesSuggestions(plant)
  suggestions.variety = getVarietySuggestions(plant)

  const promises = Promise.all(Object.keys(suggestions)
    .sort((a, b) => a.localeCompare(b))
    .map(key => suggestions[key]))

  promises.then(values => {
    resolve(Object.keys(suggestions)
      .sort((a, b) => a.localeCompare(b))
      .reduce((filledSuggestions, key, index) => {
        if (plant[key]) {
          delete values[index][plant[key].id]
        } else if (plant.rank === key) {
          delete values[index][plant.id]
        }
        filledSuggestions[key] = values[index]
        return filledSuggestions
      }, {}))
  }).catch(err => reject(err))
})