module.exports = plantId => new Promise((resolve, reject) => {
  let extracts = {}
  let ref = global.db.collection('extracts')
    .where('plants', 'array-contains', plantId).get()
    .then(snapshot => {
      snapshot.forEach(doc => extracts[doc.id] = doc.data())
      resolve(nodes)
    })
    .catch(err => reject(err))
})