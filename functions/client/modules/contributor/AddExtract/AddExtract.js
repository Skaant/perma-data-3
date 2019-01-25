import React from 'react'
import ContentManager from '../../../components/ContentManager/ContentManager'
import ExtractSearch from '../../../components/ExtractSearch/ExtractSearch'
import TagManager from '../../../components/TagManager/TagManager'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      extract: {
        parent: true,
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
    const { extract } = this.state
    fetch('/api/extracts', {
      method: 'PUT',
      body: JSON.stringify(Object.assign({}, extract, {
        parent: extract.parent.id
      }))
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
        <div className='row'>
          <h1 className='col-md-12'>ADD EXTRACT</h1></div>
        <div className='row'>
          <label>top level extract ?</label>
          <input type='checkbox' className='form-control'
              checked={ parent ? false : true }
              onChange={ e => this.handleExtractChange('parent', !e.target.checked) } />
        </div>
        {
          parent !== false && (
            <ExtractSearch label='parent extract'
                extract={ parent }
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
        <ContentManager lang={ (parent && parent !== true) ? parent.lang : lang }
            content={ content }
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
        <TagManager title='tags (how to find)'
            tags={ tags }
            changeTags={ this.handleTagsChange.bind(this) }/>
        {
          message && (
            <div className={ `row alert alert-${ message.type }` }>
              { message.value }</div>
          )
        }
        <div id='contributor__bot-menu' className='row'>
          <button type='button'
              className='btn btn-primary btn-x col-md-6 offset-md-6'
              onClick={ () => this.addExtract() }>
            send extract</button>
        </div>
      </React.Fragment>
    )
  }
}