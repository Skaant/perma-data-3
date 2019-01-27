import React from 'react'

export default ({ lang, langs }) => {
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
                ...plant search is loading</div></div>
            </div>
            <div className='col-md-4'>      
              <p>{ welcome2 }</p>
              <a href={ `/${ lang }/contributor` } className='btn btn-x btn-secondary col'>
                { contributorLinkLabel }</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}