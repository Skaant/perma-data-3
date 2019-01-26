module.exports = (lang, { value, link }) => 
`
<div id='header'>
  <h5>
    <a href='/${ lang }'>PERMADATA</a>
  </h5><h5>
    <a href='/${ lang === 'EN' ? 'fr' : 'en' }'>
      ${ lang === 'EN' ? 'FR' : 'EN' }</a></h5>
</div>
`