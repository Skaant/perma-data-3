const extractParentLineage = extractId =>
  new Promise((resolve, reject) => global.db.collection('extracts')
    .doc(extractId).get()
      .then(doc => {
        if (!doc.exists) {
          reject(new Error(`No extract found with id "${ extract.id }"`))
        } else {
          const { title, author, parent } = doc.data()
          if (!parent) {
            resolve({
              id: doc.id,
              title,
              author
            })
          } else {
            extractParentLineage(parent.id)
              .then(parent => {
                resolve({
                  id: doc.id,
                  title,
                  parent
                })
              })
              .catch(err => reject(err))
          }
        }
      })
      .catch(err => reject(err)))

module.exports = extractParentLineage