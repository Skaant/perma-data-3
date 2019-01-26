module.exports = (tags, value) => {
  if (tags.includes('name')) {
    return {
      lang: tags.en ? 'en' : 'fr',
      value,
      fragments: value.split(' ')
        .filter(fragment => fragment.length >= 3)
    }
  } else {
    return { value }
  }
}