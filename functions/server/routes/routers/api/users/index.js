module.exports = {
  get: (req, res) => {
    const { userId } = req.params
    global.db.collection('users').doc(userId).get()
      .then(doc => {
        if (doc.exists) {
          const { roles } = doc.data()
          res.json({ roles })
        } else {
          const user = {
            roles: []
          }, inventory = {
            list: []
          }
          Promise.all([global.db.collection('users').doc(userId).add(user),
            global.db.collection('inventories').doc(userId).add(inventory)])
              .then(() => res.json(user))
              .catch(err => res.status(400).json(err))
        }
      })
      .catch(err => console.log(err))
  }
}