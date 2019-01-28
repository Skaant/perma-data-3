import React from 'react'

export default ({ datas }) => (
  <div id='data-list' className='row'>
    <div className='col-lg-6 col-md-8 offset-lg-3 offset-md-2 container'>
      {
        datas.map(data => (
          <div key={ data.id } className='data-list__item row alert alert-info'>
            <div className='col-md-4'>
              <b>{
                data.tags.sort((tagA, tagB) => tagA.localeCompare(tagB))
                  .join(', ')
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