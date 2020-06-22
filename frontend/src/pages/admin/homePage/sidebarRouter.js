import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Content from './components/content/content'
import CreateAccount from './components/content/createAccount/createAccount';
import PrivateRoute from '../../../PrivateRoute'

const SidebarRouter = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <PrivateRoute exact path={`${match.path}`} component={Content} page="/employee"/>
            <PrivateRoute exact path={`${match.path}/createAccount`} component={CreateAccount} page="/employee"
            />
        </Switch>
    )
}

export default SidebarRouter
