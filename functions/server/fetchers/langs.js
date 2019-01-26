module.exports = (lang, pageId) =>
  new Promise((resolve, reject) =>
    global.db.collection('langs')
      .doc(`${ pageId }-${ lang }`).get()
        .then(doc => {
          if (!doc.exists) {
            reject(new Error(`Language reference "${ pageId }-${ lang }" not found`))
          }
          return resolve(doc.data())
        })
        .catch(err => reject(err)))