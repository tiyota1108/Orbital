import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';//add in router
import './index.css';
import Board from './Boards';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login'; //add in login and register components
import Register from './Register';

// ReactDOM.render(<Board count={50}/>, document.getElementById('root'));
// registerServiceWorker();



ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={Board} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
