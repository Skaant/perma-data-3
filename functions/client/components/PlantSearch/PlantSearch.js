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

  handleOpenChange(open) {
    this.setState({ open })
  }

  handleKeyChange(key) {
    this.setState({ key })
  }

  searchPlant() {
    const { rank } = this.props
    const { key } = this.state
    if (key.length >= 3) {
      fetch(`/api/plants/search/${ key }`, {
        method: 'GET'
      })
        .then(result => result.json())
        .then(({ plants: results }) => {
          const rankResults = results.filter(
            ({ rank: resultRank }) => resultRank === calculateRank(rank, -1))
          if (rankResults.length === 1) {
            this.props.selectPlant(results[0].id)
          }
          this.setState({
            load: false,
            results,
            open: rankResults.length > 1
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
                  onClick={ () => this.handleOpenChange(true) }>
                open plant search</button>
            </div>
          ) : (
            <React.Fragment>
              <div className='row'>
                <input type='text'
                    placeholder='type plant key here'
                    className='form-control'
                    value={ key }
                    onChange={ e => this.handleKeyChange(e.target.value) }
                    onKeyPress={ e => e.charCode === 13
                      && key.length >= 3 && this.searchPlant() }/>
              </div>
              <div className='row'>
                <button className='btn btn-x btn-outline-dark col-md-6'
                    onClick={ () => this.handleOpenChange(false) }>
                  close search form</button>
                <button className='btn btn-x btn-primary col-md-6'
                    onClick={ () => this.searchPlant() }
                    disabled={ key.length < 3 }>
                  run plant search</button>
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
            (((mode === 'mono' && !plant) || (mode === 'multi' && !plants))
              && results.length === 0) && (
                <div className='col-12 alert alert-secondary'>
                  <i>no plant selected</i></div>
              )
          }
          {
            (mode === 'mono') 
              && plant ? (
                <div className='col-12 alert alert-primary'>{ plant } (
                  <a onClick={ () => selectPlant(null) }>
                    delete</a>)</div>
              ) : results.length > 0 && (
                <div className='col-12 alert alert-secondary'>
                  <i>no result found of the { calculateRank(rank, -1) } rank</i>
                </div>
              )
          }
          {
            (mode === 'multi' && plants) && plants.map(plant => (
              <li key={ plant.id }>{ plant.id } (
                <a onClick={ () => selectPlant(null) }>
                  delete</a>)</li>
            ))
          }
        </div>
      </div>
    )
  }
}