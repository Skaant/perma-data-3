const extractParentLineage = require('./extractParentLineage')

module.exports = (plantId, linkExtracts) => new Promise((resolve, reject) => {
  global.db.collection('datas')
    .where('plants', 'array-contains', global.db.collection('plants').doc(plantId)).get()
    .then(snapshot => {
      let datas = []
      let extractIds = []
      snapshot.forEach(doc => {
        const data = { extract, plants } = doc.data()
        datas.push(Object.assign({}, data, {
          id: doc.id,
          extract: extract.id,
          plants: plants.map((id) => id)
        }))
        if (linkExtracts && !extractIds.includes(extract.id)) {
          extractIds.push(extract.id)
        }
      })
      if (linkExtracts) {
        Promise.all(extractIds.map(extractId => extractParentLineage(extractId)))
          .then(extracts =>resolve({
            datas,
            extracts
          }))
          .catch(err => reject(err))
        } else {
          resolve({ datas })
        }
      })
    .catch(err => reject(err))
})