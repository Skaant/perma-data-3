import React from 'react'

export default ({ langs }) => (
  <div id='home' className='container'>
    <div className='jumbotron'>
      <h1>{ langs.title }</h1>
    </div>
    <p>{ langs.welcome }</p>
  </div>
)