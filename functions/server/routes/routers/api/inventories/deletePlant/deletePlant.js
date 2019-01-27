module.exports = (req, res) => {
  const plant = JSON.parse(req.body)
  const splitPlantId = plant.id.split(' ')
  const newPlant = Object.assign({}, plant, {
    parent: plant.rank === 'family' ?
      null : global.db.collection('plants').doc(plant.parent),
    tags: splitPlantId.length >= 2 ? splitPlantId : null
  })
  global.db.collection('plants').doc(plant.id).set(newPlant)
    .then(() => {
      res.json(plant)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ err })
    })
}