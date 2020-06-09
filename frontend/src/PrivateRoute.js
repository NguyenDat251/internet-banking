import React from 'react'
import { Route, Redirect, useHistory, useRouteMatch } from 'react-router-dom'
import {isAuthen} from './services/authService/authService'

const PrivateRoute = ({component: Component, ...rest}) => { 
    console.log(isAuthen())
    console.log(sessionStorage.getItem("ACCESS_TOKEN"))
    return(
    <Route {...rest} render={(props) => (
        isAuthen() === true
        ? <Component {...props}/>
        : <Redirect to="/login"/> 
    )}/>
)}

export default PrivateRoute
