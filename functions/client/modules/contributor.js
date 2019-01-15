import React from 'react'
import firebase from 'firebase/app'
import firebaseConfig from '../../firebase.config'
import { render } from 'react-dom'
import ImageConverter from '../../components/ImageConverter'
import Login from '../../components/Login/Login';
import ContributeMenu from '../components/contributor/ContributeMenu/ContributeMenu';
import AddPlant from '../components/contributor/AddPlant/AddPlant';

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
      <Login user={ user }
          updateUser={ this.updateUser.bind(this) }>
        {
          (user && user.roles.includes('contributor')) && (
            <React.Fragment>
              <div id='contributor__top-menu' className='row'>
                {
                  mode !== null ? (
                    <button type='button' id='contributor__back-btn'
                        className='btn btn-outline-dark col-md-4'
                        onClick={ () => this.handleModeChange(null) }>
                      back</button>
                  ) : (
                    <ContributeMenu mode={ mode }
                        handleModeChange={ this.handleModeChange.bind(this) } />
                  )
                }
              </div>
              <div className='row'>
                <div id='contributor__tool' className='col-8 col-md-6 container-fluid'>
                  {
                    mode === 'add-plant' && (
                      <AddPlant/>
                    )
                  }
                  {
                    mode === 'add-extract' && (
                      <ImageConverter/>
                    )
                  }
                </div>
              </div>
            </React.Fragment>
          )
        }
      </Login>
    )
  }
}

render(<Contributor/>, document.getElementById('contributor'))