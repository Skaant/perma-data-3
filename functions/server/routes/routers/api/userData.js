module.exports = (req, res) => {
  const { userId } = req.params
  global.db.collection('users').doc(userId).get()
    .then(doc => {
      if (doc.exists) {
        res.json(doc.data())
      } else {
        res.json({
          roles: []
        })
      }
    })
    .catch(err => console.log(err))
}