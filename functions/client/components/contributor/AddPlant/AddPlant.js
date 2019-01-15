import React from 'react'
import PlantSearch from '../../PlantSearch/PlantSearch';

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      id: '',
      rank: 'species',
      sup: null
    }
  }

  handleIdChange(id) {
    this.setState({ id })
  }

  handleRankChange(rank) {
    this.setState({ rank })
  }

  handleSupChange(sup) {
    this.setState({ sup })
  }

  addPlant() {
    fetch('/api/plants', {
      method: 'PUT',
      body: JSON.stringify(this.state)
    })
      .then(result => result.json())
      .then(plant => console.log(plant))
      .catch(err => console.log(err))
  }

  render() {
    const { id, rank, sup } = this.state
    return (
      <React.Fragment>
        <h1 className='row'>ADD PLANT</h1>
        <div id='add-plant-form' className='row'>
          <label>id (latin taxonomy)</label>
          <input type='text' className='form-control'
              onChange={ e => this.handleIdChange(e.target.value) } />
          <label>Plant rank</label>
          <select className='form-control'
              value={ rank }
              onChange={ e => this.handleRankChange(e.target.value) }>
            <option value={ null }>
              choose a rank</option>
            <option value='family'>
              family</option>
            <option value='genus'>
              genus</option>
            <option value='species'>
              species</option>
            <option value='variety'>
              variety</option>
          </select>
          {
            (rank !== null && rank !== 'family') && (
              <React.Fragment>
                <label>Rank sup{
                  sup && ` (${ sup })` }</label>
                <PlantSearch selectPlant={ this.handleSupChange.bind(this) }/>
              </React.Fragment>
            )
          }
        </div>
        <div className='row'>
          <div className='col-md-4 offset-md-8'>
            <button type='button'
                className='btn btn-primary col'
                onClick={ () => this.addPlant() }
                disabled={ !id || !rank ||
                  (rank !== null && rank !== 'family' && !sup) }>
              send plant</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}