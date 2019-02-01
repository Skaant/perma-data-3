module.exports = (lang, pageId) =>
  new Promise((resolve, reject) =>
    Promise.all([
      global.db.collection('langs').doc(`main-${ lang }`).get(),
      global.db.collection('langs').doc(`${ pageId }-${ lang }`).get()
    ])
      .then(([main, context]) => {
        resolve(Object.assign({},
          main.exists ? main.data() : {},
          context.exists ? context.data() : {}))
      })
      .catch(err => reject(err)))