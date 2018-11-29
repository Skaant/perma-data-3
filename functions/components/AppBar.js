import React from 'react'
import LangContext from './contexts/LangContext'
import IconClose from 'material-design-icons/navigation/svg/production/ic_close_24px.svg'
import IconSearch from 'material-design-icons/action/svg/production/ic_search_24px.svg'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  handleOpen(value) {
    this.setState({
      open: value
    })
  }

  render() {
    const { lang, langs } = this.props
    const { open } = this.state
    return (
      <LangContext.Provider value={ {
        lang,
        langs
      } }>
        <div id='app-bar' className={ open ? 'open' : '' }>
          {
            open ? (
              <button type='button' className='btn btn-muted close'
                  onClick={ () => this.handleOpen(false) }>
                <IconClose height={ 24 } width={ 24 }/>  
              </button>
            ) : (
              <button type='button' className='btn btn-muted close'
                  onClick={ () => this.handleOpen(true) }>
                <IconSearch height={ 24 } width={ 24 }/>  
              </button>
            )
          }
          <h1 href='/'>PERMA·DATA</h1>
          {
            open && (
              <div id='search-entry'></div>
            )
          }
        </div>
      </LangContext.Provider>
    )
  }
}