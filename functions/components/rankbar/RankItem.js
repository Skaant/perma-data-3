import React from 'react'

export default ({ lang, langs, label, plant, current }) => (
  <div className='rank-item col-sm-6 col-lg-3'>
    { 
      !current && (
        <h4>{ langs && langs.ranks[label] }</h4>
      )
    }
    {
      plant && plant.names ? (
        <h3><a href={ `/${ lang }/plant/${ plant.id }` }>
          { plant.names[lang] }</a></h3>
      ) : (
        <h3 className={ current ? 'current-rank' : '' }>
          { current ? langs && langs.ranks[label] : '-' }</h3>
      )
    }
  </div>
)