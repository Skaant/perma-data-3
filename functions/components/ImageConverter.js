import React from 'react'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  handleFileLoad(file) {
    this.setState({
      image: file
    })
  }

  render() {
    return (
      <div className='container'>
        <div id='1-upload' className='row'>
          <input type='file'
              onChange={ e => this.handleFileLoad(e.target.files[0]) }/>
        </div>
        <div id='2-image' className='row'>
        </div>
        <div id='3-correct' className='row'>
        </div>
        <div id='4-render' className='row'>
        </div>
        <div id='5-form' className='row'>
        </div>
      </div>
    )
  }
}