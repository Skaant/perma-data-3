import React from 'react'

export default ({ datas }) => {
  const occurencesByTag = datas.reduce((occurencesByTag, data) => {
    data.tags.forEach(tag => {
      if (!occurencesByTag[tag]) {
        occurencesByTag[tag] = 1
      } else {
        occurencesByTag[tag]++
      }
    })
    return occurencesByTag
  }, {})

  return (
    <div id='tag-list' className='row alert alert-secondary'>
      {
        Object.keys(occurencesByTag)
          .sort((a, b) => occurencesByTag[b] - occurencesByTag[a])
          .map(tag => (
            <button key={ tag } type='button'
                data-value={ tag }
                className='tag-list__item btn btn-primary'>
              { tag } <span className='badge badge-light'>{ occurencesByTag[tag] }</span>
            </button>
          ))
      }
    </div>
  )
}