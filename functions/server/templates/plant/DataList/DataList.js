import React from 'react'
import DataItem from './DataItem/DataItem'

const getSortedTags = ({ tags }) => {
  if (tags.length > 1) {
    return tags.sort((a, b) => a.localeCompare(b))
  } else {
    return tags
  }
}

const sortData = (a, b) => {
  const aSortedTags = getSortedTags(a)
  const bSortedTags = getSortedTags(b)
  let i = 0
  while(i < aSortedTags.length && i < bSortedTags.length) {
    if (aSortedTags[i] === bSortedTags[i]) {
      i++
    } else {
      return aSortedTags[i].localeCompare(bSortedTags[i])
    }
  }
}

export default ({ datas }) => (
  <div id='data-list' className='row'>
    <div id='data-list__content' className='col-lg-6 col-md-8 offset-lg-3 offset-md-2 container'>
      {
        datas.sort(sortData)
          .map(data => (
            <DataItem key={ data.id } data={ data }/>
          ))
      }
    </div>
  </div>
)