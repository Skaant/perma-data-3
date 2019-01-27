module.exports = id => {
  switch(id) {
    case 'home':
      return `<script src='/modules/home/home.js'></script>`
    case 'plant':
      return
    case 'contributor':
      return `<script src='/modules/contributor/contributor.js'></script>`
  }
}