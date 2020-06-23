import React from 'react'

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <button className="btn btn-success" id="menu-toggle" onClick={() => props.setShowSidebar(!props.showSidebar)}>
            <i className="fa fa-bars"></i>
          </button>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
    )
}

export default Navbar
