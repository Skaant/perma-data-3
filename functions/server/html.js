const renderer = require('./renderer')
const templates = require('./templates/build')

module.exports = (name, props) => (
  `<!DOCTYPE html>
  <html lang="${ props.lang }">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <link rel="stylesheet" type="text/css" href="/styles/main.css">
      <link rel="stylesheet" type="text/css" href="/bootstrap/bootstrap.min.map.css">
      <link rel="stylesheet" type="text/css" href="/bootstrap/bootstrap.min.css">
      <link rel="stylesheet" type="text/css" href="/modules/styles/app-bar.css">
      ${
        name === 'plant' ?
`     <link rel="stylesheet" type="text/css" href="/styles/plant.css"/>` : ''
      }
      ${
        name === 'contributor' ? 
`     <link rel="stylesheet" type="text/css" href="/modules/styles/contributor/contributor.css"/>` : ''
      }
      <!--link rel="manifest" href="%PUBLIC_URL%/manifest.json"-->
      <!--link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"-->
      <title>${
        props.title ? `${ props.title } ` : ''
      }PERMA DATA</title>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <a id='title' href='/'>
        <h1 id='title__main'>PERMA DATA</h1>${
          props.pageSubTitle ? `
        <h2 id='title__sub'>${ props.pageSubTitle.toUpperCase() }</h2>` : ''
        }</a>
      ${ renderer(templates[name], props) }
      <div id='footer'>
        <h3>PERMA DATA, 2019</h3></div>
      <script src='/tesseract/tesseract.min.js'></script>
      ${
          name === 'contributor' ?
`     <script src='/modules/contributor.js'></script>` : ''
      }
      <script src='/jquery/jquery.min.js'></script>
      ${
        name === 'plant' ? 
`     <script src='/jquery/rank-bar.js'></script>` : ''
      }
    </body>
  </html>`
)