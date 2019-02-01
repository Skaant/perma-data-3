module.exports = (lang, url) => 
`
<nav id='header' class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/${ lang }">PERMADATA</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbar-content">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item mx-1">
        <a class="nav-link" href='/${ lang }/inventory'>
          INVENTORY</a></li>
      <li class="nav-item mx-1">
        <a class="nav-link" href='/${ lang }/contributor'>
          CONTRIBUTOR</a></li>
    </ul>
    <ul class="navbar-nav">
      <button class="btn btn-primary mr-lg-3 px-4">SEARCH</button>
      <li class="nav-item mx-1">
        <a  class="nav-link" href='/${ lang === 'en' ? 'fr' : 'en' }${ url }'
            title='=> ${ lang === 'en' ? 'FR' : 'EN' }'>
          ${ lang === 'en' ? 'EN' : 'FR' }</a></li>
    </ul>
  </div>
</nav>
`