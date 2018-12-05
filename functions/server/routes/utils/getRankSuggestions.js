const { plants: plantsFetcher } = require('../../fetchers')
const getMoreGenus = require('./rankSuggestions/getMoreGenus')
const getMoreSpecies = require('./rankSuggestions/getMoreSpecies')
const getMoreVarieties = require('./rankSuggestions/getMoreVarieties')

module.exports = plant => new Promise((resolve, reject) => {
  let suggestions = {}

  suggestions.moreFamilies = plantsFetcher('family')
  suggestions.moreGenus = getMoreGenus(plant)
  suggestions.moreSpecies = getMoreSpecies(plant)
  suggestions.moreVarities = getMoreVarieties(plant)

  const promises = Promise.all(Object.keys(suggestions)
    .sort((a, b) => a.localeCompare(b))
    .map(key => suggestions[key]))

  promises.then(values => {
    resolve(Object.keys(suggestions)
      .sort((a, b) => a.localeCompare(b))
      .reduce((filledSuggestions, key, index) => {
        filledSuggestions[key] = values[index]
        return filledSuggestions
      }, {}))
  }).catch(err => reject(err))
})