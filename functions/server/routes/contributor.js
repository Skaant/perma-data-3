const html = require('../html')

module.exports = (req, res) => {
  res.send(html({
    id: 'contributor',
    lang: 'en',
    title: {
      value: 'contributor',
      link: '/contributor'
    }
  }))
}