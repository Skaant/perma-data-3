import React from 'react'
import LangContext from '../contexts/LangContext'

export default ({ label, plant, current }) => (
  <div className='rank-item col-sm-6 col-lg-3'>
    <LangContext.Consumer>
      {
        ({ lang, langs: { ranks } }) => (
          <React.Fragment>
            { 
              !current && (
                <h4>{ ranks[label] }</h4>
              )
            }
            {
              plant && plant.names ? (
                <h3><a href={ `/${ lang }/plant/${ plant.id }` }>
                  { plant.names[lang] }</a></h3>
              ) : (
                <h3 className={ current ? 'current-rank' : '' }>
                  { current ? ranks[label] : '-' }</h3>
              )
            }
          </React.Fragment>
        )
      }
    </LangContext.Consumer>
  </div>
)