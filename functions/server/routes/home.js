const html = require('../html')
const { langs: langsFetcher } = require('../fetchers')

module.exports = (req, res) => {
  const { lang } = req
  const id = 'home'

  langsFetcher(lang, id)
    .then(langs => 
        res.send(html({
          id,
          lang,
          title: {
            value: langs.title
          },
          description: langs.description,
          keywords: 'home,static,plants,search,collect',
          langs
        }))
      )
    .catch(err => console.log(err))
}