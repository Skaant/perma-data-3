import React from 'react'
import ImageConverter from '../../../components/ImageConverter/ImageConverter';
import ExtractSearch from '../../../components/ExtractSearch/ExtractSearch';

const Tesseract = window.Tesseract

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      extract: {
        parent: null,
        lang: 'EN',
        title: '',
        author: '',
        content: ''
      },
      message: null
    }
  }

  handleExtractChange(key, value) {
    const { extract } = this.state
    this.setState({ 
      extract: Object.assign({}, extract, {
        [key]: value
      })
    })
  }

  addExtract() {
    fetch('/api/extracts', {
      method: 'PUT',
      body: JSON.stringify(this.state.extract)
    })
      .then(result => result.json())
      .then(() => this.setState({
        message: {
          type: 'success',
          value: 'extract added'
        }
      }))
      .catch(err => {
        console.log(err)
        this.setState({
          message: {
            type: 'danger',
            value: err.message
          }
        })
      })
  }

  render() {
    const { 
      extract: { parent, lang, title, author, content },
      message
    } = this.state
    return (
      <React.Fragment>
        <h1 className='row'>ADD EXTRACT</h1>
        <ExtractSearch mode='free' label='parent extract (if so)'/>
        <div className='row'>
          <label>title</label>
          <input type='text' className='form-control'
              onChange={ e => this.handleExtractChange('title', e.target.value) } />
        </div>
        {
          !parent && (
            <React.Fragment>
              <div className='row'>
                <label>lang</label>
                <select className='form-control'
                    value={ lang }
                    onChange={ e => this.handleExtractChange('lang', e.target.value) }>
                  <option value={ null }>
                    choose a lang</option>
                  <option value='EN'>
                    EN</option>
                  <option value='FR'>
                    FR</option>
                </select>
              </div>
              <div className='row'>
                <label>author</label>
                <input type='text' className='form-control'
                    onChange={ e => this.handleExtractChange('author', e.target.value) } />
              </div>
            </React.Fragment>
          )
        }
        {
          message && (
            <div className={ `row alert alert-${ message.type }` }>
              { message.value }</div>
          )
        }
        <div id='contributor__bot-menu' className='row'>
          <div className='col-md-6 offset-md-6'>
            <button type='button'
                className='btn btn-primary btn-x col'
                onClick={ () => this.addExtract() }>
              send extract</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}