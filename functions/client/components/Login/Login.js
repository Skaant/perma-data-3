import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import AuthFrameMenu from './AuthFrameMenu/AuthFrameMenu';

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
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
    this.setState({
      email,
      info: null
    })
  }

  handlePasswordChange(password) {
    this.setState({
      password,
      info: null
    })
  }

  signIn() {
    const { email, password } = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.setState({ info: null }))
      .catch(err => this.setState({ info: err.message }))
  }

  signUp() {
    const { email, password } = this.state
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => this.setState({ info: null }))
      .catch(err => this.setState({
        info: err.message
      }))
  }

  signOut() {
    firebase.auth().signOut()
      .then(() => this.setState({
        info: 'You are now disconnected'
      }))
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

  resetPassword() {
    const { email } = this.state
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => this.setState({
        info: 'The password recovery mail has been sent'
      }))
      .catch(err => this.setState({
        info: err.message
      }))
  }

  render() {
    const { user, children } = this.props
    const { mode, email, password, info } = this.state
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
            <label>email</label>
            <input type='email' className='form-control' value={ email }
                onChange={ e => this.handleEmailChange(e.target.value) }
                onKeyPress={ e => (mode !== 'login'
                  && e.charCode === 13) &&  this.resetPassword() }/>
            {
              mode === 'login' && (
                <React.Fragment>
                  <label>password</label>
                  <input type='password' className='form-control' value={ password }
                      onChange={ e => this.handlePasswordChange(e.target.value) }
                      onKeyPress={ e => e.charCode === 13 && this.signIn() }/>
                </React.Fragment>
              )
            }
            {
              info && (
                <div id='login-form__info'>
                  { info }</div>
              )
            }
            <div id='login-form__menu'>
              {
                mode == 'login' ? (
                  <React.Fragment>
                    <button type='button'
                        className='btn btn-x btn-outline-secondary col-lg-4 col-md-6'
                        onClick={ () => this.switchToResetPassword() }>
                      reset password</button>
                    <button type='button'
                        className='btn btn-x btn-outline-secondary col-lg-4'
                        onClick={ () => this.signUp() }>
                      sign up</button>
                    <button type='button'
                        className='btn btn-x btn-primary col-lg-4 col-md-6'
                        onClick={ () => this.signIn() }
                        disabled={ email === '' || password === '' }>
                      sign in</button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button type='button'
                        className='btn btn-x btn-outline-secondary col-md-6'
                        onClick={ () => this.switchToLogin() }>
                      back to login</button>
                    <button type='button'
                        className='btn btn-x btn-primary col-md-6'
                        onClick={ () => this.resetPassword() }
                        disabled={ email === '' }>
                      send recovery</button>
                  </React.Fragment>
                )
              }
            </div>
          </div>
        </div>
      )
  }
}