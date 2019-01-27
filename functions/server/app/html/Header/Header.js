module.exports = (lang, url) => 
`
<div id='header'>
  <h5>
    <a href='/${ lang }'>PERMADATA</a>
  </h5><h5>
    <a href='/${ lang === 'en' ? 'fr' : 'en' }${ url }'
        title='=> ${ lang === 'en' ? 'FR' : 'EN' }'>
      ${ lang === 'en' ? 'EN' : 'FR' }</a>
  </h5><h5>
    <a href='/${ lang }/inventory'>
      INVENTORY</a>
  </h5><h5>
    <a href='/${ lang }/contributor'>
      CONTRIBUTOR</a>
  </h5>
</div>
`