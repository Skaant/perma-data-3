module.exports = id => {
  switch(id) {
    case 'home':
      return
    case 'plant':
      return
    case 'contributor':
      return `<script src='/modules/contributor.js'></script>
        <script src='/tesseract/tesseract.min.js'></script>`
  }
}