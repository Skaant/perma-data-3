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
      .then(({ id }) => this.setState({
        plantId: id
      }))
      .catch(err => console.log(err))
  }

  render() {
    const { plantId, rank, family, genus, species } = this.state
    return (
      <React.Fragment>
        <h3 className='contributor__title'>PLANT DATA</h3>
        <h1 className='row'>PLANT TITLE</h1>
        <h2 className='row'>RANK</h2>
        <h2 className='row'>NAMES</h2>
        <div id='form'
            className='row'>
          <div className='col-md-6'>
            <label>Rank</label>
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
            <label>ID (latin name)</label>
            <input type='text'
                  className='form-control'
                  placeholder='latin name'
                  onChange={ e => this.handleNamesChange('lt', e.target.value) }/>
          </div>
          <div className='col-md-6'>
            <label>English name</label>
            <input type='text'
                className='form-control'
                placeholder='en name'
                onChange={ e => this.handleNamesChange('en', e.target.value) }/>
            <label>French name</label>
            <input type='text'
                className='form-control'
                placeholder='fr name'
                onChange={ e => this.handleNamesChange('fr', e.target.value) }/>
          </div>
        </div>
        <h3>Rank hierarchy</h3>
        <div id='hierarchy' className='row'>
          {
            rank !== 'family' && (
              <div className='col-md-4'>
                <label>Family</label>
                <SearchPlant value={ family }
                    selectPlant={ this.handleFamilyChange.bind(this)} />
              </div>
            )
          }
          {
            (rank !== 'family' && rank !== 'genus') && (
              <div className='col-md-4'>
                <label>Genus</label>
                <SearchPlant value={ genus }
                    selectPlant={ this.handleGenusChange.bind(this)} />
              </div>
            )
          }
          {
            rank === 'variety' && (
              <div className='col-md-4'>
                <label>Variety</label>
                <SearchPlant value={ species }
                    selectPlant={ this.handleSpeciesChange.bind(this)} />
              </div>
            )
          }
        </div>
        <div className='row'>
          <div className='col-md-4 offset-md-8'>
            <button type='button'
                className='btn btn-primary col'
                onClick={ e => this.sendPlant(e.target.value) }>
              send plant</button>
            {
              plantId && (
                <h4>plant id: { plantId }</h4>
              )
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}