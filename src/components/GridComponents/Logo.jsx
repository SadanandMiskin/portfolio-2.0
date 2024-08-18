import React, { useEffect, useState } from 'react'
// import { MyDetails } from '../../hooks/MyDetails'

const Logo = () => {
 
  function handle() {
    window.location = 'https://github.com/sadanandmiskin'
  }

  return (
    <div className="g logo" onClick={handle}>
        <div className="logo-content">
          <div className='logo-img' >
        <img src='https://avatars.githubusercontent.com/u/142408283?v=4' />

          </div>
        <h5>Sadanand Miskin</h5>
          {/* <div className="logo-icon">
      
          </div> */}
          {/* <div className="logo-name">
          
          </div> */}
        </div>
       </div>
  )
}

export default Logo
