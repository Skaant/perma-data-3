import React from 'react'
import ReactMarkdown from 'react-markdown'

const Tesseract = window.Tesseract

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      image: null,
      lang: null
    }
  }

  handleImageChange(image) {
    this.setState({ image })
  }

  handleLangChange(lang) {
    this.setState({ lang })
  }

  convertImage() {
    const { image, lang } = this.state
    Tesseract.recognize(image, { lang })
      .then(result => this.setState({
        markdown: result.text
      }))
      .catch(err => console.log(err))
  }

  handleMarkdownChange(markdown) {
    this.setState({ markdown })
  }

  render() {
    const { image, lang, markdown } = this.state
    return (
      <div className='container'>
        <div id='1-upload' className='row'>
          <input type='file' accept='image/*'
              className='col-md-8'
              onChange={ e => this.handleImageChange(e.target.files[0]) }/>
          <select className='col-md-2'
              onChange={ e => this.handleLangChange(e.target.value) }>
            <option value={ null }>lang</option>
            <option value='eng'>EN</option>
            <option value='fra'>FR</option>
          </select>
          <button className='col-md-2'
              onClick={ () => this.convertImage() }
              disabled={ !image || !lang }>
            convert</button>
        </div>
        <div id='3-correct' className='row'>
          <textarea value={ markdown } className='col-12'
              onChange={ e => this.handleMarkdownChange(e.target.value) }/>
        </div>
        <div id='4-render' className='row'>
          <ReactMarkdown source={ markdown }/>
        </div>
        <div id='5-form' className='row'>
        </div>
      </div>
    )
  }
}