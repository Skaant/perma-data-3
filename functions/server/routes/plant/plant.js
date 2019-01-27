const html = require('../../app/html/html')
const {
  plant: plantFetcher,
  langs: langsFetcher,
  datas: datasFetcher } = require('../../app/fetchers')

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
      Promise.all([langsFetcher(lang, id), datasFetcher(plantId)])
        .then(([langs, datas]) => {
          const name = datas.find(data => data.tags.includes('name')
            && data.tags.includes(lang) && data.tags.includes('main'))
          res.send(html({
            id,
            lang,
            langs,
            title: name ? name.value : plantId,
            data: {
              plant,
              datas
            },
            url
          }))
        }
      )
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}