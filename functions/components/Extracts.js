import React from 'react'
import ExtractItem from './ExtractItem';

export default ({ extracts }) => (
  <div id='extracts' className='card-columns'>
    {
      Object.keys(extracts).map(key => {
        const { id, content } = extracts[key]
        return (
          <ExtractItem key={ id } content={ content }/>
        )
      })
    }
  </div>
)