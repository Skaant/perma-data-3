import React from 'react'
import PlantSearch from '../../../components/PlantSearch/PlantSearch'
import calculateRank from '../../../../utils/functions/calculateRank'
import ExtractSearch from '../../../components/ExtractSearch/ExtractSearch';
import TagManager from '../../../components/TagManager/TagManager';

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        extract: null,
        plants: [],
        type: null,
        value: null,
        tags: []
      },
      message: null
    }
  }

  handleDataChange(key, value) {
    const { data } = this.state
    this.setState({ 
      data: Object.assign({}, data, {
        [key]: value
      }),
      message: null
    })
  }

  handleExtractChange(extract) {
    this.handleDataChange('extract', extract)
  }

  handlePlantsChange(plant) {
    const { data: { plants } } = this.state
    if (typeof plant === 'object') {
      plants.push(plant)
    } else {
      plants.splice(plants.indexOf(({ id }) => id === plant), 1)
    }
    this.handleDataChange('plants', plants)
  }

  handleTagsChange(tags) {
    this.handleDataChange('tags', tags)
  }

  addData() {
    const { data } = this.state
    const { extract, plants } = data
    fetch('/api/datas', {
      method: 'PUT',
      body: JSON.stringify(Object.assign({}, data, {
        extract: extract.id,
        plants: plants.map(({ id }) => id)
      }))
    })
      .then(result => result.json())
      .then(() => this.setState({
        message: {
          type: 'success',
          value: 'data added'
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
      data: { extract, plants, type, value, tags },
      message } = this.state
    return (
      <React.Fragment>
        <div className='row'>
          <h1 className='col-md-12'>ADD DATA</h1></div>
        <ExtractSearch extract={ extract }
            selectExtract={ this.handleExtractChange.bind(this) }/>
        <div className='row'>
          <label>Type</label>
          <select className='form-control'
              value={ type }
              onChange={ e => this.handleDataChange('type', e.target.value) }>
            <option value={ null }>
              choose a type</option>
            <option value='name'>
              name</option>
            <option value='calendar'>
              calendar</option>
            <option value='cooking-receipe'>
              cooking receipe</option>
            <option value='hardiness'>
              hardiness</option>
          </select>
        </div>
        <PlantSearch mode='multi' plants={ plants }
            label='plant(s)'
            selectPlant={ this.handlePlantsChange.bind(this) }/>
        <TagManager tags={ tags }
            changeTags={ this.handleTagsChange.bind(this) }/>
        {
          message && (
            <div className={ `row alert alert-${ message.type }` }>
              { message.value }</div>
          )
        }
        <div id='contributor__bot-menu' className='row'>
          <button type='button'
              className='btn btn-primary btn-x col-md-6 offset-md-6'
              onClick={ () => this.addData() }
              disabled={ false }>
            send plant</button>
        </div>
      </React.Fragment>
    )
  }
}