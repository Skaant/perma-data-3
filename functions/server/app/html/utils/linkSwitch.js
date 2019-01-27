module.exports = id => {
  switch(id) {
    case 'home':
      return `<link rel="stylesheet" type="text/css" href="/styles/home/home.css"/>`
    case 'plant':
      return `<link rel="stylesheet" type="text/css" href="/styles/plant/plant.css"/>`
    case 'contributor':
      return `<link rel="stylesheet" type="text/css" href="/modules/contributor/contributor.css"/>`
    case 'inventory':
      return
  }
}