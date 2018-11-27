const html = require('../html')

module.exports = (req, res) => {
  const { lang, params } = req
  const plantId = params[0].slice(1)
  res.send(html({
    name: 'plant',
    lang,
    data: {
      name: plantId
    }
  }))
}