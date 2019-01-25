module.exports = (req, res) => {
  const { key } = req.params
  global.db.collection('plants').doc(key).get()
    .then(doc => {
      if (!doc.exists) {
        res.status(404).send({
          plants: []
        })
      } else {
        const { rank, parent } = doc.data()
        res.json({
          plants: [{
            id: doc.id,
            rank,
            parent
          }]
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ err })
    })
}