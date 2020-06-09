import React from 'react'
import { useRouteMatch, Switch, Route, useLocation } from 'react-router-dom'
import BankAccount from './components/content/bankAccount/bankAccount'
import TransferLocal from './components/content/transfer/transferLocal/transferLocal'
import TransferAbroad from './components/content/transfer/transferAbroad/transferAbroad'
import TransferHistory from './components/content/transferHistory/transferHistory'
import AccountInfo from './components/content/accountInfo/accountInfo'
import ChangePassword from './components/content/changePassword/changePassword'
import Receiver from './components/content/receiver/receiver'
import PrivateRoute from '../../../PrivateRoute'

const Router = () => {
    let match = useRouteMatch();
    let location = useLocation();
    return (
        <Switch>    
            <PrivateRoute exact path={`${match.url}`} component={BankAccount} />
            <PrivateRoute exact path={`${match.url}/bankaccount`} component={BankAccount}/>
            <PrivateRoute exact path={`${match.url}/transfer/kiantobank`} component={TransferLocal}/>
            <PrivateRoute exact path={`${match.url}/transfer/otherbank`} component={TransferAbroad}/>
            <PrivateRoute exact path={`${match.url}/loan-reminder`} render={() => <h3>{location.pathname}</h3>}/>
            <PrivateRoute exact path={`${match.url}/account-info`} component={AccountInfo}/>
            <PrivateRoute exact path={`${match.url}/history`} component={TransferHistory}/>
            <PrivateRoute exact path={`${match.url}/receiver`} component={Receiver}/>
            <PrivateRoute exact path={`${match.url}/change-password`} component={ChangePassword}/>
            <Route exact path={`${match.url}/logout`} render={() => (window.location = window.location.origin)}/>
        </Switch>
    )
}

export default Router
