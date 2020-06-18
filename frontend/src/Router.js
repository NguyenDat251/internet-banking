import React from 'react'
import CustomerLoginPage from './pages/customer/loginPage/loginPage.component'
import ForgotPasswordPage from './pages/customer/forgotPassword/forgotPassword.component'
import EmployeeLoginPage from './pages/employee/loginPage/loginPage.component'
import CustomerHomepage from './pages/customer/homePage/homepage.component'
import EmployeeHomepage from './pages/employee/homePage/homePage.component'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

const Router = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/login"></Redirect>
            <Route exact path="/login" component={CustomerLoginPage}/>
            <Route exact path="/forgotPassword" component={ForgotPasswordPage}/>
            <Route path="/dashboard" component={CustomerHomepage}/>

            <Route exact path="/employee" component={EmployeeLoginPage}/>
            <Route path="/employee/dashboard" component={EmployeeHomepage}/>
            <Route render={() => <Redirect to="/"/>}/>
        </Switch>
    )
}

export default Router
