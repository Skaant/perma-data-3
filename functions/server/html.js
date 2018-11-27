const renderer = require('./renderer')
const templates = require('./templates/build')

module.exports = props => (
  `<!DOCTYPE html>
  <html lang="${ props.lang }">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <!--link rel="manifest" href="%PUBLIC_URL%/manifest.json"-->
      <!--link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"-->
      <title>PERMA·DATA</title>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="app-bar"></div>
      ${ renderer(templates[props.name], props) }
      <div id="plant-data"></div>
    </body>
  </html>`
)