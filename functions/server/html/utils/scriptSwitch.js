module.exports = id => {
  switch(id) {
    case 'home':
      return `<script src='/modules/home-bundle.js'></script>`
    case 'plant':
      return
    case 'contributor':
      return `<script src='/modules/contributor.js'></script>
        <script src='/tesseract/tesseract.min.js'></script>`
  }
}