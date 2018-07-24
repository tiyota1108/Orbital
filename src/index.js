import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';//add in router
//import './index.css';
import Board from './Boards';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login'; //add in login and register components
import Register from './Register';
import Home from './Home';
import Dashboard from './Dashboard';
import Lost from './Lost';

//need a nav component
const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


// ReactDOM.render(<Board count={50}/>, document.getElementById('root'));
// registerServiceWorker();
//<Route exact path='/' component={Board} />

//not sure if need to wrap div around switch

ReactDOM.render(
  <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path = '/dashboard/:id' component = {Dashboard} />
        <Route exact path = '/board/:id' component = {Board} />
        <Route component = {Lost} />
        </Switch>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
