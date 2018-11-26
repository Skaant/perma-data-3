const html = require('../html')

module.exports = (req, res) => {
  res.send(html({
    name: 'plant',
    lang: 'EN',
    data: {
      name: req.params[0].slice(1)
    }
  }))
}