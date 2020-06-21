import React from 'react'
import { Route} from 'react-router-dom'
import {isAuthen} from './services/authService/authService'

const PrivateRoute = ({component: Component, ...rest}) => { 
    return(
    <Route {...rest} render={(props) => (
        isAuthen() === true
        ? <Component {...props}/>
        : window.location= window.location.origin + rest.page
    )}/>
)}

export default PrivateRoute
