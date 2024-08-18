import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="header">
      <div className="navigate">
        <Link to={'/'} className="nav-link">Home</Link>
        <Link to={'/projects'} className="nav-link">Projects</Link>
        <Link to={'/blog'} className="nav-link">Blogs</Link>
        {/* <a href="" className="nav-link Blogs">Blogs</a> */}
        {/* <a href="" className="nav-link contact">Contact</a> */}
        <Link to={'/contact'} className="nav-link">Contact</Link>
      </div> 
    </div>
  )
}

export default Navigation