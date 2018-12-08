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
        lang: lang.slice(0, 2),
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
        <h3>Load image</h3>
        <div id='load' className='row'>
          <div className='col-md-8'>
            <label>Image to convert</label>
            <input type='file' accept='image/*'
                className='col-md-8'
                onChange={ e => this.handleImageChange(e.target.files[0]) }/>
          </div>
          <div className='col-md-4'>
            <label>Language</label>
            <select className='form-control'
                onChange={ e => this.handleLangChange(e.target.value) }>
              <option value={ null }>lang</option>
              <option value='eng'>EN</option>
              <option value='fra'>FR</option>
            </select>
          </div>
          <button className='btn btn-primary col'
              onClick={ () => this.convertImage() }
              disabled={ !image || !lang }>
            convert</button>
        </div>
        <h3>Correct conversion</h3>
        <div id='correct' className='row'>
          <textarea value={ markdown }
              className='col-12 form-control'
              placeholder='extract content'
              onChange={ e => this.handleMarkdownChange(e.target.value) }/>
        </div>
        <h3>Preview result</h3>
        <div id='render' className='row'>
          <div className='col-md-4 offset-md-4 col-sm-6 offet-sm-3'>
            <ExtractItem content={ markdown }
                biblio={ {
                  title: biblio ? biblios[biblio].title : 'biblio title',
                  author: biblio ? biblios[biblio].title : 'author'
                } }
                section={ {
                  title: sectionTitle || 'section title'
                } }/>
          </div>
        </div>
        <h3>Additional data</h3>
        <div id='form' className='row'>
          <div className='col-md-6'>
            <label>Bibliography</label>
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
            <label>Section</label>
            <input type='text'
              className='form-control'
              placeholder='section title'
              value={ sectionTitle }
              onChange={ e => this.handleSectionTitleChange(e.target.value) }/>
            <label>Page(s)</label>
            <input type='text'
              className='form-control'
              placeholder='extract pages'
              value={ pages }
              onChange={ e => this.handlePagesChange(e.target.value) }/>
          </div>
          <div className='col-md-6'>
            <label>Plants</label>
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
          <div className='col-md-4 offset-md-8'>
            <button className='btn btn-primary col'
                onClick={ () => this.sendPlant() }
                disabled={ !markdown }>
              send extract</button>
            {
              extractId && (
                <h4>extract id: { extractId }</h4>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}