const documentId = require('firebase-admin').firestore.FieldPath.documentId()

const getLowerKeyword = keyword => keyword
  .slice(0, keyword.length - 1) + (
    keyword[keyword.length - 1] !== 'z' ?
      (String.fromCharCode((keyword.charCodeAt(keyword.length - 1) + 1))) : 'zz'
  )

const getDirectPlant = keyword => global.db.collection('plants')
  .where(documentId, '>=', keyword)
  .where(documentId, '<', getLowerKeyword(keyword)).get()

const getRankPlant = (rank, keyword) => global.db.collection('plants')
  .where(documentId, '>=', keyword)
  .where(documentId, '<', getLowerKeyword(keyword))
  .where('rank', '==', rank).get()

module.exports = (req, res) => {
  const { rank, keyword } = req.params
  let plantRefs = rank ? getRankPlant(rank, keyword) : getDirectPlant(keyword)
  plantRefs.then(snapshot => {
    let plants = {}
    snapshot.forEach(doc => {
      const { names, rank, family, genus, species, variety } = doc.data()
      plants[doc.id] = {
        id: doc.id,
        names,
        rank,
        family: family && family.id,
        genus: genus && genus.id,
        species: species && species.id,
        variety: variety && variety.id
      }
    })
    res.json(plants)
  })
  .catch(err => console.log(err))
}