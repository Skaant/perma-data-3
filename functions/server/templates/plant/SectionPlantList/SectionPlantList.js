import React from 'react'

export default ({ list, lang, label }) => (
  <div className='section-plant-list row alert alert-secondary'>
    <b>{ label }&nbsp;</b>
    { 
      list.map((plant, index) => (
        <React.Fragment>
          { index > 0 ? ', ' : ' ' }
          <a href={ `/${ lang }/plant/${ plant.id }` }>
            { plant.name }</a>
        </React.Fragment>
      ))
    }
  </div>
)