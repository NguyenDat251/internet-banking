import React from 'react'
import { useRouteMatch, Switch, Route, useLocation } from 'react-router-dom'
import BankAccount from './components/content/bankAccount/bankAccount'

const Router = () => {
    let match = useRouteMatch();
    let location = useLocation();
    return (
        <Switch>
                  <Route exact path={`${match.url}/bankaccount`} component={BankAccount}/>
                  <Route exact path={`${match.url}/transfer/kiantobank`} render={() => <h3>{location.pathname}</h3>}/>
                  <Route exact path={`${match.url}/transfer/otherbank`} render={() => <h3>{location.pathname}</h3>}/>
                  <Route exact path={`${match.url}/history`} render={() => <h3>{location.pathname}</h3>}/>
                  <Route exact path={`${match.url}/loan-reminder`} render={() => <h3>{location.pathname}</h3>}/>
                  <Route exact path={`${match.url}/account-info`} render={() => <h3>{location.pathname}</h3>}/>
                  <Route exact path={`${match.url}/receiver`} render={() => <h3>{location.pathname}</h3>}/>
                  <Route exact path={`${match.url}/change-password`} render={() => <h3>{location.pathname}</h3>}/>
                  <Route exact path={`${match.url}/logout`} render={() => <h3>{location.pathname}</h3>}/>
        </Switch>
    )
}

export default Router
