const html = require('../html')

module.exports = (req, res) => {
  res.send(html('contributor', {
    lang: 'en'
  }))
}