import React from 'react'
import ExtractItem from './ExtractItem';

export default ({ extracts, lang }) => (
  <div id='extracts' className='card-columns'>
    {
      Object.keys(extracts).map(key => {
        return (
          <ExtractItem key={ key } lang={ lang }
              { ...extracts[key] }/>
        )
      })
    }
  </div>
)