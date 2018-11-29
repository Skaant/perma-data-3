module.exports = plantId => new Promise((resolve, reject) => {
  global.db.collection('extracts')
    .where('plants', 'array-contains', plantId).get()
    .then(snapshot => {
      let extracts = {}
      snapshot.forEach(doc => {
        const data = doc.data()
        extracts[doc.id] = Object.assign({}, data, {
          id: doc.id
        })
      })
      resolve(extracts)
    })
    .catch(err => reject(err))
})