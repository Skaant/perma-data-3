import React from 'react'
import LangContext from '../contexts/LangContext'

export default ({ label, value, current }) => (
  <div className='col-sm-6 col-lg-3'>
    <LangContext.Consumer>
      {
        ({ lang }) => current ? (
          <h3>{ label }</h3>
        ) : (
          <React.Fragment>
            <h4>{ label }</h4>
            {
              value && value.names && (
                <h3>{ value.names[lang] }</h3>
              )
            }
          </React.Fragment>
        )
      }
    </LangContext.Consumer>
  </div>
)