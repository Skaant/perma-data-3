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

  searchExtract() {
    const { mode, selectExtract } = this.props
    const { key } = this.state
    if (key.length >= 3) {
      fetch(`/api/extracts/search/${ key }`, {
        method: 'GET'
      })
        .then(result => result.json())
        .then(({ extracts: results }) => {
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
    const { rank, selectExtract } = this.props
    const { results } = this.state
    if (results.find(({ id }) => id === value).rank === calculateRank(rank, -1)) {
      this.setState({
        open: false
      })
    }
  }

  render() {
    const { mode, label, extract } = this.props
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
                open extract search</button>
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
            extract ? (
              <div className='col-12 alert alert-primary'>
                { extract.title }</div>
            ) : (mode === 'mandatory' ? (
              <div className='col-12 alert alert-secondary'>
                <b>no extract selected</b></div>
            ) : (
              <div className='col-12 alert alert-secondary'>
                <b>top level extract</b></div>
            ))
          }
        </div>
      </div>
    )
  }
}