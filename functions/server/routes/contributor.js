const html = require('../html/html')

module.exports = (req, res) => {
  const { url } = req
  console.log(req)
  res.send(html({
    id: 'contributor',
    lang: 'en',
    title: 'contributor',
    url
  }))
}