module.exports = id => {
  switch(id) {
    case 'home':
      return `<script src='/modules/home/home.js'></script>`
    case 'plant':
      return
    case 'inventory':
      return `<script src='/modules/inventory/inventory.js'></script>`
    case 'contributor':
      return `<script src='/modules/contributor/contributor.js'></script>`
  }
}