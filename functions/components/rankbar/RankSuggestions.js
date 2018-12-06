import React from 'react'

export default ({ lang, langs, plant, rank }) => {
  const suggestions = plant.suggestions[rank]
  return (
    <div id={ `suggestions-${ rank }` }
        className='row'>
      <div className='col-12'>
        <h5>{ langs.suggestions.others[rank] }</h5>
      </div>
      {
        Object.keys(suggestions).map(key => {
          console.log(suggestions[key])
          return (
            <a href={ `/${ lang }/plant/${ key }` }
                className='col-md-4 col-sm-6'>
              { suggestions[key].names[lang] }</a>
          )
        })
      }
    </div>
  )
}