import React from 'react'
import ExtractItem from './ExtractItem/ExtractItem'

export default ({ extracts }) => (
  <React.Fragment>
    <div id='extract-list'>
      <div className='row'>
        <div id='extract-list__content' className='col-lg-6 col-md-8 offset-lg-3 offset-md-2 container'>
          {
            extracts.map(extract => (
              <ExtractItem key={ extract.id } extract={ extract }/>
            ))
          }
        </div>
      </div>
    </div>
  </React.Fragment>
)