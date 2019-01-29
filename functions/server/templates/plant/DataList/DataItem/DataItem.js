import React from 'react'

export default ({ data: { tags, value } }) => (
  <div className='data-item row alert alert-info'
      data-tags={ tags }>
    <div className='col-md-4'>
      <b>{
        tags.sort((tagA, tagB) => tagA.localeCompare(tagB))
          .map((tag, index) => (
            <React.Fragment>
              { index > 0 && ', ' }<a key='tag' className='data-item__tag'
                data-value={ tag }>
              { tag }</a>
            </React.Fragment>
          ))
      }</b>
    </div>
    <div className='col-md-8'>
      {
        value
      }
    </div>
  </div>
)