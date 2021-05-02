import React, { useState } from 'react'
import LoginForm from './components/LoginForm.js'
import loginService from './services/login'
import noteService from './services/notes'
import { useHistory } from 'react-router-dom'

export default function Login () {
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      history.push('/notes')
    } catch (e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>
  }

  if (user) {
    return <p>User is logged</p>
  }

  return (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={
                ({ target }) => setUsername(target.value)
}
      handlePasswordChange={
                ({ target }) => setPassword(target.value)
              }
      handleSubmit={handleLogin}
    />
  )
}
