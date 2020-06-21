import React from 'react'
import { Route} from 'react-router-dom'
import {isAuthen} from './services/authService/authService'

const PrivateRoute = ({component: Component, ...rest}) => { 
    const page = rest.page ? rest.page : ''
    return(
    <Route {...rest} render={(props) => (
        isAuthen() === true
        ? <Component {...props}/>
        : window.location = window.location.origin + page
    )}/>
)}

export default PrivateRoute
