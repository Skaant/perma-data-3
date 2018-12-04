module.exports = (req, res) => {
  global.db.collection('biblios').get()
    .then(snapshot => {
      let plants = {}
      snapshot.forEach(doc => {
        const { lang, title, author } = doc.data()
        plants[doc.id] = {
          id: doc.id,
          lang,
          title,
          author
        }
      })
      res.json(plants)
    })
    .catch(err => console.log(err))
}