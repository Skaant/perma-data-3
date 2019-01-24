import React from 'react'
import ContentManager from '../../../components/ContentManager/ContentManager'
import ExtractSearch from '../../../components/ExtractSearch/ExtractSearch'
import TagManager from '../../../components/TagManager/TagManager'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      extract: {
        parent: false,
        lang: 'EN',
        title: '',
        content: '',
        author: '',
        tags: []
      },
      message: null
    }
  }

  handleExtractChange(key, value) {
    const { extract } = this.state
    this.setState({ 
      extract: Object.assign({}, extract, {
        [key]: value
      }),
      message: null
    })
  }

  handleParentChange(parent) {
    this.handleExtractChange('parent', parent)
  }

  handleContentChange(content) {
    this.handleExtractChange('content', content)
  }

  handleTagsChange(tags) {
    this.handleExtractChange('tags', tags)
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
      extract: { parent, lang, title, author, content, tags },
      message
    } = this.state
    return (
      <React.Fragment>
        <h1 className='row'>ADD EXTRACT</h1>
        <div className='row'>
          <label>top level extract ?</label>
          <input type='checkbox' className='form-control'
              onChange={ e => this.handleExtractChange('parent', e.target.checked) } />
        </div>
        {
          parent && (
            <ExtractSearch label='parent extract'
                selectExtract={ this.handleParentChange.bind(this) }/>
          )
        }
        <div className='row'>
          <label>title</label>
          <input type='text' className='form-control'
              value={ title }
              onChange={ e => this.handleExtractChange('title', e.target.value) } />
        </div>
        {
          !parent && (
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
          )
        }
        <ContentManager lang={ lang } content={ content }
            changeContent={ this.handleContentChange.bind(this) }/>
        {
          !parent && (
            <div className='row'>
              <label>author</label>
              <input type='text' className='form-control'
                  value={ author }
                  onChange={ e => this.handleExtractChange('author', e.target.value) } />
            </div>
          )
        }
        <TagManager tags={ tags }
            changeTags={ this.handleTagsChange.bind(this) }/>
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