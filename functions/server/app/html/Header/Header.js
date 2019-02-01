module.exports = (lang, langs, url) => {
  const home = url === '/'
  return `
<nav id='header' class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/${ lang }">PERMADATA</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbar-content">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item mx-1">
        <a class="nav-link" href='/${ lang }/inventory'>
          ${ langs.inventory || 'inventory' }</a></li>
      <li class="nav-item mx-1">
        <a class="nav-link" href='/${ lang }/contributor'>
          ${ langs.contributor || 'contributor' }</a></li>
    </ul>
    <ul class="navbar-nav">
      ${ 
        home ? ''
        : `<button type="button" class="btn btn-primary mr-lg-3 px-4" data-toggle="modal" data-target="#plant-search-modal">${
          langs.searchPlant
        }</button>` }
      <li class="nav-item mx-1">
        <a class="nav-link" href='/${ lang === 'en' ? 'fr' : 'en' }${ url }'
            title='=> ${ lang === 'en' ? 'FR' : 'EN' }'>
          ${ lang === 'en' ? 'EN' : 'FR' }</a></li>
    </ul>
  </div>
  ${
    home ? '' : `
      <div class="modal fade" id="plant-search-modal" tabindex="-1" role="dialog" aria-labelledby="plant-search-modal" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${ langs.plantSearch || 'plant search' }</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-auto mt-2 mb-4">
              <div id='anchor-search'>
                <div className='alert alert-info'>
                  .. ${ langs.plantSearchLoading || 'plant search is loading'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `
  }
</nav>`
}
