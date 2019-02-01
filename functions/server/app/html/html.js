const renderer = require('../renderer')
const templates = require('../build')
const header = require('./Header/Header')
const linkSwitch = require('./utils/linkSwitch')
const topScriptSwitch = require('./utils/topScriptSwitch')
const botScriptSwitch = require('./utils/botScriptSwitch')
const footer = require('./Footer/Footer')

module.exports = (props) => {
  const { id, lang, title, description, keywords, url } = props
  return (
    `<!DOCTYPE html>
    <html lang="${ lang }">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="stylesheet" type="text/css" href="/styles/main/main.css">
        <link rel="stylesheet" type="text/css" href="/bootstrap/bootstrap.min.map.css">
        <link rel="stylesheet" type="text/css" href="/bootstrap/bootstrap.min.css">
        ${ linkSwitch(id) || '' }
        <!--link rel="manifest" href="%PUBLIC_URL%/manifest.json"-->
        <!--link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"-->
        <script src='/jquery/jquery.min.js'></script>
        ${ topScriptSwitch(id) || '' }
        <title>${ title ?
          `${ title } - ` : '' }PERMADATA ${ lang.toUpperCase() }</title>
        ${ description ?
          `<meta name="description" content=${ description }">` : '' }
        <meta name="keywords" content="permaculture,data${ keywords ?
          `, ${ keywords }` : '' }">
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        ${ header(lang, url) }
        ${ renderer(templates[id], props) }
        ${ footer() }
        ${ botScriptSwitch(id) || '' }
        <script defer src='/bootstrap/bootstrap.min.js'></script>
      </body>
    </html>`
  )
}