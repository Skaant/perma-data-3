module.exports = lang => new Promise((resolve, reject) => global.db.collection('langs')
  .doc(lang).get()
    .then(doc => {
      if (!doc.exists) {
        reject(new Error(`Lang "${ lang }" not found`))
      }
      return resolve(doc.data())
    })
    .catch(err => reject(err)))