import React from 'react'
import CustomerLoginPage from './pages/customer/loginPage/loginPage.component'
import EmployeeLoginPage from './pages/employee/loginPage/loginPage.component'
import { Switch, Route, Redirect } from 'react-router-dom'

const Router = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/login"></Redirect>
            <Route exact path="/login" component={CustomerLoginPage}/>
            <Route exact path="/employee/login" name="empoyee" component={EmployeeLoginPage}/>
        </Switch>
    )
}

export default Router
