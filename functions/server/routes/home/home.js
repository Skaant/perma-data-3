const html = require('../../app/html/html')
const { langs: langsFetcher } = require('../../app/fetchers')
const getPlantWithName = require('../routers/api/commons/getPlantWithName/getPlantWithName')

module.exports = (req, res) => {
  const { lang, url } = req
  const id = 'home'

  Promise.all([
    global.db.collection('plants')
      .where('featured', '==', true).get(),
    langsFetcher(lang, id)
  ])
    .then(([plantSnaphot, langs]) => {
      let plantWithNames = []
      plantSnaphot.forEach(doc => {
        plantWithNames.push(getPlantWithName({
          id: doc.id
        }, lang))
      })
      Promise.all(plantWithNames)
        .then(plants => {
          res.send(html({
          id,
          lang,
          langs,
          title: langs.title,
          description: langs.description,
          keywords: 'home,static,plants,search,collect',
          featured: plants,
          url
        }))})}
      )
    .catch(err => console.log(err))
}