import React from 'react'

export default ({ list, deletePlant }) => (
  <React.Fragment>
    {
      list.map(({ id, rank }) => (
        <div className='row alert alert-info'>
          <div className='col-md-8'>
            { id } (<a onClick={ () => deletePlant(id) }>
                delete</a>)
          </div>
          <div className='col-md-4'>
            { rank }
          </div>
        </div>
      ))
    }
  </React.Fragment>
)