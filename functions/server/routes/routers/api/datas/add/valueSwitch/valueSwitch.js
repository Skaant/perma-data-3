module.exports = (tags, value) => {
  if (tags.includes('name')) {
    return {
      lang: tags.includes('en') ? 'en' : 'fr',
      value,
      fragments: value.split(' ')
        .filter(fragment => fragment.length >= 3)
        .map(fragment => fragment.toLowerCase())
    }
  } else {
    return { value }
  }
}