import React from 'react'

export default ({ lang, langs, rank, plant, current }) => (
  <div className={ `rank-item col-sm-6 col-lg-3${ current ? ' current-rank' : '' }` }>
    { 
      !current && (
        <h4>{ langs && langs.ranks[rank] }</h4>
      )
    }
    {
      plant && plant.names ? (
        <h3><a href={ `/${ lang }/plant/${ plant.id }` }>
          { plant.names[lang] }</a></h3>
      ) : (
        <h3>{ current ? langs && langs.ranks[rank] : '-' }</h3>
      )
    }
    <h6 className='reveal'>
      { langs.suggestions.more }</h6>
    <h6>{ langs.suggestions.less }</h6>
  </div>
)