import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import './App.css'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Signup } from './components/Signup'

function App() {
  return (
    <Router>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Router>
  )
}

export default App
