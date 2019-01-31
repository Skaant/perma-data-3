const nameFetcher = require('../../../app/fetchers/name')

module.exports = (plant, lang) => new Promise((resolve, reject) =>
  global.db.collection('plants')
    .where('parent', '==',
      global.db.collection('plants').doc(plant.parent.id)).get()
    .then(snapshot => {
      let plants = []
      let promises = []
      snapshot.forEach(doc => {
        if (doc.id !== plant.id) {
          const { rank } = doc.data()
          plants.push({
            id: doc.id,
            rank
          })
          promises.push(nameFetcher({
            id: doc.id
          }, lang))
        }
      })
      Promise.all(promises)
        .then(names => resolve(plants.map((plant, index) =>
          Object.assign({}, plant, {
            name: names[index]
          }))))
    })
    .catch(err => reject(err)))