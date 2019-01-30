import React from 'react'
import ReactMarkdown from 'react-markdown'

export default ({ content }) => (
  <div className='row'>
    <div className='alert alert-primary col-md-12'>
      <ReactMarkdown source={ content }/></div>
  </div>
)