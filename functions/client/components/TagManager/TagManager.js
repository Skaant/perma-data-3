import React from 'react'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
    }
  }

  handleValueChange(value) {
    this.setState({ value})
  }

  addTag() {
    const { tags, changeTags } = this.props
    const { value } = this.state
    tags.push(value)
    changeTags(tags)
    this.setState({
      value: ''
    })
  }

  removeTag(tag) {
    const { tags, changeTags } = this.props
    tags.splice(tags.indexOf(tag), 1)
    changeTags(tags)
  }

  render() {
    const { tags } = this.props
    const { value } = this.state
    return (
      <div className='tags-manager'>
        <div className='row'>
          <label>tag list</label>
          <div className='input-group'>
            <input type='text'
                placeholder='type a new tag and press enter'
                className='form-control'
                value={ value }
                onChange={ e => this.handleValueChange(e.target.value) }
                onKeyPress={ e => e.charCode === 13
                  && value.length >= 3 && this.addTag() }/>
            <div className='input-group-append'>
              <button className='btn btn-x btn-primary'
                  onClick={ () => this.addTag() }
                  disabled={ value.length < 3 }>
                add</button>
            </div>
          </div>
        </div>
        <div className='row'>
          <p>{ tags.map(tag => (
            <span key={ tag } className='badge badge-secondary'>
              { tag } <b onClick={ () => this.removeTag(tag) }>
                x</b></span>
            )) }</p>
        </div>
      </div>
    )
  }
}