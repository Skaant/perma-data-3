import React from 'react'
import firebase from 'firebase/app'
import firebaseConfig from '../../firebase.config'
import { render } from 'react-dom'
import ImageConverter from '../../components/ImageConverter'
import PlantAdder from '../../components/PlantAdder'
import Login from '../../components/Login';
import VerticalLeftMenu from '../components/contributor/VerticalLeftMenu/VerticalLeftMenu';

firebase.initializeApp(firebaseConfig)

class Contributor extends React.Component {
  constructor() {
    super()
    this.state = {
      mode: 'plant-adder',
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
            <div id='panel' className='row'>
              <VerticalLeftMenu mode={ mode }
                  handleModeChange={ this.handleModeChange.bind(this) } />
              <div className='col-md-8'>
                {
                  mode === 'plant-adder' && (
                    <PlantAdder/>
                  )
                }
                {
                  mode === 'image-converter' && (
                    <ImageConverter/>
                  )
                }
              </div>
            </div>
          )
        }
      </Login>
    )
  }
}

render(<Contributor/>, document.getElementById('contributor'))