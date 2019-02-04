import React from 'react'

export default ({ lang, langs, featured }) => {
  const { 
    title,
    welcome1, welcome2, welcome3,
    contributorLinkLabel, inventoryLinkLabel } = langs 
  return (
    <div id='home' className='main container'>
      <div className='jumbotron'>
        <h1>{ title }</h1>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>      
              <p>{ welcome3 }</p>
              <a href={ `/${ lang }/inventory` } className='btn btn-x btn-secondary col'>
                { inventoryLinkLabel }</a>
            </div>
            <div className='col-md-4'>      
              <p><b>{ welcome1 }</b></p>
              <div id='anchor-search'>
                <div className='alert alert-info'>
                .. { langs.plantSearchLoading }</div></div>
            </div>
            <div className='col-md-4'>      
              <p>{ welcome2 }</p>
              <a href={ `/${ lang }/contributor` } className='btn btn-x btn-secondary col'>
                { contributorLinkLabel }</a>
            </div>
          </div>
        </div>
      </div>
      <div className='alert alert-success'>
        <b>{ langs.featuredPlants } : </b>
        {
          featured.map((plant, index) => (
            <React.Fragment>
              { index > 0 ? ', ' : '' }
              <a key={ plant.id } href={ `/${ lang }/plant/${ plant.id }` }
                  className='text-body'>
                { plant.name }</a>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}