import React from 'react'

export default ({ lang, langs, rank, plant, current }) => (
  <div className={ `rank-item col-sm-6 col-lg-3${ current ? ' current-rank' : '' }` }>
    { 
      !current && (
        <h4>{ langs && langs.ranks[rank] }</h4>
      )
    }
    {
      plant[rank] && plant[rank].names ? (
        <h3><a href={ `/${ lang }/plant/${ plant[rank].id }` }>
          { plant[rank].names[lang] }</a></h3>
      ) : (
        <h3>{ current ? langs && langs.ranks[rank] : '-' }</h3>
      )
    }
    {
      Object.keys(plant.suggestions[rank]).length > 0 ? (
        <React.Fragment>
          <h6 id={ `suggestions-more-${ rank }` }
              className={ `suggestions-more${ current ? '' : ' reveal' }` }
              data-rank={ rank }>
            { langs.suggestions.more }</h6>
          <h6 id={ `suggestions-less-${ rank }` }
              className={ `suggestions-less${ current ? ' reveal' : '' }` }
              data-rank={ rank }>
            { langs.suggestions.less }</h6>
        </React.Fragment>
      ) : (
        <span>-</span>
      )
    }
  </div>
)