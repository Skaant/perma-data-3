import React from 'react'

export default ({ user, signOut }) => {
  console.log(user)
  return (
    <div id='auth-frame-menu' className='row'>
      <div id='auth-frame-menu__user' className='offset-md-8 col-md-4'>
        <h6>
          <a id='auth-frame-menu__user-btn--profile'
              href={ `/profile/${ user.uid }` }>
            { user.email }</a> •&nbsp;
          <a id='auth-frame-menu__user-btn--sign-out'
              onClick={ () => signOut() }>sign out</a>
        </h6>
      </div>
    </div>
  )
}