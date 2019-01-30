import React from 'react'
import ExtractRender from '../ExtractRender/ExtractRender'

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
        <div className='row'>
          <label>content</label>
        </div>
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
                <div className='file-input input-group'>
                  <label className='form-control'>
                    { (image && image.name) || 'select image to convert' }</label>
                  <input type='file' accept='image/*'
                      className='file-input__activator form-control'
                      onChange={ e => this.handleImageChange(e.target.files[0]) }/>
                  <div className="input-group-append">
                    <button className='btn btn-x btn-primary'
                        onClick={ () => this.convertImage() }
                        disabled={ !image }>
                      { lang }</button>
                  </div>
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
        {
          content && (
            <ExtractRender content={ content }/>
          )
        }
      </div>
    )
  }
}