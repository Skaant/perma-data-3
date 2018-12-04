module.exports = () => new Promise((resolve, reject) => {
  global.db.collection('biblios')
    .then(snapshot => {
      let biblios = {}
      snapshot.forEach(doc => {
        const data = doc.data()
        biblios[doc.id] = Object.assign({}, data, {
          id: doc.id
        })
        resolve(biblios)
      })
    })
    .catch(err => reject(err))
})