module.exports = id => {
  switch(id) {
    case 'home':
      return
    case 'plant':
      return `<link rel="stylesheet" type="text/css" href="/styles/plant.css"/>`
    case 'contributor':
      return `<link rel="stylesheet" type="text/css" href="/modules/styles/contributor/contributor.css"/>`
  }
}