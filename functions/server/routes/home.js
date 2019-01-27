const html = require('../app/html/html')
const { langs: langsFetcher } = require('./fetchers')

module.exports = (req, res) => {
  const { lang, url } = req
  const id = 'home'

  langsFetcher(lang, id)
    .then(langs => 
        res.send(html({
          id,
          lang,
          title: langs.title,
          description: langs.description,
          keywords: 'home,static,plants,search,collect',
          langs,
          url
        }))
      )
    .catch(err => console.log(err))
}