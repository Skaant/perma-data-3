const admin = require('firebase-admin')

module.exports = (req, res) => {
  const { names, rank, family, genus, species } = JSON.parse(req.body)
  let data = {
    names: {
      en: names.en,
      fr: names.fr
    },
    rank
  }
  if (rank !== 'family') {
    data.family = global.db.collection('plants').doc(family)
  }
  if (rank !== 'family' && rank !== 'genus') {
    data.genus = global.db.collection('plants').doc(genus)
  }
  if (rank === 'variety') {
    data.species = global.db.collection('plants').doc(species)
  }
  global.db.collection('plants')
    .doc(names.lt).set(data)
    .then(() => {
      res.json({
        id: names.lt
      })
    })
    .catch(err => console.log(err))
}