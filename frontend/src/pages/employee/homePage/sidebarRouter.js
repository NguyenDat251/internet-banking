import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Content from './components/content/content'
import CreateAccount from './components/content/createAccount/createAccount';
import PrivateRoute from '../../../PrivateRoute'

const SidebarRouter = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <PrivateRoute exact path={`${match.path}`} component={CreateAccount} page="/employee"/>
            <Route exact path={`${match.url}/logout`} render={() => {(window.location = window.location.origin + "/employee")}}/>
            />
        </Switch>
    )
}

export default SidebarRouter
