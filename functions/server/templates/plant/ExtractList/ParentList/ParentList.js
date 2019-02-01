import React from 'react'

const ParentItem = ({ extract }) => {
  if (!extract.parent) {
    return (
      <li key={ extract.id } className='breadcrumb-item'>
        <span><b>{ extract.title }</b></span></li>
    )
  } else {
    return (
      <React.Fragment>
      <ParentItem extract={ extract.parent }/>
        <li key={ extract.id } className='breadcrumb-item'>
          <span>{ extract.title }</span>
        </li>
      </React.Fragment>
    )
  }
}

export default ({ extract }) => (
  <ol id='extract-parent-list' className='breadcrumb'>
    <ParentItem extract={ extract }/>
  </ol>
)