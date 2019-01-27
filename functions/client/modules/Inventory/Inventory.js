import React from 'react'
import Login from '../../components/Login/Login'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      list: null
    }
  }

  handleModeChange(mode) {
    const { mode: prevMode } = this.state
    if (mode != prevMode) {
      this.setState({ mode })
    }
  }

  updateUser(user) {
    if (user) {
      const { uid, email } = user
      fetch(`/api/user-data/${ email }`)
        .then(result => result.json())
        .then(({ roles }) => {
          this.setState({
            user: Object.assign({}, {
              uid,
              email,
              roles
            })
          })
          fetch(`/api/user-data/inventory/${ email }`)
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

  render() {
    const { user, list } = this.state
    return (
      <React.Fragment>
        <div className='row'>
          <h1 className='col-12'>inventory</h1>
        </div>
        <Login user={ user }
            updateUser={ this.updateUser.bind(this) }>
          {
            list ? list.map(({ id, rank }) => (
              <div className='row'>
                <div className='col-md-8'>
                  { id }
                </div>
                <div className='col-md-4'>
                  { rank }
                </div>
              </div>
            )) : (
              <div className='row'>
                <div className='alert alert-info'>
                  .. inventory area is loading
                </div>
              </div>
            )
          }
        </Login>
      </React.Fragment>
    )
  }
}