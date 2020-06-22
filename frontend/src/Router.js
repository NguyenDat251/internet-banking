import React from 'react';
import CustomerLoginPage from './pages/customer/loginPage/loginPage.component';
import ForgotPasswordPage from './pages/customer/forgotPassword/forgotPassword.component';
import EmployeeLoginPage from './pages/employee/loginPage/loginPage.component';
import CustomerHomepage from './pages/customer/homePage/homepage.component';
import EmployeeHomepage from './pages/employee/homePage/homePage.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import NameItem from './config/sessionStorage';
import JwtDecode from 'jwt-decode';

const Router = () => {
    if(sessionStorage.getItem(NameItem.ACCESS_TOKEN)){
        var jwt = JwtDecode(sessionStorage.getItem(NameItem.ACCESS_TOKEN));
    }
  return (
    <Switch>
      <Redirect exact from="/" to="/login"></Redirect>
      <Route exact path="/login" component={CustomerLoginPage} />
      <Route exact path="/forgotPassword" component={ForgotPasswordPage} />
      <Route exact path="/dashboard" component={CustomerHomepage} />

      <Route exact path="/employee" component={EmployeeLoginPage} />
      <Route path="/employee/dashboard" component={EmployeeHomepage} />
      {jwt && jwt.customer_id && <Route render={() => <Redirect to="/" />} />}
      {jwt && jwt.employee_id && <Route render={() => <Redirect to="/employee" />} />}
      {jwt && jwt.admin_id && <Route render={() => <Redirect to="/admin" />} />}
    </Switch>
  );
};

export default Router;
