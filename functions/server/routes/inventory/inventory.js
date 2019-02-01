const html = require('../../app/html/html')
const { langs: langsFetcher } = require('../../app/fetchers')

module.exports = (req, res) => {
  const { lang, url } = req
  const id = 'inventory'
  langsFetcher(lang, id)
    .then(langs => res.send(html({
      id,
      lang,
      langs,
      title: 'inventory',
      keywords: 'stash,seeds,plants,collect,store,calendar,sow,harvest',
      url
    })))
}