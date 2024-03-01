import React from 'react'

const Navbar = ({ toggle, name }) => {
  return (
    <div className="content display-sidebar-mobile bg-secondary">
      <nav className="navbar navbar-expand-lg navbar-secondary bg-secondary">
        <div className="container">
          <a className="navbar-brand text-light" href="#">
            {name}
          </a>
          <button
            className="navbar-toggler bg-secondary text-light"
            type="button"
            onClick={toggle}
          >
            <span className="navbar-toggler-icon " style={{color:"#fff"}} ></span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
