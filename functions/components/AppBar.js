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
        <div id='logo' className={ open ? 'open' : '' }>
          {
            open && (
              <button type='button' className='btn btn-muted close'
                  onClick={ () => this.handleOpen(false) }>
                <IconClose height={ 24 } width={ 24 }/>  
              </button>
            )
          }
          <h1>PERMA<br/>DATA</h1>
          <div id='search-entry' className='input-group mb-3'>
            <input type='text' className='form-control'
              placeholder='type a plant name' aria-label='search plant name'/>
            {
              open && (
                <div className='input-group-append'>
                  <IconSearch/>
                </div>
              )
            }
          </div>
        </div>
        { 
          !open && (
            <div id='menu' className='row'>
              <button type='button' className='btn btn-muted col-md-4'
                  onClick={ () => this.handleOpen(true) }>
                search</button>
            </div>
          )
        }
      </LangContext.Provider>
    )
  }
}