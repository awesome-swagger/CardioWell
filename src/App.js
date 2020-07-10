import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import LoginPage from '../src/components/LoginPage';
import DashboardPage from '../src/components/DashboardPage';
import IFramePage from './components/IFramePage';
import AdminDashboard from '../src/components/AdminDashboard';
import ForgotPassword from '../src/components/ForgotPassword';
//import ForgotPasswordPage from '../src/components/ForgotPasswordPage';

export default class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <div>
          <Switch>
             <Route exact path="/" component={LoginPage}/>
             <Route exact path="/dashboardPage" component={DashboardPage}/>
             <Route exact path="/iFrame/:id" component={IFramePage}/>
             <Route exact path="/adminDashboard" component={AdminDashboard}/>
             <Route exact path="/forgotPassword/:id" component={ForgotPassword}/>
             {/* <Route exact path="/forgotPasswordPage/:id" component={ForgotPasswordPage}/> */}
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}