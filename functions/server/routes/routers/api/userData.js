module.exports = {
  get: (req, res) => {
    const { userId } = req.params
    global.db.collection('users').doc(userId).get()
      .then(doc => {
        if (doc.exists) {
          const { roles } = doc.data()
          res.json({ roles })
        } else {
          const user = {
            roles: []
          }, inventory = {
            list: []
          }
          Promise.all([global.db.collection('users').doc(userId).add(user),
            global.db.collection('inventories').doc(userId).add(inventory)])
              .then(() => res.json(user))
              .catch(err => res.status(400).json(err))
        }
      })
      .catch(err => console.log(err))
  },
  getInventory: (req, res) => {
    const { userId } = req.params
    global.db.collection('inventories').doc(userId).get()
      .then(doc => {
        if (!doc.exists) {
          res.json({ list: null })
        } else {
          const { list } = doc.data()
          Promise.all(list.map(plantRef => global.db.collection('plants').doc(plantRef.id).get()))
            .then(plants => res.json({
              list: plants.filter(plant => plant.exists)
                .map(plant => {
                  const { rank } = plant.data()
                  return {
                    id: plant.id,
                    rank
                  }
                })
              }))
        }
      })
  }
}