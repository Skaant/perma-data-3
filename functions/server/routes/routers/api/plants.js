module.exports = {
  add: (req, res) => {
    const plant = JSON.parse(req.body)
    console.log(typeof plant, plant.id)
    global.db.collection('plants').doc(plant.id).set(plant)
      .then(() => {
        res.json({
          [plant.id]: {
            plant
          }
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({ err })
      })
  },
  search: (req, res) => {
    const { key } = req.params
    global.db.collection('plants').doc(key).get()
      .then(doc => {
        if (!doc.exists) {
          res.status(404).send({
            plants: []
          })
        } else {
          const { rank, sup } = doc.data()
          res.json({
            plants: [{
              id: doc.id,
              rank,
              sup
            }]
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({ err })
      })
  }
}