const documentId = require('firebase-admin').firestore.FieldPath.documentId()

module.exports = (rank, parent) => new Promise((resolve, reject) => {
  const plantRefs = parent ?
    global.db.collection('plants')
      .where('rank', '==', rank)
      .where(parent.rank, '==', global.db.collection('plants').doc(parent.id)) :
    global.db.collection('plants')
      .where('rank', '==', rank)
  plantRefs.get()
    .then(snapshot => {
      let plants = {}
      snapshot.forEach(doc =>{
        let data = doc.data()
        if (data.family) {
          data.family = data.family.id
        }
        if (data.genus) {
          data.genus = data.genus.id
        }
        if (data.species) {
          data.species = data.species.id
        }
        plants[doc.id] = Object.assign({}, data, { 
          id: doc.id
        })
      })
      return resolve(plants)
    })
    .catch(err => reject(err))
})