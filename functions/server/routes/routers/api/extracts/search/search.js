module.exports = (req, res) => {
  const { key } = req.params
  global.db.collection('extracts')
    .where('tags', 'array-contains', key).get()
    .then(snapshot => {
      let extracts = []
      snapshot.forEach(doc => {
        const { parent, lang, title, content, author, tags } = doc.data()
        extracts.push({
          id: doc.id,
          parent,
          lang,
          title,
          content,
          author,
          tags
        })
      })
      res.json({ extracts })
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ err })
    })
}