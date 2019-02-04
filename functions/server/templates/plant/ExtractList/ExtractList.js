import React from 'react'
import ExtractItem from './ExtractItem/ExtractItem'

export default ({ extracts }) => (
  <React.Fragment>
    <div id='extract-list'>
      <div className='row'>
        <div id='extract-list__content' className='col-md-10 offset-md-1 container'>
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