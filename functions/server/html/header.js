module.exports = (lang, { value, link }) => 
`
<div id='header'>
  <h4><a href='/${ lang }'>PERMADATA</a></h4>
  ${ value ? 
    `<h5><a href='/${ lang }${ link ? `/${ link }` : '' }'>${ value }</a></h5>` : ''
  }
</div>
`