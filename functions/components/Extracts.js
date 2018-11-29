import React from 'react'

export default ({ extracts }) => (
  <div id='extracts'>
    {
      Object.keys(extracts).map(key => {
        const { id, content } = extracts[key]
        return (
          <div key={ id }>
            { 
              content && Array.isArray(content) ? content.map((text, index) => (
                <p key={ index }>
                  { text }</p>
              )) : (
                <p>{ content }</p>
              )
            }
          </div>
        )
      })
    }
  </div>
)