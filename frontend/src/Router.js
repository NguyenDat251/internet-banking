import React from 'react'
import CustomerLoginPage from './pages/customer/loginPage/loginPage.component'
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
            <PrivateRoute path="/dashboard" component={CustomerHomepage}/>


            <Route exact path="/employee" component={EmployeeLoginPage}/>
            <Route exact path="/employee/dashboard" component={EmployeeHomepage}/>
            <Route render={() => <Redirect to="/"/>}/>
        </Switch>
    )
}

export default Router
