import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tracker from './Tracker'
import Admin from './Admin'

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Tracker}/>
      <Route path="/admin" component={Admin}/>
    </div>
  </Router>
)
export default Routes
