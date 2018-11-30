import React from 'react'
import ReactMarkdown from 'react-markdown'

const newLine = `

`

export default ({ content }) => (
  <div className='card'>
    <div className='card-body'>
      <ReactMarkdown source={
        content.join(newLine)
      }/>
    </div>
  </div>
)