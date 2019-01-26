module.exports = (lang, { value, link }) => 
`
<div id='header'>
  <h5>
    <a href='/${ lang }'>PERMADATA</a>
  </h5><h5>
    <a href='/${ lang === 'en' ? 'fr' : 'en' }'
        title='=> ${ lang === 'en' ? 'FR' : 'EN' }'>
      ${ lang === 'en' ? 'EN' : 'FR' }</a></h5>
</div>
`