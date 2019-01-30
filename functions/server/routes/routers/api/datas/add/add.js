const valueSwitch = require('./valueSwitch/valueSwitch')

module.exports = (req, res) => {
  const data = { extract, tags, value, plants } = JSON.parse(req.body)
  const newData = Object.assign({}, data, {
    extract: global.db.collection('extracts').doc(data.extract),
    plants: data.plants.map(plant => global.db.collection('plants').doc(plant))
  }, valueSwitch(tags, value))
  global.db.collection('datas').add(newData)
    .then(() => {
      res.json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ err })
    })
}