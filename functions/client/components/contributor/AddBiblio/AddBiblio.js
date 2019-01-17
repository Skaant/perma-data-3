import React from 'react'
import ReactMarkdown from 'react-markdown'
import SearchPlant from './SearchPlant'
import ExtractItem from './ExtractItem';
import ImageConverter from '../../ImageConverter/ImageConverter';

const Tesseract = window.Tesseract

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      biblio: {
        lang: 'EN',
        title: '',
        author: '',
        content: '',
        edition: '',
        alias: ''
      },
      open: false,
      message: null
    }
  }

  handleBiblioChange(key, value) {
    const { biblio } = this.state
    this.setState({ 
      biblio: Object.assign({}, biblio, {
        [key]: value
      })
    })
  }

  handleOpen() {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }

  addBibilio() {
    fetch('/api/biblio', {
      method: 'PUT',
      body: JSON.stringify(this.state.biblio)
    })
      .then(result => result.json())
      .then(() => this.setState({
        message: {
          type: 'success',
          value: 'biblio added'
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
      biblio: { lang, title, author, content, edition, alias },
      open,
      message
    } = this.state
    return (
      <React.Fragment>
        <h1 className='row'>ADD BIBLIO</h1>
        <div id='add-plant-form' className='row'>
          <label>lang</label>
          <select className='form-control'
              value={ lang }
              onChange={ e => this.handleBiblioChange('lang', e.target.value) }>
            <option value={ null }>
              choose a lang</option>
            <option value='EN'>
              EN</option>
            <option value='FR'>
              FR</option>
          </select>
          <label>title</label>
          <input type='text' className='form-control'
              onChange={ e => this.handleBiblioChange('title', e.target.value) } />
          <label>author</label>
          <input type='text' className='form-control'
              onChange={ e => this.handleBiblioChange('author', e.target.value) } />
          {
            open && (
              <React.Fragment>
                <label>content / description</label>
                <ImageConverter/>
                <label>title</label>
                <input type='text' className='form-control'
                    onChange={ e => this.handleBiblioChange('title', e.target.value) } />
                <label>title</label>
                <input type='text' className='form-control'
                    onChange={ e => this.handleBiblioChange('title', e.target.value) } />
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
                  onClick={ () => this.addPlant() }
                  disabled={ !id || !rank ||
                    (rank !== null && rank !== 'family' && !sup) }>
                send plant</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}