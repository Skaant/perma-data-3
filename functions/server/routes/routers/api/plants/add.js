module.exports = (req, res) => {
  const plant = JSON.parse(req.body)
  const newPlant = Object.assign({}, plant, {
    parent: plant.rank === 'family' ?
      null : global.db.collection('plants').doc(plant.parent)
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