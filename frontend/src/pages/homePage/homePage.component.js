import React from 'react'
import HeaderHomePage from './components/header/header' 
import LoginForm from './components/loginForm/loginForm' 
import './homePage.component.scss'

const homePage = () => {
    return (
        <div className="home-page">
            <HeaderHomePage/>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-6"></div>
                    <div className="col-md-auto mt-5">
                        <LoginForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default homePage
