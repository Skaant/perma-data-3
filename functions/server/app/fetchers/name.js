const datasFetcher = require('./datas')

module.exports = (plant, lang) => 
  new Promise((resolve, reject) => {
    datasFetcher(plant.id)
      .then(({ datas }) => {
        const nameData = datas.find(data => data.tags.includes('name')
          && data.tags.includes(lang) && data.tags.includes('main'))
        const name = nameData ? nameData.value : plant.id
        resolve(name)
      })
    .catch(err => reject(err))
  })