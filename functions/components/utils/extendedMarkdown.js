export default (markdown, { lang = 'en' }) => {
  markdown = markdown.replace(/{lang}/, `${ lang }`)
  markdown = markdown.replace(/{p}/g, `${ lang }/plant`)
  return markdown
}