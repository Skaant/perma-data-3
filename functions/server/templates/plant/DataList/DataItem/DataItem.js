import React from 'react'

const getAuthor = extract => extract.author || getAuthor(extract.parent)

export default ({ data: { tags, value, extract } }) => (
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
      { value }
    </div>
    <div className='alert alert-warning col-12 text-right pt-1 pb-1 mt-3'>
      <a href={ `#${ extract.id }` } className='text-body'>
        { extract.title } (<i>{ getAuthor(extract) }</i>)</a>
    </div>
  </div>
)