import React, { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { Link, Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import { NoteDetail } from './components/NoteDetail.js'
import Login from './Login'
import { useUser } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'

const LazyNotes = lazy(() => import('./Notes'))

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Notes App</title>
      </Helmet>
      <h1>Home Page</h1>
    </>
  )
}

const Users = () => <h1>Users</h1>

const inlineStyles = {
  padding: 5
}

const App = () => {
  const { notes } = useNotes()
  const { user } = useUser()

  const match = useRouteMatch('/notes/:id')

  return (
    <Suspense fallback={<span>Loading component...</span>}>
      <header>
        <Link to='/' style={inlineStyles}>
          Home
        </Link>
        <Link to='/notes' style={inlineStyles}>
          Notes
        </Link>
        <Link to='/users' style={inlineStyles}>
          Users
        </Link>
        {
          user
            ? <em>Logged as {user.name}</em>
            : (
              <Link to='/login' style={inlineStyles}>
                Login
              </Link>
              )
        }
      </header>

      <Switch>
        <Route
          path='/login' render={() => {
            return user ? <Redirect to='/' /> : <Login />
          }}
        />
        <Route exact path='/notes'>
          <LazyNotes />
        </Route>
        <Route
          path='/notes/:noteId' render={() => {
            const note = match
              ? notes.find(note => note.id === match.params.id)
              : null

            return <NoteDetail note={note} />
          }}
        />
        <Route path='/users'>
          {user ? <Users /> : <Redirect to='/login' />}
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route>
          <h1>Not found</h1>
        </Route>
      </Switch>
    </Suspense>
  )
}

export default App
