import React, { useEffect } from 'react'
import HeaderHomePage from './components/header/header' 
import LoginForm from '../../../components/loginForm/loginForm' 
import './loginPage.component.scss'
import {userActions} from '../../../actions/customer/user'
import { connect } from 'react-redux'

const CustomerLoginPage = ({customer, login, logout}) => {
    useEffect(() => {
        logout()
    }, [])
    return (
        <div className="login-page">
            <HeaderHomePage/>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-6"></div>
                    <div className="col-md-auto mt-5">
                        <LoginForm login = {login} customer = {customer}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    customer: state.customer
})

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(userActions.login(username, password)),
    logout: () => dispatch(userActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLoginPage)
