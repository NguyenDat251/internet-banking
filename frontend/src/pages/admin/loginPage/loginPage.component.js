import React from 'react'
import HeaderHomePage from './components/header/header' 
import LoginForm from '../../../components/loginForm/loginForm' 
import {AdminActions} from '../../../actions/admin/admin'
import './loginPage.component.scss'
import { connect } from 'react-redux'

const employeeLoginPage = ({admin, login}) => {
    return (
        <div className="emp-login-page">
            <HeaderHomePage/>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-6"></div>
                    <div className="col-md-auto mt-5">
                        <LoginForm login={login} user={admin}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    admin: state.admin
})

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(AdminActions.login(username, password)),
})


export default connect(mapStateToProps, mapDispatchToProps)(employeeLoginPage)
