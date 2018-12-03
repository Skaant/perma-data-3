import React from 'react'
import { render } from 'react-dom'
import ImageConverter from '../../components/ImageConverter'

class Contributor extends React.Component {
  constructor() {
    super()
    this.state = {
      mode: 'image-converter'
    }
  }

  handleModeChange(mode) {
    this.setState({ mode })
  }

  render() {
    const { mode } = this.state
    return (
      <div>
        <div className='row'>
          <button type='button' className='btn btn-primary'
              onClick={ () => this.handleModeChange('image-converter') }>
            image converter</button>
          <button type='button' className='btn btn-primary'
              onClick={ () => this.handleModeChange('plant-adder') }>
            plant adder</button>
        </div>
        {
          mode === 'image-converter' && (
            <ImageConverter/>
          )
        }
        {
          mode === 'plant-adder' && (
            <span>salut</span>
          )
        }
      </div>
    )
  }
}

render(<Contributor/>, document.getElementById('image-converter'))