import React from 'react'
import firebase from 'firebase/app'
import firebaseConfig from '../../../firebase.config'
import { render } from 'react-dom'
import Login from '../../components/Login/Login'
import ContributeMenu from './ContributeMenu/ContributeMenu'
import AddPlant from './AddPlant/AddPlant'
import AddExtract from './AddExtract/AddExtract'
import AddData from './AddData/AddData';

firebase.initializeApp(firebaseConfig)

class Contributor extends React.Component {
  constructor() {
    super()
    this.state = {
      mode: null,
      user: null
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
        .then(userData => this.setState({
          user: Object.assign({}, {
            uid,
            email
          }, userData)
        }))
    } else {
      this.setState({
        user: null
      })
    }
  }

  render() {
    const { mode, user } = this.state
    return (
      <React.Fragment>
        <div className='row'>
          <h1 className='col-12'>contributor</h1>
        </div>
        <Login user={ user }
            updateUser={ this.updateUser.bind(this) }>
          {
            (user && user.roles.includes('contributor')) && (
              <React.Fragment>
                {
                  mode === null && (
                    <div id='contributor__top-menu' className='row'>
                      <ContributeMenu mode={ mode }
                          handleModeChange={ this.handleModeChange.bind(this) } />
                    </div>
                  )
                }
                <div className='row'>
                  <div id='contributor__tool' className='col-8 col-md-6 container-fluid'>
                    {
                      mode && (
                        <div id='contributor__top-menu' className='row'>
                          <button type='button'
                              className='btn btn-x btn-dark col-md-6'
                              onClick={ () => this.handleModeChange(null) }>
                            menu back</button>
                        </div>
                      )
                    }
                    {
                      mode === 'add-plant' && (
                        <AddPlant/>
                      )
                    }
                    {
                      mode === 'add-extract' && (
                        <AddExtract/>
                      )
                    }
                    {
                      mode === 'add-data' && (
                        <AddData/>
                      )
                    }
                  </div>
                </div>
              </React.Fragment>
            )
          }
        </Login>
      </React.Fragment>
    )
  }
}

render(<Contributor/>, document.getElementById('contributor'))