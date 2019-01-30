module.exports = module.exports = (req, res) => {
  const { lang, id } = req.params
  global.db.collection('langs').doc(`api-${ id }-${ lang }`).get()
    .then(doc => {
      if (!doc.exists) {
        res.json({})
      } else {
        res.json(doc.data())
      }
    })
    .catch(err => console.log(err))
}