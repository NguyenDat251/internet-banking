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
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
          </div>
        </nav>
    )
}

export default Navbar
