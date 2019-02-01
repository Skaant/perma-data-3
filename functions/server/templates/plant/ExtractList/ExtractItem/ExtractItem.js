import React from 'react'
import ParentList from '../ParentList/ParentList';

const getAuthor = extract => extract.parent ?
  getAuthor(extract.parent) : extract.author

export default ({ extract }) => (
  <div id={ extract.id } className='extract-item row alert alert-warning'>
    <div className='col-md-6 mt-1'>
      <b>{ extract.title }</b>
    </div>
    <div className='col-md-6 mt-1 mb-3'>
      (<i>{ getAuthor(extract) }</i>)
    </div>
    {
      extract.parent && (
        <nav>
          <ParentList extract={ extract.parent }/>
        </nav>
      )
    }
  </div>
)