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
    const { selectPlant, index } = this.props
    selectPlant(plantId, index)
  }

  render() {
    const { value, classNames } = this.props
    const { plants } = this.state
    return (
      <div className={ classNames }>
        {
          (value !== '' && !Object.keys(plants).includes(value)) ? (
            <h4>
              { value } <span
                onClick={ () => this.handlePlantChange('') }>X</span></h4>
          ) : (
            <React.Fragment>
              <input type='text'
                  className='form-control'
                  placeholder='plant name, min. 3 letters'
                  onChange={ e => this.handleSearchChange(e.target.value) }/>
              <select className='form-control'
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
            </React.Fragment>
          )
        }
      </div>
    )
  }
}