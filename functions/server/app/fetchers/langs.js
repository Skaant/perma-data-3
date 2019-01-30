module.exports = (lang, pageId) =>
  new Promise((resolve, reject) =>
    global.db.collection('langs')
      .doc(`${ pageId }-${ lang }`).get()
        .then(doc => {
          if (!doc.exists) {
            resolve({})
          }
          return resolve(doc.data())
        })
        .catch(err => reject(err)))