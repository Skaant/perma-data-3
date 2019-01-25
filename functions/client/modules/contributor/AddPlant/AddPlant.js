import React from 'react'
import PlantSearch from '../../../components/PlantSearch/PlantSearch'
import calculateRank from '../../../../utils/functions/calculateRank'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      plant: {
        id: '',
        rank: 'species',
        parent: null,
        tags: []
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
      plant: Object.assign({}, plant, {
        rank,
        sup: null
      }),
      message: null
    })
  }

  handleParentChange(parent) {
    const { plant } = this.state
    this.setState({ 
      plant: Object.assign({}, plant, { parent }),
      message: null
    })
  }

  addPlant() {
    const { plant } = this.state
    fetch('/api/plants', {
      method: 'PUT',
      body: JSON.stringify(Object.assign({}, plant, {
        parent: plant.parent.id
      }))
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
    const { 
      plant: { id, rank, parent },
      message } = this.state
    return (
      <React.Fragment>
        <div className='row'>
          <h1 className='col-md-12'>ADD PLANT</h1></div>
        <div className='row'>
          <label>id (latin taxonomy)</label>
          <input type='text' className='form-control'
              onChange={ e => this.handleIdChange(e.target.value) } />
        </div>
        <div className='row'>
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
        </div>
        {
          (rank !== null && rank !== 'family') && (
            <PlantSearch mode='mono' plant={ parent } rank={ rank }
                label={ `parent (${ calculateRank(rank, -1) })` }
                selectPlant={ this.handleParentChange.bind(this) }/>
          )
        }
        {
          message && (
            <div className={ `row alert alert-${ message.type }` }>
              { message.value }</div>
          )
        }
        <div id='contributor__bot-menu' className='row'>
          <button type='button'
              className='btn btn-primary btn-x col-md-6 offset-md-6'
              onClick={ () => this.addPlant() }
              disabled={ !id || !rank ||
                (rank !== null && rank !== 'family' && !parent) }>
            send plant</button>
        </div>
      </React.Fragment>
    )
  }
}