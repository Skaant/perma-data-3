module.exports = (plant, lang) => new Promise((resolve, reject) => global.db.collection('datas')
  .where('plants', 'array-contains', 
    global.db.collection('plants').doc(plant.id)).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const { tags, value } = doc.data()
      if (tags.includes('name')
          && tags.includes(lang) && tags.includes('main')) {
        resolve(Object.assign({}, plant, {
          name: value
        }))
      }
    })
    resolve(plant)
  })
  .catch(err => reject(err)))