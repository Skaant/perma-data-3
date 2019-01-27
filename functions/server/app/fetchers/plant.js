module.exports = plantId => new Promise((resolve, reject) => global.db.collection('plants')
  .doc(plantId).get()
    .then(doc => {
      if (!doc.exists) {
        reject(new Error(`No plant found with id "${ plantId }"`))
      }
      return resolve(doc.data())
    })
    .catch(err => reject(err)))