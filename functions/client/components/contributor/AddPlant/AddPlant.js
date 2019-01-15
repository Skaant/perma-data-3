import React from 'react'
import PlantSearch from '../../PlantSearch/PlantSearch';

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      plant: {
        id: '',
        rank: 'species',
        sup: null
      },
      message: null
    }
  }

  handleIdChange(id) {
    const { plant } = this.state
    this.setState({ 
      plant: Object.assign({}, plant, { id }),
      message: null
    })
  }

  handleRankChange(rank) {
    const { plant } = this.state
    this.setState({ 
      plant: Object.assign({}, plant, { rank }),
      message: null
    })
  }

  handleSupChange(sup) {
    const { plant } = this.state
    this.setState({ 
      plant: Object.assign({}, plant, { sup }),
      message: null
    })
  }

  addPlant() {
    fetch('/api/plants', {
      method: 'PUT',
      body: JSON.stringify(this.state.plant)
    })
      .then(result => result.json())
      .then(() => this.setState({
        message: {
          type: 'success',
          value: 'plant added'
        }
      }))
      .catch(err => {
        console.log(err)
        this.setState({
          message: {
            type: 'danger',
            value: err.message
          }
        })
      })
  }

  render() {
    const { plant: { id, rank, sup }, message } = this.state
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
            <option value='variety'>
              variety</option>
            <option value='species'>
              species</option>
            <option value='genus'>
              genus</option>
            <option value='family'>
              family</option>
          </select>
          {
            (rank !== null && rank !== 'family') && (
              <React.Fragment>
                <label>Rank sup{
                  sup && ` (${ sup })` }</label>
                <PlantSearch mode='mono' plant={ sup }
                    selectPlant={ this.handleSupChange.bind(this) }/>
              </React.Fragment>
            )
          }
        </div>
        {
          message && (
            <div className={ `row alert alert-${ message.type }` }>
              { message.value }</div>
          )
        }
        <div id='contributor__bot-menu' className='row'>
          <div className='col-md-6 offset-md-6'>
            <button type='button'
                className='btn btn-primary btn-x col'
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