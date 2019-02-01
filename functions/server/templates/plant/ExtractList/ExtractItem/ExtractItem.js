import React from 'react'

export default ({ extract: { id, title } }) => (
  <div id={ id } className='extract-item row alert alert-warning'>
    <div className='col-md-8'>
      <b>{ title }</b>
    </div>
    <div className='col-md-4'>
      { 'author' }
    </div>
  </div>
)