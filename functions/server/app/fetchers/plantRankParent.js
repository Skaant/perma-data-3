const nameFetcher = require('./name')

const plantRankParent = (plant, lang) =>
  new Promise((resolve, reject) => {
    nameFetcher(plant, lang)
      .then(name => {
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
                    .then(parent => {
                      resolve(Object.assign({}, plant, {
                        parent,
                        name
                      }))
                    })
                    .catch(err => reject(err))
                }
              })
              .catch(err => reject(err))
        }
      })
    .catch(err => reject(err))
  })

module.exports = plantRankParent