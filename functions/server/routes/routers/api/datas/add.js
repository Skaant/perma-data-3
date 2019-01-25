module.exports = (req, res) => {
  const data = JSON.parse(req.body)
  const newData = Object.assign({}, data, {
    extract: global.db.collection('extracts').doc(data.extract),
    plants: data.plants.map(plant => global.db.collection('plants').doc(plant))
  })
  global.db.collection('datas').add(newData)
    .then(() => {
      res.json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ err })
    })
}