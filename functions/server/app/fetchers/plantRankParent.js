const datasFetcher = require('./datas')

const plantRankParent = (plant, lang) => 
  new Promise((resolve, reject) => {
    datasFetcher(plant.id)
      .then(datas => {
        const nameData = datas.find(data => data.tags.includes('name')
          && data.tags.includes(lang) && data.tags.includes('main'))
        const name = nameData ? nameData.value : plant.id
        if (plant.rank === 'family') {
          resolve(Object.assign({}, plant, { name }))
        } else {
          global.db.collection('plants')
            .doc(plant.parent.id).get()
              .then(doc => {
                if (!doc.exists) {
                  reject(new Error(`No plant found with id "${ plantId }"`))
                } else {
                  const { rank, parent } = doc.data()
                  plantRankParent({
                    lang,
                    id: doc.id,
                    rank,
                    parent
                  }, lang)
                    .then(parent => resolve(Object.assign({}, plant, {
                      parent,
                      name
                    })))
                }
              })
              .catch(err => reject(err))
        }
      })
    .catch(err => reject(err))
  })

module.exports = plantRankParent