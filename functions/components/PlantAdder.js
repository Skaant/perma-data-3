import React from 'react'
import SearchPlant from './SearchPlant';

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      id: null,
      names: {
        lt: '',
        en: '',
        fr: ''
      },
      rank: 'species',
      family: '',
      genus: '',
      species: ''
    }
  }

  handleNamesChange(lang, value) {
    const { names } = this.state
    this.setState({
      names: Object.assign({}, names, {
        [lang]: value
      })
    })
  }

  handleRankChange(rank) {
    this.setState({ rank })
  }

  handleFamilyChange(family) {
    this.setState({ family })
  }

  handleGenusChange(genus) {
    this.setState({ genus })
  }

  handleSpeciesChange(species) {
    this.setState({ species })
  }

  sendPlant() {
    fetch('/contribute/plant', {
      method: 'PUT',
      body: JSON.stringify(this.state)
    })
      .then(result => result.json())
      .then(({ id }) => this.setState({ id }))
      .catch(err => console.log(err))
  }

  render() {
    const { id, rank, family, genus, species } = this.state
    return (
      <div className='container'>
        <div id='form'
            className='row'>
          <div className='col-md-6'>
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
            <input type='text'
                  className='form-control'
                  placeholder='id :: latin name'
                  onChange={ e => this.handleNamesChange('lt', e.target.value) }/>
          </div>
          <div className='col-md-6'>
            <input type='text'
                className='form-control'
                placeholder='en name'
                onChange={ e => this.handleNamesChange('en', e.target.value) }/>
            <input type='text'
                className='form-control'
                placeholder='fr name'
                onChange={ e => this.handleNamesChange('fr', e.target.value) }/>
          </div>
        </div>
        <div id='hierarchy' className='row'>
          {
            rank !== 'family' && (
              <SearchPlant value={ family }
                  classNames={ 'col-md-4' }
                  selectPlant={ this.handleFamilyChange.bind(this)} />
            )
          }
          {
            (rank !== 'family' && rank !== 'genus') && (
              <SearchPlant value={ genus }
                  classNames={ 'col-md-4' }
                  selectPlant={ this.handleGenusChange.bind(this)} />
            )
          }
          {
            rank === 'variety' && (
              <SearchPlant value={ species }
                  classNames={ 'col-md-4' }
                  selectPlant={ this.handleSpeciesChange.bind(this)} />
            )
          }
        </div>
        <div className='row'>
          <p className='offset-md-4 col-md-4'>
            plant added with id "{ id }"</p>
          <button type='button'
              className={ `${ id ? 'offset-md-8' : ''} col-md-4 btn btn-primary` }
              onClick={ e => this.sendPlant(e.target.value) }>
            send plant</button>
        </div>
      </div>
    )
  }
}