module.exports = (lang, plantId) => new Promise((resolve, reject) => {
  global.db.collection('extracts')
    .where('lang', '==', lang)
    .where('plants', 'array-contains', global.db.collection('plants').doc(plantId)).get()
    .then(snapshot => {
      let extracts = {}
      let biblioRefs = []
      snapshot.forEach(doc => {
        const data = doc.data()
        extracts[doc.id] = Object.assign({}, data, {
          id: doc.id
        })
        if (data.biblio && !biblioRefs.includes(data.biblio)) {
          biblioRefs.push(data.biblio.get())
        }
      })
      Promise.all(biblioRefs)
        .then(snapshot => {
          let biblios = {}
          snapshot.forEach(doc => {
            const data = doc.data()
            biblios[doc.id] = Object.assign({}, data, {
              id: doc.id
            })
          })
          resolve(Object.keys(extracts).map(key => {
            const extract = extracts[key]
            return Object.assign({}, extract, {
              biblio: biblios[extract.biblio.id]
            })
          }))
        }).catch(err => reject(err))
    }).catch(err => reject(err))
})