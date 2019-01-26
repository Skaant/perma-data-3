const html = require('../html/html')

module.exports = (req, res) => {
  res.send(html({
    id: 'contributor',
    lang: 'en',
    title: 'contributor'
  }))
}