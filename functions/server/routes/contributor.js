const html = require('../app/html/html')

module.exports = (req, res) => {
  const { url } = req
  res.send(html({
    id: 'contributor',
    lang: 'en',
    title: 'contributor',
    url
  }))
}