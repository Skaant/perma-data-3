const html = require('../../app/html/html')
const { langs: langsFetcher } = require('../../app/fetchers')

module.exports = (req, res) => {
  const { lang, url } = req
  const id = 'contributor'

  langsFetcher(lang, id)
    .then(langs => 
      res.send(html({
        id,
        lang: 'en',
        langs,
        title: 'contributor',
        url
      })))
}