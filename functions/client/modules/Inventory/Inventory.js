import React from 'react'
import Login from '../../components/Login/Login'
import PlantSearch from '../../components/PlantSearch/PlantSearch';
import PlantList from './PlantList/PlantList';

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      list: null
    }
  }

  updateUser(user) {
    if (user) {
      const { uid, email } = user
      fetch(`/api/users/${ email }`)
        .then(result => result.json())
        .then(({ roles }) => {
          this.setState({
            user: Object.assign({}, {
              uid,
              email,
              roles
            })
          })
          fetch(`/api/inventories/${ email }`)
            .then(result => result.json())
            .then(({ list }) => {
              this.setState({ list })
            })
        })
    } else {
      this.setState({
        user: null
      })
    }
  }

  addPlant(plant) {
    const { user, list } = this.state
    if (list.every(({ id }) => id !== plant.id)) {
      list.push(plant)
      fetch(`/api/inventories/plant/${ user.email }`, {
        method: 'POST',
        body: JSON.stringify({ 
          list: list.map(plant => plant.id)
        })
      })
        .then(result => result.json())
        .then(() => this.setState({
          list,
          message: {
            type: 'success',
            value: 'extract added'
          }
        }))
    } else {
      this.setState({
        message: {
          type: 'warning',
          value: 'plant already in the list'
        }
      })
    }
  }

  deletePlant(plantId) {
    const { user, list } = this.state
    list.splice(list.indexOf(({ id }) => id === plantId), 1)
    fetch(`/api/inventories/plant/${ user.email }`, {
      method: 'DELETE',
      body: JSON.stringify({ 
        list: list.map(plant => plant.id)
      })
    })
      .then(() => this.setState({
        list,
        message: {
          type: 'success',
          value: 'extract added'
        }
      }))
  }

  render() {
    const { user, list } = this.state
    return (
      <React.Fragment>
        <div className='row'>
          <h1 className='col-12'>inventory</h1>
        </div>
        <Login user={ user }
            updateUser={ this.updateUser.bind(this) }>
          <div className='content row'>
            <div className='col-lg-6 col-md-8 offset-lg-3 offset-md-2 container'>
              {
                list ? (
                  <React.Fragment>
                    <PlantSearch selectPlant={ this.addPlant.bind(this) } />
                    <PlantList list={ list }
                        deletePlant={ this.deletePlant.bind(this) }/>
                  </React.Fragment>
                ) : (
                  <div className='row'>
                    <div className='alert alert-info col-12'>
                      .. inventory area is loading
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </Login>
      </React.Fragment>
    )
  }
}