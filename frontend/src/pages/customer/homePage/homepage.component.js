import React from 'react'
import NavBar from './components/menu/menu'
import './homepage.component.scss'

const customerHomepage = () => {
    return (
        <div className="home-page">
            <div className="banner"/>
            <NavBar/>
        </div>
    )
}

export default customerHomepage
