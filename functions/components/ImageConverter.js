import React from 'react'
import ReactMarkdown from 'react-markdown'

const Tesseract = window.Tesseract

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      image: null,
      lang: null,
      markdown: ''
    }
  }

  componentDidMount() {
    fetch('/api/biblios')
      .then(result => result.json())
      .then(a => console.log(a))
      .catch(err => console.log(err))
  }

  handleImageChange(image) {
    this.setState({ image })
  }

  handleLangChange(lang) {
    this.setState({ lang })
  }

  convertImage() {
    const { image, lang, markdown } = this.state
    Tesseract.recognize(image, { lang })
      .then(result => this.setState({
        markdown: markdown + (markdown ? ' ' : '') + result.text
      }))
      .catch(err => console.log(err))
  }

  handleMarkdownChange(markdown) {
    this.setState({ markdown })
  }

  sendContent() {
    const { markdown } = this.state
    fetch('/contribute/content', {
      method: 'PUT',
      body: markdown
    })
    .then(result => result.json())
    .then(({ id }) => this.setState({
      extractId: id
    }))
  }

  render() {
    const { image, lang, markdown, extractId } = this.state
    return (
      <div className='container'>
        <div id='load' className='row'>
          <input type='file' accept='image/*'
              className='col-md-8'
              onChange={ e => this.handleImageChange(e.target.files[0]) }/>
          <select className='col-md-2 form-control'
              onChange={ e => this.handleLangChange(e.target.value) }>
            <option value={ null }>lang</option>
            <option value='eng'>EN</option>
            <option value='fra'>FR</option>
          </select>
          <button className='col-md-2 btn btn-primary'
              onClick={ () => this.convertImage() }
              disabled={ !image || !lang }>
            convert</button>
        </div>
        <div id='correct' className='row'>
          <textarea value={ markdown } className='col-12 form-control'
              onChange={ e => this.handleMarkdownChange(e.target.value) }/>
        </div>
        <div id='render' className='row'>
          <ReactMarkdown source={ markdown }/>
        </div>
        <div id='form' className='row'>
          <div className='col-md-6'>
            {

            }
          </div>
          <div className='col-md-6'>
          </div>
        </div>
        <div className='row'>
          <button className='col-md-4 btn btn-primary'
              onClick={ () => this.sendContent() }
              disabled={ !markdown }>
            send content</button>
          {
            extractId && (
              <h3>extract id: { extractId }</h3>
            )
          }
        </div>
      </div>
    )
  }
}