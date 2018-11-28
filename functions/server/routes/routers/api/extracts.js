module.exports = (req, res) => {
  console.log(req.body)
  global.db.collection('extracts')
    .where('plants', 'array-contains', 'mentha').get()
    .then(snapshot => {
      let extracts = {}
      snapshot.forEach(doc => {
        const { content } = doc.data()
        extracts[doc.id] = {
          id: doc.id,
          content
        }
      })
      res.json(extracts)
    })
    .catch(err => console.log(err))
}