import React from 'react'
import PropTypes from 'prop-types'

export default function LoginForm ({ handleSubmit, ...props }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          value={props.username}
          name='Username'
          placeholder='Username'
          onChange={props.handleUsernameChange}
        />
      </div>
      <div>
        <input
          type='password'
          value={props.password}
          name='Password'
          placeholder='Password'
          onChange={props.handlePasswordChange}
        />
      </div>
      <button id='form-login-button'>
        Login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string

}
