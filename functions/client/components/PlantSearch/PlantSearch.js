import React from 'react'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      key: '',
      load: false,
      results: [],
      open: false
    }
  }

  handleOpenChange(open) {
    this.setState({ open })
  }

  handleKeyChange(key) {
    this.setState({ key })
  }

  searchPlant() {
    const { key } = this.state
    if (key.length >= 3) {
      fetch(`/api/plants/search/${ key }`, {
        method: 'GET'
      })
        .then(result => result.json())
        .then(({ plants: results }) => {
          if (results.length === 1) {
            this.props.selectPlant(results[0].id)
          }
          this.setState({
            load: false,
            results,
            open: results.length > 1
          })
        })
        .catch(err => {
          console.log(err)
          this.setState({
            load: false,
            results: []
          })
        })
    }
  }

  handleResultsSelect(value) {
    this.props.selectPlant(value)
    this.setState({
      open: false
    })
  }

  render() {
    const { mode, plant, plants, selectPlant } = this.props
    const { open, key, results, load } = this.state
    return (
      <React.Fragment>
        {
          !open ? (
            <button className='btn btn-x btn-x-border btn-outline-dark col-12'
                onClick={ () => this.handleOpenChange(true) }>
              open plant search</button>
          ) : (
            <React.Fragment>
              <hr className='col-12'/>
              <input type='text'
                  placeholder='type plant key here'
                  className='form-control'
                  value={ key }
                  onChange={ e => this.handleKeyChange(e.target.value) }
                  onKeyPress={ e => e.charCode === 13
                    && key.length >= 3 && this.searchPlant() }/>
              <button className='btn btn-x btn-outline-dark col-md-6'
                  onClick={ () => this.handleOpenChange(false) }>
                close search form</button>
              <button className='btn btn-x btn-primary col-md-6'
                  onClick={ () => this.searchPlant() }
                  disabled={ key.length < 3 }>
                run plant search</button>
              {
                load && (
                  <p>
                    ... search results are loading
                  </p>
                )
              }
              {
                results.length > 1 && (
                  <select className='form-control'
                      onChange={ e => this.handleResultsSelect(e.target.value) }>
                    <option value={ null }>Plant results</option>
                    {
                      results.map(({ id }) => (
                        <option key={ id } value={ id }>
                          { id }</option>
                      ))
                    }
                  </select>
                )
              }
            </React.Fragment>
          )
        }
        <hr className='col-12'/>
        <ul className='plant-search__results col-12'>
          {
            ((mode === 'mono' && !plant)
              || (mode === 'multi' && !plants)) && (
                <li><i>no plant selected</i></li>
              )
          }
          {
            (mode === 'mono' && plant) && (
              <li>{ plant } (
                <a onClick={ () => selectPlant(null) }>
                  delete</a>)</li>
            )
          }
          {
            (mode === 'multi' && plants) && plants.map(plant => (
              <li key={ plant.id }>{ plant.id } (
                <a onClick={ () => selectPlant(null) }>
                  delete</a>)</li>
            ))
          }
        </ul>
      </React.Fragment>
    )
  }
}