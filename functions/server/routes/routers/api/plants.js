module.exports = (req, res) => {
  console.log(req.body)
  let plants = {}
  /* global.db.collection('plants')
    .where('aliases', 'array-contains', plantId).get()
    .then(snapshot => {
      snapshot.forEach(doc => extracts[doc.id] = doc.data())
      resolve(nodes)
    })
    .catch(err => reject(err)) */
  res.json({ a: 6 })
}