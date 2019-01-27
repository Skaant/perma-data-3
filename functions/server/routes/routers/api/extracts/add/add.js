module.exports = (req, res) => {
  const extract = JSON.parse(req.body)
  const newExtract = Object.assign({}, extract, {
    parent: extract.parent ? global.db.collection('extracts').doc(extract.parent) : null
  })
  global.db.collection('extracts').add(newExtract)
    .then(() => {
      res.json(extract)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ err })
    })
}