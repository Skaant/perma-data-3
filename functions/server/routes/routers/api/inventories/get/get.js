const getPlantWithName = require('../../commons/getPlantWithName/getPlantWithName')

module.exports = (req, res) => {
  const { userId, lang } = req.params
  global.db.collection('inventories').doc(userId).get()
    .then(doc => {
      if (!doc.exists) {
        res.json({ list: null })
      } else {
        const { list } = doc.data()
        Promise.all(list.map(plantRef => global.db.collection('plants').doc(plantRef.id).get()))
          .then(plants => 
            Promise.all(plants.filter(plant => plant.exists)
              .map(plant => {
                const { rank } = plant.data()
                return getPlantWithName({
                  id: plant.id,
                  rank
                }, lang)
              }))
            .then(plants => res.json({ plants })))
        .catch(err => console.log(err))
      }
    })
}