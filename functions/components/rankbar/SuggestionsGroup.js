import React from 'react'

export default ({ lang, langs, plant, rank, device }) => {
  const suggestions = plant.suggestions[rank]
  return (
    <div id={ `suggestions-${ rank }` }
        className={ `suggestions-group${
          plant.rank === rank ? ' reveal' : '' } ${ device } col-12` }>
      <h5>{ langs.suggestions.others[rank] }</h5>
      <div className='row'>
        {
          Object.keys(suggestions).map(key => (
            <a key={ key }
                href={ `/${ lang }/plant/${ key }` }
                className='col-md-4 col-sm-6'>
              { suggestions[key].names[lang] }</a>
          ))
        }
      </div>
    </div>
  )
}