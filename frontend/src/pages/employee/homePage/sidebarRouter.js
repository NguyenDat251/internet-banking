import React from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import CreateAccount from './components/content/createAccount/createAccount';
import addMoneyToAccount from './components/content/addMoneyToAccount/addMoneyToAccount';
import PrivateRoute from '../../../PrivateRoute'

const SidebarRouter = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Redirect exact from={`${match.path}`}  to={`${match.path}/addCustomer`}/>}/>
            <PrivateRoute exact path={`${match.path}/addCustomer`} component={CreateAccount} page="/employee"/>
            <PrivateRoute exact path={`${match.path}/addMoney`} component={addMoneyToAccount} page="/employee"/>
            <Route exact path={`${match.url}/logout`} render={() => {(window.location = window.location.origin + "/employee")}}/>
            />
        </Switch>
    )
}

export default SidebarRouter
