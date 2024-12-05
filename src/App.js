import React from 'react';
//import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import GeneralDashboard from './components/generalDashboard/generalDashboard.component';
import Login from './components/login/login.component';
import ForgetUserName from './components/login/forgetUserName.component';
import ForgetPassword from './components/login/forgetPassword.component';
import { PrivateRoute } from './helper/privateRoute';
import Layout from './components/shared/common/layout/layout.component'
import AccountDashboard from './components/accountSetting/accountDashboard.component'
     
function App() {
  return (
    <div className="App crm-persian-font">
      <BrowserRouter>
        <Switch> 

          <PrivateRoute path="/layout" component={Layout} />
          <PrivateRoute path="/generalDashboard" component={GeneralDashboard} />
          <Route path="/accountDashboard" component={AccountDashboard} />
          <Route path="/forgetUserName" component={ForgetUserName} />
          <Route path="/forgetPassword" component={ForgetPassword} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Login} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
