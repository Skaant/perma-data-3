import React from 'react'
import ReactMarkdown from 'react-markdown'
import extendedMarkdown from './utils/extendedMarkdown'

const newLine = `

`

export default ({ content, biblio, section, pages, lang }) => (
  <div className='extract card'>
    <h5 className='card-title'>{ section && section.title }</h5>
    <h6 className='card-subtitle'>
      { biblio && biblio.author } - { biblio && biblio.title } (p. { pages })</h6>
    <div className='card-body'>
      <ReactMarkdown source={
        extendedMarkdown(Array.isArray(content) ? content.join(newLine) : content, {
          lang
        })
      }/>
    </div>
  </div>
)