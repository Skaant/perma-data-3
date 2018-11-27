import React from 'react'
import LangContext from './contexts/LangContext';
import IconClose from 'material-design-icons/navigation/svg/production/ic_close_48px.svg'

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