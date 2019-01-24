import React from 'react'
import calculateRank from '../../../utils/functions/calculateRank'

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

  handleOpenChange() {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }

  handleKeyChange(key) {
    this.setState({ key })
  }

  searchPlant() {
    const { rank } = this.props
    const { key } = this.state
    if (key.length >= 3) {
      this.setState({
        load: true,
        results: []
      })
      fetch(`/api/plants/search/${ key }`, {
        method: 'GET'
      })
        .then(result => result.json())
        .then(({ plants }) => {
          const results = plants.filter(
            ({ rank: resultRank }) => resultRank === calculateRank(rank, -1))
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
    const { rank, selectPlant } = this.props
    const { results } = this.state
    if (results.find(({ id }) => id === value).rank === calculateRank(rank, -1)) {
      selectPlant(value)
      this.setState({
        open: false
      })
    }
  }

  render() {
    const { mode, label, rank, plant, plants, selectPlant } = this.props
    const { open, key, results, load } = this.state
    return (
      <div className='plant-search'>
        <div className='row'>
          <label>{ label }</label>
        </div>
        {
          !open ? (
            <div className='row'>
              <button className='btn btn-x btn-x-border btn-outline-dark col-12'
                  onClick={ () => this.handleOpenChange() }>
                open plant search</button>
            </div>
          ) : (
            <React.Fragment>
              <div className='row'>
                <button className='btn btn-x btn-x-light-dark btn-outline-dark col-md-12'
                    onClick={ () => this.handleOpenChange() }>
                  collapse form</button>
              </div>
              <div className='row'>
                <div className='input-group'>
                  <input type='text'
                      placeholder='type plant key here'
                      className='form-control'
                      value={ key }
                      onChange={ e => this.handleKeyChange(e.target.value) }
                      onKeyPress={ e => e.charCode === 13
                        && key.length >= 3 && this.searchPlant() }/>
                  <div className='input-group-append'>
                    <button className='btn btn-x btn-primary'
                        onClick={ () => this.searchPlant() }
                        disabled={ key.length < 3 }>
                      run</button>
                  </div>
                </div>
              </div>
              {
                load && (
                  <div className='row'>
                    <div className='col-12 alert alert-info'>
                      ... search results are loading
                    </div>
                  </div>
                )
              }
              {
                results.length > 1 && (
                  <div className='row'>
                    <label>plant results</label>
                    <select className='form-control'
                        onChange={ e => this.handleResultsSelect(e.target.value) }>
                      <option value={ null }>Choose a plant</option>
                      {
                        results.map(({ id }) => (
                          <option key={ id } value={ id }>
                            { id }</option>
                        ))
                      }
                    </select>
                  </div>
                )
              }
            </React.Fragment>
          )
        }
        <div className='row'>
          {
            !load && (((mode === 'mono' && !plant) || (mode === 'multi' && !plants))
              && results.length === 0) && (
                <div className='col-12 alert alert-warning'>
                  <i>no plant selected</i></div>
              )
          }
          {
            (mode === 'mono') && plant && (
              <div className='col-12 alert alert-primary'>{ plant } (
                <a onClick={ () => selectPlant(null) }>
                  delete</a>)</div>
            )
          }
        </div>
      </div>
    )
  }
}