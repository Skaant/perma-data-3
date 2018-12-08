import React from 'react'
import firebase from 'firebase/app'
import firebaseConfig from '../../firebase.config'
import { render } from 'react-dom'
import ImageConverter from '../../components/ImageConverter'
import PlantAdder from '../../components/PlantAdder'
import Login from '../../components/Login';

firebase.initializeApp(firebaseConfig)

class Contributor extends React.Component {
  constructor() {
    super()
    this.state = {
      mode: 'image-converter',
      user: null
    }
  }

  handleModeChange(mode) {
    this.setState({ mode })
  }

  updateUser(user) {
    if (user) {
      this.setState({ user })
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
        <div id='panel'>
          <div id='menu' className='container'>
            <div className='row'>
              <button type='button'
                  className={ `btn btn-primary col-md-3${ mode === 'image-converter' ? ' active' : '' }` }
                  onClick={ () => this.handleModeChange('image-converter') }
                  disabled={ mode === 'image-converter' }>
                image converter</button>
              <button type='button'
                  className={ `btn btn-primary col-md-3${ mode === 'plant-adder' ? ' active' : '' }` }
                  onClick={ () => this.handleModeChange('plant-adder') }
                  disabled={ mode === 'plant-adder' }>
                plant adder</button>
            </div>
          </div>
          {
            mode === 'image-converter' && (
              <ImageConverter/>
            )
          }
          {
            mode === 'plant-adder' && (
              <PlantAdder/>
            )
          }
        </div>
      </Login>
    )
  }
}

render(<Contributor/>, document.getElementById('contributor'))