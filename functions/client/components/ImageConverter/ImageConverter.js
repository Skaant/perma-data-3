import React from 'react'
import ReactMarkdown from 'react-markdown'
import SearchPlant from './SearchPlant'
import ExtractItem from './ExtractItem';

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

  handleImageChange(image) {
    this.setState({ image })
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

  render() {
    const { image, markdown } = this.state
    const { lang } = this.props
    return (
      <React.Fragment>
        <label>Image to convert</label>
        <input type='file' accept='image/*'
            className='col-md-8'
            onChange={ e => this.handleImageChange(e.target.files[0]) }/>
      </React.Fragment>
    )
  }
}