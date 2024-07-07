import React from 'react'
import logo from '../assets/glogo.png'

function Header() {
  return (
   <nav className='navbar bg-light mb-4 p-0 '>
    <div className="container">
        <a className='navbar-brand' href="/"> 
        <div className="d-flex">
            <img src={logo} className='mr-2' alt="logo" />
            <div>Project Management</div>
        </div>
        </a>
    </div>
   </nav>
  )
}

export default Header
