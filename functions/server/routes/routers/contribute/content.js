module.exports = (req, res) => {
  global.db.collection('extracts')
    .add({
      content: req.body
    })
    .then(doc => res.json({
      id: doc.id
    }))
    .catch(err => console.log(err))
}