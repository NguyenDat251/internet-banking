import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {isAuthen} from './services/authService/authService'

console.log(isAuthen.isAuthenticated)
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        isAuthen.isAuthenticated === true
        ? <Component {...props}/>
        : <Redirect to="/login"/> 
    )}/>
)

export default PrivateRoute
