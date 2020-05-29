import React from 'react'
import { useRouteMatch, Switch, Route, useLocation, Redirect } from 'react-router-dom'
import BankAccount from './components/content/bankAccount/bankAccount'
import TransferLocal from './components/content/transfer/transferLocal/transferLocal'
import TransferAbroad from './components/content/transfer/transferAbroad/transferAbroad'
import TransferHistory from './components/content/transferHistory/transferHistory'

const Router = () => {
    let match = useRouteMatch();
    let location = useLocation();
    return (
        <Switch>    
            <Route exact path={`${match.url}`} component={BankAccount}/>
            <Route exact path={`${match.url}/bankaccount`} component={BankAccount}/>
            <Route exact path={`${match.url}/transfer/kiantobank`} component={TransferLocal}/>
            <Route exact path={`${match.url}/transfer/otherbank`} component={TransferAbroad}/>
            <Route exact path={`${match.url}/history`} component={TransferHistory}/>
            <Route exact path={`${match.url}/loan-reminder`} render={() => <h3>{location.pathname}</h3>}/>
            <Route exact path={`${match.url}/account-info`} render={() => <h3>{location.pathname}</h3>}/>
            <Route exact path={`${match.url}/receiver`} render={() => <h3>{location.pathname}</h3>}/>
            <Route exact path={`${match.url}/change-password`} render={() => <h3>{location.pathname}</h3>}/>
            <Route exact path={`${match.url}/logout`} render={() => <Redirect to="/"></Redirect>}/>
        </Switch>
    )
}

export default Router
