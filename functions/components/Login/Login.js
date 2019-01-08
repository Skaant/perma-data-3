import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import AuthFrameMenu from './AuthFrameMenu/AuthFrameMenu';

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      email: '',
      password: '',
      mode: 'login',
      info: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.updateUser(user)
    })
  }
  
  handleEmailChange(email) {
    this.setState({ email })
  }

  handlePasswordChange(password) {
    this.setState({ password })
  }

  signIn() {
    const { email, password } = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => console.log(user))
      .catch(err => console.log(err))
  }

  signUp() {
    const { email, password } = this.state
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => console.log(user))
      .catch(err => console.log(err))
  }

  signOut() {
    firebase.auth().signOut()
      .then(() => console.log(null))
  }

  switchToLogin() {
    this.setState({
      mode: 'login'
    })
  }

  switchToResetPassword() {
    this.setState({ 
      mode: 'reset'
    })
  }

  resetPassword(resetPasswordSuccess) {
    const { email } = this.state
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => this.setState({
        info: resetPasswordSuccess
      }))
      .catch(err => this.setState({
        info: err
      }))
  }

  render() {
    const { user, children } = this.props
    const { mode, email, password } = this.state
    return user ? 
      user && (
        <React.Fragment>
          <AuthFrameMenu user={ user }
              signOut={ this.signOut.bind(this) }/>
          { children }
        </React.Fragment>
      ) :
      (
        <div id='login-form' className='container'>
          <div className='col-md-6 offset-md-3'>
            <div className="input-group mb-3">
              <label>email</label>
              <input type='email' className='form-control' value={ email }
                  onChange={ e => this.handleEmailChange(e.target.value) }/>
            </div>
            {
              mode === 'login' && (
                <div className="input-group mb-3">
                  <label>password</label>
                  <input type='password' className='form-control' value={ password }
                      onChange={ e => this.handlePasswordChange(e.target.value) }/>
                </div>
              )
            }
            <div>
              {
                mode == 'login' ? (
                  <div className='btn-group' role='group'>
                    <button type='button' className='btn btn-primary'
                        onClick={ () => this.signIn() }>
                      sign in</button>
                    <button type='button' className='btn btn-outline-secondary'
                        onClick={ () => this.signUp() }>
                      sign up</button>
                  </div>
                ) : (
                  <button type='button' className='btn btn-primary'
                      onClick={ () => this.resetPassword(resetPasswordSuccess) }>
                    reset</button>
                )
              }
            </div>
            {
              mode == 'login' ? (
                <a href='#' onClick={ () => this.switchToResetPassword() }>
                  reset password</a>
              ) : (
                <a href='#' onClick={ () => this.switchToLogin() }>
                  back to login</a>
              )
            }
          </div>
        </div>
      )
  }
}