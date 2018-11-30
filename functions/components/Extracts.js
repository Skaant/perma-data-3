import React from 'react'
import ExtractItem from './ExtractItem';

export default ({ extracts }) => (
  <div id='extracts' className='card-columns'>
    {
      Object.keys(extracts).map(key => {
        return (
          <ExtractItem key={ key } { ...extracts[key] }/>
        )
      })
    }
  </div>
)