module.exports = (req, res) => {
  const { content, lang, biblio, sectionTitle, pages, plants } = JSON.parse(req.body)
  global.db.collection('extracts')
    .add({
      content,
      lang,
      biblio: global.db.collection('biblios').doc(biblio),
      section: {
        title: sectionTitle
      },
      pages,
      plants: plants.map(plantId => global.db.collection('plants').doc(plantId))
    })
    .then(doc => res.json({
      id: doc.id
    }))
    .catch(err => console.log(err))
}