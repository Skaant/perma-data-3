import React from 'react'

export default ({ title, children }) => (
  <div className='col-md-4'>
    <div className='card'>
      <div className='card-body container'>
        <h5 className='card-title mx-auto'>{ title }</h5>
        { children }
      </div>
    </div>
  </div>
)