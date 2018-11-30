const renderer = require('./renderer')
const templates = require('./templates/build')

module.exports = props => (
  `<!DOCTYPE html>
  <html lang="${ props.lang }">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <link rel="stylesheet" type="text/css" href="/styles/main.css">
      <link rel="stylesheet" type="text/css" href="/bootstrap/bootstrap.min.css">
      <link rel="stylesheet" type="text/css" href="/modules/styles/app-bar.css">
      <link rel="stylesheet" type="text/css" href="/styles/plant.css">
      <!--link rel="manifest" href="%PUBLIC_URL%/manifest.json"-->
      <!--link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"-->
      <title>PERMA·DATA</title>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <a id='title-link' href='/'>
        <h1 id='title'>PERMA·DATA</h1></a>
      ${ renderer(templates[props.name], props) }
    </body>
  </html>`
)