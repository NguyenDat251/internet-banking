import React from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import Content from './components/content/content'
import CreateAccount from './components/content/createAccount/createAccount';
import PrivateRoute from '../../../PrivateRoute'

const SidebarRouter = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Redirect exact from={`${match.path}`}  to={`${match.path}/addCustomer`}/>}/>
            <PrivateRoute exact path={`${match.path}/addCustomer`} component={CreateAccount} page="/employee"/>
            <Route exact path={`${match.url}/logout`} render={() => {(window.location = window.location.origin + "/employee")}}/>
            />
        </Switch>
    )
}

export default SidebarRouter
