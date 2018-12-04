import React from 'react'
import { render } from 'react-dom'
import ImageConverter from '../../components/ImageConverter'
import PlantAdder from '../../components/PlantAdder';

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
      <React.Fragment>
        <div id='menu' className='container'>
          <div className='row'>
            <button type='button'
                className={ `btn btn-primary col-md-3${ mode === 'image-converter' ? ' active' : '' }` }
                onClick={ () => this.handleModeChange('image-converter') }
                disabled={ mode === 'image-converter' }>
              image converter</button>
            <button type='button'
                className={ `btn btn-primary col-md-3${ mode === 'plant-adder' ? ' active' : '' }` }
                onClick={ () => this.handleModeChange('plant-adder') }
                disabled={ mode === 'plant-adder' }>
              plant adder</button>
          </div>
        </div>
        {
          mode === 'image-converter' && (
            <ImageConverter/>
          )
        }
        {
          mode === 'plant-adder' && (
            <PlantAdder/>
          )
        }
      </React.Fragment>
    )
  }
}

render(<Contributor/>, document.getElementById('contributor'))