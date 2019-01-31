const html = require('../../app/html/html')
const {
  plant: plantFetcher,
  langs: langsFetcher,
  datas: datasFetcher,
  plantRankParent: plantRankParentFetcher } = require('../../app/fetchers')
const sameRankPlant = require('./sameRankPlants/sameRankPlants')

module.exports = (req, res) => {
  const { lang, params, url } = req
  const id = 'plant'
  const plantId = params[0].slice(1)

  plantFetcher(plantId)
    .then(plant => {
      plant.id = plantId
      global.db.collection('plants').doc(plantId)
        .update({
          count: plant.count ? (plant.count + 1): 1
        })
        .catch(err => console.log(err))
      let promises = [langsFetcher(lang, id), datasFetcher(plantId),
      plantRankParentFetcher(plant, lang)]
      if (plant.rank !== 'family') {
        promises.push(sameRankPlant(plant, lang))
      } else {
        promises.push(new Promise(resolve => resolve([])))
      }
      if (plant.rank !== 'variety') {
        promises.push(sameRankPlant({
          parent: plant,
          id: null
        }, lang))
      } else {
        promises.push(new Promise(resolve => resolve([])))
      }
      Promise.all(promises)
        .then(([langs, datas, plant, similar, descendants]) => {
          res.send(html({
            id,
            lang,
            langs,
            title: plant.name,
            plant,
            similar,
            descendants,
            datas,
            url
          }))
        }
      )
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}