import React from 'react'
import ReactMarkdown from 'react-markdown'
import SearchPlant from './SearchPlant'

const Tesseract = window.Tesseract

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      image: null,
      lang: null,
      markdown: '',
      biblios: {},
      biblio: '',
      sectionTitle: '',
      pages: '',
      plants: []
    }
  }

  componentDidMount() {
    fetch('/api/biblios')
      .then(result => result.json())
      .then(biblios => this.setState({ biblios }))
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

  handleBiblioChange(biblio) {
    this.setState({ biblio })
  }

  handleSectionTitleChange(sectionTitle) {
    this.setState({ sectionTitle })
  }

  handlePagesChange(pages) {
    this.setState({ pages })
  }

  handlePlantChange(plantId, index) {
    const { plants } = this.state
    if (plantId === '' && index !== -1) {
      this.removePlant(index)
    } else if (plantId && !plants.includes(plantId)) {
      this.addPlant(plantId)
    }
  }

  addPlant(plantId) {
    const { plants } = this.state
    plants.push(plantId)
    this.setState({ plants })
  }

  removePlant(index) {
    const { plants } = this.state
    plants.splice(index, 1)
    this.setState({ plants })
  }

  sendPlant() {
    const { lang, markdown, biblio, sectionTitle, pages, plants } = this.state
    fetch('/contribute/extract', {
      method: 'PUT',
      body: JSON.stringify({
        lang,
        content: markdown,
        biblio,
        sectionTitle,
        pages,
        plants
      })
    })
    .then(result => result.json())
    .then(({ id }) => this.setState({
      extractId: id
    }))
  }

  render() {
    const { image, 
      lang, markdown, biblios, biblio, sectionTitle, pages, plants,
    extractId } = this.state
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
            <select className='form-control'
                value={ biblio }
                onChange={ e => this.handleBiblioChange(e.target.value) }>
              <option value=''>choose a biblio</option>
              {
                Object.keys(biblios).map(key => (
                  <option key={ key } value={ key }>
                    { biblios[key].title } ({ biblios[key].author })</option>
                ))
              }
            </select>
            <input type='text'
              className='form-control'
              placeholder='section title'
              value={ sectionTitle }
              onChange={ e => this.handleSectionTitleChange(e.target.value) }/>
            <input type='text'
              className='form-control'
              placeholder='extract pages'
              value={ pages }
              onChange={ e => this.handlePagesChange(e.target.value) }/>
          </div>
          <div className='col-md-6'>
            {
              plants.map((plant, index) => (
                <SearchPlant key={ plant }
                  value={ plant }
                  index={ index }
                  selectPlant={ this.handlePlantChange.bind(this) }/>
              ))
            }
            <div className='empty'>
              <SearchPlant index={ -1 }
                  key='empty'
                  value=''
                  selectPlant={ this.handlePlantChange.bind(this) }/>
            </div>
          </div>
        </div>
        <div className='row'>
          <button className='col-md-4 btn btn-primary'
              onClick={ () => this.sendPlant() }
              disabled={ !markdown }>
            send extract</button>
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