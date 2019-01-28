const getById = id =>
  new Promise((resolve, reject) => 
    global.db.collection('plants').doc(id).get()
      .then(doc => {
        if (!doc.exists) {
          resolve([])
        } else {
          const { rank } = doc.data()
          resolve([{
            id: doc.id,
            rank
          }])
        }})
      .catch(err => reject(err)))

const getByTags = tag =>
  new Promise((resolve, reject) => 
    global.db.collection('plants')
      .where('tags', 'array-contains', tag.toLowerCase()).get()
      .then(snapshot => {
        let plants = []
        snapshot.forEach(doc => {
          const { rank } = doc.data()
          plants.push({
            id: doc.id,
            rank
          })
        })
        resolve(plants)
      })
      .catch(err => reject(err)))

const getByNames = name =>
  new Promise((resolve, reject) => 
    global.db.collection('datas')
      .where('fragments', 'array-contains', name.toLowerCase()).get()
      .then(snapshot => {
        let plantRefs = {}
        snapshot.forEach(doc => {
          const { plants } = doc.data()
          plants.forEach(plant => {
            if (!plantRefs[plant.id]) {
              plantRefs[plant.id] = plant
            }
          })
        })
        Promise.all(Object.keys(plantRefs).map(id => plantRefs[id].get()))
          .then(results => resolve(results.filter(doc => doc.exists)
            .map(doc => {
              const { rank } = doc.data()
              return {
                id: doc.id,
                rank
              }
            })))
          .catch(err => reject(err))
      })
      .catch(err => reject(err)))

module.exports = (req, res) => {
  const { key } = req.params
  Promise.all([getById(key), getByTags(key), getByNames(key)])
    .then(([byId, byTags, byNames]) => res.json({
      plants: byId
        .concat(byTags)
        .concat(byNames)
    }))
    .catch(err => {
      console.log(err)
      res.status(500).send({ err })
    })
}