import React from 'react'
import ReactMarkdown from 'react-markdown'

const newLine = `

`

export default ({ content, biblio, section }) => (
  <div className='card'>
    <h5 className='card-title'>{ section && section.title }</h5>
    <h6 className='card-subtitle'>
      { biblio && biblio.title }  -  { biblio && biblio.author }</h6>
    <div className='card-body'>
      <ReactMarkdown source={
        content.join(newLine)
      }/>
    </div>
  </div>
)