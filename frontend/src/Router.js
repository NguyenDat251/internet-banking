import React from 'react'
import CustomerLoginPage from './pages/customer/loginPage/loginPage.component'
import EmployeeLoginPage from './pages/employee/loginPage/loginPage.component'
import CustomerHomepage from './pages/customer/homePage/homepage.component'
import { Switch, Route, Redirect } from 'react-router-dom'

const Router = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/login"></Redirect>
            <Route exact path="/login" component={CustomerLoginPage}/>
            <Route path="/dashboard" component={CustomerHomepage}/>


            <Route exact path="/employee/login" component={EmployeeLoginPage}/>

            <Route render={() => <Redirect to="/"/>}/>
        </Switch>
    )
}

export default Router
