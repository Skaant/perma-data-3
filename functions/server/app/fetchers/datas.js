module.exports = (plantId, linkExtracts) => new Promise((resolve, reject) => {
  global.db.collection('datas')
    .where('plants', 'array-contains', global.db.collection('plants').doc(plantId)).get()
    .then(snapshot => {
      let datas = []
      let extractRefs = []
      snapshot.forEach(doc => {
        const data = { extract, plants } = doc.data()
        datas.push(Object.assign({}, data, {
          id: doc.id,
          extract: extract.id,
          plants: plants.map((id) => id)
        }))
        if (linkExtracts && !extractRefs.includes(extract.id)) {
          extractRefs.push(global.db.collection('extracts').doc(extract.id))
        }
      })
      if (linkExtracts) {
        let extracts = []
        Promise.all(extractRefs.map(extractRef => extractRef.get()))
          .then(docs => {
            docs.map(doc => {
              if (doc.exists) {
                const { title } = doc.data()
                extracts.push({
                  id: doc.id,
                  title
                })
              }
            })
            resolve({
              datas,
              extracts
            })
          })
          .catch(err => reject(err))
        } else {
          resolve({ datas })
        }
      })
    .catch(err => reject(err))
})