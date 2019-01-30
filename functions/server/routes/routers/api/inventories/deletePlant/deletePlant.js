module.exports = (req, res) => {
  const { userId } = req.params
  const { list } = JSON.parse(req.body)
  const newList = list.map(plant => global.db.collection('plants').doc(plant))
  global.db.collection('inventories').doc(userId).update({
    list: newList
  })
    .then(() => {
      res.json(list)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ err })
    })
}