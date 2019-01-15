import React from 'react'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      key: '',
      load: false,
      plants: []
    }
  }

  handleKeyChange(key) {
    this.setState({
      key,
      load: key.length > 3
    })
    if (key.length > 3) {
      fetch(`/api/plants/search/${ key }`, {
        method: 'GET'
      })
        .then(result => result.json())
        .then(({ plants }) => this.setState({
          load: false,
          plants
        }))
        .catch(err => {
          console.log(err)
          this.setState({
            load: false,
            plants: {}
          })
        })
    }
  }

  render() {
    const { selectPlant } = this.props
    const { key, load, plants } = this.state
    return (
      <React.Fragment>
        <input id='plant-search' type='text'
            className='form-control'
            value={ key }
            onChange={ e => this.handleKeyChange(e.target.value) }/>
        {
          load && (
            <i>loading plant results ...</i>
          )
        }
        {
          plants.length > 0 && (
            <React.Fragment>
              <label>Plant results</label>
              <select className='form-control'
                  onChange={ e => selectPlant(e.target.value) }>
                <option value={ null }>Choose a plant</option>
                {
                  plants.map(({ id }) => (
                    <option key={ id } value={ id }>
                      { id }</option>
                  ))
                }
              </select> 
            </React.Fragment>
          )
        }
      </React.Fragment>
    )
  }
}