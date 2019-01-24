import React from 'react'
import ReactMarkdown from 'react-markdown'

const Tesseract = window.Tesseract
const tesseractLangs = {
  EN: 'eng',
  FR: 'fra'
}

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      image: null,
      open: false
    }
  }

  handleImageChange(image) {
    this.setState({ image })
  }

  handleOpenChange() {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }

  convertImage() {
    const { lang, content, changeContent } = this.props
    const { image } = this.state
    Tesseract.recognize(image, { 
      lang: tesseractLangs[lang]
    })
      .then(result => changeContent(content
        + (content ? ' ' : '') + result.text))
      .catch(err => console.log(err))
  }

  handleContentChange(content) {
    const { changeContent } = this.props
    changeContent(content)
  }

  render() {
    const { lang, content } = this.props
    const { image, open } = this.state
    return (
      <div className='content-manager'>
        {
          !open ? (
            <div className='row'>
              <button className='btn btn-x btn-x-border btn-outline-dark col-12'
                  onClick={ () => this.handleOpenChange() }>
                open content manager</button>
            </div>
          ) : (
            <React.Fragment>
              <div className='row'>
                <button className='btn btn-x btn-dark col-12'
                    onClick={ () => this.handleOpenChange() }>
                  hide options</button>
              </div>
              <div className='row'>
                <div className='input-group'>
                  <input type='file' accept='image/*'
                      className='col-md-6'
                      onChange={ e => this.handleImageChange(e.target.files[0]) }/>
                  <button className='btn btn-x btn-primary'
                      onClick={ () => this.convertImage() }
                      disabled={ !image }>
                    convert image (from { lang })</button>
                </div>
              </div>
              <div className='row'>
                <textarea className='form-control'
                    placeholder='content can be formatted with markdown'
                    value={ content }
                    onChange={ e => this.handleContentChange(e.target.value) }>
                </textarea>
              </div>
            </React.Fragment>
          )
        }
        <div className='row'>
          <div className='alert alert-primary col-md-12'>
            <ReactMarkdown source={ content }/></div>
        </div>
      </div>
    )
  }
}