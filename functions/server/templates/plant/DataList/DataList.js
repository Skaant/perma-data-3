import React from 'react'

export default ({ datas }) => (
  <div className='row'>
    <div className='col-lg-6 col-md-8 offset-lg-3 offset-md-2 container'>
      {
        datas.map(data => (
          <div className='row alert alert-info'>
            <div className='col-md-4'>
              <b>{
                data.tags.toString()
              }</b>
            </div>
            <div className='col-md-8'>
              {
                data.value
              }
            </div>
          </div>
        ))
      }
    </div>
  </div>
)