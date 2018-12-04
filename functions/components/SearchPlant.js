import React from 'react'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      plants: {}
    }
  }

  handleSearchChange(value) {
    const { rank } = this.props
    if (value.length >= 3) {
      fetch(`/api/plant-search/${ rank ? `${ rank }/` : '' }${ value }`)
        .then(result => result.json())
        .then(plants => this.setState({ plants }))
        .catch(err => console.log(err))
    }
  }

  handlePlantChange(plantId) {
    const { selectPlant } = this.props
    selectPlant(plantId)
  }

  render() {
    const { value, classNames } = this.props
    const { plants } = this.state
    return (
      <div className={ classNames }>
        <input type='text'
            className='form-control'
            placeholder='plant name, min. 3 letters'
            onChange={ e => this.handleSearchChange(e.target.value) }/>
        <select className='form-control col-md-6' 
            value={ value }
            onChange={ e => this.handlePlantChange(e.target.value) }>
          <option value=''>
            choose a plant</option>
          {
            Object.keys(plants).map(key => (
              <option key={ key } value={ key }>
                { key }</option>
            ))
          }
        </select>
      </div>
    )
  }
}