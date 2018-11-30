module.exports = (lang, plantId) => new Promise((resolve, reject) => {
  console.log(global.db.collection('plants').doc(plantId))
  global.db.collection('extracts')
    .where('lang', '==', lang)
    .where('plants', 'array-contains', global.db.collection('plants').doc(plantId)).get()
    .then(snapshot => {
      let extracts = {}
      console.log(snapshot.docs)
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