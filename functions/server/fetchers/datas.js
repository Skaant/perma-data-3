module.exports = plantId => new Promise((resolve, reject) => {
  global.db.collection('datas')
    .where('plants', 'array-contains', global.db.collection('plants').doc(plantId)).get()
    .then(snapshot => {
      let datas = []
      snapshot.forEach(doc => {
        const data = { extract, plants } = doc.data()
        datas.push(Object.assign({}, data, {
          id: doc.id,
          extract: extract.id,
          plants: plants.map((id) => id)
        }))
      })
      resolve(datas)
    })
    .catch(err => reject(err))
})