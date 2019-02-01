module.exports = id => {
  switch(id) {
    case 'home':
      return
    case 'plant':
      return `<script src='/dynamics/plant/plant.js'></script>`
    case 'inventory':
      return `<script src='/modules/inventory/inventory.js'></script>`
    case 'contributor':
      return `<script src='/modules/contributor/contributor.js'></script>`
  }
}