import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Content from './components/content/content'
import CreateAccount from './components/content/createAccount/createAccount';

const SidebarRouter = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path="/" component={Content}/>
            <Route exact path={`${match.path}/createAccount`} component={CreateAccount}/>
        </Switch>
    )
}

export default SidebarRouter
