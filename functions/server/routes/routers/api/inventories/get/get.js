module.exports = (req, res) => {
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