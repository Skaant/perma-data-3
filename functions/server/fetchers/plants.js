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
      snapshot.forEach(doc => plants[doc.id] = Object.assign({}, plants[doc.id], {
        id: doc.id
      }))
      return resolve(plants)
    })
    .catch(err => reject(err))
})