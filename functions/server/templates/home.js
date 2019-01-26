import React from 'react'

export default ({ lang, langs }) => {
  const { title, welcome1, welcome2, contributorLinkLabel } = langs 
  return (
    <div id='home' className='main container'>
      <div className='jumbotron'>
        <h1>{ title }</h1>
        <p>{ welcome1 }</p>
        <div id='anchor-search' className='alert alert-info'>
          ...plant search is loading</div>
        <hr />
        <p>{ welcome2 }</p>
        <a href={ `/${ lang }/contributor` } className='btn btn-x btn-primary col'>
          { contributorLinkLabel }</a>
      </div>
    </div>
  )
}