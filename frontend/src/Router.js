import React from 'react'
import HomePage from './pages/homePage/homePage.component'
import { Switch, Route } from 'react-router-dom'

const Router = () => {
    return (
        <Switch>
            <Route path="/" component={HomePage}/>
        </Switch>
    )
}

export default Router
